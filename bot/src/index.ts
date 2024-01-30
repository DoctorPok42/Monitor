import { Client, GatewayIntentBits, Collection } from "discord.js";
import { Command, SlashCommand } from "./types";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
import { getGuilds, sendLastStats } from "./functions";
import { io } from "socket.io-client";

const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits
const client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers]})
const cron = require('node-cron')

config()

client.slashCommands = new Collection<string, SlashCommand>()
client.commands = new Collection<string, Command>()
client.cooldowns = new Collection<string, number>()

const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
    if (!handler.endsWith(".js")) return;
    require(`${handlersDir}/${handler}`)(client)
})

client.login(process.env.TOKEN)

// Run every minute at 2 seconds (beacause the log worker is running every minute at 0 seconds)
cron.schedule('02 * * * * *', async () => {
  const guilds = await getGuilds()

  const socket = io(process.env.SOCKET_URL, { transports: ["websocket"] })

  socket.emit("getFinalData");

  socket.on("finalData", (newDatas: any) => {
    try {
      guilds.forEach(async (guild: any) => {
        sendLastStats(client, guild, newDatas)
      })
    } catch (err) {
      console.log(err)
    } finally {
      socket.disconnect()
    }
  })
})

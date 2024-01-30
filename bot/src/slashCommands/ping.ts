import { SlashCommandBuilder } from "discord.js"
import { SlashCommand } from "../types";
import embedBuilder from "../embedBuilder";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows the bot's ping")
    ,
    execute: interaction => {
        interaction.reply({
            embeds: [
                embedBuilder({
                  status: "info",
                  description: `🏓 Pong!\n 🛰️ Ping: ${interaction.client.ws.ping}`,
                  noTimestamp: true
                })
            ]
        })
    },
    cooldown: 10
}

export default command
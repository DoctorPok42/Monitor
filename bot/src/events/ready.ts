import { Client } from "discord.js";
import { BotEvent } from "../types";
import { color } from "../functions";

const event : BotEvent = {
    name: "ready",
    once: true,
    execute: (client : Client) => {
      client.user?.setPresence({
        afk: true,
        activities : [
          {
            name: "your server",
            type: 2,
          }
        ]
      });

      console.log(
        color("text", `💪 Logged in as ${color("variable", client.user?.tag)}`)
      )
    }
}

export default event;
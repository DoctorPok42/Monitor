import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js"
import { setGuildOption } from "../functions";
import { SlashCommand } from "../types";
import embedBuilder from "../embedBuilder";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("setnotify")
    .setDescription("Sets the role or user to be notified when the bot detects a critical level.")
    .addMentionableOption(option => {
        return option
        .setName("mention")
        .setDescription("Role or user to be notified.")
        .setRequired(true)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async interaction => {
      const guild = interaction.guild
      if(!guild)
        return interaction.reply({
          embeds: [
            embedBuilder({ status: "error", description: "This command can only be used in a server." })
          ]
        })

      const mention = interaction.options.getMentionable("mention")
      if(!mention)
        return interaction.reply({
          embeds: [
            embedBuilder({ status: "error", description: "Please provide a role or user." })
          ]
        })

      const result = await setGuildOption(guild, "membersToNotify", mention)

      if (result.status === "success") {
        interaction.reply({
          embeds: [
            embedBuilder({ status: "success", description: `Successfully set notify to ${mention}` })
          ]
        })
      } else {
        interaction.reply({
          embeds: [
            embedBuilder({ status: "error", description: `Error: ${result.message}` })
          ]
        })
      }
    },
    cooldown: 10
}

export default command

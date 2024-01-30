import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js"
import { setGuildOption } from "../functions";
import { SlashCommand } from "../types";
import embedBuilder from "../embedBuilder";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("setdefaultchannel")
    .setDescription("Sets the default channel for the bot to send messages to.")
    .addChannelOption(option => {
        return option
        .setName("channel")
        .setDescription("Channel to be set as default.")
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

      const channel = interaction.options.getChannel("channel")
      if(!channel)
        return interaction.reply({
          embeds: [
            embedBuilder({ status: "success", description: "Please provide a channel." })
          ]
        })

      const result = await setGuildOption(guild, "channelInfoID", channel.id)

      if (result.status === "success") {
        const channelToSend = await guild.channels.cache.get(channel.id) as any
        if (!channelToSend)
          return interaction.reply({
            embeds: [
              embedBuilder({ status: "error", description: "Error: Channel not found." })
            ]
          })
        await channelToSend.send({
          embeds: [
            embedBuilder({ status: "info", description: "This is the default channel for the bot to send messages to." })
          ]
        })

        const messageID = channelToSend.lastMessageId

        const secondResult = await setGuildOption(guild, "messageInfoID", messageID)

        if (secondResult.status === "error") {
          return interaction.reply({
            embeds: [
              embedBuilder({ status: "error", description: `Error: ${secondResult.message}` })
            ]
          })
        }

        interaction.reply({
          embeds: [
            embedBuilder({ status: "success", description: `Successfully set default channel to <#${channel.id}>` })
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

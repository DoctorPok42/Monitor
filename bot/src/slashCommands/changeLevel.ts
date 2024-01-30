import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js"
import { getGuildOption, setGuildOption } from "../functions";
import { GuildOptions, SlashCommand } from "../types";
import embedBuilder from "../embedBuilder";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("changelevel")
    .setDescription("Changes the critical level of the bot.")
    .addNumberOption(option => {
        return option
        .setName("cpu")
        .setDescription("CPU critical level.")
        .setMinValue(0)
        .setMaxValue(100)
    })
    .addNumberOption(option => {
        return option
        .setName("memory")
        .setDescription("Memory critical level.")
        .setMinValue(0)
        .setMaxValue(100)
    })
    .addNumberOption(option => {
        return option
        .setName("disk")
        .setDescription("Disk critical level.")
        .setMinValue(0)
        .setMaxValue(100)
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

      const newCPULevel = interaction.options.getNumber("cpu")
      const newMemoryLevel = interaction.options.getNumber("memory")
      const newDiskLevel = interaction.options.getNumber("disk")

      if(!newCPULevel && !newMemoryLevel && !newDiskLevel)
        return interaction.reply({
          embeds: [
            embedBuilder({ status: "success", description: "Please provide at least one critical level." })
          ]
        })

        const oldLevels = await getGuildOption(guild, "levelMax") as GuildOptions["levelMax"]

        if (!oldLevels)
          return interaction.reply({
            embeds: [
              embedBuilder({ status: "error", description: "Error: Cannot find the guild." })
            ]
          })

        const result = await setGuildOption(guild, "levelMax", {
          cpu: newCPULevel || oldLevels.cpu,
          memory: newMemoryLevel || oldLevels.memory,
          disk: newDiskLevel || oldLevels.disk
        })

      if (result.status === "success") {
        interaction.reply({
          embeds: [
            embedBuilder({ status: "success", description: `Successfully changed critical level!\nCPU: **${newCPULevel || oldLevels.cpu}%**, Memory: **${newMemoryLevel || oldLevels.memory}%**, Disk: **${newDiskLevel || oldLevels.disk}%**` })
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

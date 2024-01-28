import chalk from "chalk"
import { Guild, GuildMember, PermissionFlagsBits, PermissionResolvable, TextChannel } from "discord.js"
import GuildDB from "./schemas/Guild"
import { GuildOption, returnFunction } from "./types"
import mongoose from "mongoose";
import embedBuilder from "./embedBuilder";

type colorType = "text" | "variable" | "error"

const themeColors = {
    text: "#2B2",
    variable: "#42f5e0",
    error: "#f5426c"
}

export const getThemeColor = (color: colorType) => Number(`0x${themeColors[color].substring(1)}`)

export const color = (color: colorType, message: any) => {
    return chalk.hex(themeColors[color])(message)
}

export const checkPermissions = (member: GuildMember, permissions: Array<PermissionResolvable>) => {
    let neededPermissions: PermissionResolvable[] = []
    permissions.forEach(permission => {
        if (!member.permissions.has(permission)) neededPermissions.push(permission)
    })
    if (neededPermissions.length === 0) return null
    return neededPermissions.map(p => {
        if (typeof p === "string") return p.split(/(?=[A-Z])/).join(" ")
        else return Object.keys(PermissionFlagsBits).find(k => Object(PermissionFlagsBits)[k] === p)?.split(/(?=[A-Z])/).join(" ")
    })
}

export const sendTimedMessage = (message: string, channel: TextChannel, duration: number) => {
    channel.send(message)
        .then(m => setTimeout(async () => (await channel.messages.fetch(m)).delete(), duration))
    return
}

export const getGuilds = async () => {
    if (mongoose.connection.readyState === 0) throw new Error("Database not connected.")
    return await GuildDB.find()
}

export const getGuildOption = async (guild: Guild, option: GuildOption) => {
    if (mongoose.connection.readyState === 0) throw new Error("Database not connected.")
    let foundGuild = await GuildDB.findOne({ guildID: guild.id })
    if (!foundGuild) return null;
    return foundGuild.options[option]
}

export const setGuildOption = async (guild: Guild, option: GuildOption, value: any): Promise<returnFunction> => {
    if (mongoose.connection.readyState === 0) throw new Error("Database not connected.")
    let foundGuild = await GuildDB.findOne({ guildID: guild.id })
    if (!foundGuild)
      return { status: "error", message: "Guild not found." }
    foundGuild.options[option] = value
    foundGuild.save()
    return { status: "success", message: `Successfully set ${option} to ${value}` }
}

export const sendLastStats = async (client: any, guild: any, data: { lastDate: string, cpu: any, memory: any, disk: any, networkPorts: any }) => {
    const isWarning = data.cpu > guild.options.levelMax.cpu || Number(data.memory) > guild.options.levelMax.memory || data.disk > guild.options.levelMax.disk
    const channelID = client.channels.cache.get(guild.options.channelInfoID) as any
    const message = await channelID.messages.fetch(guild.options.messageInfoID)

    if (!channelID || !message) return

    try {
        message.edit({
            ...isWarning ? { content: `${guild.options.membersToNotify}` } : { content: "" },
            embeds: [
                embedBuilder({ description: `Last stats of your server! ${isWarning ? "**(Warning)**" : ""}`, fields: [
                    { name: "⚙️ CPU", value: `${data.cpu}%`, inline: true },
                    { name: "💿 Memory", value: `${(data.memory)} GB`, inline: true },
                    { name: "💾 Disk", value: `${data.disk}`, inline: true },
                    { name: "🌐 Network Ports", value: "```" + `${
                        data.networkPorts.map((net: any) => {
                            return (
                                `${net.port}: ${net.status === "OPEN" ? "Open" : "Closed"}`
                            )
                        }).join('\n')}` + "```", inline: true
                    }
                ], status: isWarning ? "warning" : "info"
                })
            ]
        })
    } catch (err) {
        console.log(err)
    } finally {
        console.log(color("text", `${data.lastDate} - ${color("variable", isWarning ? "[WARNING]" : "[INFO]")} - Send data to the guild ${color("variable", guild.guildID)}`))
    }
}

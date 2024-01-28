import { EmbedBuilder } from 'discord.js'
import { statusType } from './types'

const colors = {
  "success": "#42f542",
  "warning": "#f5e042",
  "error": "#f5426c",
  "info": "#4286f5"
}

const icons = {
  "success": "✅",
  "warning": "⚠️",
  "error": "❌",
  "info": "ℹ️"
}

interface embedBuilderOptions {
  description: string,
  status: statusType,
  fields?: { name: string, value: string, inline?: boolean }[],
  noTimestamp?: boolean
}

const embedBuilder = ({
  description,
  status,
  fields,
  noTimestamp = false
}: embedBuilderOptions) => {
  let embed = new EmbedBuilder()

  embed.setTitle(`${icons[status]} ${status.toUpperCase()}`)
  embed.setDescription(description)
  embed.setColor(Number(`0x${colors[status].substring(1)}`))

  if (fields) embed.addFields(fields)

  if (!noTimestamp) embed.setTimestamp()

  return embed
}

export default embedBuilder

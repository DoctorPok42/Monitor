import { Schema, model } from "mongoose";
import { IGuild } from "../types";

const GuildSchema = new Schema<IGuild>({
    guildID: {required:true, type: String},
    options: {
        prefix: {type: String, default: process.env.PREFIX},
        channelInfoID: {type: String, default: null},
        messageInfoID: {type: String, default: null},
        levelMax: {
          cpu: {type: Number, default: 80},
          memory: {type: Number, default: 80},
          disk: {type: Number, default: 80},
        },
        membersToNotify: {type: String, default: null},
    }
})

const GuildModel = model("guild", GuildSchema)

export default GuildModel
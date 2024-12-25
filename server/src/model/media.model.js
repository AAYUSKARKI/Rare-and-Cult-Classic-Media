import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
title: { type: String, required: true },
link: { type: String, required: true },
type: { type: String, enum: ["SFW", "NSFW"], required: true },
});
const Media = mongoose.model("Media", mediaSchema);
export default Media;
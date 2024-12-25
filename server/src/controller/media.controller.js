import Media from "../model/media.model.js";
export const addMedia = async (req, res) => {
const { title, link, type } = req.body;
try {
const newMedia = new Media({ title, link, type });
await newMedia.save();
res.json(newMedia);
} catch (err) {
res.status(400).json({ error: "Failed to add media" });
}
};

export const getMedia = async (req, res) => {
try {
const media = await Media.find().sort({ title: 1 });
res.json(media);
} catch (err) {
res.status(500).json({ error: "Failed to fetch media" });
}
};

export const deleteMedia = async (req, res) => {
const { id } = req.params;
try {
await Media.findByIdAndDelete(id);
res.json({ message: "Media deleted successfully" });
} catch (err) {
res.status(500).json({ error: "Failed to delete media" });
}
};

export const updateMedia = async (req, res) => {
const { id } = req.params;
const { title, link, type } = req.body;
try {
const updatedMedia = await Media.findByIdAndUpdate(
id,
{ title, link, type },
{ new: true }
);
res.json(updatedMedia);
} catch (err) {
res.status(500).json({ error: "Failed to update media" });
}
};

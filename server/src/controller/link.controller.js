import Link from "../model/link.model.js";

export const addLink = async (req, res) => {
  const { title, link } = req.body;
  if (!title || !link) {
    return res.status(400).json({ error: "Title and link are required" });
  }
  try {
    const newLink = new Link({ title, link });
    await newLink.save();
    res.json(newLink);
  } catch (err) {
    res.status(400).json({ error: "Failed to add link" });
  }
};

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find().sort({ title: 1 });
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch links" });
  }
};

export const deleteLink = async (req, res) => {
  const { id } = req.params;
  try {
    await Link.findByIdAndDelete(id);
    res.json({ message: "Link deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete link" });
  }
};

export const updateLink = async (req, res) => {
  const { id } = req.params;
  const { title, link } = req.body;
  try {
    const updatedLink = await Link.findByIdAndUpdate(
      id,
      { title, link },
      { new: true }
    );
    res.json(updatedLink);
  } catch (err) {
    res.status(500).json({ error: "Failed to update link" });
  }
};
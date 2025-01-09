import React, { useState } from "react";
import axios from "axios";

// Define the Link interface
interface Link {
  _id: string;
  title: string;
  link: string;
}

// Define the MediaItem interface
interface MediaItem {
  _id: string; // Changed to string to match the typical MongoDB ObjectId type
  title: string;
  link: string;
  type: "SFW" | "NSFW";
}

const AdminPanel: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [mediaTitle, setMediaTitle] = useState<string>("");
  const [mediaLink, setMediaLink] = useState<string>("");
  const [mediaType, setMediaType] = useState<"SFW" | "NSFW">("SFW");
  const [usefulTitle, setUsefulTitle] = useState<string>("");
  const [usefulLink, setUsefulLink] = useState<string>("");
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [linkList, setLinkList] = useState<Link[]>([]);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);

  const handleLogin = () => {
    if (password === "3669") {
      setIsAuthenticated(true);
      fetchMedia();
      fetchLinks();
    } else {
      alert("Incorrect password");
    }
  };

  const handleMediaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/v1/media/add",
        { title: mediaTitle, link: mediaLink, type: mediaType },
        {
          headers: { Authorization: password },
        }
      );
      alert("Media added successfully");
      setMediaTitle("");
      setMediaLink("");
      setMediaType("SFW");
      fetchMedia(); // Refresh media list
    } catch (err) {
      alert("Failed to add media");
    }
  };

  const handleLinkSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/v1/usefullinks/add",
        { title: usefulTitle, link: usefulLink },
        {
          headers: { Authorization: password },
        }
      );
      alert("Useful link added successfully");
      setUsefulTitle("");
      setUsefulLink("");
      fetchLinks(); // Refresh link list
    } catch (err) {
      alert("Failed to add useful link");
    }
  };

  const fetchMedia = async () => {
    try {
      const response = await axios.get<MediaItem[]>("http://localhost:8000/api/v1/media");
      setMediaList(response.data);
    } catch (err) {
      console.error("Failed to fetch media", err);
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await axios.get<Link[]>("http://localhost:8000/api/v1/usefullinks");
      setLinkList(response.data);
    } catch (err) {
      console.error("Failed to fetch links", err);
    }
  };

  const handleDeleteMedia = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/media/${id}`, {
        headers: { Authorization: password },
      });
      alert("Media deleted successfully");
      fetchMedia(); // Refresh media list
    } catch (err) {
      alert("Failed to delete media");
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/usefullinks/${id}`, {
        headers: { Authorization: password },
      });
      alert("Link deleted successfully");
      fetchLinks(); // Refresh link list
    } catch (err) {
      alert("Failed to delete link");
    }
  };

  const handleEditMedia = (media: MediaItem) => {
    setEditingMedia(media);
    setShowEditPopup(true);
  };

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
    setShowEditPopup(true);
  };

  const handleUpdateMedia = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingMedia) {
      try {
        await axios.put(
          `http://localhost:8000/api/v1/media/${editingMedia._id}`,
          { title: editingMedia.title, link: editingMedia.link, type: editingMedia.type },
          {
            headers: { Authorization: password },
          }
        );
        alert("Media updated successfully");
        setShowEditPopup(false);
        fetchMedia(); // Refresh media list
      } catch (err) {
        alert("Failed to update media");
      }
    }
  };

  const handleUpdateLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingLink) {
      try {
        await axios.put(
          `http://localhost:8000/api/v1/usefullinks/${editingLink._id}`,
          { title: editingLink.title, link: editingLink.link },
          {
            headers: { Authorization: password },
          }
        );
        alert("Link updated successfully");
        setShowEditPopup(false);
        fetchLinks(); // Refresh link list
      } catch (err) {
        alert("Failed to update link");
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-black text-red-600 min-h-screen flex items-center justify-center">
        <div>
          <label htmlFor="password" className="text-3xl font-bold">
            Enter The Amount
          </label>
          <input
            type="password"
            className="w-full p-2 mt-4 border border-red-600 bg-black text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full p-2 mt-4 bg-red-600 text-white font-bold"
            onClick={handleLogin}
          >
            Penetrate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-red-600 min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Pussy Panel</h1>
      <form onSubmit={handleMediaSubmit} className="flex space-x-4 mb-8">
        <input
          type="text"
          placeholder="Movie Title"
          className="flex-1 p-2 border border-red-600 bg-black text-white"
          value={mediaTitle}
          onChange={(e) => setMediaTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Movie Link"
          className="flex-1 p-2 border border-red-600 bg-black text-white"
          value={mediaLink}
          onChange={(e) => setMediaLink(e.target.value)}
        />
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value as "SFW" | "NSFW")}
          className="p-2 border border-red-600 bg-black text-white"
        >
          <option value="SFW">SFW</option>
          <option value="NSFW">NSFW</option>
        </select>
        <button
          type="submit"
          className="p-2 bg-red-600 text-white font-bold hover:bg-red-700 transition-all"
        >
          Add Media
        </button>
      </form>

      <form onSubmit={handleLinkSubmit} className="flex space-x-4 mb-8">
        <input
          type="text"
          placeholder="Useful Link Title"
          className="flex-1 p-2 border border-red-600 bg-black text-white"
          value={usefulTitle}
          onChange={(e) => setUsefulTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Useful Link URL"
          className="flex-1 p-2 border border-red-600 bg-black text-white"
          value={usefulLink}
          onChange={(e) => setUsefulLink(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 bg-red-600 text-white font-bold hover:bg-red-700 transition-all"
        >
          Add Useful Link
        </button>
      </form>

      <h2 className="text-3xl font-bold mb-4">Media List</h2>
      <ul>
        {mediaList.map((media) => (
          <li key={media._id} className="flex justify-between items-center mb-2">
            <span>{media.title} - {media.link}</span>
            <div>
              <button onClick={() => handleEditMedia(media)} className="text-blue-500">Edit</button>
              <button onClick={() => handleDeleteMedia(media._id)} className="text-red-500 ml-2">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-3xl font-bold mb-4">Useful Links</h2>
      <ul>
        {linkList.map((link) => (
          <li key={link._id} className="flex justify-between items-center mb-2">
            <span>{link.title} - {link.link}</span>
            <div>
              <button onClick={() => handleEditLink(link)} className="text-blue-500">Edit</button>
              <button onClick={() => handleDeleteLink(link._id)} className="text-red-500 ml-2">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            {editingMedia ? (
              <form onSubmit={handleUpdateMedia}>
                <h3 className="text-xl font-bold mb-2">Edit Media</h3>
                <input
                  type="text"
                  value={editingMedia.title}
                  onChange={(e) => setEditingMedia({ ...editingMedia, title: e.target.value })}
                  className="w-full p-2 border border-gray-300"
                />
                <input
                  type="text"
                  value={editingMedia.link}
                  onChange={(e) => setEditingMedia({ ...editingMedia, link: e.target.value })}
                  className="w-full p-2 border border-gray-300 mt-2"
                />
                <select
                  value={editingMedia.type}
                  onChange={(e) => setEditingMedia({ ...editingMedia, type: e.target.value as "SFW" | "NSFW" })}
                  className="w-full p-2 border border-gray-300 mt-2"
                >
                  <option value="SFW">SFW</option>
                  <option value="NSFW">NSFW</option>
                </select>
                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">Update</button>
                <button type="button" onClick={() => setShowEditPopup(false)} className="mt-4 p-2 bg-red-500 text-white ml-2">Cancel</button>
              </form>
            ) : (
              <form onSubmit={handleUpdateLink}>
                <h3 className="text-xl font-bold mb-2">Edit Link</h3>
                <input
                  type="text"
                  value={editingLink?.title || ""}
                  onChange={(e) => editingLink && setEditingLink({ ...editingLink, title: e.target.value })}
                  className="w-full p-2 border border-gray-300"
                />
                <input
                  type="text"
                  value={editingLink?.link || ""}
                  onChange={(e) => editingLink && setEditingLink({ ...editingLink, link: e.target.value })}
                  className="w-full p-2 border border-gray-300 mt-2"
                />
                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">Update</button>
                <button type="button" onClick={() => setShowEditPopup(false)} className="mt-4 p-2 bg-red-500 text-white ml-2">Cancel</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
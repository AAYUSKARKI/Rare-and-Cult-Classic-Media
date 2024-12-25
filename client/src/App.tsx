import { useState, useEffect } from "react";
import axios from "axios";

interface Media {
  id: number;
  title: string;
  link: string;
  type: "SFW" | "NSFW";
}

const App = () => {
  const [media, setMedia] = useState<Media[]>([
    { id: 1, title: "Inception", link: "https://example.com/inception", type: "SFW" },
    { id: 2, title: "The Matrix", link: "https://example.com/matrix", type: "SFW" },
    { id: 3, title: "Fight Club", link: "https://example.com/fightclub", type: "NSFW" },
    { id: 4, title: "Pulp Fiction", link: "https://example.com/pulpfiction", type: "NSFW" },
  ]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/media")
      // .then((res) => setMedia(res.data))
      .catch(() => {
        console.log("Failed to fetch media data from API. Using dummy data instead.");
      });
  }, []);

  const filteredMedia = media.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-center mb-10">
        Rare and Cult Classic Media
      </h1>
      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search for media..."
          className="w-full p-4 border border-gray-600 bg-gray-800 text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search && (
        <div className="w-full max-w-md mb-6">
          <h2 className="text-3xl font-bold text-red-400 mb-2">Search Results:</h2>
          {filteredMedia.length > 0 ? (
            filteredMedia.map((item) => (
              <div key={item.id} className="p-2">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-lg hover:text-red-300 transition duration-200">
                  {item.title}
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No results found.</p>
          )}
        </div>
      )}
      <div className="w-full max-w-md">
        {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
          <div key={letter} className="mb-6">
            <h2 className="text-3xl font-bold text-red-400">{letter}</h2>
            {filteredMedia
              .filter((item) => item.title.startsWith(letter))
              .map((item) => (
                <div key={item.id} className="p-2">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-lg hover:text-red-300 transition duration-200">
                    {item.title}
                  </a>
                </div>
              ))}
          </div>
        ))}
      </div>
      <footer className="text-center mt-10">
        <p className="text-gray-400">With Love: <a href="https://github.com/eyeblech" className="text-red-400 hover:underline">GitHub</a></p>
        <p className="text-gray-400">Request/Add: <a href="https://t.me/dthcore" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">Telegram</a></p>
      </footer>
    </div>
  );
};

export default App;
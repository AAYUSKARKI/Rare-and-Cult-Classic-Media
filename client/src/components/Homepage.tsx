import { useEffect, useState } from "react";
import { Search, Heart } from "lucide-react";
import axios from "axios";
import { FaGithub } from "react-icons/fa6";

interface MediaItem {
  _id: number;
  title: string;
  link: string;
  type: "SFW" | "NSFW";
}

const Homepage: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<"SFW" | "NSFW">("SFW");

  const getMedia = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/media/");
      setMedia(response.data);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  const groupedMedia = media
    .filter(
      (item) =>
        item.type === filter &&
        item.title.toLowerCase().includes(search.toLowerCase())
    )
    .reduce<Record<string, MediaItem[]>>((acc, item) => {
      const firstLetter = item.title[0].toUpperCase();
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(item);
      return acc;
    }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-red-950 text-red-600 font-serif">
      {/* Header */}
      <div className="bg-[url('/api/placeholder/1920/300')] bg-cover bg-center relative">
        <div className="backdrop-blur-sm bg-black/80 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-900/30 to-black/90"></div>
          <h1
            className="text-xl md:text-3xl lg:text-5xl mb-8 font-bold text-red-600
              [text-shadow:_0_0_15px_rgb(255_0_0_/_70%)] tracking-widest"
          >
            Rare & Cult Classic Movie/Media/Vid/Anything
          </h1>

          {/* Controls */}
          <div className="flex flex-col justify-center space-x-4 mb-6">
            {/* Filter Buttons */}
            <div className="flex space-x-4 mb-6">
              <button
  onClick={() => setFilter("SFW")}
  className={`px-6 py-2 bg-red-900 hover:bg-red-700 text-white transition-all duration-300
    ${filter === "SFW" ? "ring-2 ring-red-500 shadow-lg shadow-red-500/50" : ""}
    hover:shadow-red-500/30 hover:shadow-lg z-10`} // Add z-index here
>
  SFW
</button>
<button
  onClick={() => setFilter("NSFW")}
  className={`px-6 py-2 bg-red-900 hover:bg-red-700 text-white transition-all duration-300
    ${filter === "NSFW" ? "ring-2 ring-red-500 shadow-lg shadow-red-500/50" : ""}
    hover:shadow-red-500/30 hover:shadow-lg z-10`} // Add z-index here
>
  NSFW
</button>

            </div>

            {/* Search Bar */}
            <div className="max-w-md">
              <div className="text-sm mb-2 opacity-70">Use Ctrl+F to search within the page</div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-red-600" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 py-2 bg-black/70 border border-red-800 text-red-500 
                    placeholder:text-red-900 focus:ring-2 focus:ring-red-500 focus:border-red-500
                    transition-all duration-300 hover:bg-black/80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media List */}
      <main className="mx-auto p-6">
        {Object.keys(groupedMedia).sort().map((letter) => (
          <div key={letter} className="mb-2">
            <h2
              className="text-sm font-bold border-b border-red-800 mb-4 
                [text-shadow:_0_0_10px_rgb(255_0_0_/_70%)] text-red-500"
            >
              {letter}
            </h2>
            <div className="grid gap-4">
              {groupedMedia[letter].map((item) => (
                <a
                  key={item._id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-2 bg-gray-800/70 hover:bg-red-800/70 
                    rounded transition-all duration-300 hover:shadow-lg hover:shadow-red-800/30
                    hover:-translate-y-1"
                >
                  <span className="text-sm text-red-300">{item.title}</span>
                  <span className="text-sm text-red-300">{item.link}</span>
                  <span
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      item.type === "SFW"
                        ? "bg-green-900/70 text-green-200 shadow-green-900/50"
                        : "bg-red-900/70 text-red-200 shadow-red-900/50"
                    } shadow-sm`}
                  >
                    {item.type}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-red-800 p-8 text-center bg-black/60">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://github.com/yourusername"
            className="flex items-center hover:text-red-400 transition-colors duration-300"
          >
            <FaGithub className="mr-2" /> GitHub
          </a>
          <a
            href="https://t.me/jungali"
            className="hover:text-red-400 transition-colors duration-300"
          >
            Request/Add Media
          </a>
          <button
            className="border border-red-800 px-4 py-2 text-red-600 
              hover:bg-red-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30"
          >
            Useful Sites
          </button>
        </div>
        <div className="flex items-center justify-center text-sm">
          Made with <Heart className="mx-2 text-red-500 animate-pulse" /> by Eyebleach
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

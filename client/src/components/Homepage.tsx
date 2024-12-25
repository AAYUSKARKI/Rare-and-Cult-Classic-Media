import { useState } from "react";
import { Search, Heart } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

interface MediaItem {
  id: number;
  title: string;
  link: string;
  type: "SFW" | "NSFW";
}

const Homepage: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([
    { id: 1, title: "Inception", link: "https://example.com/inception", type: "SFW" },
    { id: 2, title: "The Matrix", link: "https://example.com/matrix", type: "SFW" },
    { id: 3, title: "Fight Club", link: "https://example.com/fightclub", type: "NSFW" },
    { id: 4, title: "Pulp Fiction", link: "https://example.com/pulpfiction", type: "NSFW" },
  ]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<"ALL" | "SFW" | "NSFW">("ALL");

  const groupedMedia = media
    .filter(item => 
      (filter === "ALL" || item.type === filter) &&
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
      <div className="bg-[url('/api/placeholder/1920/300')] bg-cover bg-center">
        <div className="backdrop-blur-sm bg-black/70 p-8">
          <h1 className="text-6xl mb-8 font-bold text-center animate-pulse 
            [text-shadow:_0_0_10px_rgb(220_38_38_/_50%)] tracking-wider">
            Rare & Cult Classic Media Archive
          </h1>
          
          {/* Left-aligned controls container */}
          <div className="max-w-4xl mx-auto">
            {/* Filter Buttons */}
            <div className="space-x-4 mb-6">
              <button 
                onClick={() => setFilter("ALL")}
                className={`px-6 py-2 bg-red-900/80 hover:bg-red-700 text-white transition-all duration-300
                  ${filter === "ALL" ? "ring-2 ring-red-500 shadow-lg shadow-red-500/50" : ""}
                  hover:shadow-red-500/30 hover:shadow-lg`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter("SFW")}
                className={`px-6 py-2 bg-red-900/80 hover:bg-red-700 text-white transition-all duration-300
                  ${filter === "SFW" ? "ring-2 ring-red-500 shadow-lg shadow-red-500/50" : ""}
                  hover:shadow-red-500/30 hover:shadow-lg`}
              >
                SFW
              </button>
              <button 
                onClick={() => setFilter("NSFW")}
                className={`px-6 py-2 bg-red-900/80 hover:bg-red-700 text-white transition-all duration-300
                  ${filter === "NSFW" ? "ring-2 ring-red-500 shadow-lg shadow-red-500/50" : ""}
                  hover:shadow-red-500/30 hover:shadow-lg`}
              >
                NSFW
              </button>
            </div>

            {/* Search Section */}
            <div className="max-w-md mb-4">
              <div className="text-sm mb-2 opacity-70">Use Ctrl+F to search within page</div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-red-600" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 py-2 bg-black/50 border border-red-800 text-red-500 
                    placeholder:text-red-900 focus:ring-1 focus:ring-red-500 focus:border-red-500
                    transition-all duration-300 hover:bg-black/70"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media List */}
      <main className="max-w-4xl mx-auto p-8">
        {Object.keys(groupedMedia).sort().map(letter => (
          <div key={letter} className="mb-8">
            <h2 className="text-3xl font-bold border-b border-red-800 mb-4 
              [text-shadow:_0_0_5px_rgb(220_38_38_/_50%)]">{letter}</h2>
            <div className="grid gap-4">
              {groupedMedia[letter].map(item => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-4 bg-gray-900/50 hover:bg-gray-800/70 
                    rounded transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30
                    hover:-translate-y-0.5"
                >
                  <span className="text-lg">{item.title}</span>
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    item.type === "SFW" 
                      ? "bg-green-900/70 text-green-200 shadow-green-900/50" 
                      : "bg-red-900/70 text-red-200 shadow-red-900/50"
                  } shadow-sm`}>
                    {item.type}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-red-800 p-8 text-center bg-black/50">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://github.com/yourusername" 
            className="flex items-center hover:text-red-400 transition-colors duration-300">
            <FaGithub className="mr-2" /> GitHub
          </a>
          <a href="https://t.me/jungali" 
            className="hover:text-red-400 transition-colors duration-300">
            Request/Add Media
          </a>
          <button className="border border-red-800 px-4 py-2 text-red-600 
            hover:bg-red-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30">
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
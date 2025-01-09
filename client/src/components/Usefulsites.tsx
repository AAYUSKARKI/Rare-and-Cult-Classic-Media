import React, { useState, useEffect, FC } from 'react';
import { Search } from 'lucide-react'

// Define types for the Link object
interface Link {
  _id: string;
  title: string;
  link: string;
}

// Define props for LinkCard
interface LinkCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // Add onClick prop
}

// LinkCard Component
const LinkCard: FC<LinkCardProps> = ({ children, className = '', onClick, ...props }) => {
  return (
    <div
      className={`rounded-lg cursor-pointer transition-transform duration-300 ${className}`}
      onClick={onClick} // Handle click event
      {...props}
    >
      {children}
    </div>
  );
};

const UsefulLinks: FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/usefullinks');
      if (!response.ok) {
        throw new Error('Failed to fetch useful links');
      }
      const data: Link[] = await response.json();
      setLinks(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch useful links');
      setLoading(false);
    }
  };

  const filteredLinks = links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.link.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-red-500 text-xl animate-pulse">Loading Useful Sites...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Spooky Header with blood drip effect */}
        <h1 className="text-6xl font-bold text-red-600 mb-8 text-center animate-pulse">
          Useful Sites
        </h1>

        {/* Search Bar with glowing effect */}
        <div className="relative mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your nightmare..."
            className="w-full bg-gray-800 border-2 border-red-600 text-red-500 p-4 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 shadow-lg shadow-red-500/50"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500" size={20} />
        </div>

        {/* Links Container */}
        <div className="space-y-4">
          {filteredLinks.map((link) => (
            <LinkCard
              key={link._id}
              className="bg-gray-800 border border-red-800 hover:bg-gray-700 transform transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-red-500/20" // Reduced scale size
              onClick={() => window.open(link.link, '_blank', 'noopener,noreferrer')} // Navigate on click
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
 <div className="space-y-2">
                    <h2 className="text-xl text-red-500 font-bold">
                      {link.title}
                    </h2>
                    <span className="text-gray-400 block break-all">
                      {link.link}
                    </span>
                  </div>
                  <div className="text-yellow-500 text-2xl animate-pulse ml-4 flex-shrink-0">
                    ★
                  </div>
                </div>
              </div>
            </LinkCard>
          ))}

          {filteredLinks.length === 0 && (
            <div className="text-center text-red-500 py-8 animate-pulse">
              No Useful Sites found ...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsefulLinks;
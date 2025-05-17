'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const exploreBooks = [
  {
    title: 'The White Tiger',
    author: 'Aravind Adiga',
    image: '/books/white-tiger.jpg',
    location: 'Mumbai',
    genre: 'Fiction'
  },
  {
    title: '2 States',
    author: 'Chetan Bhagat',
    image: '/books/2-states.jpg',
    location: 'Pune',
    genre: 'Romance'
  },
  {
    title: 'The Guide',
    author: 'R.K. Narayan',
    image: '/books/the-guide.jpg',
    location: 'Bangalore',
    genre: 'Classic'
  },
  {
    title: 'Train to Pakistan',
    author: 'Khushwant Singh',
    image: '/books/train-to-pakistan.jpg',
    location: 'Delhi',
    genre: 'Historical Fiction'
  },
  {
    title: 'The Immortals of Meluha',
    author: 'Amish Tripathi',
    image: '/books/immortals-of-meluha.jpg',
    location: 'Mumbai',
    genre: 'Mythology'
  },
  {
    title: 'Five Point Someone',
    author: 'Chetan Bhagat',
    image: '/books/five-point-someone.jpg',
    location: 'Delhi',
    genre: 'Fiction'
  },
  {
    title: 'The God of Small Things',
    author: 'Arundhati Roy',
    image: '/books/god-of-small-things.jpg',
    location: 'Chennai',
    genre: 'Literary Fiction'
  },
  {
    title: 'Midnight\'s Children',
    author: 'Salman Rushdie',
    image: '/books/midnights-children.jpg',
    location: 'Mumbai',
    genre: 'Magical Realism'
  },
  {
    title: 'Palace of Illusions',
    author: 'Chitra Banerjee Divakaruni',
    image: '/books/palace-of-illusions.jpg',
    location: 'Pune',
    genre: 'Mythology'
  },
  {
    title: 'Wings of Fire',
    author: 'A.P.J. Abdul Kalam',
    image: '/books/wings-of-fire.jpg',
    location: 'Chennai',
    genre: 'Biography'
  },
  {
    title: 'The Room on the Roof',
    author: 'Ruskin Bond',
    image: '/books/room-on-the-roof.jpg',
    location: 'Delhi',
    genre: 'Young Adult'
  },
  {
    title: 'Sacred Games',
    author: 'Vikram Chandra',
    image: '/books/sacred-games.jpg',
    location: 'Mumbai',
    genre: 'Crime'
  }
];

const genres = [...new Set(exploreBooks.map(book => book.genre))];
const locations = [...new Set(exploreBooks.map(book => book.location))];

export default function ExplorePage() {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      setIsLoggedIn(true);
      setLoading(false);
    }
  }, []);

  // Don't render anything while checking authentication
  if (loading || !isLoggedIn) {
    return null;
  }

  const filteredBooks = exploreBooks.filter(book => {
    const matchesGenre = !selectedGenre || book.genre === selectedGenre;
    const matchesLocation = !selectedLocation || book.location === selectedLocation;
    const matchesSearch = !searchTerm || 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesLocation && matchesSearch;
  });

  const handleRequest = () => {
    setMessageText('Feature coming soon! Stay tuned! 🚀');
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Explore Books</h1>
          <p className="text-lg opacity-90">Discover amazing books from readers around you</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredBooks.map((book, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate" title={book.title}>
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2" title={book.author}>
                  by {book.author}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-600 dark:text-blue-400">{book.genre}</span>
                  <span className="text-gray-500 dark:text-gray-400">{book.location}</span>
                </div>
                <button
                  onClick={handleRequest}
                  className="mt-3 w-full px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md
                           hover:bg-blue-700 transition-colors duration-200"
                >
                  Request Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message Toast */}
        {showMessage && (
          <div className="fixed bottom-4 right-4 bg-black text-white px-6 py-3 rounded-lg shadow-lg
                        animate-fade-in-up">
            {messageText}
          </div>
        )}

        {/* No Results Message */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No books found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';

const indianBooks = [
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
  }
];

export default function Home() {
  const router = useRouter();

  const handleNavigation = (path) => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      router.push(path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 px-6 sm:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-6">
            Welcome to BookBuddy 📚
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with book lovers in your city and discover amazing reads
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => handleNavigation('/explore')}
              className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-200"
            >
              Explore Books
            </button>
            <button 
              onClick={() => handleNavigation('/add-book')}
              className="bg-purple-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-purple-700 transform hover:-translate-y-1 transition-all duration-200"
            >
              Share a Book
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          Featured Books Near You
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {indianBooks.map((book, i) => (
            <div
              key={i}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {book.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">by {book.author}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {book.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

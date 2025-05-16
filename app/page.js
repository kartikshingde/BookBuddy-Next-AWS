import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-100 to-white dark:from-blue-900 dark:to-gray-800 text-center py-20 px-6 sm:px-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-5">
          Welcome to BookBuddy 📚
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Exchange books with people nearby and discover new reads.
        </p>
        <Link href="/explore">
          <button className="bg-blue-600 dark:bg-blue-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition">
            Explore Books
          </button>
        </Link>
      </section>

      {/* Featured Section */}
      <section className="max-w-6xl mx-auto px-4 py-14 sm:py-20">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900 dark:text-gray-100">
          Featured Books
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {['Atomic Habits', 'The Alchemist', 'Deep Work'].map((title, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={`https://covers.openlibrary.org/b/id/10${i + 1}00000-L.jpg`}
                alt={title}
                className="h-56 w-full object-cover rounded-md mb-5"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">by Sample Author</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

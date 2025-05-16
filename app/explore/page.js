import BookCard from '../components/BookCard';

const mockBooks = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    condition: 'Like New',
    location: 'Pune',
    image: 'https://covers.openlibrary.org/b/id/10958365-L.jpg',
  },
  {
    id: 2,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    condition: 'Used',
    location: 'Kothrud',
    image: 'https://covers.openlibrary.org/b/id/11112501-L.jpg',
  },
  {
    id: 3,
    title: 'Deep Work',
    author: 'Cal Newport',
    genre: 'Productivity',
    condition: 'New',
    location: 'Baner',
    image: 'https://covers.openlibrary.org/b/id/10584665-L.jpg',
  },
];

export default function ExplorePage() {
  return (
    <div className="mt-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">Explore Available Books</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {mockBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

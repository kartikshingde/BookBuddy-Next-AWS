export default function BookCard({ book }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full sm:w-[300px]">
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-bold">{book.title}</h2>
      <p className="text-sm text-gray-600">{book.author}</p>

      <div className="flex flex-wrap gap-2 mt-2">
        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{book.genre}</span>
        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">{book.condition}</span>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        📍 {book.location}
      </p>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Request Book
      </button>
    </div>
  );
}

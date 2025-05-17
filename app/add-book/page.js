'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../components/Modal';

export default function AddBookPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    condition: '',
    location: '',
    image: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      setIsLoggedIn(true);
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setBook({ ...book, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book.image) {
      alert("Please select an image.");
      return;
    }

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setBook({ title: '', author: '', genre: '', condition: '', location: '', image: '' });
      setImagePreview(null);
    }, 3000);
  };

  // Don't render anything while checking authentication
  if (loading || !isLoggedIn) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 text-center mb-6">Add a New Book</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {['title', 'author', 'genre', 'condition', 'location'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={book[field]}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-shadow duration-300 shadow-sm hover:shadow-md"
          />
        ))}

        {/* File Upload */}
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-40
                     border-2 border-dashed border-gray-300 dark:border-gray-600
                     rounded cursor-pointer
                     bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400
                     hover:border-blue-500 hover:text-blue-600
                     transition-colors duration-300 shadow-sm hover:shadow-md
                     focus-within:ring-2 focus-within:ring-blue-500 relative overflow-hidden"
        >
          {!imagePreview && (
            <>
              <svg
                className="w-10 h-10 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16v4h10v-4M12 12v8m-6-8l6-6 6 6" />
              </svg>
              <span>Click or drag and drop to upload image</span>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </>
          )}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-full w-full object-contain rounded"
              onClick={() => {
                setImagePreview(null);
                setBook({ ...book, image: '' });
              }}
              title="Click to remove image"
            />
          )}
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded
                     shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          Submit Book
        </button>
      </form>

      {/* Coming Soon Message */}
      {showMessage && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-6 py-3 rounded-lg shadow-lg
                      animate-fade-in-up">
          Feature coming soon! Stay tuned! 🚀
        </div>
      )}
    </div>
  );
}

'use client';
import { useState } from 'react';
import Modal from '../components/Modal';

export default function AddBookPage() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    condition: '',
    location: '',
    image: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

    try {
      // 1. Get presigned S3 URL
      const uploadUrlRes = await fetch("https://b4diorui5a.execute-api.eu-north-1.amazonaws.com/getUploadUrl");
      const { uploadUrl } = await uploadUrlRes.json();

      // 2. Upload image to S3
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          "Content-Type": book.image.type,
        },
        body: book.image,
      });

      // 3. Get final image URL (remove query params)
      const imageUrl = uploadUrl.split('?')[0];

      // 4. Save book metadata with image URL to DynamoDB
      const metadata = {
        title: book.title,
        author: book.author,
        genre: book.genre,
        condition: book.condition,
        location: book.location,
        imageUrl,
      };

      const res = await fetch("https://b4diorui5a.execute-api.eu-north-1.amazonaws.com/addBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(metadata)
      });

      if (!res.ok) throw new Error("Failed to save book metadata");

      setModalOpen(true);
      setBook({ title: '', author: '', genre: '', condition: '', location: '', image: '' });
      setImagePreview(null);
    } catch (err) {
      console.error("Error submitting book:", err);
      alert("Failed to upload book. Please try again.");
    }
  };

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
                       transition-shadow duration-300
                       shadow-sm hover:shadow-md"
          />
        ))}

        {/* Custom Styled File Upload */}
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-40
                     border-2 border-dashed border-gray-300 dark:border-gray-600
                     rounded cursor-pointer
                     bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400
                     hover:border-blue-500 hover:text-blue-600
                     transition-colors duration-300
                     shadow-sm hover:shadow-md
                     focus-within:ring-2 focus-within:ring-blue-500
                     relative overflow-hidden"
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
                // Optional: click preview to clear image
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
                     shadow-md hover:shadow-lg
                     transition-shadow duration-300"
        >
          Submit Book
        </button>
      </form>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Success!">
        <p>Your book was submitted successfully.</p>
      </Modal>
    </div>
  );
}

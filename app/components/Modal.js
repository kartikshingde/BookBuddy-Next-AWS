'use client';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6
                      text-gray-900 dark:text-gray-100
                      transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div>{children}</div>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded
                     hover:bg-blue-700 dark:hover:bg-blue-600
                     transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';

const initialRequests = [
  { id: 1, book: 'Atomic Habits', user: 'Amit', status: 'Pending' },
  { id: 2, book: 'The Alchemist', user: 'Sneha', status: 'Pending' },
];

export default function RequestsPage() {
  const [requests, setRequests] = useState(initialRequests);

  const handleUpdate = (id, action) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: action === 'accept' ? 'Accepted' : 'Rejected' } : r
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Your Book Requests</h1>
      <ul className="space-y-4">
        {requests.map((req) => (
          <li key={req.id} className="border p-4 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <p><strong>Book:</strong> {req.book}</p>
              <p><strong>User:</strong> {req.user}</p>
              <p className="text-sm">
                <strong>Status:</strong>{' '}
                <span
                  className={
                    req.status === 'Accepted'
                      ? 'text-green-600'
                      : req.status === 'Rejected'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }
                >
                  {req.status}
                </span>
              </p>
            </div>
            {req.status === 'Pending' && (
              <div className="mt-3 sm:mt-0 sm:ml-4 flex gap-2">
                <button
                  onClick={() => handleUpdate(req.id, 'accept')}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleUpdate(req.id, 'reject')}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

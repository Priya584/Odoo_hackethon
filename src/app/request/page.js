'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

export default function ReceivedRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('/api/get-received-requests');
        const result = await res.json();

        if (result.success) {
          setRequests(result.data);
        } else {
          console.warn(result.message);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5EFEB]">
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold text-[#2F4156] mb-6 text-center">
          Received Requests
        </h1>

        {loading ? (
          <p className="text-center text-[#2F4156]">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-[#2F4156]">No requests received yet.</p>
        ) : (
          requests.map((req, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#C8D9E6] rounded-lg shadow-md p-6 mb-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-[#2F4156]">
                    Request from: {req.senderName}
                  </h2>
                  <p className="text-sm text-[#567C8D] mt-1">
                    Message: {req.message || 'No message provided'}
                  </p>
                </div>
                <span className="text-sm text-[#2F4156]">
                  {new Date(req.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

export default function SkillMatch() {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch('/api/get-profile');
        const result = await res.json();

        if (result.success) {
          setProfiles(result.data);
          setFilteredProfiles(result.data);
        } else {
          console.warn(result.message);
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const applyFilters = () => {
    const lowerSearch = searchTerm.toLowerCase();

    const filtered = profiles.filter((profile) => {
      const skills = [...(profile.skillsOffered || []), ...(profile.skillsWanted || [])].map(
        (skill) => skill.toLowerCase()
      );

      const matchesSkill = lowerSearch === '' || skills.some((skill) => skill.includes(lowerSearch));
      const matchesAvailability = availability === '' || profile.availability === availability;

      return matchesSkill && matchesAvailability;
    });

    setFilteredProfiles(filtered);
  };

  const sendRequest = async (receiverId, receiverName) => {
    try {
      const res = await fetch('/api/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId, receiverName }),
      });

      const result = await res.json();
      if (result.success) {
        alert('Request sent successfully!');
      } else {
        alert(result.message || 'Failed to send request.');
      }
    } catch (err) {
      console.error('Request Error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFEB]">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="border border-[#C8D9E6] bg-white px-4 py-2 rounded shadow-sm text-[#2F4156]"
          >
            <option value="">Availability</option>
            <option value="Weekends">Weekends</option>
            <option value="Evenings">Evenings</option>
            <option value="Weekdays">Weekdays</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-[#C8D9E6] px-4 py-2 rounded w-64 shadow-sm"
            />
            <button
              onClick={applyFilters}
              className="bg-[#2F4156] text-white px-4 py-2 rounded hover:bg-[#567C8D]"
            >
              Search
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-[#2F4156]">Loading profiles...</p>
        ) : filteredProfiles.length === 0 ? (
          <p className="text-center text-[#2F4156]">No profiles found.</p>
        ) : (
          filteredProfiles.map((user, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md mb-6 border border-[#C8D9E6] flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                {user.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={user.fullName || 'User'}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#C8D9E6] flex items-center justify-center text-white font-bold">
                    {user.fullName?.[0] || 'U'}
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold text-[#2F4156]">{user.fullName}</h2>
                  <p className="text-sm text-[#567C8D] mt-1">
                    Availability: {user.availability || 'Not specified'}
                  </p>
                  <div className="mt-2">
                    <p className="text-[#2F4156] font-medium">
                      Skills Offered:{' '}
                      {user.skillsOffered?.map((skill, i) => (
                        <span
                          key={i}
                          className="inline-block bg-[#C8D9E6] text-[#2F4156] px-2 py-1 text-sm rounded-full mr-2 mt-1"
                        >
                          {skill}
                        </span>
                      ))}
                    </p>
                    <p className="text-[#2F4156] font-medium mt-1">
                      Skills Wanted:{' '}
                      {user.skillsWanted?.map((skill, i) => (
                        <span
                          key={i}
                          className="inline-block bg-[#F5EFEB] border border-[#567C8D] text-[#2F4156] px-2 py-1 text-sm rounded-full mr-2 mt-1"
                        >
                          {skill}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[#2F4156] text-sm mb-2">Rating: {user.rating || '0.0'}/5</p>
                <button
                  className="bg-[#567C8D] text-white px-4 py-2 rounded hover:bg-[#2F4156] transition"
                  onClick={() => sendRequest(user._id, user.fullName)}
                >
                  Request
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [usage, setUsage] = useState(0);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const res = await axios.get('https://optixdb-backend.onrender.com/api/file/files', {
          withCredentials: true,
        });
        const totalSize = res.data.reduce((sum, file) => sum + file.size, 0);
        setUsage(totalSize);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsage();
  }, [user.token]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Plan:</strong> Free (100MB/month)</p>
      <p><strong>Usage:</strong> {(usage / 1024 / 1024).toFixed(2)} MB / 100 MB</p>
    </div>
  );
}

export default Profile;
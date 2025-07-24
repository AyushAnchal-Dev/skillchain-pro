import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://skillchain-pro-backend.onrender.com';

const RecruiterDashboard = () => {
  const [challenges, setChallenges] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    deadline: '',
    reward: '',
    tags: '',
  });

  useEffect(() => {
    fetchChallenges();
    fetchSubmissions();
  }, []);

  const fetchChallenges = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/recruiter/challenges`);
      setChallenges(res.data);
    } catch (err) {
      console.error('Error fetching challenges:', err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/student/submissions`);
      setSubmissions(res.data);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    }
  };

  const handlePost = async () => {
    if (!form.title || !form.description) return;

    try {
      await axios.post(`${BASE_URL}/api/recruiter/post-challenge`, {
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim()),
      });
      setForm({ title: '', description: '', deadline: '', reward: '', tags: '' });
      fetchChallenges();
    } catch (err) {
      console.error('Error posting challenge:', err);
    }
  };

  const handleStatus = async (submissionIndex, status) => {
    try {
      await axios.post(`${BASE_URL}/api/student/update-status`, {
        submissionIndex,
        status,
      });
      fetchSubmissions();
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Recruiter Dashboard</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Post a New Challenge</h2>
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Title"
            className="bg-gray-700 p-3 rounded text-white"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="bg-gray-700 p-3 rounded text-white"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="date"
            className="bg-gray-700 p-3 rounded text-white"
            value={form.deadline}
            onChange={e => setForm({ ...form, deadline: e.target.value })}
          />
          <input
            type="text"
            placeholder="Reward"
            className="bg-gray-700 p-3 rounded text-white"
            value={form.reward}
            onChange={e => setForm({ ...form, reward: e.target.value })}
          />
          <input
            type="text"
            placeholder="Skill Tags (comma-separated)"
            className="bg-gray-700 p-3 rounded text-white"
            value={form.tags}
            onChange={e => setForm({ ...form, tags: e.target.value })}
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            onClick={handlePost}
          >
            Post Challenge
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Submissions</h2>
      <ul className="space-y-4">
        {submissions.map((sub, i) => (
          <li
            key={i}
            className="border border-gray-700 p-4 rounded bg-gray-800"
          >
            <p><b>Challenge ID:</b> {sub.challengeId}</p>
            <p><b>Solution:</b> {sub.solution}</p>
            <p><b>Status:</b> {sub.status}</p>
            <button
              className="mt-2 mr-2 bg-green-600 px-3 py-1 rounded"
              onClick={() => handleStatus(i, 'Approved')}
            >
              Accept
            </button>
            <button
              className="mt-2 bg-red-600 px-3 py-1 rounded"
              onClick={() => handleStatus(i, 'Rejected')}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecruiterDashboard;
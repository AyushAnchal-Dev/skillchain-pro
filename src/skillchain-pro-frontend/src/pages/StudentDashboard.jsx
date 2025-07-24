import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://skillchain-pro-backend.onrender.com'; // ✅ LIVE BACKEND

const StudentDashboard = () => {
  const [challenges, setChallenges] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [solutions, setSolutions] = useState({});

  useEffect(() => {
    fetch(`${BASE_URL}/api/recruiter/challenges`)
      .then(res => res.json())
      .then(data => setChallenges(data))
      .catch(err => console.error('Error fetching challenges:', err));

    fetch(`${BASE_URL}/api/student/submissions`)
      .then(res => res.json())
      .then(data => setSubmissions(data))
      .catch(err => console.error('Error fetching submissions:', err));
  }, []);

  const handleSubmit = (challengeId) => {
    const solution = solutions[challengeId];
    if (!solution) return;

    const challenge = challenges.find(ch => ch.id === challengeId);
    if (!challenge) return;

    const submissionData = {
      challengeId,
      solution,
      submittedAt: new Date().toISOString(),
      studentName: "StudentX", // 🔁 Replace with real student name if available
      challengeTitle: challenge.title
    };

    fetch(`${BASE_URL}/api/student/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.submission) {
          setSubmissions([...submissions, data.submission]);
        }
        setSolutions(prev => ({ ...prev, [challengeId]: '' }));
      })
      .catch(err => console.error('Error submitting solution:', err));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Available Challenges</h2>
        {challenges.length === 0 && <p>Loading challenges...</p>}
        {challenges.map((ch) => (
          <div key={ch.id} className="bg-gray-800 border border-gray-700 p-5 mb-4 rounded">
            <h3 className="font-bold text-lg">{ch.title}</h3>
            <p>{ch.description}</p>
            <p><b>Deadline:</b> {ch.deadline}</p>
            <p><b>Reward:</b> {ch.reward}</p>
            <p><b>Tags:</b> {Array.isArray(ch.tags) ? ch.tags.join(', ') : ch.tags}</p>

            <textarea
              className="bg-gray-700 text-white p-2 mt-3 w-full rounded"
              placeholder="Paste your solution (URL or description)"
              value={solutions[ch.id] || ''}
              onChange={e =>
                setSolutions(prev => ({ ...prev, [ch.id]: e.target.value }))
              }
            />
            <button
              className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
              onClick={() => handleSubmit(ch.id)}
            >
              Submit
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Your Submissions</h2>
        {submissions.length === 0 && <p>No submissions yet.</p>}
        {submissions.map((sub, idx) => (
          <div key={idx} className="bg-gray-800 border p-3 mb-3 rounded">
            <p><b>Challenge ID:</b> {sub.challengeId}</p>
            <p><b>Your Work:</b> {sub.solution}</p>
            <p><b>Status:</b> {sub.status || "Pending"}</p>
            <p><b>Submitted At:</b> {new Date(sub.submittedAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VerifierDashboard = () => {
  const [pending, setPending] = useState([]);
  const [verified, setVerified] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('https://skillchain-pro-backend.onrender.com/api/verifier/pending')
      .then(res => setPending(res.data))
      .catch(err => console.error('Error fetching pending verifications:', err));

    axios
      .get('https://skillchain-pro-backend.onrender.com/api/verifier/nfts')
      .then(res => setVerified(res.data))
      .catch(err => console.error('Error fetching verified:', err));
  };

  const handleVerify = async (item) => {
    try {
      const res = await fetch('https://skillchain-pro-backend.onrender.com/api/verifier/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Error: ${data.error || 'Something went wrong'}`);
        return;
      }

      alert('✅ Verified and NFT minted!');
      console.log('Minted NFT:', data.item);
      fetchData(); // Refresh
    } catch (err) {
      console.error('Error during verification:', err);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Verifier Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pending Verifications</h2>
        {pending.length === 0 ? (
          <p className="text-gray-400">No pending submissions.</p>
        ) : (
          pending.map((item) => (
            <div key={item._id} className="bg-gray-800 border p-4 mb-4 rounded">
              <p><b>Student:</b> {item.student}</p>
              <p><b>Challenge:</b> {item.challenge}</p>
              <p><b>Solution:</b> <a href={item.solution} className="text-blue-400 underline" target="_blank" rel="noreferrer">View Work</a></p>
              <button
                className="mt-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
                onClick={() => handleVerify(item)}
              >
                ✅ Approve & Mint NFT
              </button>
            </div>
          ))
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Verified Submissions</h2>
        {verified.length === 0 ? (
          <p className="text-gray-400">No submissions verified yet.</p>
        ) : (
          verified.map((item, i) => (
            <div key={i} className="bg-gray-800 border p-4 mb-2 rounded">
              ✅ <b>{item.student}</b>'s submission for <b>{item.challenge}</b> verified.
              <Link to={`/nft/${item._id}`} className="text-blue-400 underline ml-2">View NFT</Link>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default VerifierDashboard;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NFTViewer = () => {
  const { id } = useParams();
  const [nft, setNft] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://skillchain-backend.onrender.com/api/verifier/nft/${id}`)
      .then(res => setNft(res.data))
      .catch(err => {
        console.error('❌ Backend failed, loading mock data...');
        // ✅ MOCK DATA for demo
        setNft({
          challenge: "Create a KarmaPass website",
          student: "StudentX",
          verifier: "VerifierX",
          nftLink: "https://icp.network/nft/1753322826494"
        });
      });
  }, [id]);

  if (!nft) return <p className="text-white p-6">Loading NFT data...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">NFT Details</h1>
      <div className="bg-gray-800 border border-gray-700 p-5 rounded shadow">
        <h2 className="text-xl font-semibold">{nft.challenge}</h2>
        <p><b>Student:</b> {nft.student}</p>
        <p><b>Verified by:</b> {nft.verifier}</p>
        <a href={nft.nftLink} className="text-blue-400 underline" target="_blank" rel="noreferrer">
          View on ICP
        </a>
      </div>
    </div>
  );
};

export default NFTViewer;
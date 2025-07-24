import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
      >
        <source src="/demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white bg-black bg-opacity-50 px-4 py-16">
        <h1 className="text-6xl font-extrabold text-center mb-6 drop-shadow-md">
          SkillChain Pro
        </h1>
        <p className="text-lg text-center text-gray-300 max-w-2xl mb-10">
          A Global Trust Layer for Verified Skills — powered by ICP Blockchain
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/recruiter"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg text-lg transition-all"
          >
            I'm a Recruiter
          </Link>
          <Link
            to="/student"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg shadow-lg text-lg transition-all"
          >
            I'm a Student
          </Link>
          <Link
            to="/verifier"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-lg text-lg transition-all"
          >
            I'm a Verifier
          </Link>
        </div>

        <footer className="text-sm text-gray-400 mt-16 text-center">
          © 2025 SkillChain Pro | Powered by Blockchain Trust
        </footer>
      </div>
    </div>
  );
}
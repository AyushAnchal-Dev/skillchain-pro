# ⚡ SkillChain Pro – A Global Trust Layer for Verified Skills

> Real Proof, Not Just a Resume.

SkillChain Pro is a blockchain-based skill verification platform that connects recruiters, students, and verifiers through challenge-based proof-of-work. Built on the Internet Computer Protocol (ICP), it mints NFTs as verifiable credentials after successful skill demonstration.

---

## 🔗 Live Demo

- 💻 Frontend (Local): http://localhost:3000
- 📦 Backend API: https://skillchain-pro-backend.onrender.com ( deployed Render URL)

---

## 🎯 Key Features

### 👩‍💼 Recruiter Panel
- Post challenges with title, description, deadline, reward & skill tags
- View student submissions
- Accept/Reject responses

### 👨‍🎓 Student Panel
- View & attempt open challenges
- Submit solution (text/file/video)
- See issued skill NFTs on profile page

### ✅ Verifier Panel (or auto-verify)
- Review submitted work
- Validate work
- Trigger NFT minting on ICP blockchain

### 🧾 NFT Viewer
- Show skill name, challenge info, student, and verifier name
- "View on ICP" link to NFT

---

## 🧠 Tech Stack

| Layer         | Tech                                   |
|---------------|----------------------------------------|
| Frontend      | React + Tailwind CSS + Vite            |
| Backend       | Node.js + Express                      |
| Blockchain    | Internet Computer Protocol (ICP)       |
| Smart Contract| Motoko                                 |
| Hosting       | YouTube (for challenge videos)         |

---

## ⚙️ Getting Started (Local Setup)

### 📁 Prerequisites

- Node.js, npm
- DFX SDK for ICP


### 📦 Install Frontend

```bash
cd src/skillchain-pro-frontend
npm install
npm run dev
----
🚀 Start Backend

cd src/backend
npm install
node server.js

🔗 Deploy Smart Contract (ICP)
cd  skillchain-pro
dfx start --background
dfx deploy


---
📡 API Routes (Backend)

Endpoint	Method	Description

/api/challenges	GET	Get all challenges
/api/challenges	POST	Create new challenge
/api/submissions	POST	Submit challenge solution
/api/submissions/:id/verify	POST	Verify and mint NFT

---

🧾 NFT Format

Each NFT includes:

Skill Name

Challenge Title

Student Wallet Address

Verifier Name

ICP Mint URL: View NFT on ICP

---
💼 For Recruiters / Judges

You can verify any candidate’s skills by visiting their public profile and viewing NFT-verified challenges. This proves actual work, not just a degree or uploaded resume.

> “Don't trust resumes. Trust Skill NFTs minted on ICP.”

---
📬 Contact Us

For any queries, collaboration, or feedback, feel free to reach out:

📧 Email: abhardwaj8507@gmail.com

🔗 LinkedIn: https://www.linkedin.com/in/ayush-anchal-04117028a
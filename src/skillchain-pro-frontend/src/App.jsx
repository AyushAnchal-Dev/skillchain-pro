
import { HashRouter as Router,Routes,Route } from 'react-router-dom'; 

import LandingPage from './pages/LandingPage';
import RecruiterDashboard from './pages/RecruiterDashboard';
import StudentDashboard from './pages/StudentDashboard';
import VerifierDashboard from './pages/VerifierDashboard';
import NFTViewer from './pages/NFTViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/verifier" element={<VerifierDashboard />} />
        <Route path="/nft/:id" element={<NFTViewer />} />
      </Routes>
    </Router>
  );
}
export default App;
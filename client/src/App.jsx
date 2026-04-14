import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Discover from './pages/Discover';
import AIMentor from './pages/AIMentor';
import Intelligence from './pages/Intelligence';
import ResumeBuilder from './pages/ResumeBuilder';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExtraFeatures from './pages/ExtraFeatures';
import StudentIntelligence from './pages/StudentIntelligence';
import Job from './pages/Job';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="bg-slate-950 text-white min-h-screen overflow-x-hidden flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/mentor" element={<AIMentor />} />
            <Route path="/intelligence" element={<Intelligence />} />
            <Route path="/student-intelligence" element={<StudentIntelligence />} />
            <Route path="/resume" element={<ResumeBuilder />} />
            <Route path="/job" element={<Job />} />
            <Route path="/extra" element={<ExtraFeatures />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

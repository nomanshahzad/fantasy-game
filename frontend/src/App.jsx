import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import MyTeam from './pages/MyTeam';

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-900 px-6 py-4 flex gap-6 border-b border-gray-700">
        <Link to="/" className="text-white hover:text-green-400 font-medium">Home</Link>
        <Link to="/my-team" className="text-white hover:text-green-400 font-medium">My Team</Link>
        <Link to="/leaderboard" className="text-white hover:text-green-400 font-medium">Leaderboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-team" element={<MyTeam />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

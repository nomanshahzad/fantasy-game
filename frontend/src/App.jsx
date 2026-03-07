import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import MyTeam from './pages/MyTeam';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '16px', background: '#1a1a2e', display: 'flex', gap: '24px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/my-team" style={{ color: 'white', textDecoration: 'none' }}>My Team</Link>
        <Link to="/leaderboard" style={{ color: 'white', textDecoration: 'none' }}>Leaderboard</Link>
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

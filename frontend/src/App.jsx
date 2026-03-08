import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import MyTeam from './pages/MyTeam';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function Navbar() {
  const { user, signout } = useAuth();

  const handleSignout = () => {
    signout();
    toast.success('Signed out successfully');
  };

  return (
    <nav className="bg-gray-900 px-6 py-4 flex items-center justify-between border-b border-gray-700">
      <span className="text-green-400 font-bold text-lg">Fantasy Cricket</span>
      <div className="flex gap-6 items-center">
        {user ? (
          <>
            <Link to="/" className="text-white hover:text-green-400 font-medium">Home</Link>
            <Link to="/my-team" className="text-white hover:text-green-400 font-medium">My Team</Link>
            <Link to="/leaderboard" className="text-white hover:text-green-400 font-medium">Leaderboard</Link>
            <button onClick={handleSignout} className="text-red-400 hover:text-red-300 font-medium">Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-green-400 font-medium">Login</Link>
            <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' },
            success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/my-team" element={<ProtectedRoute><MyTeam /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

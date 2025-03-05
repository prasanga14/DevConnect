import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import OtpVerification from './pages/OtpVerification';
import Github from './pages/Github';
import RoomHome from './pages/RoomHome';
import EditorPage from './pages/EditorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/room" element={<RoomHome />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
          <Route path="/check-repo" element={<Github />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

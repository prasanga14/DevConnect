import { useNavigate } from 'react-router-dom';

const LandingNavbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <nav className="flex w-full justify-between items-center p-4">
      <ul>
        <li className="font-extrabold text-2xl text-primary">
          <a className="p-5" href="/">
            DevConnect
          </a>
        </li>
      </ul>
      <div className="flex space-x-4">
        <button
          className="p-2 bg-primary text-white rounded cursor-pointer"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="p-2 bg-primary text-white rounded cursor-pointer"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default LandingNavbar;

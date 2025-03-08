import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BASE_URL } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${BASE_URL}/api/user/login`, {
        email,
        password,
      });
      console.log(response);

      if (response.status === 200) {
        toast.success('Login sucessfull');

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('loggedUserId', response.data.loggedUserId);
        localStorage.setItem(
          'isLoggedUserVerified',
          response.data.isLoggedUserVerified
        );

        if (response.data.isLoggedUserVerified) {
          navigate('/dashboard');
        } else {
          navigate('/otp-verification');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <form className="flex flex-col border-2 p-5 w-1/2 justify-center ">
        <h1 className=" text-4xl m-auto p-3 font-extrabold text-primary">
          Login Page
        </h1>

        <input
          className="border-1 p-2 m-2"
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-1 p-2 m-2"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className=" p-2 mt-2 border-1 w-1/2 m-auto rounded-4xl cursor-pointer font-bold bg-primary text-white"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="m-auto p-2">
          Dont have an account ?
          <a href="/register" className="text-primary font-bold">
            Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;

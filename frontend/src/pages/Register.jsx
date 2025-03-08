import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      console.log(firstname, lastname, username, email, password);
      const response = await axios.post(`${BASE_URL}/api/user/register`, {
        firstname,
        lastname,
        username,
        email,
        password,
      });
      console.log(response);
      toast.success('Account Creation Sucessfull');
      navigate('/otp-verification');
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <form className="flex flex-col border-2 p-5 w-1/2 justify-center ">
        <h1 className=" text-4xl m-auto p-3 font-extrabold text-primary">
          Registration Page
        </h1>
        <input
          className="border-1 p-2 m-2"
          type="text"
          placeholder="Enter your Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          className="border-1 p-2 m-2"
          type="text"
          placeholder="Enter your Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          className="border-1 p-2 m-2"
          type="text"
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          onClick={handleRegister}
        >
          Register
        </button>
        <div className="m-auto p-2">
          Already have an account ?
          <a href="/login" className="text-primary font-bold">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;

import React, { useState } from 'react';
import user from '../images/user.png';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/api';
import axios from 'axios';

const LoggedNavbar = () => {
  const id = localStorage.getItem('loggedUserId');

  const [username, setUsername] = useState('');
  const [isVerified, setVerified] = useState();

  const getLoggedUser = async () => {
    const loggedUser = await axios.get(`${BASE_URL}/api/user/u/${id}`);
    setUsername(loggedUser.data.username);
    setVerified(loggedUser.data.isVerified);
  };
  getLoggedUser();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="flex w-screen justify-between">
      <ul className="flex p-2 m-2">
        <li className="p-2 m-2">
          <a href="/dashboard">Home</a>
        </li>
        <li className="p-2 m-2">
          <a href="/room">Create IDE Room</a>
        </li>
        <li className="p-2 m-2">
          <a href="/dashboard">Create Video Room</a>
        </li>
        <li className="p-2 m-2">
          <a href="/check-repo">Check Github Repo</a>
        </li>
      </ul>
      <div className="userComponent mr-8">
        <div className="relative">
          <img
            onClick={() => setOpen(!open)}
            src={user}
            alt="user"
            className="h-20 w-20 object-cover border-gray-400 rounded-full cursor-pointer"
          />
          {open && (
            <div className="bg-white p-4 w-52 shadow-lg absolute -left-14 top-24 ">
              <ul>
                <li
                  onClick={() => setOpen(!open)}
                  className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100"
                >
                  {isVerified ? `${username} ✔` : 'Unverified user ❌'}
                </li>
                <li
                  onClick={() => setOpen(!open)}
                  className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100"
                >
                  Profile
                </li>
                <li
                  onClick={handleLogout}
                  className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LoggedNavbar;

import React, { useState } from 'react';
import LoggedNavbar from '../components/LoggedNavbar';
import axios from 'axios';
import { BASE_URL } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [isVerified, setVerified] = useState();

  const navigate = useNavigate();

  const id = localStorage.getItem('loggedUserId');

  const getLoggedUser = async () => {
    const loggedUser = await axios.get(`${BASE_URL}/api/user/u/${id}`);
    setUsername(loggedUser.data.username);
    setVerified(loggedUser.data.isVerified);
  };
  getLoggedUser();

  if (!isVerified) {
    navigate('/otp-verification');
  }

  return (
    <div>
      <LoggedNavbar username={username} isVerified={isVerified} />
    </div>
  );
};

export default Dashboard;

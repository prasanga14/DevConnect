import React, { useEffect, useState } from 'react';
import LoggedNavbar from '../components/LoggedNavbar';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../utils/api';

const Dashboard = () => {
  const navigate = useNavigate();

  const [loggedUser, setLoggedUser] = useState({});

  const id = localStorage.getItem('loggedUserId');

  const [username, setUsername] = useState('');
  const [isVerified, setVerified] = useState();

  useEffect(() => {
    const getLoggedUser = async () => {
      const response = await axios.get(`${BASE_URL}/api/user/u/${id}`);

      setLoggedUser(response.data);
    };
    getLoggedUser();
  }, []);

  console.log(loggedUser);
  console.log(loggedUser.isVerified);

  useEffect(() => {
    if (loggedUser.isVerified !== true) {
      toast.error('Need to verify to view dashboard');
      navigate('/otp-verification');
    }
  }, []);

  return (
    <div>
      <LoggedNavbar username={'username'} isVerified={'isVerified'} />
    </div>
  );
};

export default Dashboard;

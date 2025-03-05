import React, { useState } from 'react';
import LoggedNavbar from '../components/LoggedNavbar';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const [code, setCode] = useState('');

  const navigate = useNavigate();

  const handleVerification = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${BASE_URL}/api/user/otp-verification`,
        { code }
      );
      if (response.data.status === true) {
        toast.success('OTP verification sucessfull ');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <LoggedNavbar />
      <div className="min-h-[85vh] flex justify-center items-center overflow-hidden">
        <form className=" border-2 flex flex-col justify-center items-center p-5 rounded">
          <h1 className="font-extrabold text-xl text-primary">
            Verify OTP Here
          </h1>
          <p className="p-1 m-1 ">check registered email for the OTP</p>
          <input
            className="border-2 p-1 m-2"
            type="text"
            placeholder="Enter 6 digit OTP"
            value={code}
            maxLength={6}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            className="mt-2 bg-primary text-white rounded-xl w-1/2 cursor-pointer"
            onClick={handleVerification}
          >
            Verify
          </button>
        </form>
      </div>
    </>
  );
};

export default OtpVerification;

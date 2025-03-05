import React, { useState } from 'react';
import LoggedNavbar from '../components/LoggedNavbar';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RoomHome = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const id = uuid();
    setRoomId(id);
    toast.success('Room id generated');
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (!roomId || !username) {
      toast.error('Both the fields are required');
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: { username },
    });
    toast.success('Joined room sucessfully');
  };

  return (
    <>
      <LoggedNavbar />
      <div className=" p-5 m-5 mt-42  flex flex-col justify-evenly items-center">
        <div className="border-2 h-1/2 w-1/2 flex justify-center items-center p-5 rounded-xl">
          <form>
            <h1 className="font-extrabold text-4xl mt-2 ml-36 text-primary">
              Enter Room ID
            </h1>
            <input
              className="w-full p-2 m-2 border-1"
              type="text"
              placeholder="ROOM ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <input
              className="w-full p-2 m-2 border-1"
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="w-1/2 bg-primary text-white rounded-3xl ml-36 cursor-pointer p-2  m-2"
              onClick={joinRoom}
            >
              JOIN
            </button>
            <p className="ml-36 mt-2">
              Don't have a room ID?
              <span
                className="text-primary font-extrabold underline cursor-pointer ml-2 "
                onClick={generateRoomId}
              >
                Create Room
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RoomHome;

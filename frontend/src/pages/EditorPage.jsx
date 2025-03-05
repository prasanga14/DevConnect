import React, { useEffect, useRef, useState } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import {
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from 'react-router-dom';
import toast from 'react-hot-toast';

const EditorPage = () => {
  const [clients, setClients] = useState([]);

  const socketRef = useRef(null);
  const codeRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket(); // it establishes connection from backend

      // error handling
      socketRef.current.on('connect_error', (err) => handleError(err));
      socketRef.current.on('connect_failed', (err) => handleError(err));

      const handleError = (e) => {
        console.log('Socket error => ', e);
        toast.error('Socket connection failed');

        navigate('/dashboard');
      };

      // join event sent to server
      socketRef.current.emit('join', {
        roomId,
        username: location.state?.username,
      });
      socketRef.current.on('joined', ({ clients, username, socketId }) => {
        if (username !== location.state.username) {
          toast.success(`${username} joined`);
        }
        setClients(clients);
        socketRef.current.emit('sync-code', {
          code: codeRef.current,
          socketId,
        });
      });
      // disconnected
      socketRef.current.on('disconnected', ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off('joined');
      socketRef.current.off('disconnected');
    };
  }, []);

  if (!location.state) {
    return <Navigate to="/dashboard" />;
  }

  const handleCopyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room id copied successfully');
    } catch (error) {
      toast.error('Unable to copy room id');
    }
  };

  const handleLeaveRoom = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container-fluid h-screen">
      <div className="flex h-96">
        <div className="w-56 h-screen bg-gunmetal text-white flex flex-col">
          <p className="font-extrabold m-2 p-2">DevConnect</p>
          <hr />
          <div className="flex flex-col overflow-auto mt-6">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
          <div className="buttons flex flex-col absolute bottom-4 ml-5 p-2 m-3">
            <button
              className="bg-green m-2 w-full font-bold cursor-pointer text-gunmetal"
              onClick={handleCopyRoomId}
            >
              Copy Room Id
            </button>
            <button
              className="bg-red-600 m-2 w-full font-bold text-gunmetal cursor-pointer"
              onClick={handleLeaveRoom}
            >
              Leave Meeting
            </button>
          </div>
        </div>
        <div className="w-screen  text-light flex flex-col h-screen bg-roomBG">
          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => (codeRef.current = code)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;

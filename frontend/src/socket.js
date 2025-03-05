import { io } from 'socket.io-client';
import { BASE_URL } from './utils/api';

export const initSocket = async () => {
  const option = {
    'force new connection': true,
    reconnectionAttempt: 'infinity',
    timeout: 10000,
    transports: ['websocket'],
  };
  return io(BASE_URL, option);
};

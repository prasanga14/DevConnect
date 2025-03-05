import React from 'react';
import Avatar from '../components/Avatar';

const Client = ({ username }) => {
  return (
    <div className="flex items-center mb-3">
      <Avatar name={username.toString()} text={username[0]} size={35} />
      <span className="ml-2">{username.toString()}</span>
    </div>
  );
};

export default Client;

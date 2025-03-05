import { useEffect, useState } from 'react';
import { getAvatar } from '@simplr-sh/avatar';

function Avatar({ name, text, size = 128, rounded = 16 }) {
  const [avatarSrc, setAvatarSrc] = useState('');

  useEffect(() => {
    getAvatar({ name, text, size, rounded })
      .then(setAvatarSrc)
      .catch(console.error);
  }, [name, text, size, rounded]);

  return <img src={avatarSrc} alt={`Avatar for ${name}`} />;
}

export default Avatar;

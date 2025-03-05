import React from 'react';
import homeImage from '../images/homepage.jpg';

const LandingPageContent = () => {
  return (
    <div className="flex w-screen h-96 justify-center items-center mt-10">
      <div className="p-8 m-5">
        <div className="text-primary font-extrabold text-3xl">DevConnect,</div>
        The only interview taking platform that is optimized for quality
        interview time. We offer real time communication through video
        conference, real time shared coding IDE along with a whiteboard as well
        which helps to make interview process easier.
      </div>
      <div className="p-5">
        <img className="w-4xl mr-9" src={homeImage} alt="" />
      </div>
    </div>
  );
};

export default LandingPageContent;

import React, { useState } from 'react';

const ShowRepo = ({ allRepos }) => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);

  function handlePrevious() {
    if (currentActiveIndex === 0) return;
    setCurrentActiveIndex(currentActiveIndex - 1);
  }
  function handleNext() {
    if (currentActiveIndex === allRepos.length) return;
    setCurrentActiveIndex(currentActiveIndex + 1);
  }

  return (
    <div className="flex justify-center items-center mr-80 ">
      <button
        className="font-bold text-4xl ml-96 mr-3 cursor-pointer"
        onClick={handlePrevious}
      >
        ←
      </button>
      <div className="container rounded-lg w-96 flex justify-center items-center  h-96  bg-primary text-white ">
        <div>
          <img
            src={allRepos[currentActiveIndex].owner.avatar_url}
            alt=""
            className=" w-12"
          />
          <h1>Owner: {allRepos[currentActiveIndex].owner.login}</h1>
          <p>Repo Name: {allRepos[currentActiveIndex].name}</p>
          <a
            className=" hover:text-secondary"
            href={allRepos[currentActiveIndex].clone_url}
            target="_blank"
          >
            URL: {allRepos[currentActiveIndex].clone_url} <span></span>
          </a>
        </div>
      </div>
      <button
        className="font-bold text-4xl  cursor-pointer"
        onClick={handleNext}
      >
        →
      </button>
    </div>
  );
};

export default ShowRepo;

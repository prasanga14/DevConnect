import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoggedNavbar from '../components/LoggedNavbar';
import ShowRepo from '../components/ShowRepo';

const Github = () => {
  const [githubUsername, setGithubUsername] = useState('');
  const [allRepoArr, setAllRepoArr] = useState([]);

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(
        `https://api.github.com/users/${githubUsername}/repos`
      );
      setAllRepoArr(data);
      console.log(allRepoArr);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="">
      <LoggedNavbar />
      <div className="flex flex-1 flex-col items-center justify-center">
        <form className=" border-2 rounded p-8 ">
          <input
            className=" p-2 border-1"
            type="text"
            placeholder="Enter github username"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
          />
          <div>
            <button
              className=" w-24 rounded-xl mt-2 ml-12 text-white hover:text-white hover:bg-black  bg-primary cursor-pointer"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>

        {allRepoArr.length === 0 ? (
          <></>
        ) : (
          <div className="showAllRepos flex m-5 justify-center">
            <ShowRepo allRepos={allRepoArr} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Github;

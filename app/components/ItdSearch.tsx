"use client"
import { useState } from 'react';
import React from 'react';

export default function ItdSearch() {
  const [showDialog,setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  async function changeHandler(e :any) {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);

    if (inputValue.length > 0) {
    //   if (showDialog.value === 0) {
    //     showDialog.value = 1;
    //   }
    if(!showDialog){
        setShowDialog(true)
    }

      const sanitizedQuery = encodeURIComponent(inputValue);
      console.log(sanitizedQuery);

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?q=${sanitizedQuery}`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          console.log(users);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  function closeDialog() {
    // showDialog.value = 0;
    setShowDialog(false)
    setSearchQuery("")
  }

  return (
    <div className='itd-search  w-3/5 mx-72 mt-40 flex flex-col justify-center items-center'>
        <h1 className="text-3xl font-bold text-gray-900">ITD-SEARCH</h1>
      <div className="search-div py-2 w-full  flex justify-center items-center border border-solid border-black pr-0 rounded-2xl mt-10">
        
        <input
          className="search-here w-11/12 h-full pl-4 focus:outline-none rounded-2xl"
          type="text"
          placeholder="search something"
          onInput={changeHandler}
          value={searchQuery}
          autoFocus
        />
        <button
          className="ask-btn w-1/12 py-1.5 mr-1.5 focus:outline-none hover:opacity-90 active:opacity-80 bg-black border-none text-white font-bold text-lg flex flex-row justify-center items-center rounded-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd"/></svg>
        </button>
      </div>

      {showDialog && searchQuery.length > 0 && (
        <div className="dialog  bg-white w-full min-h-14 shadow-md flex flex-col just-start items-center rounded-lg z-2">
          <div className="top w-full  flex flex-row justify-end items-center pt-2 pr-2.5 ">
            <button className="close-btn" onClick={closeDialog}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="black"><path d="M23.686 8.314a1.5 1.5 0 0 0-2.122 0L16 13.88l-5.564-5.565a1.5 1.5 0 0 0-2.122 2.122L13.88 16l-5.565 5.564a1.5 1.5 0 0 0 2.122 2.122L16 18.12l5.564 5.565a1.5 1.5 0 0 0 2.122-2.122L18.12 16l5.565-5.564a1.5 1.5 0 0 0 0-2.122"/><path d="M6 1a5 5 0 0 0-5 5v20a5 5 0 0 0 5 5h20a5 5 0 0 0 5-5V6a5 5 0 0 0-5-5zM3 6a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"/></g></svg>
            </button>
          </div>
          <div className="bottom  w-full  min-h-10 max-h-80 overflow-y-auto  pb-2 flex flex-col justify-start items-start pl-2 pr-2 ">
            {users.map((user) => (
              <div key={user.id} className="response-cont  w-full   flex flex-col justify-center items-start cursor-pointer rounded-lg active:text-white active:bg-black hover:bg-gray-200 hover:underline py-3  mt-1 pl-5">
                <a href={`/${user.name}`}>{user.name}</a>
                <p className="text-sm">email:{user.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

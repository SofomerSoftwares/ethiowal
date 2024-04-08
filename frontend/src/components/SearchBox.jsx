import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className='md:w-auto w-4 flex'>
      <input
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search Products...'
        className='md:w-auto w-64 rounded-md px-4 bg-gray-100 text-black'
      />
      <button type='submit'  className='p-1 mx-2 text-white'>
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBox;

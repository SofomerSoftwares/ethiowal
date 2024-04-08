import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          // NOTE: here we don't need the _id in the request payload as this is
          // not used in our controller.
          // _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="w-full h-[500px] flex flex-col items-center justify-center">
      <div className="w-96 px-8 py-2 justify-between items-center bg-gray-200 rounded-md ">
        <h2>User Profile</h2>

        <form onSubmit={submitHandler}>
          <div className='my-2 flex flex-col w-full gap-1 ' id='name'>
            <label>Name</label>
            <input className="border w-full rounded-md h-8 px-4" 
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
           />
          </div>

          <div className='my-2 flex flex-col w-full gap-1 ' id='email'>
            <label>Email Address</label>
            <input className="border w-full rounded-md h-8 px-4"
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='my-2 flex flex-col w-full gap-1 ' id='password'>
            <label>Password</label>
        <input className="border w-full rounded-md h-8 px-4"
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='my-2 flex flex-col w-full gap-1 ' id='confirmPassword'>
            <label>Confirm Password</label>
       <input className="border w-full rounded-md h-8 px-4"
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type='submit' variant='primary'>
            Update
          </button>
          {loadingUpdateProfile && <Loader />}
        </form>
      </div>
     
    </div>
  );
};

export default ProfileScreen;

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';


import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-96 bg-gray-100 px-4 py-2">
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <div className='my-2 flex flex-col '>
          <label>Name</label>
          <input  className="border rounded-md px-2"
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='my-2 flex flex-col'>
          <label>Email Address</label>
          <input className="border rounded-md px-2"
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='my-2 flex flex-col '>
          <label>Password</label>
          <input className="border rounded-md px-2"
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='my-2 flex flex-col '>
          <label>Confirm Password</label>
          <input  className="border rounded-md px-2"
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button disabled={isLoading} type='submit' variant='primary'>
          Register
        </button>

        {isLoading && <Loader />}
      </form>

      <div className='py-3'>
        <div>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default RegisterScreen;

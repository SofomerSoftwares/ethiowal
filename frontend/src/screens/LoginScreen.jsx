import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center bg-gray-50">
   <div className="bg-gray-100 w-96 px-8 py-2 rounded-lg">
   <h1 className="items-center">Sign In</h1>

      <form onSubmit={submitHandler}>
        <div className='my-2 flex flex-col justify-between gap-2 '>
          <label for= "email">Email Address</label>
          <input className="w-full h-8 rounded-md px-2 border"
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='my-2 flex flex-col justify-between gap-2' >
          <label>Password</label>
          <input className="w-full h-8 rounded-md px-2 border"
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button disabled={isLoading} type='submit' className="w-20 h-10 rounded-lg bg-blue-200">
          Sign In
        </button>

        {isLoading && <Loader />}
      </form>

      <div className='py-3'>
        <h1>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </h1>
      </div>
   </div>

   
    </div>
  );
};

export default LoginScreen;

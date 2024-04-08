import {useRef,React} from 'react'
import { FaBars } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';
import { useDisclosure } from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
    Stack,
    DrawerHeader
  } from '@chakra-ui/react';


function Header() {

  const { userInfo } = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
  
    <nav className=" bg-gray-100 h-16 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 text-white text-lg">
    <div className="flex justify-center items-end lg:order-2 gap-8">
    <div className='flex absolute  top-20 right-3   items-end md:hidden'>
     <FaBars onClick={onOpen}/>
   </div>

     <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
           Navigation
          </DrawerHeader>
          <DrawerBody>
            {/* Admin Links */}
            <Stack spacing='24px'>
       

            {userInfo && userInfo.isAdmin && (
                  <>
                   
               <Link to='/'> Home</Link>
                <Link to='/admin/productlist'>
                   <Box><button>Products</button></Box> 
                  </Link>
                  <Link to='/admin/orderlist'>
                    <button>Orders</button>
                  </Link>
                  <Link to='/admin/userlist'>
                    <button>Users</button>
                  </Link>
                  </>  
              )}
              
              {userInfo ? (
                <>
               
                  <Link to='/profile'>
                      <button>Profile</button>
                    </Link>
                   <button onClick={logoutHandler}>
                      Logout
                </button>
                </>
              ) : (
                
               <Link to='/'  className="text-2xl text-black dark:text-white font-medium rounded-lg cursor-pointer px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-blue-300"> Home</Link>
              
                
              )}
              </Stack>
          </DrawerBody>
        </DrawerContent>
       </Drawer>

    <div className='hidden md:flex md:gap-10 '>
    {userInfo && userInfo.isAdmin && (
                  <>
               <Link to='/' className='hover:text-red-500'> Home</Link>
                <Link to='/admin/productlist'>
                   <Box><button className='hover:text-red-500'>Products</button></Box> 
                  </Link>
                  <Link to='/admin/orderlist'>
                    <button className='hover:text-red-500'>Orders</button>
                  </Link>
                  <Link to='/admin/userlist'>
                    <button className='hover:text-red-500'>Users</button>
                  </Link>
                  </>  
              )}
              
              {userInfo ? (
                <>    
                  <Link to='/profile'>
                      <button className='hover:text-red-500'>Profile</button>
                    </Link>
                   <button onClick={logoutHandler} className='hover:text-red-500'>
                      Logout
                </button>
                </>
              ) : (
                <>
               <Link to='/'  className="text-2xl text-white dark:text-white font-medium rounded-lg cursor-pointer px-4 lg:px-5  lg:py-2.5 mr-2 hover:bg-blue-300"> Home</Link>
               <Link to='/about' className="text-2xl text-white dark:text-white font-medium rounded-lg cursor-pointer px-4 lg:px-5  lg:py-2.5 mr-2 hover:bg-blue-300">About Us</Link>
               </>
                
              )}
      </div>
     </div>
    </nav>
  )
}

export default Header

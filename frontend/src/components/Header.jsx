import React from 'react'

import { FaShoppingBasket } from 'react-icons/fa';
import { BiSolidUserCircle } from "react-icons/bi";
 import {Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';




function Header() {
 const { cartItems } = useSelector((state) => state.cart);
  
  return (
    <header>
    <nav className=" bg-gray-400 border-gray-200 px-4 lg:px-6 py-2.5  text-white">
        <div className="flex  justify-between items-center mx-auto max-w-screen-5xl">
         <Link to={'/'} className='flex items-center'>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">EthioWalmart</span>
         </Link>
         <div className='absolute top-20 md:relative md:top-0'>
         <SearchBox />
         </div>
       
            <div className="flex items-center lg:order-2 gap-8 ">
                <Link to={"/cart"}>
                 <FaShoppingBasket /> 
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Link>
                <Link to='/login'  className=" text-2xl text-white dark:text-white font-medium rounded-lg cursor-pointer px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                    <BiSolidUserCircle /> 

                </Link>
               
            </div>
       
        </div>
    </nav>
</header>
  )
}

export default Header

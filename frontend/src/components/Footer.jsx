import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    
     <div className='flex flex-col md:flex-row h-full my-8 font-sans text-md justify-center items-center bg-gray-300 text-normal font-semibold'>
     <div className='flex-1 flex-col p-8'>
        <h1 className='px-4'>Smart Shop</h1>
        <p className='mt-5'>
      Smart Shop is a palce to find any thing online and fast Deliver.
        </p>
       <div className='flex py-8'>
        <div className='w-10 h-10 px-10 flex items-center justify-between mr-5 gap-6'>
        <Facebook/>
        <Instagram/>
        <Twitter/>
        <Pinterest/>

        </div>
      
       </div>
       <p className="mb-2  flex items-center justify-center px-4">EthioWalmart &copy; {currentYear}</p> 
    </div> 
     
    <div className='flex flex-wrap justify-center items-center flex-1 p-5'>
    <h3 className='mb-4'>Useful Links</h3>
    <ul className='m-0 p-0 flex  flex-wrap justify-between gap-2'>
        <li className='mb-2'>
          Home
        </li>
        <li className='mb-2'>
        Cart
        </li>
        <li className='mb-2'>
        Man Fashion
        </li>
        <li className='mb-2'>
        Woman Fashion
        </li>
        <li className='mb-2'>
        Accessories
        </li>
        <li className='mb-2'>
        My Account
        </li>
        <li className='mb-2'>
        Order Tracking
        </li>
        <li className='mb-2'>
        Wishlist
        </li>
        <li className='mb-2'>
        Terms & Conditions
        </li>
    </ul>
    </div>
    <div className='flex flex-col justify-center items-center gap-2 '>
        <h3 className=''>
            Contact
        </h3>
        <div className='flex flex-col  items-center justify-center px-8'>
        <Room /> 
         <p>
        Mexico Street Addis Ababa, Ethiopia
        </p>
        </div>
        <div className=' flex items-center '>
        <Phone />
         <p>
        +251-932-71-12-51
          </p>
         </div>
        <div className='flex items-center '>
        <MailOutline /> 
        <p>
        info@smartshop.net
        </p>
       
        </div>
       
        </div>
       
        </div>
   
  );
};
export default Footer;

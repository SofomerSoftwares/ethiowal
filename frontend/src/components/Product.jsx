
import { Link } from 'react-router-dom';
import Rating from './Rating';
  
    // import { Card, CardBody,Image, Stack, Heading,Text,Divider} from '@chakra-ui/react';

const Product = ({ product }) => {

return (
            <div
              className="mb-10 overflow-hidden  rounded-lg  shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
                   <Link to={`/product/${product._id}`}>
              <img className="w-full h-full" src={product.image} alt="" />
                 </Link>
        
              <div className="p-8 text-center bg-gray-300 justify-center sm:p-9 md:p-7 xl:p-9 shadow gap-5 ">
                <h3 className=" flex flex-col justify-between items-center mb-4 text-black font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] " >
                 <Link to={`/product/${product._id}`}>
                 <strong className="items-start  justify-start text-black">  
                 {product.name}
                 {product.price} ETB
                 </strong>
                 </Link>
                 <Rating  value={product.rating} text={`${product.numReviews} reviews`} />
                
                </h3>
                <p className="items-center font-mono">
           
               
                </p>
               
              
               
               
                <Link to={`/product/${product._id}`}>
                 <p className="inline-block  text-red-400 rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6" >
                 Buy Now
               </p> 
              </Link>
              </div>
            </div>
          

  );
};

export default Product;

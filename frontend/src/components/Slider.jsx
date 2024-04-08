import { Link } from 'react-router-dom';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const Slider = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (

    <div className="py-36">  
  <AwesomeSlider animation="cubeAnimation">
        {products.map((product)=>(
          <div className='container flex ' key={product._id}>
             <div className='w-1/2 '>
              <img src={product.image} alt="" className='items-center' />
              </div>
           <div className='flex-1 p-[50px]'>
           
          <h1 className='text-6xl font-medium mb-4 capitalize'>{product.name}</h1>
          <p className="py-8 text-white text-md">{product.description}</p>

          <p className='mt-1 mb-8 text-2xl font-semibold '>
            {product.price} ETB
          </p>
          <div className="mt-12">
          <Link to={`/product/${product._id}`} className=" border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary">   
              Shop Now
                </Link>
          </div>

        
           </div>
          </div>  
             ))}
    </AwesomeSlider>
</div>
  );
};

export default Slider;

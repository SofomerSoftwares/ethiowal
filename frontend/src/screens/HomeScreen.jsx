
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Slider from '../components/Slider';
import Meta from '../components/Meta';
import Brand from '../components/brand';








const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
<div className='container max-w-screen-5xl h-full'>
      {!keyword ? (
        <Slider />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
        <Brand />
          <Meta />
          <div class="container py-16">
      
    </div>
          <h1 className='py-8 text-lg font-serif font-semibold items-center justify-center'>Latest Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
            {data.products.map((product) => (
              <div key={product._id} className="w-full  rounded-md">
                <Product product={product} />
              </div>
            ))}
          </div>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
</div>
  );
};

export default HomeScreen;

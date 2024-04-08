import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link className='mx-6 my-3' to='/'>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <div className='text-2xl flex flex-col md:flex-row lg:flex-row justify-between items-center'>
            
              <img src={product.image} alt={product.name}  />
            
            <div className='w-full '>
              <div className='flex flex-col justify-between items-center py-4 gap-4'>
                <div className='items-center'>
                  <h3 className=''>{product.name}</h3>
                  <hr/>
                </div>
                <div>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
                <div className='items-start'>Price: {product.price} ETB</div>
                <div className='text-2xl font-sans  px-16 flex-wrap'>
                 {product.description}
                </div>
                
               
              </div>
            </div>
            
            <div className='w-72 md:w-full justify-center items-center'>
              <div className='border'>
                <div variant='flush'>
                  <div className='w-full p-4'>
                    <div className='flex justify-between'>
                      <p>Price:</p>
                      <span>
                        <strong>{product.price} ETB</strong>
                      </span>
                    </div>
                  </div>
                  <hr/>
                  <div className='w-full p-4'>
                    <div className='flex justify-between'>
                      <p>Status:</p>
                      <span>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </span>
                    </div>
                  </div>
                  <hr/>
                  {/* Qty Select */}
                  {product.countInStock > 0 && (
                    <div className='w-full p-4'>
                      <div className='flex justify-between'>
                        <p>Qty</p>
                        <div className='px-4' >
                          <select
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                <hr/>
                  <div className='w-full p-4 '>
                    <button
                      className='bg-gray-400 w-36 h-16 rounded-md'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
          <div className='px-16  flex justify-center items-center '>
            <div className='w-96'>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
             </div>
              <div className="flex ">
                {product.reviews.map((review) => (
                  <li key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </div>
                <div className=" ">
                  <h2>Write a Customer Review</h2>
                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div className='my-2 flex gap-5 ' controlId='rating'>
                        <label>Rating</label>
                        <select
                         
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </select>
                      </div>
                      <div className='my-2 flex flex-col' controlId='comment'>
                        <label>Comment</label>
                        <textarea
                        className="border"
                          row='3'
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                      <button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </button>
                    </form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </div>
              </div>
              </>    
      )}
    </>
  );
};

export default ProductScreen;

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // NOTE: no need for an async function here as we are not awaiting the
  // resolution of a Promise
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // const checkoutHandler = () => {
  //   navigate('/login?redirect=/shipping');
  // };

  return (
    <div className='flex flex-col justify-between w-full h-full font-serif text-xl'>
      <div className='w-full h-full px-64'>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ul className='flex flex-col justify-between w-full border px-6 '>
            {cartItems.map((item) => (
              <li key={item._id} className='w-full flex-row h-auto flex justify-between items-center gap-8 border-b'>
                  <div className='text-md'>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className='w-full h-auto text-xl' >
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </div>
                  <p className='w-full justify-center text-xl'>{item.price} ETB</p>
                  <div>
                    <select className="w-28"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
               
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='flex flex-col px-40 py-8 justify-between gap-4  '>
          <ul className=''>
            <li className=' flex flex-col mb-4'>
              <h2 className='text-2xl mb-4 font-sans font-semibold'>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              {
              cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}  ETB          
              </li>
              
              <button 
                type='button'
                className='w-52 h-16 bg-gray-200 rounded-md'
                disabled={cartItems.length === 0}
                // onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </ul>
       
      </div>
    </div>
  );
};

export default CartScreen;

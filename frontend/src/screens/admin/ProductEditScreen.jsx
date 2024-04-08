import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="bg-gray-300 w-[500px] px-6 rounded-md" >
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <form onSubmit={submitHandler} className="">
            <div className="flex flex-col py-1 gap-2 mb-2" controlId='name'>
              <label>Name</label>
              <input className="px-2 border "
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col py-1 gap-2 mb-2" controlId='price'>
              <label>Price</label>
              <input className="px-2 border "
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="flex flex-col py-1 gap-2 mb-2" controlId='image'>
              <label>Image</label>
              <input className="px-2 border "
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <input className="px-2 border "
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              />
              {loadingUpload && <Loader />}
            </div>

            <div className="flex flex-col py-1 gap-2 mb-2" controlId='brand'>
              <label>Brand</label>
              <input className="px-2 border "
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="flex flex-col py-1 gap-2 mb-2" controlId='countInStock'>
              <label>Count In Stock</label>
              <input className="px-2 border "
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>

            <div className="flex flex-col py-1 gap-2 mb-2" controlId='category'>
              <label>Category</label>
              <input className="px-2 border "
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="flex flex-col py-1 gap-2 mb-2" controlId='description'>
              <label>Description</label>
              <input className="px-2 border "
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </button>
          </form>
        )}
      </div>
        </div>
    
    </>
  );
};

export default ProductEditScreen;

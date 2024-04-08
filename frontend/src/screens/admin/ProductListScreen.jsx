import { Link } from 'react-router-dom';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className='align-items-center'>
        <h2 className="px-8 text-md"> 
          <h1>Products</h1>
        </h2>
        <h2 className='items-end justify-end px-8 rounded-md'>
          <button className='my-3 px-6 h-14  flex items-center justify-enter bg-gray-500 text-white' onClick={createProductHandler}>
            <FaPlus /> Create Product
          </button>
        </h2>
      </div>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <table col="1" row="1" className='px-20 w-full' >
            <thead> 
              <tr className="border ">
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id} className="border">
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price} ETB</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'red' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;

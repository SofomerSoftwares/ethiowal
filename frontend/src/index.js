import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import store from './store';
import { Provider } from 'react-redux';
import About from './components/About';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route
        path='/search/:keyword/page/:pageNumber'
        element={<HomeScreen />}
      />
      <Route path='/about' element={<About />}/> 
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      {/* Admin users */}
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route
          path='/admin/productlist/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <HelmetProvider>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>

);

reportWebVitals();

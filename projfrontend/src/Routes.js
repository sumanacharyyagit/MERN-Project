import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/helper/PrivateRoute';
import AdminRoute from './auth/helper/AdminRoute';
import AdminDashBoard from './user/AdminDashBoard';
import UserDashBoard from './user/UserDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import Orders from './admin/Orders';
import UpdateProduct from './admin/UpdateProduct';

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" exact element={<Home />}/>
            <Route path="/signup" exact element={<Signup />}/>
            <Route path="/signin" exact element={<Signin />}/>
            <Route path="/" exact element={<PrivateRoute />}>
              <Route path="/user/dashboard" exact element={<UserDashBoard />} />
            </Route>
            <Route path="/" exact element={<AdminRoute />}>
              <Route path="/admin/dashboard" exact element={<AdminDashBoard />} />
            </Route>
            <Route path="/" exact element={<AdminRoute />}>
              <Route path="/admin/create/category" exact element={<AddCategory />} />
            </Route>
            <Route path="/" exact element={<AdminRoute />}>
              <Route path="/admin/categories" exact element={<ManageCategories />} />
            </Route>
            <Route path="/" exact element={<AdminRoute />}>
              <Route path="/admin/create/product" exact element={<AddProduct />} />
            </Route>
            <Route path="/" exact element={<AdminRoute />}>
              <Route path="/admin/products" exact element={<ManageProducts />} />
            </Route>
            <Route path="/" exact element={<AdminRoute />}>
              <Route path="/admin/orders" exact element={<Orders />} />
            </Route>
            <Route path="/" exact element={<AdminRoute />}>
              <Route path="/admin/product/update/:productId" exact element={<UpdateProduct />} />
            </Route>
        </Routes>
    </Router>
  )
}

export default AppRoutes;
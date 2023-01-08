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
        </Routes>
    </Router>
  )
}

export default AppRoutes;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" exact element={<Home />}/>
            <Route path="/signup" exact element={<Signup />}/>
            <Route path="/signin" exact element={<Signin />}/>
        </Routes>
    </Router>
  )
}

export default AppRoutes;
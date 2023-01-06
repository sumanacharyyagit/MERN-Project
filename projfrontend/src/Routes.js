import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './core/Home';

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" exact element={<Home />}/>
        </Routes>
    </Router>
  )
}

export default AppRoutes;
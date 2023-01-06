import React from 'react';
import { NavLink, Outlet} from 'react-router-dom';

const currentTab = ({ isActive }) => ({ 
    color: isActive ? '#2ecc72' : 'white' })

const Menu = () => {
  return (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <NavLink className="nav-link" to="/" style={currentTab}>
                    Home
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/cart" style={currentTab}>
                    Cart
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/user/dashboard" style={currentTab}>
                    Dashboard
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/dashboard" style={currentTab}>
                    A. Dashboard
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/signup" style={currentTab}>
                    SignUp
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/signin" style={currentTab}>
                    SignIn
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/signout" style={currentTab}>
                    SignOut
                </NavLink>
            </li>
        </ul>
        <Outlet />
    </div>
  )
}

export default Menu;
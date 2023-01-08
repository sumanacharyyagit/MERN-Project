import React from 'react';
import { NavLink, useNavigate, Outlet} from 'react-router-dom';
import { isAuthenticated, signOut } from '../auth/helper';

const currentTab = ({ isActive }) => ({ 
    color: isActive ? '#2ecc72' : 'white' })

const Menu = () => {
    const navigate = useNavigate();
    const isAuthent = isAuthenticated();

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
            {isAuthent && isAuthent.user.role === 0 && (<li className="nav-item">
                <NavLink className="nav-link" to="/user/dashboard" style={currentTab}>
                    U. Dashboard
                </NavLink>
            </li>)}
            {isAuthent && isAuthent.user.role === 1 && (<li className="nav-item">
                <NavLink className="nav-link" to="/admin/dashboard" style={currentTab}>
                    A. Dashboard
                </NavLink>
            </li>)}
            {!isAuthent && (
                <>
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
                </>
            )}
            {isAuthent && (
                <li className="nav-item">
                    <span className="nav-link text-warning" onClick={() => signOut(() => navigate("/"))}>
                        SignOut
                    </span>
                </li>
            )}
        </ul>
        <Outlet />
    </div>
  )
}

export default Menu;

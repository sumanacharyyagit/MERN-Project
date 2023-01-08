import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from "./index";

const AdminRoute = () => {
    const isAuthent = isAuthenticated();

    return isAuthent && isAuthent.user.role === 1 ? <Outlet /> : <Navigate to="/signin" />;
}

export default AdminRoute;

/*
const AdminRoute = ({component: Component, ...rest}) => {
    // const navigate = useNavigate();
    const location = useLocation();
  return (
    <Route
        {...rest}
        render ={(props) =>
            isAuthenticated() && isAuthenticated().user.role === 1 ? (
                <Component {...props}/>
            ) : (
                <Navigate
                    to={{
                        pathname: "/signin",
                        // state: {from: props.location},
                        state: location(props.location)
                    }}
                />

            )
        }
    >
        
    </Route>
  )
}
*/
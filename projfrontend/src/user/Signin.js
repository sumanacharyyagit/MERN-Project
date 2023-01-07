import React, { useState } from 'react';
import Base from '../core/Base';
import {NavLink, Link, Navigate } from 'react-router-dom';

import { signIn, authenticate, isAuthenticated } from '../auth/helper';

const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false,  //<Navigate to="/" replace />
    });

    const {email, password, error, loading, didRedirect} = values;

    const {user} = isAuthenticated();

    const handleChange = (name) => (e) => {
        setValues({...values, error: false, [name]: e.target.value});
    };

    const onSubmit = (e) =>{
        e.preventDefault();
        setValues({...values, error: false, loading: true});
        signIn({email, password})
        .then((resp) => {
            if(resp.error){
                setValues({...values, error: resp.error, loading: false});
            }
            else{
                authenticate(resp, () => {
                    setValues({
                        ...values,
                        didRedirect: true,
                        email: "",
                        password: "",
                    })
                });
            }
        })
        .catch((err) => {
            console.log("SIGNIN REQUEST FAILED", err);
        });
    };

    const performRedirect = () => {
        // TODO: NEED TO REDIRECT ROUTE HERE
        if(didRedirect){
            if(user && user.role === 1){
                return <p>Redirect to Admin Dashboard</p>;
            }
            else{
                return <p>Redirect to User Dashboard</p>
            }
        }
        if(isAuthenticated()){
            return <Navigate to="/" replace />
        }
    }

    const LoadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };

    const ErrorMessage = () => {
        return(
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                {error}
              </div>
            </div>
          </div>
        );
    };

    const SignInForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-group">
                            <label className="text-white">
                                Eamil
                            </label>
                            <input className="form-control" type="email" value={email} onChange={handleChange("email")}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-white">
                                Password
                            </label>
                            <input className="form-control" type="password" value={password} onChange={handleChange("password")}></input>
                        </div>
                        <button className="btn btn-success w-100 my-3 rounded-pill" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

  return (
    <Base title="SignIn Page" description="A Page for User to SignIn!">
        {LoadingMessage()}
        {ErrorMessage()}
        {SignInForm()}
        {performRedirect()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  )
}

export default Signin;

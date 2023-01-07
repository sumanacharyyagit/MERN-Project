import React, { useState } from 'react';
import Base from '../core/Base';
import {NavLink, Link } from 'react-router-dom';
import { signUp } from '../auth/helper';

const Signup = () => {

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });


  const {name, email, password, success, error} = values;
  
  const handleChange = (name) => (e) => {
    setValues({...values, error: false, [name]: e.target.value});
  };
  
  
  const onSubmit = (e) => {
      e.preventDefault();
      setValues({...values, error: false});
      signUp({name, email, password})
      .then((resp) => {
          if(resp.error) {
              setValues({...values, error: resp.error, success: false});
            }
            else {
                setValues({...values, success: true, name: "", email: "", password: "", error: ""});
      }
    })
    .catch((err) => {
      console.log("ERROR IN SIGNUP", error);
    });
  };

  const SuccessMessage = () => {
    return(
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-success" style={{display: success ? "" : "none"}}>
            Account Created Successfully. Please <Link to="/signin">Login Here</Link>
        </div>
        </div>
      </div>
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

  const SignUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form >
            <div className="form-group">
              <label className="text-white">
                Name
              </label>
              <input className="form-control" type="text" value={name} onChange={handleChange("name")}></input>
            </div>
            <div className="form-group">
              <label className="text-white">
                Eamil
              </label>
              <input className="form-control" type="text" value={email} onChange={handleChange("email")}></input>
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
    <Base title="SignUp Page" description="A Page for User to SignUp!">
      {SuccessMessage()}
      {ErrorMessage()}
        {SignUpForm()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  )
}

export default Signup;
import React, { useState } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {token, user} = isAuthenticated();

    const handleChange = (e) => {
        setName(e.target.value);
        setError("");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        // BACKEND CALL HERE
        createCategory(user.id, token, {name}).then((resp) => {
            if(resp.error){
                setError(true);
            }else{
                setError("");
                setSuccess(true);
                setName("");
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    const SuccessMessage = () => {
        if(success){
            return <h4 className="text-success">Category Created Successfully</h4>
        }
    }
    
    const WarningMessage = () => {
        if(error){
            return <h4 className="text-denger">Failed to Create Category</h4>
        }
    }

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link to="/admin/dashboard" className="btn btn-sm btn-success mb-3" >&#8630; Admin Home</Link>
            </div>
        )
    }

    const MyCategoryForm = () => {
        return(
            <form>
                <div className="form-group">
                    <p className="lead">Enter the Category</p>
                    <input 
                        type="text"
                        className="form-control my-3"
                        autoFocus
                        required
                        placeholder="For Ex. Summer"
                        value={(name)}
                        onChange={handleChange}
                    />
                    <button className="btn btn-outline-info mb-3" onClick={onSubmit}>Create Category</button>
                </div>
            </form>
        )
    }

  return (
    <Base title="Create a new Category" description="Create/Add a New Category of T-Shirt" className="container bg-info p-5">
        <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
                {goBack()}
                {SuccessMessage()}
                {WarningMessage()}
                {MyCategoryForm()}
            </div>
        </div>
    </Base>
  )
}

export default AddCategory;
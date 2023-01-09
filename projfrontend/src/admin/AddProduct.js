import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';


const AddProduct = () => {

    const [values, setValues] = useState({
        photo: "",
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        stock: "",
        loading: "",
        error: "",
        createdProduct: "",
        getRedirect: false,
        formData: "",
    });

    useEffect(() => {
        preload();
    }, []);

    const {name, description, price, stock, categories, category, photo, createdProduct, error, getRedirect, loading, formData} = values;

    const {user, token} = isAuthenticated();

    const preload = () => {
        getCategories()
        .then((resp) =>{
            if(resp.error){
                setValues({...values, error: resp.error});
            }
            else{
                setValues({...values, categories: resp, formData: new FormData()});
            }
        })
        .catch((err) => console.log(err));
    };

    const handleChange = (name) => (e) => {
        const value = name === "photo" ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, createdProduct: "", error: "", [name]: value});
        let options = { content: formData };
        console.log(options);
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: "", loading: true});
        createProduct(user.id, token, formData)
        .then((resp) => {
            if(resp.error){
                setValues({...values, error: resp.error});
            }
            else{
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                    photo: "",
                    category: "",
                    loading: false,
                    createdProduct: resp.name,
                })
            }
        })
        .catch((err) => console.log(err));
    };

    const SuccessMessage = () => {
        return(
            <div 
                className="alert alert-success mt-3"
                style={{display: createdProduct ? "" : "none"}}
            >
                <h4>
                    {createdProduct} created successfully!
                </h4>
            </div>
        )
    };

    const ErrorMessage = () => {
        return(
            <div 
                className="alert alert-warning mt-3"
                style={{display: error ? "" : "none"}}
            >
                <h4>
                    {error}!
                </h4>
            </div>
        )
    };
    
    const CreateProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control  my-3"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control  my-3"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control  my-3"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control  my-3"
              placeholder="Category"
              value={category}
            >
                <option value="">Select</option>
                {
                    categories.length > 0 ? (
                        categories.map((category) =>(
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))
                    ) : (
                            <option value="">No Option</option>
                    )
                }
                
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control  my-3"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success my-3">
            Create Product
          </button>
        </form>
    );
  return (
    <Base 
        title="Add a product here!" 
        description="Welcome to product creation section" 
        className="container bg-info p-5" 
    >
        <Link  to="/admin/dashboard" className="btn btn-sm btn-success mb-3">&#8630; Admin Home</Link>
        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                {SuccessMessage()}
                {ErrorMessage()}
                {CreateProductForm()}
            </div>
        </div>
    </Base>
  )
};

export default AddProduct;

import React, { useEffect, useState, } from 'react';
import Base from '../core/Base';
import { Link, useParams} from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';


const UpdateProduct = (props) => {
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
        updatedProduct: "",
        getRedirect: false,
        formData: "",
    });

    const {productId} = useParams();

    useEffect(() => {
        preload(productId);
    }, []);

    const {name, description, price, stock, categories, category, photo, updatedProduct, error, getRedirect, loading, formData} = values;

    const {user, token} = isAuthenticated();

    const preload = (productId) => {
        getProduct(productId)
        .then((resp) =>{
            console.log(resp);
            if(resp.error){
                setValues({...values, error: resp.error});
            }
            else{
                prelodeCategories();
                setValues({
                    ...values, 
                    name: resp.name,
                    description: resp.description,
                    price: resp.price,
                    stock: resp.stock,
                    category: resp.category._id,
                    photo: resp.photo,
                    formData: new FormData(),
                });
            }
        })
        .catch((err) => console.log(err));
    };

    const prelodeCategories = () => {
        getCategories()
        .then((resp) =>{
            console.log(resp);
            if(resp.error){
                setValues({...values, error: resp.error});
            }
            else{
                setValues({
                    categories: resp,
                    formData: new FormData(),
                });
            }
        })
        .catch((err) => console.log(err));
    };

    const handleChange = (name) => (e) => {
        const value = name === "photo" ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, updatedProduct: "", error: "", [name]: value});
        let options = { content: formData };
        console.log(options);
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: "", loading: true});
        updateProduct(productId, user.id, token, formData)
        .then((resp) => {
            if(resp.error){
                setValues({...values, error: resp.error});
            }
            else{
                setValues({
                    ...values,
                    name: resp.name,
                    description: resp.description,
                    price: resp.price,
                    stock: resp.stock,
                    category: resp.category._id,
                    photo: resp.photo,
                    formData: new FormData(),
                    loading: false,
                    updatedProduct: resp.name,
                })
            }
        })
        .catch((err) => console.log(err));
    };

    const SuccessMessage = () => {
        return(
            <div 
                className="alert alert-success mt-3"
                style={{display: updatedProduct ? "" : "none"}}
            >
                <h4>
                    {updatedProduct} updated successfully!
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
    
    const UpdateProductForm = () => (
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
            Update Product
          </button>
        </form>
    );
  return (
    <Base 
        title="Update a product here!" 
        description="Welcome to product updation section" 
        className="container bg-info p-5" 
    >
        <Link  to="/admin/dashboard" className="btn btn-sm btn-success mb-3">&#8630; Admin Home</Link>
        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                {SuccessMessage()}
                {ErrorMessage()}
                {UpdateProductForm()}
            </div>
        </div>
    </Base>
  )
};

export default UpdateProduct;

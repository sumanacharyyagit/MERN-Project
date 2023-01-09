import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { deleteProduct, getProducts } from './helper/adminapicall';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const {user, token} = isAuthenticated();

  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    getProducts()
    .then((resp) => {
      console.log(resp);
      if(resp.error){
        console.log(resp.error);
      }else{
        setProducts(resp);
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  const deleteMyProduct = (productId) => {
    deleteProduct(productId, user.id, token)
    .then((resp) => {
      if(resp.error){
        console.log(resp.error);
      }
      else{
        preload();
      }
    })
    .catch((err) => {

    });
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <Link className="btn btn-sm btn-success mb-3" to={`/admin/dashboard`}>
        <span className="">&#8630; Admin Home</span>
      </Link>
      <h2 className="mb-4">All products:</h2>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">{products.length > 0 ? `Total ${products.length} products` : "No product to show"} </h2>
          {
            products.length > 0 && 
              products.map((product) => (
                <div key={product._id} className="row text-center mb-2 ">
                  <div className="col-4">
                    <h3 className="text-white text-left">{product.name}</h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/product/update/${product._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button onClick={() => {deleteMyProduct(product._id)}} className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </Base>
  )
};

export default ManageProducts;
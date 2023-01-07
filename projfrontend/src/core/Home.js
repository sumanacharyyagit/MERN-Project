import React from 'react';
import { API } from '../backend';
import Base from './Base';



console.log(process.env);
console.log(API);

const Home = () => {

  return (
    <Base title="Home Page" description="Welcome to the T-Shirt Store">
        <div className="row">
            <div className="col-4">
                <button className="btn btn-success">Test</button>
            </div>
            <div className="col-4">
                <button className="btn btn-success">Test</button>
            </div>
            <div className="col-4">
                <button className="btn btn-success">Test</button>
            </div>
        </div>
    </Base>
  )
}

export default Home;
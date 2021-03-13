import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const { id, title, imageurl } = product;
  return (
    <div className="col-4-wrap">
      <img src={imageurl} alt="product" />
      <h4>{title}</h4>
      <p>
        Id:
        {id}
      </p>
      <Link to={`/product/${id}`} className="btn">
        Explore Now
      </Link>
    </div>
  );
};

export default Product;

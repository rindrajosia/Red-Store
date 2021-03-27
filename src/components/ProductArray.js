import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductArray = ({ product }) => {
  const { id, title, imageurl } = product;
  return (
    <tr>
      <td>
        <img src={imageurl} className="product-avatar" alt="product" />
      </td>
      <td>{title}</td>
      <td>
        <Link to={`/product/${id}`} className="btn">
          Explore
        </Link>
      </td>
    </tr>
  );
};
ProductArray.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};
export default ProductArray;

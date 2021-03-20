import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Favorite = ({ favorite }) => {
  const { id, name } = favorite;
  return (
    <div className="col-4-wrap">
      <Link to={`/favorite-product/${id}`} className="btn">
        <h4>{name}</h4>
      </Link>
      <Link to={`/favorite-edit/${id}`} className="btn">
        Edit
      </Link>
    </div>
  );
};

Favorite.propTypes = {
  favorite: PropTypes.instanceOf(Object).isRequired,
};

export default Favorite;

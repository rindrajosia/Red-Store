import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Favorite = ({ favorite }) => {
  const { id, name } = favorite;
  return (
    <tr>
      <td>
        <Link to={`/favorite-product/${id}`}>
          <h4>{name}</h4>
        </Link>
      </td>
      <td>
        <Link to={`/favorite-edit/${id}`} className="btn">
          Edit
        </Link>
      </td>
      <td>
        <Link to={`/favorite-del/${id}`} className="btn">
          Del
        </Link>
      </td>
    </tr>
  );
};

Favorite.propTypes = {
  favorite: PropTypes.instanceOf(Object).isRequired,
};

export default Favorite;

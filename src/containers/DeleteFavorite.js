import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { URL } from '../constants';
import { deleteFavorite, fetchProduct } from '../actions';
import {
  getProductBy,
} from '../redux/selectors';

const DeleteFavorite = ({
  match, deleteFavorite, history, fetchProduct, productData,
}) => {
  const userData = JSON.parse(sessionStorage.getItem('user'));
  const { id } = match.params;
  const details = productData;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  useEffect(() => {
    fetchProduct(id, `${URL.BASE}${URL.PRODUCTS}`);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (!details.product.description || !id) {
      setError(prevState => `${prevState}  Favorite with id ${id} not found`);
    } else {
      deleteFavorite(id, `${URL.BASE}${URL.FAVORITES}`, userData.auth_token).then(() => {
        setSuccess(prevState => `${prevState} Deleted with success`);
        history.push('/favorite-product');
      }).catch(() => {
        setError(prevState => `${prevState} Network error`);
      });
    }
  };

  return (
    <main className="main-sign">
      {error && <h2>{error}</h2>}
      {success && (
      <h2>
        {success}
      </h2>
      )}
      <div className="row-wrap">
        {!userData.auth_token && !userData && <Redirect to="/" /> }
      </div>
      <p className="sign" align="center">Remove from Favorite</p>
      <form className="form1">
        <input
          type="text"
          id="id"
          name="id"
          value={id}
          className="un"
          disabled
        />
        <input
          type="text"
          id="name"
          name="name"
          value={details.product.description}
          className="un"
          disabled
        />

        <div className="center">
          <button type="submit" className="btn" onClick={handleSubmit}>
            Remove
          </button>
        </div>
      </form>
    </main>
  );
};

DeleteFavorite.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchProduct: PropTypes.func.isRequired,
  productData: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => {
  const productData = getProductBy(state);
  return { productData };
};

export default connect(
  mapStateToProps,
  { deleteFavorite, fetchProduct },
)(DeleteFavorite);

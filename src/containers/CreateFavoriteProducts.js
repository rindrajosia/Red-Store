/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { URL } from '../constants';
import { createFavoriteProduct, fetchFavorites, fetchFavoriteProducts } from '../actions';
import { getFavoriteList } from '../redux/selectors';

const CreateFavoriteProducts = ({
  match, createFavoriteProduct, favoritesData, history, fetchFavorites,
}) => {
  const userData = JSON.parse(sessionStorage.getItem('user'));
  useEffect(() => {
    fetchFavorites(`${URL.BASE}${URL.FAVORITES}`, userData.auth_token);
  }, [fetchFavorites]);

  const { id } = match.params;
  const [favoriteProduct, setFavoriteProduct] = useState({
    favorite_id: '', product_id: id,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleChange = e => {
    const { name, value } = e.target;
    setFavoriteProduct({ ...favoriteProduct, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (favoriteProduct.favorite_id && favoriteProduct.product_id) {
      createFavoriteProduct(`${URL.BASE}${URL.FAVORITE_PRODUCTS}`, userData.auth_token, favoriteProduct).then(() => {
        setSuccess(prevState => `${prevState} Adding with success`);
        history.push(`/favorite-product/${favoriteProduct.favorite_id}`);
      }).catch(() => {
        setError(prevState => `${prevState} Network error`);
      });
    } else {
      setError(prevState => `${prevState} Chose one favorite`);
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
      <p className="sign" align="center">Add to favorite</p>
      <form className="form1">
        <select name="favorite_id" id="favorite" className="un" value={favoriteProduct.favorite_id} onChange={handleChange}>
          <option value="">
            Favorite
          </option>
          {favoritesData.favorites.map(favorite => (
            <option key={favorite.id} value={favorite.id}>
              {favorite.name}
            </option>
          ))}
        </select>
        <div className="center">
          <button type="submit" className="btn" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </form>
    </main>
  );
};

CreateFavoriteProducts.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  favoritesData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  fetchFavorites: PropTypes.func.isRequired,
  createFavoriteProduct: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => {
  const favoritesData = getFavoriteList(state);
  return { favoritesData };
};

export default connect(
  mapStateToProps,
  { fetchFavorites, createFavoriteProduct, fetchFavoriteProducts },
)(CreateFavoriteProducts);

/* eslint-enable max-len */

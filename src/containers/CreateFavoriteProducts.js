import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { URL } from '../constants';
import { createFavoriteProduct, fetchFavorites } from '../actions';
import { getUserInfo, getFavoriteList } from '../redux/selectors';

const CreateFavoriteProducts = ({
  match, createFavoriteProduct, userData, favoritesData, fetchFavorites,
}) => {
  useEffect(() => {
    fetchFavorites(`${URL.BASE}${URL.FAVORITES}`, userData.user.auth_token);
  }, [fetchFavorites]);

  const { id } = match.params;
  const [favoriteProduct, setFavoriteProduct] = useState({
    favorite_id: 1, product_id: id,
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
      createFavoriteProduct(`${URL.BASE}${URL.FAVORITE_PRODUCTS}`, userData.user.auth_token, favoriteProduct);
      setSuccess(prevState => `${prevState} Adding with success`);
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
        {' '}
        <Redirect to="/" />
      </h2>
      )}
      <div className="row-wrap">
        {userData.loading && <h2 className="info">Loading</h2>}
        {!userData.user.auth_token && !userData && <Redirect to="/" /> }
      </div>
      <p className="sign" align="center">Add to favorite</p>
      <form className="form1">
        <select name="favorite_id" id="favorite" className="un" value={favoriteProduct.favorite_id} onChange={handleChange}>
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
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  favoritesData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  fetchFavorites: PropTypes.func.isRequired,
  createFavoriteProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  const favoritesData = getFavoriteList(state);
  return { userData, favoritesData };
};

export default connect(
  mapStateToProps,
  { fetchFavorites, createFavoriteProduct },
)(CreateFavoriteProducts);

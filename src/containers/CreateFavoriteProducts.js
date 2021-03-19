import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { URL } from '../constants';
import { createFavoriteProduct } from '../actions';
import { getUserInfo, getFavoriteList } from '../redux/selectors';

const CreateFavoriteProducts = ({
  match, createFavoriteProduct, userData, favoritesData,
}) => {
  const { id } = match.params;
  const [favoriteProduct, setFavoriteProduct] = useState({
    favorite_id: 1, product_id: id,
  });
  const [error, setError] = useState('');
  const handleChange = e => {
    const { name, value } = e.target;
    setFavoriteProduct({ ...favoriteProduct, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (favoriteProduct.favorite_id && favoriteProduct.product_id) {
      console.log(favoriteProduct);
      createFavoriteProduct(`${URL.BASE}${URL.FAVORITE_PRODUCTS}`, userData.user.auth_token, favoriteProduct);
    } else {
      setError(prevState => `${prevState} Chose one favorite`);
    }
  };

  return (
    <div className="wrapper">
      {error && <h2>{error}</h2>}
      <form>
        <fieldset>
          <label htmlFor="favorite">
            {' '}
            Favorites:
            <select name="favorite_id" id="favorite" value={favoriteProduct.favorite_id} onChange={handleChange}>
              {favoritesData.favorites.map(favorite => (
                <option key={favorite.id} value={favorite.id}>
                  {favorite.name}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
        <button type="submit" className="btn" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

CreateFavoriteProducts.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  favoritesData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  createFavoriteProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  const favoritesData = getFavoriteList(state);
  return { userData, favoritesData };
};

export default connect(
  mapStateToProps,
  { createFavoriteProduct },
)(CreateFavoriteProducts);

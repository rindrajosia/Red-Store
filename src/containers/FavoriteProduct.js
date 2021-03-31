/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFavorites } from '../actions';
import { URL } from '../constants';

import { getFilterFavorite } from '../redux/selectors';
import Product from '../components/Product';

const FavoriteProductComponent = ({
  productData, fetchFavorites,
}) => {
  const userData = JSON.parse(sessionStorage.getItem('user'));
  useEffect(() => {
    fetchFavorites(`${URL.BASE}${URL.FAVORITES}`, userData.auth_token);
  }, [fetchFavorites]);

  return (
    <div className="small-container">
      <h2 className="title">{categoriesData.categories[0].name}</h2>
      <div className="row-wrap">
        {
          productData && productData.length
            ? productData.map(product => <Product key={product.id} product={product} />) : (
              <h2 className="info">Favorite empty</h2>
            )
        }
      </div>
    </div>
  );
};

FavoriteProductComponent.propTypes = {
  productData: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const productData = getFilterFavorite(state);
  return { productData };
};

export default connect(
  mapStateToProps,
  { fetchFavorites },
)(FavoriteProductComponent);

/* eslint-enable max-len */

/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFavoriteProducts } from '../actions';
import { URL } from '../constants';

import { getFilterFavoriteProduct } from '../redux/selectors';
import Product from '../components/Product';

const FavoriteProductComponent = ({
  match, productData, fetchFavoriteProducts,
}) => {
  const { id } = match.params;
  const userData = JSON.parse(sessionStorage.getItem('user'));
  useEffect(() => {
    fetchFavoriteProducts(`${URL.BASE}${URL.FAVORITE_PRODUCTS}`, id, userData.auth_token);
  }, [fetchFavoriteProducts]);

  return (
    <div className="small-container">
      <div className="row-wrap">
        {
          productData && productData.length
            ? productData.map(product => <Product key={product.id} product={product} />) : (
              <h2 className="info">No Products for this Favorite.</h2>
            )
        }
      </div>
    </div>
  );
};

FavoriteProductComponent.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  productData: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchFavoriteProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const productData = getFilterFavoriteProduct(state);
  return { productData };
};

export default connect(
  mapStateToProps,
  { fetchFavoriteProducts },
)(FavoriteProductComponent);

/* eslint-enable max-len */

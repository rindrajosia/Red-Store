/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFavoriteProducts } from '../actions';
import { URL } from '../constants';

import { getUserInfo, getFilterFavoriteProduct } from '../redux/selectors';
import Product from '../components/Product';

const FavoriteProductComponent = ({
  match, userData, productData, fetchFavoriteProducts,
}) => {
  const { id } = match.params;
  useEffect(() => {
    fetchFavoriteProducts(`${URL.BASE}${URL.FAVORITE_PRODUCTS}`, id, userData.user.auth_token);
  }, [fetchFavoriteProducts]);

  return (
    <div className="small-container">
      <div className="row-wrap">
        {
          productData && productData.length
            ? productData.map(product => <Product key={product.id} product={product} />) : (
              <h2 className="info">No Products for this category.</h2>
            )
        }
      </div>
    </div>
  );
};

FavoriteProductComponent.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  productData: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchFavoriteProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  const productData = getFilterFavoriteProduct(state);
  return { userData, productData };
};

export default connect(
  mapStateToProps,
  { fetchFavoriteProducts },
)(FavoriteProductComponent);

/* eslint-enable max-len */

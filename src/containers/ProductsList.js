/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProducts, fetchCategories } from '../actions';
import { URL } from '../constants';

import { getProductByCatId, getCategoriesList } from '../redux/selectors';
import Product from '../components/Product';

const ProductComponent = ({
  productDataOne, productDataTwo, productDataThree, fetchProducts, fetchCategories, categoriesData,
}) => {
  useEffect(() => {
    fetchProducts(`${URL.BASE}${URL.PRODUCTS}`);
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories(`${URL.BASE}${URL.FETCH_CATEGORIES}`);
  }, [fetchCategories]);

  return (
    <>
      <main>
        {categoriesData.loading && <h2>Loading</h2> }
        {categoriesData.error && <h2>{categoriesData.error}</h2> }
        {categoriesData.categories && categoriesData.categories.length && (
        <>
          <h2 className="title">{categoriesData.categories[0].name}</h2>

          <div className="small-container">
            <div className="row-wrap">
              {productDataOne.loading && <h2 className="info">Loading</h2>}
              {productDataOne.error && <h2 className="info">{productDataOne.error}</h2>}
              {
              productDataOne && productDataOne.products && productDataOne.products.length
                ? productDataOne.products.map(product => <Product key={product.id} product={product} />) : (
                  <h2 className="info">No Products for this category.</h2>
                )
            }
            </div>
          </div>

          <h2 className="title">{categoriesData.categories[1].name}</h2>

          <div className="small-container">
            <div className="row-wrap">
              {productDataTwo.loading && <h2 className="info">Loading</h2>}
              {productDataTwo.error && <h2 className="info">{productDataTwo.error}</h2>}
              {
              productDataTwo && productDataTwo.products && productDataTwo.products.length
                ? productDataTwo.products.map(product => <Product key={product.id} product={product} />) : (
                  <h2 className="info">No Products for this category.</h2>
                )
            }
            </div>
          </div>

          <h2 className="title">{categoriesData.categories[2].name}</h2>

          <div className="small-container">
            <div className="row-wrap">
              {productDataThree.loading && <h2 className="info">Loading</h2>}
              {productDataThree.error && <h2 className="info">{productDataThree.error}</h2>}
              {
              productDataThree && productDataThree.products && productDataThree.products.length
                ? productDataThree.products.map(product => <Product key={product.id} product={product} />) : (
                  <h2 className="info">No Products for this category.</h2>
                )
            }
            </div>
          </div>
        </>
        )}

      </main>

    </>
  );
};

ProductComponent.propTypes = {
  productDataOne: PropTypes.oneOfType([PropTypes.object]).isRequired,
  productDataTwo: PropTypes.oneOfType([PropTypes.object]).isRequired,
  productDataThree: PropTypes.oneOfType([PropTypes.object]).isRequired,
  categoriesData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  fetchProducts: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { filterCategory } = state;
  const productDataOne = getProductByCatId(state, 1);
  const productDataTwo = getProductByCatId(state, 2);
  const productDataThree = getProductByCatId(state, 3);
  const categoriesData = getCategoriesList(state);
  return {
    filterCategory, categoriesData, productDataOne, productDataTwo, productDataThree,
  };
};

export default connect(
  mapStateToProps,
  { fetchProducts, fetchCategories },
)(ProductComponent);

/* eslint-enable max-len */

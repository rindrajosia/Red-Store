/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';
import { URL } from '../constants';

import { getProductList } from '../redux/selectors';
import ProductArray from '../components/ProductArray';

const AllProducts = ({
  productData, fetchProducts,
}) => {
  useEffect(() => {
    fetchProducts(`${URL.BASE}${URL.PRODUCTS}`);
  }, [fetchProducts]);

  return (
    <>
      <main>

        {productData.loading && <h2 className="info">Loading</h2>}
        {productData.error && <h2 className="info">{productData.error}</h2>}
        <table className="styled-table">
          <tbody>
            {
              productData && productData.products && productData.products.length
                ? productData.products.map(product => <ProductArray key={product.id} product={product} />) : (
                  <tr>
                    <td>
                      No Products.
                    </td>
                  </tr>
                )
            }
          </tbody>
        </table>

      </main>

    </>
  );
};

AllProducts.propTypes = {
  productData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  fetchProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const productData = getProductList(state);
  return {
    productData,
  };
};

export default connect(
  mapStateToProps,
  { fetchProducts },
)(AllProducts);

/* eslint-enable max-len */

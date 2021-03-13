import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, changeFilterCategory } from '../actions';
import { URL } from '../constants';

import { getProductByCategory } from '../redux/selectors';

const ProductComponent = ({ productData, fetchProducts, changeFilterCategory }) => {
  useEffect(() => {
    fetchProducts(`${URL.BASE}${URL.PRODUCTS}`);
  }, [fetchProducts]);

  const handleFilterChange = filter => {
    changeFilterCategory(filter);
  };

  return (
    <>
      <div className="lesson-panel">
        hello
      </div>
    </>
  );
};


const mapStateToProps = state => {
  const { filter } = state;
  const productData = getProductByCategory(state, 'All');
  return { productData };
};

export default connect(
  mapStateToProps,
  { fetchProducts, changeFilterCategory },
)(ProductComponent);

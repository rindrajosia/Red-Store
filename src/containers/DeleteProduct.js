/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { URL } from '../constants';
import { deleteProduct } from '../actions';
import {
  getProductById, getProductList,
} from '../redux/selectors';

const DeleteProduct = ({
  match, deleteProduct, productData, history,
}) => {
  const userData = JSON.parse(sessionStorage.getItem('user'));
  const { id } = match.params;
  const details = getProductById(productData, id);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!details.title || !id) {
      setError(prevState => `${prevState}  Product with id ${id} not found`);
    } else {
      deleteProduct(id, `${URL.BASE}${URL.PRODUCTS}`, userData.auth_token).then(() => {
        setSuccess(prevState => `${prevState} Deleted with success`);
        history.push('/');
      }).catch(() => {
        setError(prevState => `${prevState}  Error network`);
      });
    }
  };

  return (
    <main className="main-del">
      {error && <h5 className="center">{error}</h5>}
      {success && (
      <h2>
        {success}
        {' '}
      </h2>
      )}
      <div className="row-wrap">
        {!userData.admin && !userData && <Redirect to="/" /> }
      </div>
      <div className="center">
        <img src={details.imageurl} className="img-edit" alt="product" />
      </div>
      <p className="sign" align="center">Delete product</p>
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
          id="title"
          name="title"
          value={details.title}
          placeholder="title"
          className="un"
          disabled
        />

        <div className="center">
          <button type="submit" className="btn" onClick={handleSubmit}>
            Delete
          </button>
        </div>
      </form>
    </main>
  );
};

DeleteProduct.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  productData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const productData = getProductList(state);
  return { productData };
};

export default connect(
  mapStateToProps,
  { deleteProduct },
)(DeleteProduct);

/* eslint-enable max-len */

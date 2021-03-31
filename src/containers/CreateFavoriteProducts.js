/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { URL } from '../constants';
import { createFavorite } from '../actions';

const CreateFavoriteProducts = ({
  match, createFavorite, history,
}) => {
  const userData = JSON.parse(sessionStorage.getItem('user'));

  const { id } = match.params;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const favorite = { user_id: userData.user.user_id, product_id: id };

  const handleSubmit = e => {
    e.preventDefault();
    if (favorite.user_id && favorite.user_id) {
      createFavorite(`${URL.BASE}${URL.FAVORITES}`, userData.auth_token, favorite).then(() => {
        setSuccess(prevState => `${prevState} Adding with success`);
        history.push('/favorite-product');
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
      <div className="center">
        <button type="submit" className="btn" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </main>
  );
};

CreateFavoriteProducts.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  createFavorite: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(
  null,
  { createFavorite },
)(CreateFavoriteProducts);

/* eslint-enable max-len */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { URL } from '../constants';
import { createFavorite } from '../actions';

const CreateFavorite = ({
  createFavorite, history,
}) => {
  const userData = JSON.parse(sessionStorage.getItem('user'));
  const [favorite, setFavorite] = useState({ name: '', priority: '1' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleChange = e => {
    const { name, value } = e.target;
    setFavorite({ ...favorite, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (favorite.name && favorite.priority) {
      createFavorite(`${URL.BASE}${URL.FAVORITES}`, userData.auth_token, favorite).then(() => {
        setSuccess(prevState => `${prevState} Add with success`);
        history.push('/favorite');
      }).catch(() => {
        setError(prevState => `${prevState} Network error`);
      });
    } else {
      setError(prevState => `${prevState} Favorite should not empty`);
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
      <p className="sign" align="center">Add favorite</p>
      <form className="form1">

        <input
          type="text"
          id="name"
          name="name"
          value={favorite.name}
          onChange={handleChange}
          className="un"
          placeholder="Favorite"
        />
        <select name="priority" id="priority" className="un" value={favorite.priority} onChange={handleChange}>
          <option value={1}>
            Low
          </option>
          <option value={2}>
            Medium
          </option>
          <option value={3}>
            High
          </option>
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

CreateFavorite.propTypes = {
  createFavorite: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(
  null,
  { createFavorite },
)(CreateFavorite);

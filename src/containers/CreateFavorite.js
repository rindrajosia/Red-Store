import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { URL } from '../constants';
import { createFavorite } from '../actions';
import { getUserInfo } from '../redux/selectors';

const CreateFavorite = ({ createFavorite, userData }) => {
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
      createFavorite(`${URL.BASE}${URL.FAVORITES}`, userData.user.auth_token, favorite);
      setSuccess(prevState => `${prevState} Add with success`);
    } else {
      setError(prevState => `${prevState} Name should not empty`);
    }
  };

  return (
    <main className="main-sign">
      {error && <h2>{error}</h2>}
      {success && (
      <h2>
        {success}
        {' '}
        <Redirect to="/" />
      </h2>
      )}
      <div className="row-wrap">
        {userData.loading && <h2 className="info">Loading</h2>}
        {!userData.user.auth_token && !userData && <Redirect to="/" /> }
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
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  createFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  return { userData };
};

export default connect(
  mapStateToProps,
  { createFavorite },
)(CreateFavorite);

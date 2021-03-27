import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { URL } from '../constants';
import { deleteFavorite } from '../actions';
import { getUserInfo, getFavoriteById, getFavoriteList } from '../redux/selectors';

const DeleteFavorite = ({
  match, deleteFavorite, favoriteData, userData,
}) => {
  const { id } = match.params;
  const details = getFavoriteById(favoriteData, id);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!details.name || !id) {
      setError(prevState => `${prevState}  Favorite with id ${id} not found`);
    } else {
      deleteFavorite(id, `${URL.BASE}${URL.FAVORITES}`, userData.user.auth_token);
      setSuccess(prevState => `${prevState} Delete with success`);
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
      <p className="sign" align="center">Delete favorite</p>
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
          id="name"
          name="name"
          value={details.name}
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

DeleteFavorite.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  favoriteData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  deleteFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  const favoriteData = getFavoriteList(state);
  return { userData, favoriteData };
};

export default connect(
  mapStateToProps,
  { deleteFavorite },
)(DeleteFavorite);

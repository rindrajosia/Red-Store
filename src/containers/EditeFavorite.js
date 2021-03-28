import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { URL } from '../constants';
import { updateFavorite } from '../actions';
import { getFavoriteById, getFavoriteList } from '../redux/selectors';

const EditeFavorite = ({
  match, updateFavorite, favoriteData, history,
}) => {
  const { id } = match.params;
  const userData = JSON.parse(sessionStorage.getItem('user'));
  const details = getFavoriteById(favoriteData, id);
  const [favorite, setFavorite] = useState({ name: details.name, priority: details.priority });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleChange = e => {
    const { name, value } = e.target;
    setFavorite({ ...favorite, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (favorite.name && favorite.priority) {
      updateFavorite(id, `${URL.BASE}${URL.FAVORITES}`, userData.auth_token, favorite).then(() => {
        setSuccess(prevState => `${prevState} Edit with success`);
        history.push('/favorite');
      }).catch(() => {
        setError(prevState => `${prevState} Error network`);
      });
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
      </h2>
      )}
      <div className="row-wrap">
        {!userData.auth_token && !userData && <Redirect to="/" /> }
      </div>
      <p className="sign" align="center">Edit favorite</p>
      <form className="form1">
        <input
          type="text"
          id="name"
          name="name"
          value={favorite.name}
          onChange={handleChange}
          className="un"
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
            Edit
          </button>
        </div>
      </form>
    </main>
  );
};

EditeFavorite.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  favoriteData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  updateFavorite: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => {
  const favoriteData = getFavoriteList(state);
  return { favoriteData };
};

export default connect(
  mapStateToProps,
  { updateFavorite },
)(EditeFavorite);

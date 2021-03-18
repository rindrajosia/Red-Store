import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { URL } from '../constants';
import { updateFavorite } from '../actions';
import { getUserInfo, getFavoriteById, getFavoriteList } from '../redux/selectors';

const EditeFavorite = ({
  match, updateFavorite, favoriteData, userData,
}) => {
  const { id } = match.params;
  const details = getFavoriteById(favoriteData, id);
  const [favorite, setFavorite] = useState({ name: details.name, priority: details.priority });
  const [error, setError] = useState('');
  const handleChange = e => {
    const { name, value } = e.target;
    setFavorite({ ...favorite, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (favorite.name && favorite.priority) {
      updateFavorite(id, `${URL.BASE}${URL.FAVORITES}`, userData.user.auth_token, favorite);
    } else {
      setError(prevState => `${prevState} Name should not empty`);
    }
  };

  return (
    <div className="wrapper">
      {error && <h2>{error}</h2>}
      <form>
        <fieldset>
          <label htmlFor="name">
            {' '}
            Title:
            <input
              type="text"
              id="name"
              name="name"
              value={favorite.name}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <fieldset>
          <label htmlFor="priority">
            {' '}
            Priority:
            <select name="priority" id="priority" value={favorite.priority} onChange={handleChange}>
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
          </label>
        </fieldset>

        <button type="submit" className="btn" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

EditeFavorite.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  favoriteData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  updateFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  const favoriteData = getFavoriteList(state);
  return { userData, favoriteData };
};

export default connect(
  mapStateToProps,
  { updateFavorite },
)(EditeFavorite);

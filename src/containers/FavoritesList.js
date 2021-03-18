/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFavorites } from '../actions';
import { URL } from '../constants';

import Favorite from '../components/Favorite';
import { getUserInfo, getFavoriteList } from '../redux/selectors';

const FavoriteComponent = ({ userData, favoriteData, fetchFavorites }) => {
  useEffect(() => {
    fetchFavorites(`${URL.BASE}${URL.FAVORITES}`, userData.user.auth_token);
  }, [fetchFavorites]);

  return (
    <div className="small-container">
      <div className="row row-2">
        <Link to="/new-favorite" className="btn">New Favorite </Link>
        <h2>Favotites</h2>
      </div>
      <div className="row-wrap">
        {favoriteData.loading && <h2 className="info">Loading</h2>}
        {favoriteData.error && <h2 className="info">{favoriteData.error}</h2>}
        {
          favoriteData && favoriteData.favorites && favoriteData.favorites.length
            ? favoriteData.favorites.map(favorite => <Favorite key={favorite.id} favorite={favorite} />) : (
              <h2 className="info">No Favorites.</h2>
            )
        }
      </div>
    </div>
  );
};

FavoriteComponent.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  favoriteData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  fetchFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  const favoriteData = getFavoriteList(state);
  return { userData, favoriteData };
};

export default connect(
  mapStateToProps,
  { fetchFavorites },
)(FavoriteComponent);
/* eslint-enable max-len */

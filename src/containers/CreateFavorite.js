import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { URL } from '../constants';
import { createFavorite } from '../actions';
import { getUserInfo } from '../redux/selectors';

const CreateFavorite = ({ createFavorite, userData, }) => {



  const [favorite, setFavorite] = useState({ name: '', priority: '1'});
  const [error, setError] = useState('');
  const handleChange = e => {
    const { name, value } = e.target;
    setFavorite({ ...favorite, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (favorite.name && favorite.priority) {
        createFavorite(`${URL.BASE}${URL.FAVORITES}`, userData.user.auth_token, favorite);
      }else{
        setError((prevState) => {
          return `${prevState} Name should not empty`;
        });
      }
  };

  return (
    <div className="wrapper">
      {error && <h2>{error}</h2>}
      <form>
      <fieldset>
        <label htmlFor="name"> Title:
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
           <label htmlFor="priority"> Priority:
           <select name="priority" id ="priority" value={favorite.priority} onChange={handleChange}>
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

        <button type='submit' className='btn' onClick={handleSubmit}>
            Login
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  return { userData };
};

export default connect(
  mapStateToProps,
  { createFavorite },
)(CreateFavorite);

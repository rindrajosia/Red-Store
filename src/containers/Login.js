import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import { URL } from '../constants';
import { getUserInfo } from '../redux/selectors';

const Login = ({ userData, fetchUser }) => {
  const [login, setLogin] = useState({ email: '', password: '' });
  const handleChange = e => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (login.email && login.password) {
      fetchUser(`${URL.BASE}${URL.FETCH_USER}`, login);
      setLogin({ email: '', password: '' });
    }
  };
  return (
    <div className="wrapper">
      <div className="row-wrap">
        {userData.loading && <h2 className="info">Loading</h2>}
        {!userData.loading && userData.user.message && !userData.user.auth_token && <h2 className="info">E-mail and Password Invalid</h2>}
        {userData.user.auth_token && <Redirect to="/" /> }
      </div>
      <form>
        <fieldset>
          <label htmlFor="email">
            {' '}
            E-mail:
            <input
              type="email"
              id="email"
              name="email"
              value={login.email}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="password">
            {' '}
            Password:
            <input
              type="password"
              id="password"
              name="password"
              value={login.password}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <button type="submit" className="btn" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  fetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  return { userData };
};

export default connect(
  mapStateToProps,
  { fetchUser },
)(Login);

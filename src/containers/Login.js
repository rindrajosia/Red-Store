import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import { URL } from '../constants';
import { getUserInfo } from '../redux/selectors';

const Login = ({ userData, fetchUser }) => {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [disable, setDisable] = useState('');
  const handleChange = e => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (login.email && login.password) {
      fetchUser(`${URL.BASE}${URL.FETCH_USER}`, login);
      setDisable({ disable: 'disabled' });
      setLogin({ email: '', password: '' });
    }
  };
  return (

    <main className="main-sign">
      <div className="row-wrap">
        {userData.loading && <h2 className="info">Loading</h2>}
        {!userData.loading && userData.user.message && !userData.user.auth_token && <h2 className="info">E-mail and Password Invalid</h2>}
        {userData.user.auth_token && <Redirect to="/" /> }
      </div>
      <p className="sign" align="center">Sign in</p>
      <form className="form1">
        <input
          type="email"
          id="email"
          name="email"
          value={login.email}
          onChange={handleChange}
          className="un"
          placeholder="email"
        />
        <input
          type="password"
          id="password"
          name="password"
          value={login.password}
          onChange={handleChange}
          className="pass"
          placeholder="password"
        />
        <div className="center">
          <button type="submit" disabled={disable} className="btn" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </form>

    </main>

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

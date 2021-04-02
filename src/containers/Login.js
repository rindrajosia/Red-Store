import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import { URL } from '../constants';
import { getUserInfo } from '../redux/selectors';
import { validateEmail } from '../logic/checkEmail';
import imageLoading from '../assets/images/loading.gif';

const Login = ({ userData, fetchUser, history }) => {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = e => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (login.email && login.password) {
      if (!validateEmail(login.email)) {
        setError('Not a valid email');
      } else {
        setError('');
        setLoading(true);
        fetchUser(`${URL.BASE}${URL.FETCH_USER}`, login).then(() => {
          history.push('/');
        }).catch(() => {
          setLoading(false);
          setError('Wrong email or password');
        });
      }
    } else {
      setError('All fields should not be empty');
    }
  };
  return (

    <main className="main-sign">
      <div className="row-wrap">
        {error && <h5 className="center">{error}</h5>}
        {!userData.loading && userData.user.message && !userData.user.auth_token && <h2 className="info">E-mail and Password Invalid</h2>}
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
          {!loading && (
            <button type="submit" className="btn" onClick={handleSubmit}>
              Log in
            </button>
          )}
          {loading && <img src={imageLoading} alt="loading" />}
        </div>
      </form>

    </main>

  );
};

Login.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  fetchUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  return { userData };
};

export default connect(
  mapStateToProps,
  { fetchUser },
)(Login);

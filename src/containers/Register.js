import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import { URL } from '../constants';
import { getUserInfo } from '../redux/selectors';
import { validateEmail } from '../logic/checkEmail';
import imageLoading from '../assets/images/loading.gif';

const Register = ({ userData, createUser, history }) => {
  const [login, setLogin] = useState({
    name: '', email: '', password: '', admin: '', imageurl: 'https://res.cloudinary.com/rindrajosia/image/upload/v1616802722/xt14bzu6fcir16pf3cxm.png',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = e => {
    const { name, value } = e.target;
    if (name !== 'imageurl') {
      setLogin({ ...login, [name]: value });
    } else {
      setLogin({ ...login, [name]: e.target.files[0] });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (login.email && login.password && login.name) {
      if (!validateEmail(login.email) || login.name.length > 50 || login.password.length < 4) {
        setError('Not a valid email or name > 50 or password < 4');
      } else {
        setLoading(true);
        createUser(`${URL.BASE}${URL.CREATE_USER}`, login).then(() => {
          history.push('/');
        }).catch(() => {
          setLoading(false);
          setError('Error network');
        });
      }
    } else {
      setError('All fields should not be empty');
    }
  };
  return (

    <main className="main">
      <div className="row-wrap">
        {error && <h5 className="center">{error}</h5>}
        {!userData.loading && userData.user.message && !userData.user.auth_token && <h2 className="info">User not created</h2>}
      </div>
      <p className="sign" align="center">Register</p>
      <form className="form1">
        <input
          type="text"
          id="name"
          name="name"
          value={login.name}
          onChange={handleChange}
          className="un"
          placeholder="name"
        />
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
        <select name="admin" id="admin" className="un" value={login.admin} onChange={handleChange}>
          <option value={false}>
            False
          </option>
          <option value>
            True
          </option>
        </select>
        <div className="center">
          {!loading && (
            <button type="submit" className="btn" onClick={handleSubmit}>
              Sign up
            </button>
          )}
          {loading && <img src={imageLoading} alt="loading" />}
        </div>
      </form>

    </main>

  );
};

Register.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  createUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  return { userData };
};

export default connect(
  mapStateToProps,
  { createUser },
)(Register);

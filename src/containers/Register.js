import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import { URL, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from '../constants';
import { getUserInfo } from '../redux/selectors';
import { imgCheck } from '../logic/checkImg';

const Register = ({ userData, createUser }) => {
  const [login, setLogin] = useState({
    name: '', email: '', password: '', admin: '', imageurl: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleChange = e => {
    const { name, value } = e.target;
    if (name !== 'imageurl') {
      setLogin({ ...login, [name]: value });
    } else {
      setLogin({ ...login, [name]: e.target.files[0] });
    }
  };

  const handleImageUpload = file => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(response => {
        if (response.secure_url !== '') {
          const data = { ...login, imageurl: response.secure_url };
          createUser(`${URL.BASE}${URL.CREATE_USER}`, data);
          setSuccess(prevState => `${prevState} Adding with success`);
        }
      })
      .catch(err => {
        setError(prevState => `${prevState} ${err} `);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (login.email && login.password && login.name && login.imageurl) {
      if (!imgCheck(login.imageurl.name) || login.name.length > 50 || login.password.length < 4) {
        console.log('sfsf');
        setError(prevState => `${prevState} Not an image or name > 50 or password < 4`);
      } else {
        handleImageUpload(login.imageurl);
        setLogin({
          name: '', email: '', password: '', admin: '', imageurl: '',
        });
      }
    } else {
      setError(prevState => `${prevState} Not an image or name > 50 or password < 4`);
    }
  };
  return (

    <main className="main-edit">
      <div className="row-wrap">
        {error && <h5 className="center">{error}</h5>}
        {userData.loading && <h2 className="info">Loading</h2>}
        {!userData.loading && userData.user.message && !userData.user.auth_token && <h2 className="info">User not created</h2>}
        {userData.user.auth_token && (
        <h2>
          {success}
          {' '}
          <Redirect to="/" />
        </h2>
        )}
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
        <input name="imageurl" className="un" onChange={handleChange} type="file" multiple={false} accept="/images/*" />
        <div className="center">
          <button type="submit" className="btn" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </form>

    </main>

  );
};

Register.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  return { userData };
};

export default connect(
  mapStateToProps,
  { createUser },
)(Register);

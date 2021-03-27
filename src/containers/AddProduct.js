/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { imgCheck } from '../logic/checkImg';
import { URL, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from '../constants';
import { createProduct } from '../actions';
import { getUserInfo, getCategoriesList } from '../redux/selectors';

const AddProduct = ({
  createProduct, userData, categoriesData,
}) => {
  const [product, setProduct] = useState({
    title: '', description: '', category_id: '1', imageurl: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const handleChange = e => {
    const { name, value } = e.target;
    if (name !== 'imageurl') {
      setProduct({ ...product, [name]: value });
    } else {
      setProduct({ ...product, [name]: e.target.files[0] });
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
          const data = { ...product, imageurl: response.secure_url };
          createProduct(`${URL.BASE}${URL.PRODUCTS}`, userData.user.auth_token, data);
          setSuccess(prevState => `${prevState} Adding with success`);
        }
      })
      .catch(err => {
        setError(prevState => `${prevState} ${err} `);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (product.title && product.description && product.category_id && product.imageurl) {
      if (!imgCheck(product.imageurl.name) || product.title.length < 10 || product.description.length < 10) {
        setError(prevState => `${prevState} Not an image or title and desription length < 10 `);
      } else {
        handleImageUpload(product.imageurl);
      }
    }
  };

  return (
    <main className="main">
      {error && <h5 className="center">{error}</h5>}
      {success && (
      <h2>
        {success}
        {' '}
        <Redirect to="/" />
      </h2>
      )}
      <div className="row-wrap">
        {userData.loading && <h2 className="info">Loading</h2>}
        {!userData.user.user.admin && <Redirect to="/" /> }
      </div>
      <p className="sign" align="center">Add new product</p>
      <form className="form1">
        <input
          type="text"
          id="title"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="title"
          className="un"
        />
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="description"
          className="pass"
        />

        <select name="category_id" className="un" id="category" value={product.category} onChange={handleChange}>
          {categoriesData.categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input name="imageurl" className="un" onChange={handleChange} type="file" multiple={false} accept="/images/*" />

        <div className="center">
          <button type="submit" className="btn" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </form>
    </main>
  );
};

AddProduct.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  categoriesData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  createProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  const categoriesData = getCategoriesList(state);
  return { userData, categoriesData };
};

export default connect(
  mapStateToProps,
  { createProduct },
)(AddProduct);
/* eslint-enable max-len */

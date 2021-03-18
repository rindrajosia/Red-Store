import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
          const data = {
            title: product.title,
            description: product.description,
            category_id: product.category_id,
            imageurl: response.secure_url,
          };
          createProduct(`${URL.BASE}${URL.PRODUCTS}`, userData.user.auth_token, data);
        }
      })
      .catch(err => console.error(err));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (product.title && product.description && product.category_id && product.imageurl) {
      if (!imgCheck(product.imageurl.name)) {
        setError(prevState => `${prevState} Not an Image!`);
      } else {
        handleImageUpload(product.imageurl);
      }
    }
  };

  return (
    <div className="wrapper">
      {error && <h2>{error}</h2>}
      <form>
        <fieldset>
          <label htmlFor="title">
            {' '}
            Title:
            <input
              type="text"
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <fieldset>
          <label htmlFor="description">
            {' '}
            Description:
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <fieldset>
          <label htmlFor="category">
            {' '}
            Categories:
            <select name="category_id" id="category" value={product.category} onChange={handleChange}>
              {categoriesData.categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="image">
            {' '}
            Image:
            <input name="imageurl" onChange={handleChange} type="file" multiple={false} accept="/images/*" />
          </label>
        </fieldset>

        <button type="submit" className="btn" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
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

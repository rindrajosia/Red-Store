import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { imgCheck } from '../logic/checkImg';
import { URL, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from '../constants';
import { fetchCategories, createProduct } from '../actions';
import CategoryFilter from './CategoryFilter';
import { getUserInfo, getCategoriesList } from '../redux/selectors';

const AddProduct = ({ createProduct, userData, categoriesData, fetchCategories, getCategoriesList }) => {

  useEffect(() => {
    fetchCategories(`${URL.BASE}${URL.FETCH_CATEGORIES}`);
  }, [fetchCategories]);

  const [product, setProduct] = useState({ title: '', description: '', category_id: '1', imageurl:''});
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const handleChange = e => {
    const { name, value } = e.target;
    name !== "imageurl" ? setProduct({ ...product, [name]: value }) : setProduct({ ...product, [name]: e.target.files[0] })
  };

  const handleImageUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);


    fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        if (response.secure_url !== '') {
          let data = {
            title: product.title,
            description: product.description,
            category_id: product.category_id,
            imageurl: response.secure_url,
          }
          createProduct(`${URL.BASE}${URL.PRODUCTS}`, 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MTU5MjU0MTd9.SnjxYUDXITbWonqeEF1TIXe0iG34ApVQp725Fnffn2Y', data);
          }
      })
      .catch(err => console.error(err))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.title && product.description && product.category_id && product.imageurl) {
      if(!imgCheck(product.imageurl.name)){
        setError((prevState) => {
          return `${prevState} Not an Image!`;
        });
      }else{
        handleImageUpload(product.imageurl);
      }

    }
  };

  return (
    <div className="wrapper">
      {error && <h2>{error}</h2>}
      <form>
      <fieldset>
        <label htmlFor="title"> Title:
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
         <label htmlFor="description"> Description:
         <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange} />
         </label>
        </fieldset>

         <fieldset>
           <label htmlFor="category"> Categories:
           <select name="category_id" id ="category" value={product.category} onChange={handleChange}>
            {categoriesData.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
           </label>
          </fieldset>
        <fieldset>
          <label htmlFor="image"> Image:
          <input name="imageurl" onChange={handleChange} type="file" multiple={false} accept="/images/*" />
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
  const categoriesData = getCategoriesList(state);
  return { userData, categoriesData };
};

export default connect(
  mapStateToProps,
  { fetchCategories, createProduct },
)(AddProduct);

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { imgCheck } from '../logic/checkImg';
import { URL, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from '../constants';
import { updateProduct } from '../actions';
import CategoryFilter from './CategoryFilter';
import { getUserInfo, getCategoriesList, getProductById, getProductList } from '../redux/selectors';

const EditeProduct = ({ match, updateProduct, productData, userData, categoriesData, getCategoriesList }) => {

  const { id } = match.params;
  const details = getProductById(productData, id);
  const [product, setProduct] = useState({ title: details.title, description: details.description, category_id: details.category_id, imageurl: details.imageurl});
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
          updateProduct(details.id, `${URL.BASE}${URL.PRODUCTS}`, userData.user.auth_token, data);
          }
      })
      .catch(err => console.error(err))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.title && product.description && product.category_id && product.imageurl) {
      if(!imgCheck(product.imageurl.name) && product.imageurl !== details.imageurl){
        setError((prevState) => {
          return `${prevState} Not an Image!`;
        });
      }else{
        let dataUp = {
          title: product.title,
          description: product.description,
          category_id: product.category_id,
          imageurl: product.imageurl,
        }
        console.log(dataUp);
        product.imageurl !== details.imageurl? handleImageUpload(product.imageurl) : updateProduct(details.id, `${URL.BASE}${URL.PRODUCTS}`, userData.user.auth_token, dataUp);
      }

    }
  };

  return (
    <div className="wrapper">
      {error && <h2>{error}</h2>}
      <div className="col-2">
        <img className="img-single" src={details.imageurl} alt="" />
      </div>
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
           <select name="category_id" id ="category" value={product.category_id} onChange={handleChange}>
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
  const productData = getProductList(state);
  return { userData, categoriesData, productData };
};

export default connect(
  mapStateToProps,
  { updateProduct },
)(EditeProduct);

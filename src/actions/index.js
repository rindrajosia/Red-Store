import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  CHANGE_FILTER_FAVORITE,
  CHANGE_FILTER_CATEGORY,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  FETCH_FAVORITES_REQUEST,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_FAILURE,
  CREATE_FAVORITE_REQUEST,
  CREATE_FAVORITE_SUCCESS,
  CREATE_FAVORITE_FAILURE,
  UPDATE_FAVORITE_REQUEST,
  UPDATE_FAVORITE_SUCCESS,
  UPDATE_FAVORITE_FAILURE,
  DELETE_FAVORITE_REQUEST,
  DELETE_FAVORITE_SUCCESS,
  DELETE_FAVORITE_FAILURE,
  FETCH_FAVORITE_PRODUCTS_REQUEST,
  FETCH_FAVORITE_PRODUCTS_SUCCESS,
  FETCH_FAVORITE_PRODUCTS_FAILURE,
  CREATE_FAVORITE_PRODUCT_REQUEST,
  CREATE_FAVORITE_PRODUCT_SUCCESS,
  CREATE_FAVORITE_PRODUCT_FAILURE,
} from './actionTypes';

export const uploadImageRequest = () => ({
  type: UPLOAD_IMAGE_REQUEST,
});

export const uploadImageSuccess = image => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: image,
});

export const uploadImageFailure = error => ({
  type: UPLOAD_IMAGE_FAILURE,
  payload: error,
});

export const changeFilterFavorite = filter => ({
  type: CHANGE_FILTER_FAVORITE,
  payload: {
    filter,
  },
});

export const changeFilterCategory = filter => ({
  type: CHANGE_FILTER_CATEGORY,
  payload: {
    filter,
  },
});

export const createUserRequest = () => ({
  type: CREATE_USER_REQUEST,
});

export const createUserSuccess = user => ({
  type: CREATE_USER_SUCCESS,
  payload: user,
});

export const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  payload: error,
});

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = error => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const createProductRequest = () => ({
  type: CREATE_PRODUCT_REQUEST,
});

export const createProductSuccess = products => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: products,
});

export const createProductFailure = error => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error,
});

export const updateProductRequest = () => ({
  type: UPDATE_PRODUCT_REQUEST,
});

export const updateProductSuccess = products => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: products,
});

export const updateProductFailure = error => ({
  type: UPDATE_PRODUCT_FAILURE,
  payload: error,
});

export const deleteProductRequest = () => ({
  type: DELETE_PRODUCT_REQUEST,
});

export const deleteProductSuccess = products => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: products,
});

export const deleteProductFailure = error => ({
  type: DELETE_PRODUCT_FAILURE,
  payload: error,
});

export const fetchFavoritesRequest = () => ({
  type: FETCH_FAVORITES_REQUEST,
});

export const fetchFavoritesSuccess = favorites => ({
  type: FETCH_FAVORITES_SUCCESS,
  payload: favorites,
});

export const fetchFavoritesFailure = error => ({
  type: FETCH_FAVORITES_FAILURE,
  payload: error,
});

export const createFavoriteRequest = () => ({
  type: CREATE_FAVORITE_REQUEST,
});

export const createFavoriteSuccess = favorites => ({
  type: CREATE_FAVORITE_SUCCESS,
  payload: favorites,
});

export const createFavoriteFailure = error => ({
  type: CREATE_FAVORITE_FAILURE,
  payload: error,
});

export const updateFavoriteRequest = () => ({
  type: UPDATE_FAVORITE_REQUEST,
});

export const updateFavoriteSuccess = favorites => ({
  type: UPDATE_FAVORITE_SUCCESS,
  payload: favorites,
});

export const updateFavoriteFailure = error => ({
  type: UPDATE_FAVORITE_FAILURE,
  payload: error,
});

export const deleteFavoriteRequest = () => ({
  type: DELETE_FAVORITE_REQUEST,
});

export const deleteFavoriteSuccess = favorites => ({
  type: DELETE_FAVORITE_SUCCESS,
  payload: favorites,
});

export const deleteFavoriteFailure = error => ({
  type: DELETE_FAVORITE_FAILURE,
  payload: error,
});

export const fetchFavoriteProductsRequest = () => ({
  type: FETCH_FAVORITE_PRODUCTS_REQUEST,
});

export const fetchFavoriteProductsSuccess = favorites => ({
  type: FETCH_FAVORITE_PRODUCTS_SUCCESS,
  payload: favorites,
});

export const fetchFavoriteProductsFailure = error => ({
  type: FETCH_FAVORITE_PRODUCTS_FAILURE,
  payload: error,
});

export const createFavoriteProductRequest = () => ({
  type: CREATE_FAVORITE_PRODUCT_REQUEST,
});

export const createFavoriteProductSuccess = favorites => ({
  type: CREATE_FAVORITE_PRODUCT_SUCCESS,
  payload: favorites,
});

export const createFavoriteProductFailure = error => ({
  type: CREATE_FAVORITE_PRODUCT_FAILURE,
  payload: error,
});

export const uploadImage = (url, preset, file) => dispatch => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  dispatch(uploadImageRequest);
  return fetch(url,{
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    dispatch(uploadImageSuccess(result.secure_url));
  })
  .catch(error => {
    dispatch(uploadImageFailure(error));
  });
};

export const createUser = (url, data) => dispatch => {
  dispatch(createUserRequest);
  return fetch(url,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => {
    dispatch(createUserSuccess(result));
  })
  .catch(error => {
    dispatch(createUserFailure(error));
  });
};

export const fetchUser = (url, data) => dispatch => {
  dispatch(fetchUserRequest);
  return fetch(url,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => {
    dispatch(fetchUserSuccess(result));
  })
  .catch(error => {
    dispatch(fetchUserFailure(error));
  });
};

export const fetchCategories = url => dispatch => {
  dispatch(fetchCategoriesRequest);
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error - 404 not found');
      }
      return response.json();
    })
    .then(data => {
      dispatch(fetchCategoriesSuccess(data));
    })
    .catch(error => {
      dispatch(fetchCategoriesFailure(error));
    });
};

export const fetchProducts = url => dispatch => {
  dispatch(fetchProductsRequest);
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error - 404 not found');
    }
    return response.json();
  })
  .then(data => {
    dispatch(fetchProductsSuccess(data));
  })
  .catch(error => {
    dispatch(fetchProductsFailure(error));
  });
};

export const createProduct = (url, token, data) => dispatch => {
  dispatch(createProductRequest);
  return fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'Accept': `application/vnd.shop.admin+json`
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => {
    dispatch(createProductSuccess(result));
  })
  .catch(error => {
    dispatch(createProductFailure(error));
  });
};

export const updateProduct = (id, url, token, data) => dispatch => {
  dispatch(updateProductRequest);
  return fetch(`${url}/${id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'Accept': `application/vnd.shop.admin+json`
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => {
    dispatch(updateProductSuccess(result));
  })
  .catch(error => {
    if (Object.keys(error).length !== 0){
      dispatch(updateProductFailure(error));
    }else{
      updateProductSuccess(error);
    }
  });
};

export const deleteProduct = (id, url, token, data) => dispatch => {
  dispatch(deleteProductRequest);
  return fetch(`${url}/${id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'Accept': `application/vnd.shop.admin+json`
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => {
    dispatch(deleteProductSuccess(result));
  })
  .catch(error => {
    dispatch(deleteProductFailure(error));
  });
};

export const fetchFavorites = (url, token, role, data) => dispatch => {
  dispatch(fetchFavoritesRequest);
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'Accept': `application/vnd.shop.${role}+json`
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error - 404 not found');
    }
    return response.json();
  })
  .then(response => {
    dispatch(fetchFavoritesSuccess(response));
  })
  .catch(error => {
    dispatch(fetchFavoritesFailure(error));
  });
};

export const createFavorite = (url, token, role, data) => dispatch => {
  dispatch(createFavoriteRequest);
  return fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'Accept': `application/vnd.shop.admin+json`
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(response => {
    dispatch(createFavoriteSuccess(response));
  })
  .catch(error => {
    dispatch(createFavoriteFailure(error));
  });
};

export const updateFavorite = (id, url, token, role, data) => dispatch => {
  dispatch(updateFavoriteRequest);
  return fetch(`${url}/${id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'Accept': `application/vnd.shop.admin+json`
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(response => {
    dispatch(updateFavoriteSuccess(response));
  })
  .catch(error => {
    dispatch(updateFavoriteFailure(error));
  });
};

export const deleteFavorite = (id, url, token, role, data) => dispatch => {
  dispatch(deleteFavoriteRequest);
  return fetch(`${url}/${id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'Accept': `application/vnd.shop.admin+json`
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(response => {
    dispatch(deleteFavoriteSuccess(response));
  })
  .catch(error => {
    dispatch(deleteFavoriteFailure(error));
  });
};

export const fetchFavoriteProducts = (url, token, role) => dispatch => {
  dispatch(fetchFavoriteProductsRequest);
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'Accept': `application/vnd.shop.${role}+json`
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error - 404 not found');
    }
    return response.json();
  })
  .then(data => {
    dispatch(fetchFavoriteProductsSuccess(data));
  })
  .catch(error => {
    dispatch(fetchFavoriteProductsFailure(error));
  });
};

export const createFavoriteProduct = (url, token, role, data) => dispatch => {
  dispatch(createFavoriteProductRequest);
  return fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'Accept': `application/vnd.shop.${role}+json`
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(response => {
    dispatch(createFavoriteProductSuccess(response));
  })
  .catch(error => {
    dispatch(createFavoriteProductFailure(error));
  });
};

import {
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
  CREATE_PRODUCTS_FAILURE,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_SUCCESS,
  FETCH_FAVORITES_REQUEST,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_FAILURE,
  FETCH_FAVORITE_PRODUCTS_REQUEST,
  FETCH_FAVORITE_PRODUCTS_SUCCESS,
  FETCH_FAVORITE_PRODUCTS_FAILURE,
} from './actionTypes';

export const createUserRequest = () => ({
  type: CREATE_USER_REQUEST,
});

export const createUserSuccess = user => ({
  type: CREATE_USER_SUCCESS,
  payload: data,
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
  payload: data,
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
  payload: data,
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
  payload: data,
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const createProductsRequest = () => ({
  type: CREATE_PRODUCTS_REQUEST,
});

export const createProductsSuccess = products => ({
  type: CREATE_PRODUCTS_SUCCESS,
  payload: data,
});

export const createProductsFailure = error => ({
  type: CREATE_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchFavoritesRequest = () => ({
  type: FETCH_FAVORITES_REQUEST,
});

export const fetchFavoritesSuccess = favorites => ({
  type: FETCH_FAVORITES_SUCCESS,
  payload: data,
});

export const fetchFavoritesFailure = error => ({
  type: FETCH_FAVORITES_FAILURE,
  payload: error,
});

export const fetchFavoriteProductsRequest = () => ({
  type: FETCH_FAVORITE_PRODUCTS_REQUEST,
});

export const fetchFavoriteProductsSuccess = favorites => ({
  type: FETCH_FAVORITE_PRODUCTS_SUCCESS,
  payload: data,
});

export const fetchFavoriteProductsFailure = error => ({
  type: FETCH_FAVORITE_PRODUCTS_FAILURE,
  payload: error,
});

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
    dispatch(createUserSuccess(result));
  })
  .catch(error => {
    dispatch(createUserFailure(error));
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
    body: JSON.stringify(data),
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

export const fetchFavorites = (url, token, role) => dispatch => {
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
  .then(data => {
    dispatch(fetchFavoritesSuccess(data));
  })
  .catch(error => {
    dispatch(fetchFavoritesFailure(error));
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
    body: JSON.stringify(data),
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

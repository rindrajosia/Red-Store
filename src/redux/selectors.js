import { CATEGORY_FILTERS } from '../constants';
/* eslint-disable max-len */
export const getCategoriesState = store => store.categoryFetch;
export const getCategoriesList = store => (getCategoriesState(store) || null);
export const getProductsState = store => store.productFetch;
export const getProductList = store => (getProductsState(store) || null);

export const getProductByCategory = (store, filterCategory) => {
  const allProducts = getProductList(store);
  switch (filterCategory) {
    case CATEGORY_FILTERS.ALL:
      return allProducts;
    default:
      return {
        ...allProducts,
        products: allProducts.products.filter(product => product.category_id === parseInt(filterCategory, 10)),
      };
  }
};

export const getProductByCatId = (store, catId) => {
  const allProducts = getProductList(store);
  return {
    ...allProducts,
    products: allProducts.products.filter(product => product.category_id === parseInt(catId, 10)),
  };
};

export const getProductById = (productList, id) => {
  const { products } = productList;
  return products.filter(product => product.id === parseInt(id, 10))[0];
};

export const getProductMaxId = productList => {
  const { products } = getProductList(productList);
  return products.reduce((a, b) => ((a.id > b.id) ? a : b));
};

export const getProductByIdState = store => store.productByIdFetch;
export const getProductBy = store => (getProductByIdState(store) || null);

export const getUserState = store => store.user;
export const getUserInfo = store => (getUserState(store) || null);

export const getImageState = store => store.uploadImage;
export const getImageInfo = store => (getImageState(store) || null);

export const getFavoritesState = store => store.favoriteFetch;
export const getFavoriteList = store => (getFavoritesState(store) || null);

export const getFavoriteById = (favoriteList, id) => {
  const { favorites } = favoriteList;
  return favorites.filter(favorite => favorite.id === parseInt(id, 10))[0];
};

export const getFavoriteProductsState = store => store.favoriteProductFetch;
export const getFavoriteProductList = store => (getFavoriteProductsState(store) || null);

export const getFilterFavoriteProduct = store => {
  const allFavoriteProducts = getFavoriteProductList(store).favorites_products;

  const productArray = allFavoriteProducts.reduce((acc, current) => {
    const x = acc.find(item => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    }
    return acc;
  }, []);
  return productArray;
};

/* eslint-enable max-len */

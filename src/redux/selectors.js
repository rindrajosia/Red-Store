import { CATEGORY_FILTERS } from '../constants';


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
        products: allProducts.products.filter(product => product.category_id === parseInt(filterCategory)),
      };
  }
};

export const getProductById = (productList, id) => {
  const { products } = productList;
  return products.filter(product => product.id === parseInt(id))[0];
};

export const getUserState = store => store.user;
export const getUserInfo = store => (getUserState(store) || null);

export const getImageState = store => store.uploadImage;
export const getImageInfo = store => (getImageState(store) || null);

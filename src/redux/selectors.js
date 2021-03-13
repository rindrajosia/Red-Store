import { CATEGORY_FILTERS } from '../constants';


export const getCategoriesState = store => store.categoryFetch;
export const getCategoriesList = store => (getCategoriesState(store) || null);
export const getProductsState = store => store.productFetch;
export const getProductList = store => (getProductsState(store) || null);

export const getProductByCategory = (store, filter) => {
  const allProducts = getProductList(store);
  switch (filter) {
    case CATEGORY_FILTERS.ALL:
      return allProducts;
    default:
      return {
        ...allProducts,
        recipes: allProducts.recipes.filter(product => product.category_id === filter),
      };
  }
};

export const getProductById = (productList, id) => {
  const { products } = productList;
  return products.filter(product => product.id === id.toString())[0];
};

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';
import { getCategoriesList } from '../redux/selectors';
import { CATEGORY_FILTERS, URL } from '../constants';

const CategoryFilter = ({
  filterCategory, categoriesData, fetchCategories, handleFilterChange,
}) => {
  useEffect(() => {
    fetchCategories(`${URL.BASE}${URL.FETCH_CATEGORIES}`);
  }, [fetchCategories]);

  return (
    <>
      {categoriesData.loading && <h2>Loading</h2> }
      {categoriesData.error && <h2>{categoriesData.error}</h2> }
      {
        <select className="select" value={filterCategory} onChange={e => { handleFilterChange(e.target.value); }} id="category" name="category" required>
          <option key={Math.floor(Math.random() * 10000)} value="All">
            All
          </option>
          {categoriesData.categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      }
    </>
  );
};

const mapStateToProps = state => {
  const { filterCategory } = state;
  const categoriesData = getCategoriesList(state);
  return { filterCategory, categoriesData };
};

export default connect(
  mapStateToProps,
  { fetchCategories },
)(CategoryFilter);

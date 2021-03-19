import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductById, getProductList } from '../redux/selectors';

const Product = ({ match, productData }) => {
  const { id } = match.params;
  const details = getProductById(productData, id);
  return (
    <div className="small-container single-product">
      <div className="row">
        {details ? (
          <>
            <div className="col-2">
              <img className="img-single" src={details.imageurl} alt="" />
            </div>
            <div className="col-2">
              <h1>{details.title}</h1>
              <h4>
                Id:
                {details.id}
              </h4>
              <h3>Instructions: </h3>
              <br />
              <p className="instructions">{details.description}</p>
              <Link to="/" className="btn">Go Back </Link>
              <Link to={`/add-favorite/${id}`} className="btn">
                Add to favorite
              </Link>
            </div>
          </>
        ) : (
          <div className="col-4-wrap info">
            <h2>404 Pages not found </h2>
            <Link to="/" className="btn">Go Back </Link>
          </div>
        )}

      </div>
    </div>
  );
};

Product.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  productData: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => {
  const productData = getProductList(state);
  return { productData };
};

export default connect(
  mapStateToProps,
  null,
)(Product);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProduct } from '../actions';
import { getProductBy, getUserInfo } from '../redux/selectors';
import { URL } from '../constants';

const Product = ({
  match, productData, userData, fetchProduct,
}) => {
  const { id } = match.params;
  useEffect(() => {
    fetchProduct(id, `${URL.BASE}${URL.PRODUCTS}`);
  }, []);
  return (
    <div className="small-container single-product">
      <div className="row">
        {productData ? (
          <>
            <div className="col-2">
              <img className="img-single" src={productData.product.imageurl} alt="" />
            </div>
            <div className="col-2">
              <h1>{productData.product.title}</h1>
              <h4>
                Id:
                {productData.product.id}
              </h4>
              <h3>Instructions: </h3>
              <br />
              <p className="instructions">{productData.product.description}</p>
              <ul>
                <li>
                  <Link to="/" className="btn-product">Go Back </Link>
                </li>
                {
                  userData.user.auth_token && (
                  <li>
                    <Link to={`/add-favorite/${id}`} className="btn-product">
                      Add to favorite
                    </Link>
                  </li>
                  )
                }
                {
                  userData.user.auth_token && userData.user.user.admin && (
                    <li>
                      <Link to={`/product-edit/${id}`} className="btn-product">
                        Edit
                      </Link>
                    </li>
                  )
                }
                {
                  userData.user.auth_token && userData.user.user.admin && (
                    <li>
                      <Link to={`/product-del/${id}`} className="btn-product">
                        Delete
                      </Link>
                    </li>
                  )
                }
              </ul>
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
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  productData: PropTypes.instanceOf(Object).isRequired,
  fetchProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  const productData = getProductBy(state);
  return { userData, productData };
};

export default connect(
  mapStateToProps,
  { fetchProduct },
)(Product);

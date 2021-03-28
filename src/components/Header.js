import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Img from '../assets/images/image1.png';
import Logo from '../assets/images/logo.png';
import Menu from './MenuComponent';
import { getUserInfo } from '../redux/selectors';

const Header = ({ userData }) => {
  const menuRef = React.createRef();

  const handleClick = () => {
    const x = document.getElementById('menu-items');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  const handleClickList = () => {
    const menuItems = menuRef.current;
    menuItems.style.display = 'none';
  };

  return (
    <>
      <header className="header mb">
        <div className="container">
          <div className="navbar">
            {
            userData.user.auth_token && (
              <Menu handleClick={() => handleClick()} />
            )
          }
            <div className="logo hide-sm">
              <img src={Logo} alt="logo" />
            </div>
            {
              !userData.user.auth_token && (
                <nav className="hide-sm menu-md">
                  <ul>
                    <li><Link to="/" className="text-white">Home</Link></li>
                    <li><Link to="/login" className="text-white">Sign in</Link></li>
                    <li><Link to="/register" className="text-white">Register</Link></li>
                  </ul>
                </nav>
              )
            }
            {
              !userData.user.auth_token && (
                <nav className="hide-md menu-md">
                  <ul>
                    <li><Link to="/" className="text-white">Home</Link></li>
                    <li><Link to="/login" className="text-white">Sign in</Link></li>
                    <li><Link to="/register" className="text-white">Register</Link></li>
                  </ul>
                </nav>
              )
            }
            {
              userData.user.auth_token && (
                <nav className="hide-sm menu-md">
                  <ul>
                    <li><Link to="/" className="text-white">Home</Link></li>
                    {
                      userData.user.user.admin && <li><Link to="/new-product" className="text-white" onClick={handleClickList}>New Product</Link></li>
                    }
                    {
                      userData.user.user.admin && <li><Link to="/products" className="text-white" onClick={handleClickList}>Products</Link></li>
                    }
                    <li><Link to="/new-favorite" className="text-white" onClick={handleClickList}>New Favorite</Link></li>
                    <li><Link to="/favorite" className="text-white" onClick={handleClickList}>Favotite</Link></li>
                    <li><Link to="/" className="text-white" onClick={logout}>Logout</Link></li>
                  </ul>
                </nav>
              )
            }
          </div>

          <div className="row hide-sm">
            <div className="col-2 text-white">
              <h1>
                Find your product
                <br />
                {' '}
                A New Style!
              </h1>
              <p>
                The best offers for you at any point of your journey,
                <br />
                wherever you are, feel yourself like at your own home.
              </p>
              <Link to="/" className="btn">Explore Now &#8594;</Link>
            </div>
            <div className="col-2">
              <img src={Img} alt="" />
            </div>
          </div>
        </div>
      </header>

      {
        userData.user.auth_token && (
        <div id="menu-items" ref={menuRef}>
          <div className="menu-container hide-md">
            <div className="avatar">
              <img className="img-avatar" src={userData.user.user.imageurl} alt="" />
              <p className="name">Josia</p>
              <span className="name-span">@josia</span>
            </div>

            <nav className="menu-nav">
              <ul>
                {
                  userData.user.user.admin && <li><Link to="/new-product" onClick={handleClickList}>New Product</Link></li>
                }
                {
                  userData.user.user.admin && <li><Link to="/products" onClick={handleClickList}>Products</Link></li>
                }
                <li><Link to="/new-favorite" onClick={handleClickList}>New Favorite</Link></li>
                <li><Link to="/favorite" onClick={handleClickList}>Favotite</Link></li>
              </ul>
            </nav>

            <nav className="menu-footer">
              <ul>
                <li><Link to="/" onClick={logout}>Logout</Link></li>
              </ul>
            </nav>
          </div>
        </div>
        )
      }
    </>
  );
};

Header.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = state => {
  const userData = getUserInfo(state);
  return { userData };
};

export default connect(
  mapStateToProps,
  null,
)(Header);

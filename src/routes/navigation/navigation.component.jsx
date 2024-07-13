import { Fragment, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { LoadingFeedbackContext } from '../../contexts/loadingFeedback.context';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { signOutUser } from '../../utils/firebase/firebase-auth.utils';

import './navigation.styles.scss';

const Navigation = () => {
  const { setIsLoading, setIsSuccessful } = useContext(LoadingFeedbackContext);
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const location = useLocation();
  const userHasAuthority =
    currentUser.authority === 'super admin' ||
    currentUser.authority === 'admin' ||
    currentUser.authority === 'manager' ||
    currentUser.authority === 'support';

  const signOutHandler = async () => {
    setIsLoading(true);

    try {
      await signOutUser();
    } catch {
      (error) => setIsSuccessful(error.code);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to={currentUser ? '/home' : '/'}>
          <div className="logo">The Olden</div>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            COLLECTIONS
          </Link>
          {userHasAuthority && (
            <Link className="nav-link" to="/dashboard">
              DASHBOARD
            </Link>
          )}
          {currentUser.uid ? (
            <span className="nav-link" onClick={signOutHandler}>
              {' '}
              SIGN OUT{' '}
            </span>
          ) : location.pathname !== '/' ? (
            <Link className="nav-link" to="/">
              SIGN IN
            </Link>
          ) : (
            <Link className="nav-link" to="/signUp">
              SIGN UP
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
    </Fragment>
  );
};

export default Navigation;

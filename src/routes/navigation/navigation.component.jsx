import { Fragment, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from "../../utils/firebase/firebase-auth.utils";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const location = useLocation();

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to={currentUser ? "/home" : "/"}>
          <div className="logo">The Olden</div>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            COLLECTIONS
          </Link>
          {currentUser.isAdmin && (
            <Link className="nav-link" to="/admin">
              ADMIN
            </Link>
          )}
          {currentUser.uid ? (
            <span className="nav-link" onClick={signOutHandler}>
              {" "}
              SIGN OUT{" "}
            </span>
          ) : location.pathname !== "/" ? (
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

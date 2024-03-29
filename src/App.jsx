import Layout from './components/Layout/layout.component'

import SignUpForm from "./routes/sign-up-form/sign-up-form.component";
import SignInForm from "./routes/sign-in-form/sign-in-form.component";
import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { Routes, Route, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";

import { UserContext } from "./contexts/user.context";
import { CartContext } from "./contexts/cart.context";
import { UrlHistoryContext } from "./contexts/urlHistory.context";
import PageNotFound from "./routes/page_not_found/page-not-found.components";

const App = () => {
  const { currentUser, redirect } = useContext(UserContext);
  const { setisCartOpen } = useContext(CartContext);
  const { urlHistory, setHistory } = useContext(UrlHistoryContext);

  const location = useLocation();

  useEffect(() => {
    setHistory(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    setisCartOpen(false);
  }, [location.pathname]);

  const Type1UserRedirect = (element, path) => {
    return redirect(1, element, path, currentUser, urlHistory);
  };

  const Type2UserRedirect = (element, path) => {
    return redirect(2, element, path, currentUser, urlHistory);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={Type2UserRedirect(<Home />, "/home")} />
        <Route
          path="shop/*"
          element={Type2UserRedirect(<Shop />, "/shop")}
        />
        <Route index element={Type1UserRedirect(<SignInForm />, "/")} />
        <Route
          path="/signUp"
          element={Type1UserRedirect(<SignUpForm />, "/signUp")}
        />
        <Route
          path="/checkout"
          element={Type2UserRedirect(<Checkout />, "/checkout")}
        />
        <Route path="*" element={Type2UserRedirect(<PageNotFound />)} />
      </Route>
    </Routes>
  );
};

export default App;

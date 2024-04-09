import Layout from './components/Layout/layout.component'

import SignUpForm from "./routes/sign-up-form/sign-up-form.component";
import SignInForm from "./routes/sign-in-form/sign-in-form.component";
import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { UserContext } from "./contexts/user.context";
import { CartContext } from "./contexts/cart.context";
import { UrlHistoryContext } from "./contexts/urlHistory.context";
import PageNotFound from "./routes/page_not_found/page-not-found.components";
import Admin from './routes/admin/admin.component';

const App = () => {
  const { currentUser, redirect } = useContext(UserContext);
  const { setisCartOpen, isCartOpen } = useContext(CartContext);
  const { urlHistory, setHistory } = useContext(UrlHistoryContext);

  const location = useLocation();

  useEffect(() => {
    setHistory(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (isCartOpen) {
    setisCartOpen(false);
    }
  }, [location.pathname]);

  const Type1UserRedirect = (element, path, pageType) => {
    return redirect(1, element, path, currentUser, urlHistory, pageType);
  };

  const Type2UserRedirect = (element, path, pageType) => {
    return redirect(2, element, path, currentUser, urlHistory, pageType);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={Type2UserRedirect(<Home />, "/home")} />
        <Route path="shop/*" element={Type2UserRedirect(<Shop />, "/shop")} />
        <Route index element={Type1UserRedirect(<SignInForm />, "/")} />
        <Route
          path="/signUp"
          element={Type1UserRedirect(<SignUpForm />, "/signUp")}
        />
        <Route
          path="/checkout"
          element={Type2UserRedirect(<Checkout />, "/checkout")}
        />
        <Route path="/admin" element={Type2UserRedirect(<Admin />, "/admin")} />
        <Route
          path="/page_not_found"
          element={
            <PageNotFound />}
        />
        <Route path="*" element={<Navigate to="/page_not_found" />} />
      </Route>
    </Routes>
  );
};

export default App;

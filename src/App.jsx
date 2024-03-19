import Navigation from "./routes/navigation/navigation.component";
import SignUpForm from "./routes/sign-up-form/sign-up-form.component";
import SignInForm from "./routes/sign-in-form/sign-in-form.component";
import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";

import { UserContext } from "./contexts/user.context";
import { CartContext } from "./contexts/cart.context";
import { UrlHistoryContext } from "./contexts/urlHistory.context";

const App = () => {
  const { currentUser } = useContext(UserContext);
  const { setisCartOpen } = useContext(CartContext);
  const { urlHistory, setHistory } = useContext(UrlHistoryContext);

  const location = useLocation();

  useEffect(() => {
    setHistory(location.pathname);
    setisCartOpen(false);
  }, [location.pathname]);

  function VerifyUser(VariationType, Page, Pathname) {
    if (VariationType === 1) {
      return currentUser && urlHistory[urlHistory.length - 1] != Pathname ? (
        <Navigate to={`${urlHistory[urlHistory.length - 1]}`} replace />
      ) : currentUser && urlHistory[urlHistory.length - 1] === Pathname ? (
        <Navigate to='/home' replace />
      ) : (
        Page
      );
    } else if (VariationType === 2) {
      return currentUser ? Page : <Navigate to="/" replace />;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="home" element={VerifyUser(2, <Home />, "/home")} />
        <Route path="shop" element={VerifyUser(2, <Shop />, "/shop")} />
        <Route index element={VerifyUser(1, <SignInForm />, "/")} />
        <Route
          path="/signUp"
          element={VerifyUser(1, <SignUpForm />, "/signUp")}
        />
        <Route
          path="/checkout"
          element={VerifyUser(2, <Checkout />, "/checkout")}
        />
      </Route>
    </Routes>
  );
};

export default App;

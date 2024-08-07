import Layout from './components/Layout/layout.component';

import SignUpForm from './routes/sign-up-form/sign-up-form.component';
import SignInForm from './routes/sign-in-form/sign-in-form.component';
import Home from './routes/home/home.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import PageNotFound from './routes/page_not_found/page-not-found.components';
import Admin from './routes/admin/admin.component';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { UserContext } from './contexts/user.context';
import { CartContext } from './contexts/cart.context';
import { UrlHistoryContext } from './contexts/urlHistory.context';
import { LoadingFeedbackContext } from './contexts/loadingFeedback.context';

const App = () => {
  const { currentUser, redirect } = useContext(UserContext);
  const { setisCartOpen, isCartOpen } = useContext(CartContext);
  const { urlHistory, setHistory } = useContext(UrlHistoryContext);
  const { setIsLoading } = useContext(LoadingFeedbackContext);

  const location = useLocation();
  const userHasAuthority =
    currentUser.authority === 'super admin' ||
    currentUser.authority === 'admin' ||
    currentUser.authority === 'manager' ||
    currentUser.authority === 'support';

  useEffect(() => {
    setHistory(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (isCartOpen) {
      setisCartOpen(false);
    }
  }, [location.pathname]);

  const Type1UserRedirect = (element, path) => {
    return redirect(
      1,
      element,
      path,
      currentUser.uid,
      urlHistory,
      '/home',
      '/'
    );
  };

  const Type2UserRedirect = (element, path) => {
    return redirect(
      2,
      element,
      path,
      currentUser.uid,
      urlHistory,
      '/home',
      '/'
    );
  };

  const Type3UserRedirect = (element, path, unrestricted) => {
    return redirect(
      3,
      element,
      path,
      currentUser.uid,
      urlHistory,
      '/home',
      '/',
      unrestricted
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={Type2UserRedirect(<Home />, '/home')} />
        <Route path="shop/*" element={Type2UserRedirect(<Shop />, '/shop')} />
        <Route index element={Type1UserRedirect(<SignInForm />, '/')} />
        <Route
          path="/signUp"
          element={Type1UserRedirect(<SignUpForm />, '/signUp')}
        />
        <Route
          path="/checkout"
          element={Type2UserRedirect(<Checkout />, '/checkout')}
        />
        <Route
          path="/dashboard"
          element={Type3UserRedirect(<Admin />, '/dashboard', userHasAuthority)}
        />
        <Route path="/page_not_found" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/page_not_found" />} />
      </Route>
    </Routes>
  );
};

export default App;

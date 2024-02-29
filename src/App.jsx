import Navigation from "./routes/navigation/navigation.component";
import SignUpForm from "./routes/sign-up-form/sign-up-form.component";
import SignInForm from "./routes/sign-in-form/sign-in-form.component";
import Home from './routes/home/home.component'
import { useContext } from "react";
import { UserContext } from "./contexts/user.context";
import {Navigate, Routes, Route} from 'react-router-dom';
import Shop from "./routes/shop/shop.component";

const App = () => {
  const { currentUser } = useContext(UserContext);

  const VerifyUser = (optionNumber, Element, path) => {
    if (optionNumber === 1) {
      return currentUser ? Element :  <Navigate to={`/${path}`} replace />
    }
    return currentUser ? <Navigate to="/home" /> : Element
  };

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route
          path="home"
          element={
           VerifyUser(1, <Home />, 'home')
          }
        />
        <Route
          path="shop"
          element={VerifyUser(1, <Shop />, 'shop')}
        />
        <Route
          index
          element={
            VerifyUser(2, <SignInForm />)
          }
        />
        <Route
          path="/signUp"
          element={
            VerifyUser(2, <SignUpForm />)
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
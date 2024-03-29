import { Outlet } from 'react-router-dom'
import Footer from '../../routes/footer/footer.component';
import Navigation from '../../routes/navigation/navigation.component';

function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout
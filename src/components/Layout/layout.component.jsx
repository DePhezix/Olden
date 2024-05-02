import { Outlet } from 'react-router-dom'

import Footer from '../../routes/footer/footer.component';
import Navigation from '../../routes/navigation/navigation.component';
import LoadingFeedback from '../../routes/loadingFeedback/loadingFeedback.component'


function Layout() {
  return (
    <>
      <Navigation />
      <LoadingFeedback />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout
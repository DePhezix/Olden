
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';
import { CategoriesContext } from '../../contexts/categories.contexts';


const Home = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <div>
      <Directory
        categories={categoriesMap}
      />
      <Outlet />
    </div>
  );
};

export default Home;

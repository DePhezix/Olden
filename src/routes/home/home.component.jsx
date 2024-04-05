
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";


const Home = () => {
  const [ categoriesMap, setCategoriesMap ] = useState([])

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap)
    }

    getCategoriesMap()
  }, [])

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

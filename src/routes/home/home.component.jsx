
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';
import { getHomeCategoriesandDocuments } from "../../utils/firebase/firebase.utils";


const Home = () => {
  const [ homeCategoriesMap, setHomeCategoriesMap ] = useState([])

  useEffect(() => {
    const getHomeCategoriesMap = async () => {
      const homeCategoryMap = await getHomeCategoriesandDocuments();
      setHomeCategoriesMap(homeCategoryMap)
    }

    getHomeCategoriesMap()
  }, [])


  return (
    <div>
      <Directory
        categories={homeCategoriesMap}
      />
      <Outlet />
    </div>
  );
};

export default Home;

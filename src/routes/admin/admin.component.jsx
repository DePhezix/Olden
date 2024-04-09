import {  useContext } from "react";

import { CategoriesContext } from '../../contexts/categories.contexts';
import { UserContext } from '../../contexts/user.context';

import './admin.styles.scss'

function Admin() {
  const { categoriesMap } = useContext(CategoriesContext)
  const { allUsersData, currentUser } = useContext(UserContext);

  return (
    <div>
      <div>
        <h1>Categories</h1>

      </div>
      <div>
        <h1>Users</h1>
        {Object.keys(allUsersData).forEach((userData) => {
          
        })}
      </div>
    </div>
  );
}

export default Admin;

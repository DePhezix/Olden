import "./user-section-admin.styles.scss";

import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";

import AdminCardUser from "../../components/admin-card-user/admin-card-user.component";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";

function UserSectionForAdmin() {
  const [isUserSearching, setIsUserSearching] = useState(false);
  const [userSearch, setUserSearch] = useState("");

  const { allUsersData } = useContext(UserContext);

  return (
    <div className="user-section-admin">
      <h1>
        Users
        <span className="search">
          <SearchIcon
            className={`search-icon ${
              isUserSearching ? "searching" : undefined
            }`}
            onClick={() => setIsUserSearching(!isUserSearching)}
          />
          <input
            placeholder="Search user by email"
            className={`${
              isUserSearching ? "input-search-visible" : undefined
            }`}
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
        </span>
      </h1>
      <div className="user-cards">
        <AdminCardUser userCreatingCard cardVisible />
        {Object.keys(allUsersData).map((userData) => (
          <AdminCardUser
            userData={userData}
            cardVisible={userData.includes(userSearch)}
            key={userData}
          />
        ))}
      </div>
    </div>
  );
}

export default UserSectionForAdmin;

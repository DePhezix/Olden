import "./user-section-admin.styles.scss";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";

import { useContext, useState, useEffect } from "react";

import { UserContext } from "../../contexts/user.context";

import AdminCardUser from "../../components/admin-card-user/admin-card-user.component";

function UserSectionForAdmin() {
  const [isUserSearching, setIsUserSearching] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [sortedUsers, setSortedUsers] = useState([]);

  const { allUsersData } = useContext(UserContext);

  useEffect(() => {
    const usersArray = Object.keys(allUsersData).map((email) => ({
      email,
      createdAt: allUsersData[email].createdAt,
    }));

    const sortedArray = usersArray.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    setSortedUsers(sortedArray);
  }, [allUsersData]);

  

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
            disabled={!isUserSearching}
          />
        </span>
      </h1>
      <div className="user-cards">
        <AdminCardUser userCreatingCard cardVisible />
        {sortedUsers
          .map((userData) => (
            <AdminCardUser
              userData={userData.email}
              cardVisible={userData.email.includes(userSearch)}
              key={userData.email}
            />
          ))}
      </div>
    </div>
  );
}

export default UserSectionForAdmin;

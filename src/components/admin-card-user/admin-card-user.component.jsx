import React, { useContext, useState } from "react";

import { UserContext } from "../../contexts/user.context";
import { LoadingFeedbackContext } from "../../contexts/loadingFeedback.context";

import Button from "../button/button.component";

import "./admin-card-user.styles.scss";

function AdminCardUser({ userData, cardVisible, userCreatingCard }) {
  const { setIsLoading, setIsSuccessful } = useContext(LoadingFeedbackContext);
  const { allUsersData, updateUserDatabase } = useContext(UserContext);
  const {
    displayName: originalDisplayName,
    createdAt: originalCreatedAt,
    isAdmin,
    uid,
  } = userCreatingCard ? {} : allUsersData[userData];
  const email = userCreatingCard ? "" : userData;

  const currentDate = new Date();
  const [creatingUser, setCreatingUser] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(
    userCreatingCard ? "Display Name" : originalDisplayName
  );
  const [newDate, setNewDate] = useState(
    userCreatingCard ? currentDate : originalCreatedAt
  );
  const [selectedAuthority, setSelectedAuthority] = useState(
    userCreatingCard
      ? { current: "None", secondary: "Admin" }
      : isAdmin
      ? { current: "Admin", secondary: "None" }
      : { current: "None", secondary: "Admin" }
  );
  const [newEmail, setNewEmail] = useState(
    userCreatingCard ? "user@email.com" : email
  );
  const [password, setPassword] = useState("Password");
  const [isEditing, setIsEditing] = useState(false);

  const handleApplyChange = async () => {
    try {
      setIsLoading(true)

      const newDateObj = new Date(newDate);
      const updatedDataObj = {
        createdAt: newDateObj,
        displayName: newDisplayName,
        isAdmin: selectedAuthority.current === "Admin",
      };

      updateUserDatabase(allUsersData[userData], updatedDataObj);

      setIsEditing(false);
      setIsLoading(false);
      setIsSuccessful("");
    } catch (error) {
      setIsEditing(false);
      setIsLoading(false);
      setIsSuccessful(error.message);
    }
  };

  const resetEditingFields = () => {
    setNewDisplayName(originalDisplayName);
    setNewDate(originalCreatedAt);
    setSelectedAuthority(
      isAdmin
        ? { current: "Admin", secondary: "None" }
        : { current: "None", secondary: "Admin" }
    );
    setIsEditing(false);
  };

  const resetNewUserFields = () => {
    setNewDisplayName("Display Name");
    setNewDate(currentDate);
    setPassword("Password");
    setSelectedAuthority({ current: "None", secondary: "Admin" });
    setCreatingUser(false);
  };

  const handleUserCreate = () => {
    setIsSuccessful("Function surpasses creator's ability")
    resetNewUserFields()
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const day = date.getDate();
    const daySuffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";
    const formattedDateWithSuffix = formattedDate.replace(
      /\b\d+\b/,
      `${day}${daySuffix}`
    );
    return formattedDateWithSuffix;
  };

  return (
    <div
      className={`admin-card-user-container ${
        cardVisible ? "cardVisible" : null
      }`}
      key={uid}
    >
      <div
        className={`${userCreatingCard ? "not-creating-user" : "hidden"} ${
          creatingUser ? "creating-user" : null
        }`}
      >
        <Button onClick={() => setCreatingUser(true)} buttonType={"short"}>
          Create New User
        </Button>
      </div>
      <input
        value={newDisplayName}
        onChange={(e) => setNewDisplayName(e.target.value)}
        disabled={!isEditing && !creatingUser}
        className="display-name"
      />
      <table className="extraDetails">
        <tbody className={!userCreatingCard ? "lower-table-body" : null}>
          <tr>
            <td>Joined in :</td>
            <td>
              <label htmlFor={uid} className="dateLabel">
                {formatDate(newDate)}
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                disabled={!isEditing && !creatingUser}
                className="date"
                id={uid}
              />
            </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td className="email-prompt">
              <input
                className="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                disabled={!creatingUser}
              />
            </td>
          </tr>
          {userCreatingCard ? (
            <tr className="password-prompt">
              <td>Password:</td>
              <td>
                <input
                  className="password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  readOnly={!creatingUser}
                />
              </td>
            </tr>
          ) : (
            <></>
          )}
          <tr>
            <td>Authority Level:</td>
            <td className="authority-level">
              <select
                disabled={!isEditing && !creatingUser}
                value={selectedAuthority.current}
                onChange={(e) =>
                  setSelectedAuthority({
                    ...selectedAuthority,
                    current: e.target.value,
                  })
                }
              >
                <option>{isAdmin ? "Admin" : "None"}</option>
                <option>{isAdmin ? "None" : "Admin"}</option>
              </select>
            </td>
          </tr>
          <tr
            className={`user-change ${!userCreatingCard ? "lower-text" : null}`}
          >
            {userCreatingCard ? (
              <>
                <td className="blue-text" onClick={handleUserCreate}>
                  Create User
                </td>
                <td className="red-text" onClick={resetNewUserFields}>
                  Cancel Creation
                </td>
              </>
            ) : !isEditing ? (
              <>
                <td className="blue-text" onClick={() => setIsEditing(true)}>
                  Edit
                </td>
                <td className="red-text">Remove</td>
              </>
            ) : (
              <>
                <td className="blue-text" onClick={handleApplyChange}>
                  Apply Changes
                </td>
                <td
                  className="red-text lower-text"
                  onClick={resetEditingFields}
                >
                  Cancel Edit
                </td>
              </>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminCardUser;

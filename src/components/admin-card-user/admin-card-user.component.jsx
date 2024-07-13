import React, { useContext, useState } from 'react';

import { UserContext } from '../../contexts/user.context';
import { LoadingFeedbackContext } from '../../contexts/loadingFeedback.context';

import './admin-card-user.styles.scss';

function AdminCardUser({ userData, cardVisible, userCreatingCard }) {
  const { setIsLoading, setIsSuccessful } = useContext(LoadingFeedbackContext);
  const { allUsersData, updateUserDatabase } = useContext(UserContext);
  const {
    displayName: originalDisplayName,
    createdAt: originalCreatedAt,
    authority,
    uid,
  } = userCreatingCard ? {} : allUsersData[userData];
  const email = userCreatingCard ? '' : userData;

  const currentDate = new Date();
  const [creatingUser, setCreatingUser] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(
    userCreatingCard ? 'Display Name' : originalDisplayName
  );
  const [newDate, setNewDate] = useState(
    userCreatingCard ? currentDate : originalCreatedAt
  );
  const [selectedAuthority, setSelectedAuthority] = useState();
  const [newEmail, setNewEmail] = useState(
    userCreatingCard ? 'user@email.com' : email
  );
  const [password, setPassword] = useState('Password');
  const [isEditing, setIsEditing] = useState(false);

  const handleApplyChange = async () => {
    try {
      setIsLoading(true);

      const newDateObj = new Date(newDate);
      const updatedDataObj = {
        createdAt: newDateObj,
        displayName: newDisplayName,
        isAdmin: selectedAuthority.current === 'Admin',
      };

      updateUserDatabase(allUsersData[userData], updatedDataObj);

      setIsEditing(false);
      setIsLoading(false);
      setIsSuccessful('');
    } catch (error) {
      setIsEditing(false);
      setIsLoading(false);
      setIsSuccessful(error.message);
    }
  };

  const resetEditingFields = () => {
    setNewDisplayName(originalDisplayName);
    setNewDate(originalCreatedAt);
    setSelectedAuthority();
    setIsEditing(false);
  };

  const resetNewUserFields = () => {
    setNewDisplayName('Display Name');
    setNewDate(currentDate);
    setPassword('Password');
    setSelectedAuthority();
    setCreatingUser(false);
  };

  const handleUserCreate = () => {
    setIsSuccessful("Function surpasses creator's ability");
    resetNewUserFields();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const day = date.getDate();
    const daySuffix =
      day === 1 || day === 21 || day === 31
        ? 'st'
        : day === 2 || day === 22
          ? 'nd'
          : day === 3 || day === 23
            ? 'rd'
            : 'th';
    const formattedDateWithSuffix = formattedDate.replace(
      /\b\d+\b/,
      `${day}${daySuffix}`
    );
    return formattedDateWithSuffix;
  };

  return (
    <div>
      <div className="header">
        <div className="displayName">{newDisplayName}</div>
        <div className="icon">&#8942;</div>
      </div>
      <div className="authority-level">{selectedAuthority}</div>
    </div>
  );
}

export default AdminCardUser;

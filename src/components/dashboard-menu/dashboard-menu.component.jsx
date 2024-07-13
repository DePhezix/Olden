import { useContext, useRef, useState } from 'react';
import { UserContext } from '../../contexts/user.context.jsx';
import './dashboard-menu.styles.scss';

function DashboardMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isManagementHover, setIsManagementHover] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const { currentUser } = useContext(UserContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsManagementHover(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setIsManagementHover(false);
  };

  const authorityAtleastAdmin =
    currentUser.authority === 'super admin' ||
    currentUser.authority === 'admin';
  const authorityAtleastManager =
    authorityAtleastAdmin || currentUser.authority === 'manager';

  console.log(currentUser.authority);

  return (
    <div className="dashboard-menu-container">
      <div className={`dashboard-menu`}>
        <div className="background" onClick={toggleMenu} />
        <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
        <div className={`slider ${isOpen ? 'active' : ''}`}>
          <div className={`slider-content ${isOpen ? 'active' : ''}`}>
            {authorityAtleastManager && (
              <div className={`dashboard-function`}>Sales Analytics</div>
            )}
            {authorityAtleastManager && (
              <div
                className={`dashboard-function`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Management
                <div
                  className={`management-functions ${isManagementHover ? 'active' : ''}`}
                >
                  <span>Users</span>
                  <span>Product</span>
                  <span>Orders</span>
                </div>
              </div>
            )}
            {authorityAtleastAdmin && (
              <div className={`dashboard-function`}>Promotional Tools</div>
            )}
            <div className={`dashboard-function`}>Support Interface</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardMenu;

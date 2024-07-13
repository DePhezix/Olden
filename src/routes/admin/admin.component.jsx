import "./admin.styles.scss";

import UserSectionForAdmin from "../../components/user-section-admin/user-section-admin.component";
import ProductCategoriesSectionForAdmin from "../../components/product-categories-section-admin/product-categories-section-admin.components";
import DashboardMenu from "../../components/dashboard-menu/dashboard-menu.component.jsx";

function Admin() {

  return (
      <div className="admin-container">
          <ProductCategoriesSectionForAdmin/>
          <UserSectionForAdmin/>
          <DashboardMenu />
      </div>
  );
}

export default Admin;

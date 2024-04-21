import { ReactComponent as SearchIcon } from "../../assets/search.svg";

import "./admin.styles.scss";

import UserSectionForAdmin from "../../components/user-section-admin/user-section-admin.component";
import ProductCategoriesSectionForAdmin from "../../components/product-categories-section-admin/product-categories-section-admin.components";

function Admin() {

  return (
    <div className="admin-container">
      <ProductCategoriesSectionForAdmin />
      <UserSectionForAdmin />
    </div>
  );
}

export default Admin;

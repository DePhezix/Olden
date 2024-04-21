import "./product-categories-section-admin.styles.scss";

import { useContext, useState } from "react";
import { CategoriesContext } from "../../contexts/categories.contexts";

import { ReactComponent as SearchIcon } from "../../assets/search.svg";

function ProductCategoriesSectionForAdmin() {
  const [isProductSearching, setIsProductSearching] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const { categoriesMap } = useContext(CategoriesContext);

  return (
      <div className="category-section-admin">
        <h1>
          Categories
          <span className="search">
            <SearchIcon
              className={`search-icon ${
                isProductSearching ? "searching" : undefined
              }`}
              onClick={() => setIsProductSearching(!isProductSearching)}
            />
            <input
              placeholder="Search product"
              className={`${
                isProductSearching ? "input-search-visible" : undefined
              }`}
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
            />
          </span>
        </h1>
      </div>
  );
}

export default ProductCategoriesSectionForAdmin;

import "./product-categories-section-admin.styles.scss";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../contexts/categories.contexts";
import AdminCardCategory from "../admin-card-category/admin-card-category.component.jsx";

function ProductCategoriesSectionForAdmin() {
    const [isProductSearching, setIsProductSearching] = useState(false);
    const [productSearch, setProductSearch] = useState("");
    const [sortedProducts, setSortedProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { categoriesMap } = useContext(CategoriesContext);

    useEffect(() => {
        const productsArray = Object.entries(categoriesMap).map(([title, arr]) => ({ title, id: arr[0] }));

        const sortedProductsArray = productsArray.sort((a, b) => parseInt(a.id) - parseInt(b.id));

        setSortedProducts(sortedProductsArray);
    }, [categoriesMap]);

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
              placeholder="Search for product"
              className={`${
                  isProductSearching ? "input-search-visible" : undefined
              }`}
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
          />
        </span>
            </h1>
            <div className="product-cards">
                {sortedProducts ? sortedProducts
                    // .filter((productData) =>
                    //     productData.title.toLowerCase().includes(productSearch.toLowerCase())
                    // )
                    .map(({ id, title }) => (
                        <AdminCardCategory
                            title={title}
                            key={id}
                            providedClassName={productSearch === "" && !selectedCategory ? "appeared" : ""}
                        />
                    )) : <></>}
            </div>
        </div>
    );
}

export default ProductCategoriesSectionForAdmin;

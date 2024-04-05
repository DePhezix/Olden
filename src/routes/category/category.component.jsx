import { useContext, useState, useEffect } from "react";
import ProductCard from "../../components/product_card/product_card.component";

import { useParams, useLocation, useNavigate } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.contexts";

import "./category.styles.scss";

function Category() {
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

  const { pathname } = useLocation();
  const { category } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    if (Object.keys(categoriesMap).length >= 1) {
      if (categoriesMap[category] === undefined) {
         navigate("/page_not_found")
      } else {
        setProducts(categoriesMap[category][3]);
      }
    }
  }, [category, categoriesMap])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="complete-category-container">
      <h2 className="title"> {category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default Category;

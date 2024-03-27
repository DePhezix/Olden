import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product_card/product_card.component";

import { useLocation } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.contexts";

import "./category.styles.scss";

function Category() {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);
  const { pathname } = useLocation();

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

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

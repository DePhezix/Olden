import ProductCard from "../product_card/product_card.component";

import { Link } from "react-router-dom";

import "./category-preview.styless.scss";

function CategoryPreview({title, products}) {

  return (
    <div className="category-preview-container">
        <h2>
            <Link to={`${title}`} className="title">{title.toUpperCase()}</Link>
        </h2>
        <div className="preview">
            {
                products.filter((_, idx) => idx < 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </div>
    </div>
  );
}

export default CategoryPreview
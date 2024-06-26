import { Fragment, useContext,} from "react";
import { CategoriesContext } from "../../contexts/categories.contexts";
import CategoryPreview from "../../components/category-preview/category-preview.component";

function CategoriesPreview() {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title][3];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
}

export default CategoriesPreview;
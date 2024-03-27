import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
  const sortedCategories = categories.sort((a, b) => {
    return a.id - b.id;
  });

  return (
    <div className="directory-container">
      {sortedCategories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;

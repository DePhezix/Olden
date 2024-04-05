import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
  // const sortedCategories = categories.sort((a, b) => {
  //   return a[1] - b[1];
// });

  return (
    <div className="directory-container">
      {Object.keys(categories).map((title) => {
        const category = {
          title: title,
          imageUrl: categories[title][1],
          route: categories[title][2],
        };
        return (
          <DirectoryItem key={title[0]} category={category}   />
        );
      })}
    </div>
  );
};

export default Directory;

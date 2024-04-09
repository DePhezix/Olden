import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }) => {


  const sortedKeys = Object.keys(categories).sort(
    (a, b) => categories[a][0] - categories[b][0]
  );

  return (
    <div className="directory-container">
      {sortedKeys.map((title) => {
        const category = {
          title: title,
          imageUrl: categories[title][1],
          route: categories[title][2],
        };
        return <DirectoryItem key={title[0]} category={category} />;
      })}
    </div>
  );
};

export default Directory;

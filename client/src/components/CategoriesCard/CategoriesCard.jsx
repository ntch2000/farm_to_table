import React, { useState } from "react";
import "./catCard.css";

// List of items that user can choose from to filter food options
const items = [
  {
    listText: "All",
    catID: "all",
    selected: true
  },
  {
    listText: "Fruit",
    catID: "fruit",
    selected: false
  },
  {
    listText: "Vegetable",
    catID: "vegetable",
    selected: false
  },
  {
    listText: "Meat",
    catID: "meat",
    selected: false
  },
  {
    listText: "Dairy",
    catID: "dairy",
    selected: false
  },
];

const CategoriesCard = ({ onClick }) => {
  const [menuItems, setMenuItems] = useState(items)
  const handleClick = (key) => {
    console.log(key);
    const mapArray = menuItems.map((item, i) => {
      if (i === key) {
        item.selected = true;
        return item
      } else {
        item.selected = false;
        return item
      }
    })
    setMenuItems(mapArray)
  }

  return (
    <div className="panel">
      <p className="panel-heading">Categories</p>
      {menuItems.map((item, key) => (
        <a 
          id={item.selected ? item.catID + "-selected" : item.catID}
          className="panel-block"
          key={key}
          value={item.listText}
          name={item.listText}
          onClick={(e) => {
            onClick(e, item.listText);
            handleClick(key);
          }}
        >
          <a
            value={item.listText}
            name={item.listText}
            class="subtitle is-6"
            onClick={(e) => {
              onClick(e, item.listText);
            }}
          >
            {item.listText}
          </a>
        </a>
      ))}
    </div>
  );
};

export default CategoriesCard;

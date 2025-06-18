import { useState } from "react";
import down from "../assets/angle-down-solid.svg";

const Sort = ({ onSort }) => {
  const [selectedSort, setSelectedSort] = useState(""); // Track selected sort option

  const handleSort = (type) => {
    setSelectedSort(type);
    onSort(type); // Call the sorting function in the parent component
  };

  return (
    <div className="sort flex gap-4">
      {/* Sort by Event Name */}
      <div className="sort__select" onClick={() => handleSort("name")}>
        <p>Sort by Name {selectedSort === "name" && "✓"}</p>
        <img src={down} alt="" />
      </div>

      {/* Sort by Ticket Rate */}
      <div className="sort__select" onClick={() => handleSort("rate")}>
        <p>Sort by Price {selectedSort === "rate" && "✓"}</p>
        <img src={down} alt="" />
      </div>
    </div>
  );
};

export default Sort;

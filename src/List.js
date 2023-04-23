import React, { useState, memo } from "react";
import "./List.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

// Single List Item
const SingleListItem = memo(
  ({
    isSelected,
    onClickHandler,
    text,
    onDeleteHandler,
  }) => {
    return (
      <li
        className="list-item"
        style={{
          backgroundColor: isSelected ? "green" : "red",
          justifyContent: "space-between",
        }}
        onClick={onClickHandler}
      >
        {text}
        <div className="item-buttons">
          <button className="delete-button" onClick={onDeleteHandler}>
            Delete
          </button>
        </div>
      </li>
    );
  }
);


SingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
const List = memo(({ items, updateItems}) => {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  const handleClick = (index) => {
    if (isMultiSelectMode) {
      if (selectedIndexes.includes(index)) {
        setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
        toast.warning(`Deselected "${items[index].text}"`);
      } else {
        setSelectedIndexes([...selectedIndexes, index]);
        toast.success(`Selected "${items[index].text}"`);
      }
    } else {
      setSelectedIndexes([index]);
      toast.success(`Selected "${items[index].text}"`);
    }
  };

  const handleClear = () => {
    setSelectedIndexes([]);
  };

  const handleSelectAll = () => {
    setSelectedIndexes(items.map((item, index) => index));
  };

  const handleModeChange = () => {
    setIsMultiSelectMode(!isMultiSelectMode);
  };

  const handleDelete = (index) => {
    const itemToDelete = items[index].text;
    const newItems = [...items];
    newItems.splice(index, 1);
    setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    toast.error(`Deleted "${itemToDelete}"`);
    // Call a function from the parent component to update the items state
    // Assuming that the parent component passes down an "updateItems" function as a prop
    updateItems(newItems);
  };

  return (
    <>
      <div className="selection-buttons mode-btn">
        {isMultiSelectMode && (
          <>
            <button className="list-control-button" onClick={handleClear}>
              Clear
            </button>
            <button className="list-control-button" onClick={handleSelectAll}>
              Select All
            </button>
          </>
        )}
        <button className="list-control-button " onClick={handleModeChange}>
          {isMultiSelectMode
            ? "Switch to Single Select"
            : "Switch to Multi-Select"}
        </button>
      </div>
      <ul style={{ textAlign: "left" }}>
        {items?.map((item, index) => (
          <SingleListItem
            key={index}
            onClickHandler={() => handleClick(index)}
            onDeleteHandler={() => handleDelete(index)}
            text={item.text}
            index={index}
            isSelected={selectedIndexes.includes(index)}
          />
        ))}
      </ul>

      <ToastContainer position="top-right" />
    </>
  );
});


List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  updateItems: PropTypes.func.isRequired,
};

export default List;

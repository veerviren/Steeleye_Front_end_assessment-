import React, { useState } from "react";
import List from "./List";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
    { id: 4, text: "Item 4" },
    { id: 5, text: "Item 5" },
  ]);

  const updateItems = (newItems) => {
    setItems(newItems);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Viren's List</h1>
        <div className="card-content">
          <List items={items} updateItems={updateItems} />
        </div>
        <button
          className="add-button add-list-button"
          onClick={() => {
            const newItem = { text: "New Event" };
            const eventName = prompt("Enter New Event Name", "");
            if (eventName) {
              newItem.text = eventName;
              updateItems([...items, newItem]);
              toast.success(`Added "${newItem.text}"`);
            }
          }}
        >
          Add New Event
        </button>
      </div>
    </div>
  );
}

export default App;

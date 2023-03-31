import { useState, useEffect } from "react";
import EditDish from "../components/EditDish.component";

function DishPage() {
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  
  useEffect(() => {
    async function fetchDishes() {
      const response = await fetch("http://localhost:8080/api/dish/all");
      const data = await response.json();
      setDishes(data);
    }
    fetchDishes();
  }, []);

  const handleEditClick = (dish) => {
    setSelectedDish(dish);
  };

  const handleDeleteClick = (dish) => {
    if (window.confirm(`Are you sure you want to delete ${dish.name}?`)) {
      const updatedDishes = dishes.filter((d) => d.id !== dish.id);
      setDishes(updatedDishes);
      setSelectedDish(null);
      alert("Delete successful!");
    }
  };

  const handleEditSubmit = () => {
    alert("Edit successful!");
  };

  return (
    <div className="container mt-5">
      <h1>Dish List</h1>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (Original)</th>
            <th>Price (Current)</th>
            <th>Sold Out</th>
            <th>Valid</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish.id}>
              <td>{dish.name}</td>
              <td>{dish.price_ori}</td>
              <td>{dish.price_cur}</td>
              <td>{dish.is_sold_out ? "Yes" : "No"}</td>
              <td>{dish.is_valid ? "Yes" : "No"}</td>
              <td>
                <button className="btn btn-primary mx-2" onClick={() => handleEditClick(dish)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(dish)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDish && (
        <div className="modal fade show" role="dialog" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Dish</h5>
                <button type="button" className="close" onClick={() => setSelectedDish(null)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <EditDish dish={selectedDish} onSubmit={handleEditSubmit} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DishPage;

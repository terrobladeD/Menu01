import { useState } from "react";

function EditDish(props) {
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [price_ori, setPriceOri] = useState(props.price_ori);
  const [price_cur, setPriceCur] = useState(props.price_cur);
  const [is_sold_out, setIsSoldOut] = useState(props.is_sold_out);
  const [is_valid, setIsValid] = useState(props.is_valid);

  const handleEditClick = (e) => {
    e.preventDefault();
    alert("Edit successful");
    // Here you can write code to submit the edited dish to the backend API
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            readOnly
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setName("")}
          >
            Edit
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            readOnly
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setDescription("")}
          >
            Edit
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="price_ori">Original Price</label>
          <input
            type="text"
            className="form-control"
            id="price_ori"
            value={price_ori}
            readOnly
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setPriceOri("")}
          >
            Edit
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="price_cur">Current Price</label>
          <input
            type="text"
            className="form-control"
            id="price_cur"
            value={price_cur}
            readOnly
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setPriceCur("")}
          >
            Edit
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="is_sold_out">Sold Out</label>
          <input
            type="checkbox"
            className="form-control"
            id="is_sold_out"
            checked={is_sold_out}
            disabled
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setIsSoldOut(!is_sold_out)}
          >
            Edit
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="is_valid">Valid</label>
          <input
            type="checkbox"
            className="form-control"
            id="is_valid"
            checked={is_valid}
            disabled
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setIsValid(!is_valid)}
          >
            Edit
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleEditClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDish;

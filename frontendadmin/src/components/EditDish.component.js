import { useState } from "react";

function EditDish(props) {
  const [name, setName] = useState(props.dish.name);
  const [short_name, setShortName] = useState(props.dish.short_name);
  const [description, setDescription] = useState(props.dish.description);
  const [full_description, setFullDescription] = useState(props.dish.full_description);
  const [price_ori, setPriceOri] = useState(props.dish.price_ori);
  const [price_cur, setPriceCur] = useState(props.dish.price_cur);
  const [type, setType] = useState(props.dish.type);
  const [pict_url, setPictUrl] = useState(props.dish.pict_url);

  const handleEditClick = (e) => {
    e.preventDefault();
    alert("Edit successful");
    // Here you can write code to submit the edited dish to the backend API
  };

  return (
    <div>
      <form>
        <div className="form-row">
          <div className="input-group d-flex align-items-center">
            <label htmlFor="name" className="col-3">Name</label>
            <input
              type="text"
              className="form-control col-9"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group d-flex align-items-center">
            <label htmlFor="short_name" className="col-3">Short Name</label>
            <input
              type="text"
              className="form-control col-9"
              id="short_name"
              value={short_name}
              onChange={(e) => setShortName(e.target.value)}
            />
          </div>

          <div className="input-group d-flex align-items-center">
            <label htmlFor="price_ori" className="col-3">Original Price</label>
            <input
              type="text"
              className="form-control col-9"
              id="price_ori"
              value={price_ori}
              onChange={(e) => setPriceOri(e.target.value)}
            />
          </div>

          <div className="input-group d-flex align-items-center">
            <label htmlFor="price_cur" className="col-3">Current Price</label>
            <input
              type="text"
              className="form-control col-9"
              id="price_cur"
              value={price_cur}
              onChange={(e) => setPriceCur(e.target.value)}
            />
          </div>

          <div className="input-group d-flex align-items-center">
            <label htmlFor="type" className="col-3">Type</label>
            <input
              type="text"
              className="form-control col-9"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group d-flex align-items-center my-3">
          <label htmlFor="description" className="col-3">Description</label>
          <textarea
            className="form-control col-9"
            id="description"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="input-group d-flex align-items-center my-3">
          <label htmlFor="full_description" className="col-3">Full Description</label>
          <textarea
            className="form-control col-9"
            id="full_description"
            rows="4"
            value={full_description}
            onChange={(e) => setFullDescription(e.target.value)}
          />
        </div>

        <div className="input-group d-flex align-items-center my-3">
          <label htmlFor="pict_url" className="col-3">Picture URL</label>
          <input
            type="text"
            className="form-control col-9"
            id="pict_url"
            value={pict_url}
            onChange={(e) => setPictUrl(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleEditClick}
        >          Submit
        </button>
      </form>
    </div>
  );
}



export default EditDish;


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
  const [imageFile, setImageFile] = useState(null);

  const handleEditClick = async (e) => {
    e.preventDefault();

    // Prepare the updated dish data
    const updatedDish = {
      name,
      short_name,
      description,
      full_description,
      price_ori,
      price_cur,
      type
    };

    try {
      const authData = JSON.parse(localStorage.getItem('authData'));
      const token = authData && authData.token;
      const response = await fetch(`http://localhost:8080/api/dish/edit/${props.dish.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(updatedDish),
      });

      if (response.ok) {
        alert("Edit successful");
        // You can also perform additional actions here, like refreshing the dish list, etc.
      } else {
        console.error("Error updating dish:", response.statusText);
        alert("Error updating dish. Please try again.");
      }
    } catch (error) {
      console.error("Error updating dish:", error);
      alert("Error updating dish. Please try again.");
    }

  };

  // Function to handle file input change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setPictUrl(URL.createObjectURL(e.target.files[0]));
  };

  // Function to call the backend API for image upload (left empty)
  const handleImageUpload = () => {
    // Call your backend API for image upload here
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

        <div className="d-flex align-items-center my-3" >
          <div className="col-3">Picture Preview</div>
          <div className="col-9">
            <img
              src={pict_url}
              alt="Dish"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="input-group d-flex align-items-center my-3">
          <label htmlFor="upload" className="col-3">Upload New Picture</label>
          <input
            type="file"
            className="form-control-file col-6"
            id="upload"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="btn btn-primary col-3"
            onClick={handleImageUpload}
          >
            Upload
          </button>
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


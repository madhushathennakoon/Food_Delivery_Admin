import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import app from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// imageUrl

const Add = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [displayPhoto, setDisplayPhoto] = useState("");

  const imgConvert = (data) => {
    setDisplayPhoto(URL.createObjectURL(data));
  };

  const uploadFile = async () => {
    const storage = getStorage(app);
    const imageRef = ref(storage, "image/" + photo.name);

    const res = await uploadBytes(imageRef, photo);
    const url = await getDownloadURL(res.ref);
    return url;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const imageUrl = await uploadFile();
      console.log(`path: ${imageUrl}`);

      const foodItem = { name, desc, category, price, imageUrl };

      const response = await axios.post(
        "http://localhost:4000/api/food/add",
        foodItem
      );

      if ((response.status = 200)) {
        setName("");
        setDesc("");
        setCategory("");
        setPrice("");
        setPhoto("");
        setDisplayPhoto("");
        toast.success("Food item has been added.");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={displayPhoto ? displayPhoto : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
              imgConvert(e.target.files[0]);
            }}
            hidden
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name </p>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
          />
        </div>

        <div className="add-product-discrption flex-col">
          <p>Product Discrption </p>
          <textarea
            type="text"
            rows="6"
            placeholder="Write content here"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category-price flex-col">
            <p>Product Category </p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price </p>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;

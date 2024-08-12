import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState();

  const fetchList = async () => {
    const response = await axios.get("http://localhost:4000/api/food/getall");
    const data = response.data;
    console.log(response);

    if ((response.status = 200)) {
      setList(data);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodID) => {
    const response = await axios.delete(
      `http://localhost:4000/api/food/${foodID}`
    );
    await fetchList();

    if ((response.status = 200)) {
      toast.success("Food item has been removed.");
    } else {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list &&
          list.map((food) => {
            return (
              <div key={food._id} className="list-table-format">
                <img src={food.imageUrl} />
                <p>{food.name}</p>
                <p>{food.category}</p>
                <p>${food.price}</p>
                <p onClick={() => removeFood(food._id)} className="cursor">
                  X
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default List;

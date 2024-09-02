import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import "./Orders.css";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get("http://localhost:4000/api/order/getall");
    const data = response.data;
    console.log(response);

    if ((response.status = 200)) {
      setOrders(data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // return (
  //   <div className="order add">
  //     <h3>Order Page</h3>
  //     <table className="order-table">
  //       <thead>
  //         <tr>
  //           <th>Image</th>
  //           <th>Name & Quantity</th>
  //           <th>Customer Name</th>
  //           <th>Address</th>
  //           <th>Phone</th>
  //           <th>Total</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {orders &&
  //           orders.map((order) => (
  //             <tr key={order._id}>
  //               <td>
  //                 <img src={assets.parcel_icon} alt="Parcel Icon" />
  //               </td>
  //               <td>{order.nameQty}</td>
  //               <td>{order.first_name + " " + order.last_name}</td>
  //               <td>
  //                 {order.street +
  //                   ", " +
  //                   order.state +
  //                   ", " +
  //                   order.country +
  //                   ", " +
  //                   order.zip_code}
  //               </td>
  //               <td>{order.phone}</td>
  //               <td>{order.total}</td>
  //             </tr>
  //           ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <table className="order-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name & Quantity</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <img src={assets.parcel_icon} alt="Parcel Icon" />
                </td>
                <td>{order.nameQty}</td>
                <td>{order.first_name + " " + order.last_name}</td>
                <td>
                  {order.street +
                    ", " +
                    order.state +
                    ", " +
                    order.country +
                    ", " +
                    order.zip_code}
                </td>
                <td>{order.phone}</td>
                <td>{order.total}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      <hr />
      <br />
      <Link className="link" to="/add">
        Add Item
      </Link>
      <br />
      <Link className="link" to="/orders">
        orders
      </Link>
      <br />
      <Link className="link" to="/list">
        List Item
      </Link>
    </div>
  );
};

export default Orders;

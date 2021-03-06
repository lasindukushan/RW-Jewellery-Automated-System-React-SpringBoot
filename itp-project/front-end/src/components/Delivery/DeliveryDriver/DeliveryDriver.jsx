import React, { Component } from "react";
import { Link } from "react-router-dom";

class DeliveryDriver extends Component {
  constructor() {
    super();
    this.state = {
      DeliveryPendingRequest: [],
      temp: "",
      TempDel: {},
    };
  }
  getData = (e) => {
    let deliverID = document.getElementById("DID").value;
    console.log(deliverID);
    sessionStorage.setItem("UpdateDelivery", deliverID);
  };
  async componentDidMount() {
    let DriverID = "2ade299f-f48c-4109-b863-ff96659d57d1";
    sessionStorage.setItem("DriverID", DriverID);
    const APICall = await fetch(`/api/delivery/deliveryBoy/${DriverID}`);
    const Result = await APICall.json();
    this.setState({ DeliveryPendingRequest: Result });
  }
  render() {
    return (
      <div>
        <div className="container">
          <h4 className="center-align grey-text">
            <b>Delivery History of the driver</b>
          </h4>
          <table className="striped">
            <thead>
              <tr>
                <th>Item Category</th>
                <th>Address To Deliver</th>
                <th>City</th>
                <th>Cusomer Name</th>
                <th>Phone Number</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {this.state.DeliveryPendingRequest.map((DelivereyPending) => {
                return (
                  <tr>
                    <td>Ring</td>
                    <td>{DelivereyPending.deliveryAddress}</td>
                    <td>{DelivereyPending.deliveryCity}</td>
                    <input
                      value={DelivereyPending.delivery_id}
                      id="DID"
                      type="text"
                      class="validate"
                      hidden
                    ></input>
                    <td>Alvin</td>
                    <td>0771922433</td>
                    <td>
                      <Link to="/UpdateDelivery">
                        <button
                          className="btn center-align grey darken-3"
                          onClick={this.getData}
                        >
                          More Details about delivery
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DeliveryDriver;

import React, { Component } from "react";
import M from "materialize-css";
import "./../../../App.css";
class ConfirmDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: "",
      TempDel: {},
    };
  }
  async componentDidMount() {
    const DeliverID = sessionStorage.getItem("assignItemDriver");
    console.log(DeliverID);
    const apitemp = await fetch(`api/deliverybyid/${DeliverID}`);
    const tempResult = await apitemp.json();
    this.setState({ TempDel: tempResult });

    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }
  ConfirmDelivery = async (event) => {
    event.preventDefault();
    const DeliverID = sessionStorage.getItem("assignItemDriver");
    const Daddress = document.getElementById("address").value;
    const DCity = document.getElementById("city").value;
    //const DboyID = document.getElementById("deliverBoy").value;
    const Ddistance = document.getElementById("distance").value;
    const DProvince = document.getElementById("province").value;
    const DphoneNumber = document.getElementById("phoneNumber").value;
    const Ddistrict = document.getElementById("district").value;
    await fetch(`/api/updatestatus/${DeliverID}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        delivery_id: DeliverID,
        deliveryAddress: Daddress,
        deliveryCity: DCity,
        requestedTime: null,
        deliveredTime: null,
        status: "Confrimed",
        distance: Ddistance,
        deliveryProvince: DProvince,
        phoneNumber: DphoneNumber,
        district: Ddistrict,
        //deliverBoy: DboyID,
      }),
    });
  };
  render() {
    return (
      <div>
        <div className="container">
          <h2 className="center-align grey-text">Delivery Details</h2>
          <div className="card horizontal">
            <div className="card-image">
              <img src="https://image.freepik.com/free-vector/delivery-concept-illustration_114360-140.jpg" />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <h6 className="center-align grey-text">
                  Address - {this.state.TempDel.deliveryAddress}
                </h6>
                <h6 className="center-align grey-text">
                  Delivery ID - {this.state.TempDel.delivery_id}
                </h6>
                <h6 className="center-align grey-text">
                  Delivery City - {this.state.TempDel.deliveryCity}
                </h6>
                <h6 className="center-align grey-text">
                  Delivery Province - {this.state.TempDel.deliveryProvince}
                </h6>
                <h6 className="center-align grey-text">
                  Phone number for contact - {this.state.TempDel.phoneNumber}
                </h6>
                <h6 className="center-align grey-text">
                  District - {this.state.TempDel.district}
                </h6>
                <h6 className="center-align grey-text">
                  Distance - {this.state.TempDel.distance}
                </h6>
                <button
                  data-target="modal1"
                  type="submit"
                  class="btn modal-trigger"
                  style={{ width: "100%" }}
                  onClick={this.ConfirmDelivery}
                >
                  Confirm Delivery
                </button>
              </div>
              <div className="card-action"></div>
            </div>
          </div>
        </div>
        <input
          id="address"
          type="text"
          className="validate"
          value={this.state.TempDel.deliveryAddress}
          hidden
        />
        <input
          id="city"
          type="text"
          className="validate"
          value={this.state.TempDel.deliveryCity}
          hidden
        />

        <input
          id="distance"
          type="text"
          className="validate"
          value={this.state.TempDel.distance}
          hidden
        />
        <input
          id="province"
          type="text"
          className="validate"
          value={this.state.TempDel.Province}
          hidden
        />
        <input
          id="phoneNumber"
          type="text"
          className="validate"
          value={this.state.TempDel.phoneNumber}
          hidden
        />
        <input
          id="district"
          type="text"
          className="validate"
          value={this.state.TempDel.district}
          hidden
        />
      </div>
    );
  }
}

export default ConfirmDelivery;

import React from "react";
import { httpRequest } from "../constant";
export default class Dashboard extends React.Component {
  state = {
    booking: {
      bookingNo: Math.floor(new Date().valueOf() * Math.random()),
      user: JSON.parse(localStorage.getItem("user")),
      bookingType: "",
      packageWt: "",
    },
    price: 0,
    discount: 0,
  };

  saveBookingDetails = (event) => {
    let booking = this.state.booking;
    booking.price = this.state.price - this.state.price * this.state.discount;

    const data = httpRequest("/booking/create", booking);

    data
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          booking: {
            bookingNo: Math.floor(new Date().valueOf() * Math.random()),
            user: JSON.parse(localStorage.getItem("user")),
            bookingType: "",
            packageWt: "",
          },
          price: 0,
          discount: 0,
        });
        alert(
          "Booking successfull, we will inform you once our delivery boy pickup your order, thanks"
        );
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  };

  setNewValue = (e) => {
    const { id, value } = e.target;

    let { booking } = { ...this.state };
    booking[id] = value;

    let price = this.state.price;
    if (id === "packageWt") {
      switch (value) {
        case "Small":
          price = 50;
          break;
        case "Medium":
          price = 100;
          break;
        case "Large":
          price = 150;
          break;

        default:
          break;
      }
    }
    let discount = this.state.discount;
    if (id === "bookingType") {
      switch (value) {
        case "Regular":
          discount = 20;
          break;
        case "Occasional":
          discount = 0;
          break;

        default:
          break;
      }
    }

    this.setState({ booking: booking, price: price, discount: discount });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <form className="form">
              <strong>Booking Details</strong>

              <div className="formGroup">
                <label htmlFor="bookingNo">Booking No:</label>
                <input
                  id="bookingNo"
                  className="form-control"
                  value={this.state.booking?.bookingNo}
                  disabled
                />
              </div>

              <div className="formGroup">
                <label htmlFor="packageWt">Weight:</label>
                <select
                  id="packageWt"
                  className="custom-select"
                  value={this.state.booking?.packageWt}
                  onChange={(e) => this.setNewValue(e)}
                  required
                >
                  <option value="" />
                  <option value="Small">Small (Rs. 50)</option>
                  <option value="Medium">Medium (Rs. 100)</option>
                  <option value="Large">Large (Rs. 150)</option>
                </select>
              </div>

              <div className="formGroup">
                <label htmlFor="bookingType">Community:</label>
                <select
                  id="bookingType"
                  className="custom-select"
                  value={this.state.booking?.bookingType}
                  onChange={(e) => this.setNewValue(e)}
                  required
                >
                  <option value="" />
                  <option value="Regular">Regular (20% discount)</option>
                  <option value="Occasional">Occasional </option>
                </select>
              </div>

              <hr />

              <strong>User Details</strong>
              <div className="formGroup">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="number"
                  id="phone"
                  className="form-control"
                  pattern="[0-9]{10}"
                  value={this.state.booking?.user.phone}
                  onChange={(e) => this.setNewValue(e)}
                />
              </div>

              <hr />

              <strong>Pricing Details</strong>
              <div className="formGroup">
                <label className="float: left">
                  Price : Rs. {this.state.price}
                </label>
                <br />
                <label className="float: left">
                  Discount : {this.state.discount} %
                </label>
                <br />
                <label className="float: left">
                  -----------------------------------
                </label>
                <br />
                <label className="float: left">
                  <strong>
                    Total Price : Rs.{" "}
                    {this.state.price -
                      (this.state.price * this.state.discount) / 100}
                  </strong>
                </label>
              </div>

              <div className="formGroup">
                <button
                  type="submit"
                  onClick={(e) => this.saveBookingDetails(e)}
                  className="btn btn-primary"
                >
                  Order Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

import React from "react";
import { httpRequest } from "../constant";
import MapContainer from "./multimarkermap";

export default class Dashboard extends React.Component {
  state = {
    bookingType: "All",
    radius: undefined,
    bookingsToDisplay: [],
  };

  componentDidMount() {
    const data = httpRequest("/booking/fetchAll", {});

    data
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          bookings: [...json.body],
          bookingsToDisplay: [...json.body],
        });
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  filterBookingDetails = () => {
    const { bookingType, radius } = this.state;

    let bookingsToDisplay = [...this.state.bookings];
    if (bookingType === "Regular") {
      bookingsToDisplay = bookingsToDisplay.filter(
        (booking) => booking && booking.bookingType === "Regular"
      );
    } else if (bookingType === "Occasional") {
      bookingsToDisplay = bookingsToDisplay.filter(
        (booking) => booking && booking.bookingType === "Occasional"
      );
    }

    if (Boolean(radius)) {
      bookingsToDisplay = bookingsToDisplay.filter(
        (booking) => booking && true //Todo: radius calc here
      );
    }

    this.setState({ bookingsToDisplay: bookingsToDisplay });
  };

  render() {
    const { history } = this.props;
    return (
      <div class="container-fluid">
        <form class="form-inline">
          <label htmlFor="bookingType">Booking Type</label>
          <select
            id="bookingType"
            className="custom-select"
            value={this.state.bookingType}
            onBlur={(e) => this.setState({ bookingType: e.target.value })}
            required
          >
            <option value="All">All</option>
            <option value="Regular">Regular</option>
            <option value="Occasional">Occasional </option>
          </select>

          <label htmlFor="phone">Radius</label>
          <input
            type="number"
            id="radius"
            className="form-control"
            maxlength="10"
            value={this.state.radius}
            onBlur={(e) => this.setState({ radius: e.target.value })}
          />

          <button
            type="submit"
            onClick={() => this.filterBookingDetails()}
            className="btn btn-success"
          >
            Filter
          </button>
        </form>

        <hr />
        <MapContainer
          markerToDisplay={this.state.bookingsToDisplay}
          history={history}
        />
      </div>
    );
  }
}

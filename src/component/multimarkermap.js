import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "80%",
  height: "400px",
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    stores: [],
    userDetails: {},
  };

  displayMarkers = () => {
    const { markerToDisplay } = this.props;
    return markerToDisplay.map((detail, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: detail.user.location.latitude,
            lng: detail.user.location.longitude,
          }}
          onClick={() => this.onMarkerClick(detail)}
          name={"Drop Location"}
        />
      );
    });
  };

  onMarkerClick = (detail, props, marker, e) => {
    console.log("props", this.props);
    this.props.history.push({
      pathname: "/bookingdetails",
      search: "",
      state: { detail: detail },
    });

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{
          lat: 12.9862559,
          lng: 77.7566411,
        }}
      >
        {this.displayMarkers()}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAW0Bn_OXc2Ng-_O0iGbCxgPQJ_I656iOY",
})(MapContainer);

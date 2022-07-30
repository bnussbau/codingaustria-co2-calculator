import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const SimpleMap = ({ cords }) => {
  const defaultProps = {
    center: cords[0],
    zoom: 14,
  };

  const apiIsLoaded = (map, maps) => {
    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();

    const origin = cords[0];
    const destination = cords[cords.length - 1];

    const waypoints = cords.map((cord) => {
      return {
        location: {
          lat: cord.lat,
          lng: cord.lng,
        },
      };
    });

    directionsService.route(
      {
        origin,
        destination,
        travelMode: "DRIVING",
        waypoints,
        optimizeWaypoints: true,
      },
      (response, status) => {
        if (status === maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);

          const routePolyline = new maps.Polyline({
            path: response.routes[0].overview_path,
          });
          routePolyline.setMap(map);
        } else {
          console.error(`error fetching directions ${response}`);
        }
      }
    );
  };
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      >
        {cords.map((cord, index) => {
          return (
            <Marker
              lat={cord.lat}
              lng={cord.lng}
              firstElement={index === 0}
              lastElement={cords.length - 1 === index}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;

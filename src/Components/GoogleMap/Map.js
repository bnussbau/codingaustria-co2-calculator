import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const SimpleMap = () => {
  const defaultProps = {
    center: {
      lat: 47.7489014,
      lng: 13.2530003,
    },
    zoom: 11,
  };

  const apiIsLoaded = (map, maps) => {
    const directionsService = new maps.DirectionsService();

    const directionsRenderer = new maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    const origin = {
      lat: 48.215739883024661,
      lng: 16.370281800013927,
    };
    const destination = {
      lat: 48.215739883024661,
      lng: 17.370281800013927,
    };

    directionsService.route(
      {
        origin,
        destination,
        travelMode: maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      >
        <Marker lat={48.215739883024661} lng={16.370281800013927} text="You" />
        <Marker lat={48.215739883024661} lng={17.370281800013927} text="Shop" />
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;

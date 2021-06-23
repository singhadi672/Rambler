import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { useDispatch, useSelector } from "react-redux";
import AutoComplete from "react-google-autocomplete";
import { createRamblerMaps, setLatLng } from "../ramblerMapSlice";
import Geocode from "react-geocode";
import { useRef, useState } from "react";
import moment from "moment";
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export function MapComponent() {
  const [text, setText] = useState("Delhi,India");
  const [geoLocation, setGeoLocation] = useState({
    lat: 28.7041,
    lng: 77.1025,
  });
  const dispatch = useDispatch();
  const dateRef = useRef(null);

  async function markerDraghandler(lat, lng) {
    Geocode.setApiKey(API_KEY);
    Geocode.enableDebug();
    const response = await Geocode.fromLatLng(lat, lng);
    setGeoLocation({ lat: lat, lng: lng });
    setText(response.results[0].formatted_address);
  }

  function createRamblerhandler(location, date) {
    if (location && date) {
      const dateOfJourney = moment(date).format("MMMM Do YYYY");
      dispatch(createRamblerMaps({ location, dateOfJourney }));
    }
  }

  return (
    <>
      <GoogleMap
        defaultZoom={4}
        center={{ lat: geoLocation.lat, lng: geoLocation.lng }}
        options={{ mapTypeControl: false, fullscreenControl: false }}
      >
        <Marker
          position={{ lat: geoLocation.lat, lng: geoLocation.lng }}
          draggable={true}
          onDragEnd={(e) => markerDraghandler(e.latLng.lat(), e.latLng.lng())}
        >
          <InfoWindow onCloseClick={() => setText("")}>
            <p>{text}</p>
          </InfoWindow>
        </Marker>
      </GoogleMap>
      <div className="rambler-maps-form">
        <div className="address-select">
          <label htmlFor="">Enter Your Destination</label>
          <AutoComplete
            apiKey={API_KEY}
            onPlaceSelected={(place) => {
              markerDraghandler(
                place.geometry.location.lat(),
                place.geometry.location.lng()
              );
            }}
          />
        </div>
        <div className="date-select">
          <label htmlFor="">Enter Date</label>
          <input
            type="date"
            name=""
            id=""
            ref={dateRef}
            defaultValue={moment(new Date()).format("MMMM Do YYYY")}
          />
        </div>
        <button
          onClick={() => createRamblerhandler(text, dateRef.current.value)}
        >
          Rambler!
        </button>
      </div>
    </>
  );
}

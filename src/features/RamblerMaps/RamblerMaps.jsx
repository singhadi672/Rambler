import { MapComponent } from "./MapComponent/MapComponent";
import { withGoogleMap, withScriptjs } from "react-google-maps";
import "./RamblerMaps.css";
import { RamblerMapsNav } from "./..";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRamblerMaps } from "./ramblerMapSlice";

export default function RamblerMaps() {
  const Map = withScriptjs(withGoogleMap(MapComponent));
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const dispatch = useDispatch();
  const { ramblerMaps } = useSelector((state) => state.ramblerMap);

  useEffect(() => {
    dispatch(getAllRamblerMaps());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="rambler-maps-main">
      <RamblerMapsNav />
      <div className="rambler-maps-content">
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `90%` }} />}
          containerElement={<div style={{ height: `250px` }} />}
          mapElement={<div style={{ height: `90%` }} />}
          isMarkerShown={false}
        />
      </div>
      <div className="rambler-maps-body">
        {ramblerMaps &&
          ramblerMaps.map((item) => (
            <div className="rambler-post">
              <div className="rambler-user">
                <img src={item.user.profilePicture} alt="" />
                <p>{item.user.username}</p>
              </div>
              <div className="rambler-maps-post">
                <p>
                  {item.preText} I am travelling to {item.location} on{" "}
                  {item.dateOfJourney} {item.postText}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

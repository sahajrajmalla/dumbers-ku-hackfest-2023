import { MapContainer, TileLayer } from "react-leaflet";
import Geoman from "./Geoman";

const Map = ({ onCordinateChange }) => {
  const position = [48.863247, 2.350747];
  const zoomLv = 13;

  return (
    <MapContainer center={position} zoom={zoomLv} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={20}
      />
      <Geoman onCordinateChange={onCordinateChange} />
    </MapContainer>
  );
};

export default Map;

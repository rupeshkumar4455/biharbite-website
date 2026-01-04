import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const riderIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

const LiveMap = ({ lat, lng }) => {
  if (!lat || !lng) return <p>No live location yet</p>;

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={riderIcon}>
        <Popup>Rider is here 🚴‍♂️</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LiveMap;

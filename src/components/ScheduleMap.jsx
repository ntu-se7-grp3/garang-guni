import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./ScheduleMap.module.css";
import station1 from "../assets/station1.jpg";
import station2 from "../assets/station2.jpg";
import station3 from "../assets/station3.jpg";
import station4 from "../assets/station4.jpg";
import station5 from "../assets/station5.jpg";
import station6 from "../assets/station6.jpg";

const stations = [
  {
    name: "South West Station : Lakeside",
    address: "517B Jurong West Street 52, Singapore 642517",
    date: "Every Monday",
    time: "9:00 AM - 6:00 PM",
    photo: station1,
    position: [1.345367, 103.720685],
  },
  {
    name: "Upper Central : Ang Mo Kio",
    address: "700A Ang Mo Kio Ave 3, 560700 Singapore",
    date: "Every Tueday",
    time: "9:00 AM - 6:00 PM",
    photo: station2,
    position: [1.369679, 103.846243],
  },
  {
    name: "North West Station : Woodland",
    address: "368 Woodlands Ave 1, #07 Block 368, Singapore 730368",
    date: "Every Wednesday",
    time: "9:00 AM - 6:00 PM",
    photo: station3,
    position: [1.432933, 103.787022],
  },
  {
    name: "North East Station : Seng Kang",
    address: "2 , SengKang Square, #01-01 SengKang Community Hub, 545025",
    date: "Every Thursday",
    time: "9:00 AM - 6:00 PM",
    photo: station4,
    position: [1.392295, 103.894086],
  },
  {
    name: "South East Station: Tampines",
    address: "246 Tampines St. 21, Singapore 521246",
    date: "Every Friday",
    time: "9:00 AM - 6:00 PM",
    photo: station5,
    position: [1.353097, 103.946998],
  },
  {
    name: "Lower Central: Redhill",
    address: "85 Redhill Ln, Singapore 150085",
    date: "Every Saturday",
    time: "9:00 AM - 6:00 PM",
    photo: station6,
    position: [1.287226, 103.818879],
  },

  //add more station
];

function ScheduleMap() {
  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/browse/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  return (
    <MapContainer center={[1.3521, 103.8198]} zoom={12} className={styles.container}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stations.map((station, index) => (
        <Marker key={index} position={station.position} icon={defaultIcon}>
          <Popup>
            <div className={styles.popupContent}>
              <img src={station.photo} alt={station.name} className={styles.stationPhoto} />
              <h3>{station.name}</h3>
              <p>
                <strong>Address:</strong> {station.address}
              </p>
              <p>
                <strong>Collection Time:</strong> {station.time}
              </p>
              <p>
                <strong>Date:</strong> {station.date}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default ScheduleMap;

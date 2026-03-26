import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix for default marker icons in Leaflet with Webpack/CRA
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Create a custom brand icon
const brandIcon = new L.Icon({
  iconUrl: markerIcon, // We'll use default for now, but colorize with CSS or use a custom SVG later
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const STATIONS = [
  { id: 1, name: "EVZONE Station - North Hill", lat: 1.3521, lng: 103.8198, batteries: 12, status: "Available" },
  { id: 2, name: "GreenSwap Hub - Downtown", lat: 1.2879, lng: 103.8519, batteries: 8, status: "Busy" },
  { id: 3, name: "EcoSwap Point - West End", lat: 1.3347, lng: 103.7436, batteries: 15, status: "Available" },
];

export default function StationMap({ className }) {
  const center = [1.3521, 103.8198]; // Singapore center approx

  return (
    <div className={`overflow-hidden rounded-2xl shadow-inner bg-gray-100 ${className}`} style={{ height: "300px" }}>
      <MapContainer 
        center={center} 
        zoom={11} 
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {STATIONS.map((st) => (
          <Marker key={st.id} position={[st.lat, st.lng]} icon={brandIcon}>
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-sm m-0">{st.name}</h3>
                <p className="text-xs m-0 mt-1">Batteries: <span className="font-bold text-evz-primary">{st.batteries}</span></p>
                <div className={`mt-2 text-[10px] px-2 py-0.5 rounded-full inline-block font-bold ${st.status === "Available" ? "bg-evz-primary/10 text-evz-primary" : "bg-red-100 text-red-600"}`}>
                  {st.status}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

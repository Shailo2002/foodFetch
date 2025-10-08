import React, { useEffect, useState } from "react";
import axios from "axios";
import scooter from "../assets/scooter.png";
import home from "../assets/home.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";

const deliveryBoyIcon = new L.Icon({
  iconUrl: scooter,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const customerIcon = new L.Icon({
  iconUrl: home,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function DeliveryBoyTracking({ data }) {
  const [routeCoords, setRouteCoords] = useState([]);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [distance, setDistance] = useState(null);

  const deliveryBoyLat = data?.deliveryBoyLocation?.lat;
  const deliveryBoyLon = data?.deliveryBoyLocation?.lon;
  const customerLat = data?.curstomerLocation?.lat;
  const customerLon = data?.curstomerLocation?.lon;

  const center = [deliveryBoyLat, deliveryBoyLon];

  useEffect(() => {
    if (!deliveryBoyLat || !deliveryBoyLon || !customerLat || !customerLon)
      return;

    const fetchRoute = async () => {
      try {
        const response = await axios.post(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          {
            coordinates: [
              [deliveryBoyLon, deliveryBoyLat], // [lon, lat] for ORS
              [customerLon, customerLat],
            ],
          },
          {
            headers: {
              Authorization: import.meta.env.VITE_ORS_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        const routeData = response.data;
        const coords =
          routeData.features?.[0]?.geometry?.coordinates?.map((coord) => [
            coord[1],
            coord[0],
          ]) || [];

        const summary = routeData.features[0].properties.summary;
        setDistance(summary.distance / 1000);
        setEstimatedTime(Math.round(summary.duration / 60));
        console.log("Distance:", typeof (summary.distance / 1000), "km");
        console.log("Duration:", Math.round(summary.duration / 60), "min");

        setRouteCoords(coords);
      } catch (error) {
        console.error(
          "Error fetching route:",
          error.response?.data || error.message
        );
      }
    };

    fetchRoute();
  }, [deliveryBoyLat, deliveryBoyLon, customerLat, customerLon]);

  if (!deliveryBoyLat || !customerLat) {
    return <p className="text-gray-500">Waiting for location data...</p>;
  }

  return (
    <div className="w-full h-[400px] overflow-hidden mt-3 rounded-xl shadow-md">
      <div>
        Distance : {Math.trunc(distance)} KM
      </div>
      <div>
        Estimate Time : {estimatedTime} Min
      </div>
      <MapContainer center={center} zoom={14} className="w-full h-full rounded-lg">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[deliveryBoyLat, deliveryBoyLon]}
          icon={deliveryBoyIcon}
        >
          <Popup>Delivery Boy</Popup>
        </Marker>

        <Marker position={[customerLat, customerLon]} icon={customerIcon}>
          <Popup>Customer</Popup>
        </Marker>

        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="blue" weight={3} />
        )}
      </MapContainer>
    </div>
  );
}

export default DeliveryBoyTracking;

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {
    const position = [23.78, 90.40]; // Dhaka 

    return (
        <div>
            <h2 className="text-3xl font-bold text-center my-6">Locations</h2>
            <div className="w-full h-[400px] rounded-lg shadow-lg overflow-hidden">
                <MapContainer
                    center={position}
                    zoom={13}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup className="text-sm font-medium">
                            <div className="text-blue-600 font-semibold">London</div>
                            <div className="text-gray-600">Default location</div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}
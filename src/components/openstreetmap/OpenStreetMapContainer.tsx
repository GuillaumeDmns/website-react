import React, { useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import OpenStreetMap from "./OpenStreetMap";
import { IDFMStopArea, StopsByLineDTO } from "api/api.types";

type Props = {
  stopsByLine: StopsByLineDTO | null;
  selectedStop: IDFMStopArea | null;
  selectedLineColor: string | undefined;
  setSelectedStop: React.Dispatch<React.SetStateAction<IDFMStopArea | null>>;
};

const OpenStreetMapContainer: React.FC<Props> = (props: Props) => {
  const [lng] = useState(2.349014);
  const [lat] = useState(48.864716);
  const [zoom] = useState(11);

  const mapContainer = useRef<any>(null);

  return (
    <div id="map" style={{ width: "800px" }}>
      <MapContainer ref={mapContainer} center={[lat, lng]} zoom={zoom} scrollWheelZoom={false} style={{ height: "500px" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <OpenStreetMap {...props}></OpenStreetMap>
      </MapContainer>
    </div>
  );
};

export default OpenStreetMapContainer;

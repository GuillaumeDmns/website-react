import React, { useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import OpenStreetMap from "./OpenStreetMap";
import { IDFMStopArea, LineDTO, StopsByLineDTO } from "api/api.types";

type Props = {
  stopsByLine: StopsByLineDTO | null;
  selectedStop: IDFMStopArea | null;
  selectedLine: LineDTO | undefined;
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
          attribution='Images aériennes @ IGN'
          url="https://wxs.ign.fr/essentiels/geoportail/wmts?layer=ORTHOIMAGERY.ORTHOPHOTOS&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}"
        />
        <OpenStreetMap {...props}></OpenStreetMap>
      </MapContainer>
    </div>
  );
};

export default OpenStreetMapContainer;

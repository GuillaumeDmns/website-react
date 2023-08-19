import React, { useEffect, useState } from "react";
import L from "leaflet";
import { useSelector } from "react-redux";
import { Marker, Popup, useMap } from "react-leaflet";

import { IRootState } from "store/types";
import { IDFMStopArea, StopsByLineDTO } from "api/api.types";
import icon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import "mapbox-gl/dist/mapbox-gl.css";

let DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [20, 32.8],
  iconAnchor: [10, 32.8],
});

L.Marker.prototype.options.icon = DefaultIcon;

type Props = {
  stopsByLine: StopsByLineDTO | null;
  selectedStop: IDFMStopArea | null;
  selectedLineColor: string | undefined;
  setSelectedStop: React.Dispatch<React.SetStateAction<IDFMStopArea | null>>;
};

type MarkersAndPopus = {
  lat: number;
  lng: number;
  stopName: string;
};

const OpenStreetMap: React.FC<Props> = ({ stopsByLine, selectedStop, selectedLineColor, setSelectedStop }: Props) => {
  const [currentMarkers, setCurrentMarkers] = useState<Array<MarkersAndPopus>>([]);
  const isAuthenticated: boolean = useSelector((state: IRootState) => state.authentication.isAuthenticated);

  const map = useMap();

  const markersColor: string | undefined = selectedLineColor ? `#${selectedLineColor}` : undefined;

  useEffect(() => {
    if (!isAuthenticated || !selectedStop) return;
    map.flyTo([selectedStop.latitude || 0, selectedStop.longitude || 0]);
  }, [isAuthenticated, selectedStop]);

  useEffect(() => {
    if (stopsByLine) {
      const newMarkersAndPopus: Array<MarkersAndPopus> = [];
      stopsByLine.stops?.map((stop) => {
        if (stop.longitude && stop.latitude && stop.name) {
          const markerAndPopup: MarkersAndPopus = { lat: stop.latitude, lng: stop.longitude, stopName: stop.name };
          // marker.getElement().addEventListener("click", () => setSelectedStop(stop));
          newMarkersAndPopus.push(markerAndPopup);
        }
      });
      setCurrentMarkers(newMarkersAndPopus);

      if (stopsByLine.stops && stopsByLine.stops.length > 0) {
        const minLat =
          stopsByLine.stops.reduce((prev, curr) => (curr.latitude && prev.latitude && curr.latitude < prev.latitude ? curr : prev))
            .latitude || 0;
        const maxLat =
          stopsByLine.stops.reduce((prev, curr) => (curr.latitude && prev.latitude && curr.latitude > prev.latitude ? curr : prev))
            .latitude || 0;
        const minLong =
          stopsByLine.stops.reduce((prev, curr) => (curr.longitude && prev.longitude && curr.longitude < prev.longitude ? curr : prev))
            .longitude || 0;
        const maxLong =
          stopsByLine.stops.reduce((prev, curr) => (curr.longitude && prev.longitude && curr.longitude > prev.longitude ? curr : prev))
            .longitude || 0;
        map.fitBounds(
          [
            [minLat, minLong],
            [maxLat, maxLong],
          ],
          {
            padding: [40, 40],
          }
        );
      }

      // map.current.addLayer({})
    } else {
      setCurrentMarkers([]);
    }
  }, [stopsByLine]);

  return (
    <>
      {currentMarkers.map((marker, id) => (
        <Marker
          key={id}
          position={[marker.lat, marker.lng]}
          eventHandlers={{
            click: () => {
              setSelectedStop(stopsByLine?.stops?.find((stop) => stop.latitude === marker.lat && stop.longitude === marker.lng) || null);
            },
          }}
        >
          <Popup>{marker.stopName}</Popup>
        </Marker>
      ))}
    </>
  );
};

export default OpenStreetMap;

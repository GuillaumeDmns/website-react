import React, { useEffect, useMemo } from "react";
import L from "leaflet";
import { useSelector } from "react-redux";
import { GeoJSON, Marker, Popup, useMap } from "react-leaflet";

import { IRootState } from "store/types";
import { IDFMStopArea, LineDTO, StopsByLineDTO } from "api/api.types";
import icon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";

const DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [20, 32.8],
  iconAnchor: [10, 32.8],
});

L.Marker.prototype.options.icon = DefaultIcon;

type Props = {
  stopsByLine: StopsByLineDTO | null;
  selectedStop: IDFMStopArea | null;
  selectedLine: LineDTO | undefined;
  setSelectedStop: React.Dispatch<React.SetStateAction<IDFMStopArea | null>>;
};

type MarkersAndPopus = {
  lat: number;
  lng: number;
  stopName: string;
};

const OpenStreetMap: React.FC<Props> = ({ stopsByLine, selectedStop, selectedLine, setSelectedStop }: Props) => {
  const isAuthenticated: boolean = useSelector((state: IRootState) => state.authentication.isAuthenticated);
  const map = useMap();

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });

    const container = map.getContainer();
    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [map]);

  const lineColor: string | undefined = selectedLine && selectedLine.lineIdBackgroundColor ? `#${selectedLine.lineIdBackgroundColor}` : undefined;

  const currentMarkers: Array<MarkersAndPopus> = useMemo(() => {
    if (!stopsByLine || !stopsByLine.stops) return [];

    return stopsByLine.stops
      .filter((stop) => stop.latitude && stop.longitude && stop.name)
      .map((stop) => ({
        lat: stop.latitude!,
        lng: stop.longitude!,
        stopName: stop.name!,
      }));
  }, [stopsByLine]);

  useEffect(() => {
    if (!isAuthenticated || !selectedStop) return;
    map.flyTo([selectedStop.latitude || 0, selectedStop.longitude || 0]);
  }, [isAuthenticated, selectedStop, map]);

  useEffect(() => {
    if (stopsByLine && stopsByLine.stops && stopsByLine.stops.length > 0) {
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
        },
      );
    }
  }, [stopsByLine, map]);

  const geoJsonStyle = {
    color: lineColor,
  };

  const iconsStyle = `
  background-color: ${lineColor};
  width: 1rem;
  height: 1rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`;

  const markerIcon = L.divIcon({
    className: "custom-pin",
    iconAnchor: [-14, -6],
    popupAnchor: [-2, 0],
    html: `<span style="${iconsStyle}" />`,
  });

  return (
    <>
      {currentMarkers.map((marker, id) => (
        <Marker
          icon={markerIcon}
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
      {selectedLine && stopsByLine && stopsByLine.shape && (
        <GeoJSON key={selectedLine.id} data={JSON.parse(stopsByLine.shape)} style={geoJsonStyle} />
      )}
    </>
  );
};

export default OpenStreetMap;

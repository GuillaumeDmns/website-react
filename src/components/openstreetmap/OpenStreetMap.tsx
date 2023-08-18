import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import { useSelector } from "react-redux";
import L, { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { IRootState } from "store/types";
import { IDFMStopArea, StopsByLineDTO } from "api/api.types";
import "leaflet/dist/leaflet.css";
import "mapbox-gl/dist/mapbox-gl.css";

const MainMapContainer = styled.div`
  height: 500px;
  width: 800px;
`;

mapboxgl.accessToken = "pk.eyJ1IjoiZ3VpbGxhdW1lZG1ucyIsImEiOiJja3Y5ejdtYjMwYTJuMzFwZ292eTZtbHE5In0.d3ZU8GezLxJHmfZsfYgqbw";

type Props = {
  stopsByLine: StopsByLineDTO | null;
  selectedStop: IDFMStopArea | null;
  selectedLineColor: string | undefined;
  setSelectedStop: React.Dispatch<React.SetStateAction<IDFMStopArea | null>>;
};

const Markers = () => {
  return <></>;
}

const OpenStreetMap: React.FC<Props> = ({ stopsByLine, selectedStop, selectedLineColor, setSelectedStop }: Props) => {
  const [currentMarkers, setCurrentMarkers] = useState<Array<mapboxgl.Marker>>([]);
  const [currentPopups, setCurrentPopups] = useState<Array<mapboxgl.Popup>>([]);
  const isAuthenticated: boolean = useSelector((state: IRootState) => state.authentication.isAuthenticated);

  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const [lng] = useState(2.349014);
  const [lat] = useState(48.864716);
  const [zoom] = useState(11);
  const markersColor: string | undefined = selectedLineColor ? `#${selectedLineColor}` : undefined;

  // useEffect(() => {
  //   if (!isAuthenticated) return;
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v12",
  //     center: [lng, lat],
  //     zoom,
  //   }); // eslint-disable-next-line
  // }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || !selectedStop) return;
    if (map.current instanceof mapboxgl.Map) {
      map.current.flyTo({
        center: [selectedStop.longitude || 0, selectedStop.latitude || 0],
      });
    } // eslint-disable-next-line
  }, [isAuthenticated, selectedStop]);

  useEffect(() => {
    if (!isAuthenticated || !selectedStop) return;
    if (map.current instanceof mapboxgl.Map) {
      map.current.flyTo({
        center: [selectedStop.longitude || 0, selectedStop.latitude || 0],
      });
    } // eslint-disable-next-line
  }, [isAuthenticated, selectedStop]);

  // new mapboxgl.Marker();

  useEffect(() => {
    if (map.current instanceof mapboxgl.Map && stopsByLine) {
      const newMarkers: Array<mapboxgl.Marker> = [];
      const newPopups: Array<mapboxgl.Popup> = [];
      stopsByLine.stops?.map((stop) => {
        if (stop.longitude && stop.latitude && stop.name && map.current instanceof mapboxgl.Map) {
          const marker = new mapboxgl.Marker({ color: markersColor, scale: 0.8 })
            .setLngLat([stop.longitude, stop.latitude])
            .addTo(map.current);
          const popup = new mapboxgl.Popup().setText(stop.name);
          marker.setPopup(popup);
          marker.getElement().addEventListener("click", () => setSelectedStop(stop));
          newMarkers.push(marker);
          newPopups.push(popup);
        }
      });
      setCurrentMarkers(newMarkers);
      setCurrentPopups(newPopups);

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
        map.current.fitBounds(
          [
            [minLong, minLat],
            [maxLong, maxLat],
          ],
          {
            padding: 40,
          }
        );
      }

      // map.current.addLayer({})

    } else {
      currentMarkers.map((marker) => marker.remove());
      currentPopups.map((popup) => popup.remove());
      setCurrentMarkers([]);
      setCurrentPopups([]);
    }
  }, [stopsByLine]);

  return <>
    {/*<MainMapContainer ref={mapContainer} className="map-container" />*/}
    <div id="map"  style={{ width: '800px' }}>

      <MapContainer
          ref={mapContainer}
          center={[lat, lng]}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: '500px' }}
      >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers />
      </MapContainer>
    </div>
    </>;
};

export default OpenStreetMap;

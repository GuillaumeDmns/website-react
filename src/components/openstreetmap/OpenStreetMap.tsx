import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import { useSelector } from "react-redux";
import { IRootState } from "store/types";
import { StopsByLineDTO } from "api/api.types";
import "mapbox-gl/dist/mapbox-gl.css";

const MainMapContainer = styled.div`
  height: 500px;
  width: 800px;
`;

mapboxgl.accessToken = "pk.eyJ1IjoiZ3VpbGxhdW1lZG1ucyIsImEiOiJja3Y5ejdtYjMwYTJuMzFwZ292eTZtbHE5In0.d3ZU8GezLxJHmfZsfYgqbw";

type Props = {
  stopsByLine: StopsByLineDTO | null;
};

const OpenStreetMap: React.FC<Props> = ({ stopsByLine }: Props) => {
  const [currentMarkers, setCurrentMarkers] = useState<Array<mapboxgl.Marker>>([]);
  const isAuthenticated: boolean = useSelector((state: IRootState) => state.authentication.isAuthenticated);

  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);

  const [lng] = useState(2.349014);
  const [lat] = useState(48.864716);
  const [zoom] = useState(11);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom,
    }); // eslint-disable-next-line
  }, [isAuthenticated]);

  new mapboxgl.Marker();

  useEffect(() => {
    if (map.current && stopsByLine) {
      const newMarkers: Array<mapboxgl.Marker> = [];
      stopsByLine.stops?.map((stop) => {
        if (stop.longitude && stop.latitude) {
          const marker = new mapboxgl.Marker().setLngLat([stop.longitude, stop.latitude]).addTo(map.current);
          newMarkers.push(marker);
        }
      });
      setCurrentMarkers(newMarkers);
    } else {
      currentMarkers.map((marker) => marker.remove());
      setCurrentMarkers([]);
    }
  }, [stopsByLine]);

  return <MainMapContainer ref={mapContainer} className="map-container" />;
};

export default OpenStreetMap;

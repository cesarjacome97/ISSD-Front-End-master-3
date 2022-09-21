/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useEffect,useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
//import { GoogleMap, Marker, useJsApiLoader, StreetViewPanorama } from '@react-google-maps/api';
//import { googleMapsApiKey } from '../Config/apiUrl';
import { Dialog, Zoom } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';
import {cadena, apikey} from '../Config/apiUrl';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Marker as LeafletMarker, icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

LeafletMarker.prototype.options.icon = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const containerStyle = {
    width: '100%',
    height: '95vh'
};

const OsmMap = (props) => {
const position = {
    lat: -34.6037,
    lng: -58.3816
  }
    useMemo(() => {
    }, []);

	

    return 
        <>
            <MapContainer center={position} zoom={13} style={{height: '400px'}}>
        <TileLayer
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, 
          <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; 
          <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
        />
        <Marker position={position}>
          <Popup>
            Este es un popup. <br /> Y escribo lo que quiero.
          </Popup>
        </Marker>
      </MapContainer>
        </>
}
//setTimeout(()=>{
export default OsmMap;
//},2000)
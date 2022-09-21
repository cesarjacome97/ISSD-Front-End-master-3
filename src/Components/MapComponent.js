/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useEffect,useMemo, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader, StreetViewPanorama } from '@react-google-maps/api';
import { googleMapsApiKey } from '../Config/apiUrl';
import { Dialog, Zoom } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';
import {cadena, apikey} from '../Config/apiUrl';

const containerStyle = {
    width: '100%',
    height: '95vh'
};



function xmlToJson( xml ) {
var obj = {};
 
  if ( xml.nodeType == 1 ) { // element
    // do attributes
    if ( xml.attributes.length > 0 ) {
    obj["@attributes"] = {};
      for ( var j = 0; j < xml.attributes.length; j++ ) {
        var attribute = xml.attributes.item( j );
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if ( xml.nodeType == 3 ) { // text
    obj = xml.nodeValue;
  }
 
  // do children
  if ( xml.hasChildNodes() ) {
    for( var i = 0; i < xml.childNodes.length; i++ ) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if ( typeof(obj[nodeName] ) == "undefined" ) {
        obj[nodeName] = xmlToJson( item );
      } else {
        if ( typeof( obj[nodeName].push ) == "undefined" ) {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push( old );
        }
        obj[nodeName].push( xmlToJson( item ) );
      }
    }
  }
  return obj;
};

/*function cadena (){
	var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       //console.log(this.responseXML.getElementsByTagName("google")[0]);
	   var str = this.responseXML
		var jsonr = xmlToJson(str)
		//console.log(jsonr.normalizador_config.api_keys.google['#text'])
		var key = jsonr.normalizador_config.api_keys.google['#text']
		//console.log("222222222222222222222222222222222")
		//console.log(key)
		window.$key = key;
		return key
    }
};
xhttp.open("GET","http://localhost:9090/xmlapi",true);
xhttp.send();
//console.log("---------------------------")
//console.log(window.$key)
//return window.$key
}*/


window.$k = cadena()

	

const MapComponent = (props) => {
	//console.log(window.$k)
	console.log("..............................")
	console.log(props)
	console.log(window.pkey)
	console.log("loadeddddddddddd")
	var cc = cadena()
	console.log(props.ccc)
    const { location, zoom, handleChangeMarkerCoord, isConsult } = props;
    var { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: props.ppa
    })

    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(null);
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [streetViewCoord, setStreetViewCoord] = useState(null);

    useMemo(() => {
		console.log(location)
		console.log("2222222222222222222222222222222222222222222")
		try{
			console.log("locacion3")
        setCenter({ lat: location.lat(), lng: location.lng() });
		console.log(location)
		}
		catch
		{
			console.log("locacion2")
			setCenter({ lat: location.lat, lng: location.lng });
			console.log(location)
		} 
    }, [location]);

    const handleOpenConfirmationDialog = () => {
        setIsOpenConfirmation(true)
    }

    const handleCloseConfirmationDialog = () => {
        setIsOpenConfirmation(false)
    }

    const handleConfirmYes = () => {
        handleChangeMarkerCoord(streetViewCoord)
        setIsOpenConfirmation(false)
        setStreetViewCoord(null)

    }

    const handleStreetViewVisibilityChange = () => {
        if (!map?.streetView?.visible && !isConsult) {
            console.log("streetView visibility closed")
            handleOpenConfirmationDialog()
        }
    }

    const onPositionChanged = () => {
        console.log('onPositionChanged', map?.streetView?.position?.lat())
        console.log('onPositionChanged', map?.streetView?.position?.lng())
        setStreetViewCoord({ lat: map?.streetView?.position?.lat(), lng: map?.streetView?.position?.lng() })
    }

    console.log(props)

    const onDragEndMarker = (e) => {
        handleChangeMarkerCoord(e.latLng)
    }

    const onLoad = React.useCallback(function callback(map) {
        setCenter(location);
        const bounds = new window.google.maps.LatLngBounds(location);
        map.setZoom(zoom);
        map.fitBounds(bounds);
		
		console.log("el zoom")
		console.log(zoom)

        var listener = window.google.maps.event.addListener(map, "idle", function () {
            map.setZoom(zoom);
            window.google.maps.event.removeListener(listener);
        });
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
	

    console.log(map)
	console.log("44444444444444444444444444444444444444444")
	var ccc = cadena()
	console.log(window.$k)
	


    return isLoaded ?(
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                defaultCenter={location}
                defaultZoom={zoom}
                center={center || location}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                { /* Child components, such as markers, info windows, etc. */}
                {(isConsult && JSON.stringify(center) === JSON.stringify({ lat: 0, lng: 0 })) ? <></>
                    : <Marker
                        position={center || location}
                        draggable={!isConsult}
                        onDragEnd={onDragEndMarker}
                    />}
                <StreetViewPanorama onPositionChanged={onPositionChanged}
                    onVisibleChanged={handleStreetViewVisibilityChange}
                />
            </GoogleMap>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={isOpenConfirmation}
                onClose={handleCloseConfirmationDialog}
                scroll='paper'
                PaperComponent={() =>
                    ConfirmationDialog({
                        title: 'Confirmación',
                        message: '¿Quieres mover el marcador a estas coordenadas?',
                        confirmButton: true,
                        cancelButton: true,
                        confirmButtonText: 'Sí Seguro',
                        cancelButtonText: 'Cancelar',
                        handleConfirmAction: handleConfirmYes,
                        handleCancelAction: handleCloseConfirmationDialog
                    })}
                TransitionComponent={Zoom}
            />
        </>)
        : <></>
}
//setTimeout(()=>{
export default MapComponent;
//},2000)
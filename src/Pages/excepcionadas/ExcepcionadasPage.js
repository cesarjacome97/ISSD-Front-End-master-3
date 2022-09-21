/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef,useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Breadcrumb, BreadcrumbItem, Input, Row, Col } from 'reactstrap';
import MapComponent from '../../Components/MapComponent';
import { withStyles } from '@mui/styles';
import { Alert, Dialog, List, ListItem, ListItemButton, ListItemText, Paper, Snackbar, Typography, Zoom } from '@mui/material';
import { alpha } from "@mui/material";
import MapDataForm from '../../Components/MapDataForm';
import ConfirmationDialog from '../../Components/ConfirmationDialog';
import AddressServices from '../../Services/AddressServices';
import GoogleAPIServices from '../../Services/GoogleAPIServices';
//import { googleMapsApiKey } from '../../Config/apiUrl';
import axios from 'axios';
import {cadena, apikey} from '../../Config/apiUrl';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Marker as LeafletMarker, icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';



const PaperStyled = withStyles(theme => ({
    root: {
        backgroundColor: `${alpha("#1E1E2F", 0.5)} !important`,
        width: '100%',
        margin: '5px 0px 0px 0px',
        overflow: 'auto',
        height: 117
    },
}))(Paper);

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


const ExcepcionadasPage = (props) => {
    const { id } = useParams();
	const [loaded, setload] = useState(null);
	const [npos, setnpos] = useState(null);
	const [omap, setomap] = useState(null);
	const [ocoor, setocoor] = useState(null);
    const [selectedDirection, setSelectedDirection] = useState(null);
    const [isOpenSaveConfirmation, setIsOpenSaveConfirmation] = useState(false);
    const [isOpenIndeterminateConfirmation, setIsOpenIndeterminateSaveConfirmation] = useState(false);
    const [addressesData, setAddressesData] = useState([]);
    const [infoValue, setInfoValue] = useState('');
    const [formData, setFormData] = useState(null);
    const [markerCoord, setMarkerCoord] = useState(null);
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
	const [nivel_1, setNivel1] = useState('');
	const [nivel_2, setNivel2] = useState('');
	const [nivel_3, setNivel3] = useState('');
	const [nivel_4, setNivel4] = useState('');
	const [nivel_5, setNivel5] = useState('');
	const [nivel_6, setNivel6] = useState('');
	const [nivel_7, setNivel7] = useState('');
	const [snivel_1, setsNivel1] = useState('');
	const [snivel_2, setsNivel2] = useState('');
	const [snivel_3, setsNivel3] = useState('');
	const [snivel_4, setsNivel4] = useState('');
	const [snivel_5, setsNivel5] = useState('');
	const [snivel_6, setsNivel6] = useState('');
	const [snivel_7, setsNivel7] = useState('');
	const [id_domicilio, setIddomicilio] = useState('');
	const [llat, setLlat] = useState('');
	const [llon, setLlon] = useState('');

    const zoom = 15;
	function MyComponent() {
	var row = ocoor
	//console.log("row----------------")
	if(row)
	{
		if(row[0] && row[0].direccion)
	{
		var position = {
    lat: row[0].lat,
    lng: row[0].long
  }
	}
	else if(row[0])
		{
			var position = {
    lat: row[0],
    lng: row[1]
  }
		}
	else if(row.source){
	var position = {
    lat: row._source.latitud,
    lng: row._source.longitud
	}
  }
	}
	else{
		var position = {
    lat: 0.0,
    lng: 0.0
  }
	}
	//console.log(row)
  const map = useMap()
  //console.log(position)
  	  //console.log("el mapa!!!")
	  //console.log(map)
  if(row && (row._source||row.direccion))
  map.setView(position, 15)
	else if(position)
		map.setView(position,map._zoom)
	else
		map.setView([0.0,0.0],2)
}

    const handleChangeMarkerCoord = (coord) => {
		//console.log("/////////////////////////////////////////")							   
        //console.log(coord)
        setMarkerCoord(coord)
		handleDragEndMarker(coord)
    }
const handleDragEndMarker = (coord) => {
        //console.log(coord)
		//console.log("------------------------------------")
        setMarkerCoord(coord.latLng)
		//console.log("-----------------------------------")
		const geocoder = new window.google.maps.Geocoder();
		geocoder.geocode({ latLng: coord }).then((response) =>{
			const { results } = response
			//console.log("el response!!!!!!!!!!!!!!!!!!!!!!!!!!!")
			//console.log(response)
			const address_components = results[0].address_components;
                var components = {};
                address_components.forEach(v1 => {
                    v1.types.forEach(v2 => {
                        components[v2] = v1.long_name
                    })
                });
				var formato = results[0].formatted_address.split(",");
                var lnumero = null;
				var elmuni = null;
					var cestado=null;
					var lcolonia = null;
					var llpostal=null
					var lcalle= null
				for (var cc = 0; cc < results.length; cc++) {
                    var address_components1 = results[cc].address_components;
                    components = {}
                    address_components1.forEach(v1 => {
                        v1.types.forEach(v2 => {
                            components[v2] = v1.long_name
                        })
                    });
                    
                    if (components.administrative_area_level_2 != null) {
                        elmuni = components.administrative_area_level_2
                    }
                    if (components.administrative_area_level_3 != null) {
                        elmuni = components.administrative_area_level_3
                    }
					if (components.administrative_area_level_1 != null) {
                        cestado = components.administrative_area_level_1
                    }
                    if (components.route != null) {
                        lcalle = components.route
                    }
                    ////console.log(components.street_number)
                    if (components.street_number != null && lnumero == null) {
                        lnumero = components.street_number
                    }
                    if (components.sublocality != null) {
                        lcolonia = components.sublocality
                    }
					if (components.postal_code != null) {
                        llpostal = components.postal_code
                    }
					//console.log("el muni...........")
					//console.log(cestado)
                }
				/*components = {};
                address_components.forEach(v1 => {
                    v1.types.forEach(v2 => {
                        components[v2] = v1.long_name
                    })
                });

                if (elmuni == null) {
                    elmuni = formato[formato.length - 4]
                }*/
				////console.log("QQQQQQQQQQQQQQQQQQQQQqq " + lcalle)
                ////console.log(components.country);
				//console.log("estado---------------------------")
				//console.log(cestado)
                var nivel_tipo_calle = null;
                var ncalle = null;
				if (lcalle.includes("Avenida")) {
                    nivel_tipo_calle = "Avenida";
                    ncalle = lcalle
                    lcalle = ncalle.slice(8)
                } else if (lcalle.includes("Calle")) {
                    nivel_tipo_calle = "Calle";
                    ncalle = lcalle
                    lcalle = ncalle.slice(6)
                } else if (lcalle.includes("Callejón")) {
                    nivel_tipo_calle = "Callejón";
                    ncalle = lcalle
                    lcalle = ncalle.slice(8)
                } else if (lcalle.includes("Prolongacion")) {
                    nivel_tipo_calle = "Prolongacion";
                    ncalle = lcalle
                    lcalle = ncalle.slice(13)
                } else if (lcalle.includes("Prolongación")) {
                    nivel_tipo_calle = "Prolongación";
                    ncalle = lcalle
                    lcalle = ncalle.slice(13)
                } else if (lcalle.includes("Callejon")) {
                    nivel_tipo_calle = "Callejon";
                    ncalle = lcalle
                    lcalle = ncalle.slice(8)
                } else if (lcalle.includes("Andador")) {
                    nivel_tipo_calle = "Andador";
                    ncalle = lcalle
                    lcalle = ncalle.slice(8)
                } else if (lcalle.includes("Carretera")) {
                    nivel_tipo_calle = "Carretera";
                    ncalle = lcalle
                    lcalle = ncalle.slice(10)
                } else if (lcalle.includes("Viaducto")) {
                    nivel_tipo_calle = "Viaducto";
                    ncalle = lcalle
                    lcalle = ncalle.slice(9)
                } else if (lcalle.includes("Autopista")) {
                    nivel_tipo_calle = "Autopista";
                    ncalle = lcalle
                    lcalle = ncalle.slice(10)
                } else if (lcalle.includes("Calzada")) {
                    nivel_tipo_calle = "Calzada";
                    ncalle = lcalle
                    lcalle = ncalle.slice(8)
                } else if (lcalle.includes("Cerrada")) {
                    nivel_tipo_calle = "Cerrada";
                } else if (lcalle.includes("Boulevard")) {
                    nivel_tipo_calle = "Boulevard";
                } else {
                    nivel_tipo_calle = "";
                }
                ////console.log(coord.latLng)

				let source= {
                        nivel_1: cestado,
                        nivel_2: elmuni,
                        nivel_3: lcolonia,
                        nivel_4: nivel_tipo_calle,
                        nivel_5: lcalle,
                        nivel_6: lnumero,
                        nivel_7: llpostal,
                        latitud: coord.lat,
                        longitud: coord.lng
                    }
					setSelectedDirection(source)
					//console.log(source)
		//console.log("----------------------------------");
		//console.log(cestado)
		//console.log("sasasasasssssssssssssssssssssaaaaaaaaaaaaaaaa")
		})
	}
	
    const handleSearchItemClick = item => {
		//console.log("el item###################")
		//console.log(item)
		
		setocoor([item.lat,item.long])
		console.log("el item")
		console.log(item)
        setSelectedDirection(item)
        setMarkerCoord(null)
    }


    const handleInfoChanged = (value) => {
        //setInfoValue(value);
    }

    const handleOpenSaveConfirmationDialog = (data) => {
        setFormData(data);
        setIsOpenSaveConfirmation(true)
    }

    const handleOpenIndeterminateConfirmationDialog = () => {
        setIsOpenIndeterminateSaveConfirmation(true)
    }

    const handleCloseConfirmationDialog = () => {
        setFormData(null);
        setIsOpenSaveConfirmation(false)
        setIsOpenIndeterminateSaveConfirmation(false)
    }

    const handleConfirmSaving = () => {
        //console.log('****************************************************************');
        //console.log('formData')
        //console.log(formData);
        //console.log('le diste en guardar')
		//------------------------------------------------
		AddressServices.buscaxml().then((res1) => {
            ////console.log(res.data)
			const parser = new DOMParser();
			const xmlDOM = parser.parseFromString(res1.data,"text/xml");
			var value = xmlDOM.getElementsByTagName("campo_entrada");
			
			console.log(value)
			for(var ii=0;ii<value.length;ii++)
			{
				////console.log(value[ii].innerHTML)
				if(value[ii].innerHTML.includes('long_cliente'))
				{
					
					var camposlon = value[ii].innerHTML.split(" ")
					console.log(camposlon[0])
					setLlon(camposlon[0])
					////console.log(res.data)
				}
				if(value[ii].innerHTML.includes('lat_cliente'))
				{
					
					var camposlat = value[ii].innerHTML.split(" ")
					console.log(camposlat[0])
					setLlat(camposlat[0])
				}
				if(value[ii].innerHTML.includes('nivel1'))
				{
					
					var nivel1 = value[ii].innerHTML.split(" ")
					////console.log(nivel1[0])
					setsNivel1(nivel1[0])
				}
				if(value[ii].innerHTML.includes('nivel2'))
				{
					
					var nivel2 = value[ii].innerHTML.split(" ")
					////console.log(nivel2[0])
					setsNivel2(nivel2[0])
				}
				if(value[ii].innerHTML.includes('nivel3'))
				{
					
					var nivel3 = value[ii].innerHTML.split(" ")
					////console.log(nivel3[0])
					setsNivel3(nivel3[0])
				}
				if(value[ii].innerHTML.includes('nivel4'))
				{
					
					var nivel4 = value[ii].innerHTML.split(" ")
					////console.log(nivel4[0])
					setsNivel4(nivel4[0])
				}
				if(value[ii].innerHTML.includes('nivel5'))
				{
					
					var nivel5 = value[ii].innerHTML.split(" ")
					////console.log(nivel5[0])
					setsNivel5(nivel5[0])
				}
				if(value[ii].innerHTML.includes('nivel6'))
				{
					
					var nivel6 = value[ii].innerHTML.split(" ")
					////console.log(nivel6[0])
					setsNivel6(nivel6[0])
				}
				if(value[ii].innerHTML.includes('nivel7'))
				{
					
					var nivel7 = value[ii].innerHTML.split(" ")
					////console.log(nivel7[0])
					setsNivel7(nivel7[0])
				}

			}
        AddressServices.getById(id,id_domicilio).then((res) => {
            ////console.log(res.data)
            //setSelectedDirection(res.data[0])
            ////console.log(res.data[0]['ID_DOMICILIO_RNUM'])
            const address = res.data[0];
		var dirnom = address[nivel_4] + " " + address[nivel_5] + " " + address[nivel_6] + " " + address[nivel_2] + " " + address[nivel_1]
            setInfoValue(dirnom)
			
			//console.log(formData)

            var cambio = "";
            if (address[nivel_1] !== formData.lestado.toUpperCase()) {
                cambio = cambio + "E"
            }
            if (address[nivel_2] !== formData.elmuni.toUpperCase()) {
                cambio = cambio + "C"
            }
            if (address[nivel_3] !== formData.lcolonia.toUpperCase()) {
                cambio = cambio + "B"
            }
            if (address[llat] !== formData.llat || address[llon] !== formData.llng) {
                cambio = cambio + "L"
            }
            if (address[nivel7] !== formData.lpostal.toUpperCase()) {
                cambio = cambio + "P"
            }
            if (address[nivel5] !== formData.lcalle.toUpperCase()) {
                cambio = cambio + "S"
            }
			var ltipo = ""
			if(formData.tipo === 'Manual por Marcador')
				ltipo="M"
			else if(formData.tipo === 'Manual por coordenadas cliente')
				ltipo="T"
			else
				ltipo = "L"
			if(formData.lnumero ==="")
			{
				var nlnumero = "0"
			}
			else
			{
				var nlnumero = formData.lnumero
			}
			if(formData.lpostal ==="")
			{
				var lpostal = "0"
			}
			else
			{
				var lpostal = formData.lpostal
			}
			var value = xmlDOM.getElementsByTagName("campo_salida");
			for(var ii=0;ii<value.length;ii++)
			{
				////console.log(value[ii].innerHTML)
				if(value[ii].innerHTML.includes('latitud'))
				{
					
					var camposlon = value[ii].innerHTML.split(" ")
					////console.log(campolon[0])
					////console.log(res.data)
				}
				if(value[ii].innerHTML.includes('longitud'))
				{
					
					var camposlat = value[ii].innerHTML.split(" ")
					////console.log(campolat[0])
				}
				if(value[ii].innerHTML.includes('nivel1'))
				{
					
					var nivel1 = value[ii].innerHTML.split(" ")
					////console.log(nivel1[0])
					setsNivel1(nivel1[0])
				}
				if(value[ii].innerHTML.includes('nivel2'))
				{
					
					var nivel2 = value[ii].innerHTML.split(" ")
					////console.log(nivel2[0])
					setsNivel2(nivel2[0])
				}
				if(value[ii].innerHTML.includes('nivel3'))
				{
					
					var nivel3 = value[ii].innerHTML.split(" ")
					////console.log(nivel3[0])
					setsNivel3(nivel3[0])
				}
				if(value[ii].innerHTML.includes('nivel4'))
				{
					
					var nivel4 = value[ii].innerHTML.split(" ")
					////console.log(nivel4[0])
					setsNivel4(nivel4[0])
				}
				if(value[ii].innerHTML.includes('nivel5'))
				{
					
					var nivel5 = value[ii].innerHTML.split(" ")
					////console.log(nivel5[0])
					setsNivel5(nivel5[0])
				}
				if(value[ii].innerHTML.includes('nivel6'))
				{
					
					var nivel6 = value[ii].innerHTML.split(" ")
					////console.log(nivel6[0])
					setsNivel6(nivel6[0])
				}
				if(value[ii].innerHTML.includes('nivel7'))
				{
					
					var nivel7 = value[ii].innerHTML.split(" ")
					////console.log(nivel7[0])
					setsNivel7(nivel7[0])
				}

			}
			//console.log(lpostal)
			let date = new Date();
			let fecha = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');

            //console.log(cambio)
            //console.log(formData)
            const params = {
                'estado': formData.lestado.toUpperCase(),
                'ciudad': formData.elmuni.toUpperCase(),
                'municipio': formData.elmuni.toUpperCase(),
                'colonia': formData.lcolonia.toUpperCase(),
                'tcalle': formData.tipoCalle.toUpperCase(),
                'calle': formData.lcalle.toUpperCase(),
                'numero': nlnumero,
                'codigo_postal': lpostal,
                'lat': formData.llat,
                'lng': formData.llng,
                'codigo': cambio,
				'tipo':ltipo,
				'fecha': fecha,
				"nivel1": nivel1[0],
				"nivel2": nivel2[0],
				"nivel3": nivel3[0],
				"nivel4": nivel4[0],
				"nivel5": nivel5[0],
				"nivel6": nivel6[0],
				"nivel7": nivel7[0],
				"nivel0": id_domicilio,
				"latitud": camposlat[0],
				"longitud": camposlon[0]
            }
			console.log(params)
            AddressServices.actualizeAddress(id, params).then((res) => {
                //console.log(res);
                handleShowSnackBar('success', 'Registro actualizado correctamente')
                handleCloseConfirmationDialog()
            }).catch(err => { handleShowSnackBar('error', 'Error al conectarse al servidor') });
			var dirnorm=formData.tipoCalle.toUpperCase()+" "+formData.lcalle.toUpperCase()+" "+nlnumero+" "+formData.lcolonia.toUpperCase()+" "+lpostal+" "+formData.elmuni.toUpperCase()+" "+formData.lestado.toUpperCase()
			axios.post('http://192.168.50.79:9200/direcciones/direccion', {
  "id_sw":',',
					'direccion_normalizada':dirnorm,
				   'tipo':'NORMALIZADA GOOGLE',
				   'estado':' ',
				   'nivel_1':formData.lestado.toUpperCase(),
				   'nivel_2':formData.elmuni.toUpperCase(),
				   'nivel_3':formData.lcolonia.toUpperCase(),
				   'nivel_4':formData.tipoCalle.toUpperCase(),
				   'nivel_5':formData.lcalle.toUpperCase(),
				   'nivel_6':nlnumero,
				   'nivel_7':lpostal,
				   'nivel_8':' ',
				   'fecha_alta ':fecha,
				   'fecha_actualizacion':fecha,
				   'latitud':formData.llat,
				   'longitud':formData.llng
}).then((res) => {
	//console.log(res);
	alert("se creó el registro!!!")
});
        })
		})
		//-------------------------------------------------------
    }

    const handleConfirmIndeterminating = () => {
        const query = {};
		console.log(id_domicilio)
        AddressServices.confirmIndeterminate(id, id_domicilio).then((res) => {
            handleShowSnackBar('success', 'Registro actualizado correctamente')
        }).catch(err => { handleShowSnackBar('error', 'Error al conectarse al servidor') });
        handleCloseConfirmationDialog()
    }

    const testSelection = (item) => {
        let isSelected = false;
        if (selectedDirection) {
            if (item && item.address_components) {
                if (item.place_id === selectedDirection?.place_id) {
                    isSelected = true;
                }
            } else {
                if (item._id === selectedDirection?._id) {
                    isSelected = true;
                }
            }
        }
        return isSelected;
    }

    const getLocationCoord = () => {
		//console.log(selectedDirection)
		if(selectedDirection.direccion)
		{
			//MyComponent(selectedDirection)
			return{
					lat: parseFloat(selectedDirection.lat),
                    lng: parseFloat(selectedDirection.long)
				}
		}
        else if (selectedDirection) {
			try{
				var llat = selectedDirection.latitud();
				return{
					
					lat: parseFloat(selectedDirection.latitud()),
                    lng: parseFloat(selectedDirection.longitud())
				}
			}
			catch{
				if(selectedDirection.latitud)
			{
				return{
					lat: parseFloat(selectedDirection.latitud),
                    lng: parseFloat(selectedDirection.longitud)
				}
				
			}
				else if (selectedDirection.address_components) {
                return {
                    lat: parseFloat(selectedDirection.geometry.location.lat),
                    lng: parseFloat(selectedDirection.geometry.location.lng)
                }
            } else if(selectedDirection._source) {
                return {
                    lat: parseFloat(selectedDirection._source.latitud),
                    lng: parseFloat(selectedDirection._source.longitud)
                }
            }
        }
		}
        return { lat: parseFloat(0.0), lng: parseFloat(0.0) };
    }

    const geocoder = (dir,dirnor,campolat,campolon,val) => {
		
		var key = cadena()
		
		//console.log("666666666666666666666666666")
		//console.log(key)
		if(key)
		{
		//console.log(dir)
		//console.log(campolat)
		if(val>0)
		{
        GoogleAPIServices.googleGeoCoder(dir[0][campolon], dir[0][campolat]).then((res) => {
			window.$georev = res.data.results
			//console.log(window.$georev)
			GoogleAPIServices.googleRevGeoCoder(dirnor,key).then((res) => {
            
			//console.log(res.data.results)
            setSelectedDirection(res.data.results[0])
			//console.log(window.$georev)
			var datos = []
			for(var i = 0; res.data.results.lenght;i++)
			{
				datos[i] = res.data.results[i];
			}
			//console.log(datos)
			
			var k = datos.length;
			if(val>0)
			{
			for(i=0;i<window.$georev.length;i++)
			{
				datos[k] = window.$georev[i]
				k++;
				
			}
			}
			//console.log(datos)
			for(i = 0;i<datos.length;i++)
			{
				//console.log(i)
				datos[i].id = i
				//console.log(datos[i].id)
			}
            setMarkerCoord(null)
            var rr = [0]
            rr = res.data.results
            setAddressesData(datos)
			setload(cadena())
			//console.log(res)
        })
        })
		}
		if(val<1)
		{
		GoogleAPIServices.googleRevGeoCoder(dirnor,key).then((res) => {
            
			//console.log(res.data.results)
            setSelectedDirection(res.data.results[0])
			var datos = []
			for(var i = 0; res.data.results.lenght;i++)
			{
				datos[i] = res.data.results[i];
			}
			//console.log(datos)
			
			var k = datos.length;
			//console.log(datos)
			for(i = 0;i<datos.length;i++)
			{
				//console.log(i)
				datos[i].id = i
				//console.log(datos[i].id)
			}
            setMarkerCoord(null)
            var rr = [0]
            rr = res.data.results
            setAddressesData(datos)
			setload(cadena())
			//console.log(res)
        })
		
		}
		}
		else
		{
			
			//console.log("$$$$$$$$$$$$$$$$$$$")
			console.log(dirnor)
			/*axios.get('http://localhost:9090/geo2?data='+dirnor,{    
			headers:{        
			 'Access-Control-Allow-Origin': '*' 
			}}).then(function (res){
				setocoor(res.data)
				console.log(res)
				var fff = []
				var dir2 = res.data[0].direccion.split(",")
				//console.log(dir)
				//console.log(dir[0][campolon])
				//console.log(dir[0][campolat])
				//console.log(fff)
				res.data[0].id = 1
				res.data[0].formatted_address = res.data[0].direccion
				fff[0] = res.data[0]
				window.f =fff[0]
			})*/
			//console.log(dir)
			//console.log(campolon)
			//console.log(campolat)
			axios.get('http://192.168.50.79:9090/geo2?data='+dirnor,{
				//"data": dir[0][campolat]+','+dir[0][campolon]
			}).then(function (res){
				if(res.data)
				{
				setocoor(res.data)
				var fff = []
				console.log(res.data.length)
				res.data[0].id = 1
				res.data[0].formatted_address = res.data[0].direccion
				fff = res.data
				//fff[1] = window.f
				//console.log("Aqui va separado por comas,,,,,,,,,,,,,,,,,,,,,,,,,,,,,")
				//console.log(fff)
				//llscalle
				for(var k = 0;k<fff.length;k++)
				{
					var dir2=fff[k].direccion.split(",")

					if(dir2.length<7)
					{
					console.log("la primera es letra")
					console.log(dir2[dir2.length-1])
					console.log(dir2[dir2.length-2])
					console.log(dir2[dir2.length-3])
					console.log(dir2[dir2.length-4])
					
					var eestado = dir2[dir2.length-1]
					var temp = dir2[dir2.length-2].split(" ")
					var eciudad = temp[1]
					var epostal = temp[2]
					var ecolonia = dir2[dir2.length-3]
					fff[k].formatted_address = fff[k].direccion
					fff[k].ciudad = eciudad
					fff[k].postal = epostal
					fff[k].estado = eestado
					fff[k].lallave= "1"
					fff[k].colonia = ecolonia
					fff[k].id = k
					fff[k].addon = true
					setSelectedDirection(fff[0])
					}
					else
					{
					console.log("la primera es letra")
					console.log(dir2[dir2.length-1])
					console.log(dir2[dir2.length-2])
					console.log(dir2[dir2.length-4])
					console.log(dir2[dir2.length-5])
					fff[k].formatted_address = fff[k].direccion
					var eestado = dir2[dir2.length-1]
					var temp = dir2[dir2.length-2].split(" ")
					var eciudad = temp[1]
					var epostal = temp[2]
					var ecolonia = dir2[dir2.length-4]
					console.log(temp)
					fff[k].formatted_address = fff[k].direccion
					fff[k].ciudad = eciudad
					fff[k].postal = epostal
					fff[k].estado = eestado
					fff[k].lallave= "1"
					fff[k].colonia = ecolonia
					fff[k].id = k
					fff[k].addon = true
					setSelectedDirection(fff[0])
					}
					//-----------------------------------------

				}
				console.log(fff)
				setAddressesData(fff)
			}
			else{
				handleShowSnackBar('error', 'No hay sugerencias para la direccion')
			}
			})
		}
    }

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    }

    const handleShowSnackBar = (type, message) => {
        setSnackbarType(type);
        setSnackbarMessage(message);
        setOpenSnackBar(true);
    }
	
	function iniciar(param)
	{
		console.log("el nivel 1")
		//console.log(param)
		if(cadena())
		setload(cadena())
		else
		setomap(true)
		AddressServices.getById(id,param.nivel0).then((res) => {
            var dirnom = res.data[0][param.nivel4] + " " + res.data[0][param.nivel5] + " " + res.data[0][param.nivel6] + " " + res.data[0][param.nivel2] + " " + res.data[0][param.nivel1]
			var dirnom2 =res.data[0][param.nivel5] + " " + res.data[0][param.nivel6] + " " + res.data[0][param.nivel2] + " " + res.data[0][param.nivel1]
            setInfoValue(dirnom)
			//console.log(AddressServices)
			AddressServices.buscaxml().then((res1) => {
            ////console.log(res.data)
			console.log(dirnom2)
			const parser = new DOMParser();
			const xmlDOM = parser.parseFromString(res1.data,"text/xml");
			const value = xmlDOM.getElementsByTagName("campo_entrada");
			////console.log(value)
			for(var ii=0;ii<value.length;ii++)
			{
				////console.log(value[ii].innerHTML)
				if(value[ii].innerHTML.includes('long_cliente'))
				{
					
					var campolon = value[ii].innerHTML.split(" ")
					//console.log("lalong",campolon[0])
					//console.log(res.data)
				}
				if(value[ii].innerHTML.includes('lat_cliente'))
				{
					
					var campolat = value[ii].innerHTML.split(" ")
					//console.log(campolat[0])
				}
			}
			if(campolat && campolon)
			{
				geocoder(res.data,dirnom2,campolat[0],campolon[0],1)
				handleShowSnackBar('success', 'conexión correcta')
			}
			else
			{
				console.log(dirnom2)
				geocoder(res.data,dirnom2,0,0,0)
				//handleShowSnackBar('error', 'Los campos de latitud o longitud no están mapeados')
			}
        })
            
        }).catch(err => { handleShowSnackBar('error', 'Error al conectarse al servidor') });
		
	}
	//console.log(ocoor)
/*if(npos)
{
	//console.log("entra en 0")
	var position = {
    lat: npos[0],
    lng: npos[1]
  }
}
  else */if (ocoor && ocoor[0]){
	  //console.log("entra en 1")
	  if(ocoor[0] && ocoor[0].direccion)
	{
		//console.log("entra en 1.1")
		var position = {
    lat: ocoor[0].lat,
    lng: ocoor[0].long
  }
	}
	else if(ocoor._source){
	  //console.log("entra en 2")
	  var position = {
    lat: ocoor._source.latitud,
    lng: ocoor._source.longitud
  }
	}
	else{
		//console.log("entra en 666")
		var position = {
    lat: ocoor[0],
    lng: ocoor[1]
  }
	}
  }
  else
  {
	  //console.log("entra en 3")
	  //console.log(ocoor)
	  var position = {
    lat: 0.0,
    lng: 0.0
  }
  }
  //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
  //console.log(ocoor)
  //console.log(position)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
		  AddressServices.buscaxml().then((res1) => {
            ////console.log(res.data)
			const parser = new DOMParser();
			const xmlDOM = parser.parseFromString(res1.data,"text/xml");
			const value = xmlDOM.getElementsByTagName("campo_entrada");
			////console.log(value)
			var ddomicilio= ""
			for(var ii=0;ii<value.length;ii++)
			{
				////console.log(value[ii].innerHTML)
				if(value[ii].innerHTML.includes('id_domicilio'))
				{
					var iddomicilio = value[ii].innerHTML.split(" ")
					////console.log(iddomicilio[0])
					setIddomicilio(iddomicilio[0])
					ddomicilio = iddomicilio[0]
				}
			}
			const marker = markerRef.current
        if (marker != null) {
          //console.log(marker.getLatLng())
		  console.log(id_domicilio)
		  AddressServices.getById(id,ddomicilio).then((res) => {
			  res.data.latitud = marker.getLatLng().lat
			  res.data.longitud = marker.getLatLng().lng
			  res.data.marcador = true
			  setnpos([res.data.latitud = marker.getLatLng().lat,res.data.longitud = marker.getLatLng().lng])
			  //console.log(res.data)
			  var gg = []
			  gg[0] = marker.getLatLng().lat
			  gg[1] = marker.getLatLng().lng
			  setocoor(gg)
			  setMarkerCoord(marker.getLatLng())
			  setSelectedDirection(res.data)
			  })
        }
		  })
      },
    }),
    [],
  )
  
  function odrag()
  {
	  //console.log("ddd")
  }
  
  
  
  ////console.log(Marker.getLatLng())
	
    useEffect(() => {
		AddressServices.buscaxml().then((res1) => {
            ////console.log(res.data)
			const parser = new DOMParser();
			const xmlDOM = parser.parseFromString(res1.data,"text/xml");
			const value = xmlDOM.getElementsByTagName("campo_entrada");
			////console.log(value)
			for(var ii=0;ii<value.length;ii++)
			{
				////console.log(value[ii].innerHTML)
				if(value[ii].innerHTML.includes('long_cliente'))
				{
					
					var campolon = value[ii].innerHTML.split(" ")
					setLlon(campolon[0])
					////console.log(campolon[0])
					////console.log(res.data)
				}
				if(value[ii].innerHTML.includes('lat_cliente'))
				{
					
					var campolat = value[ii].innerHTML.split(" ")
					setLlat(campolat[0])
					////console.log(campolat[0])
				}
				if(value[ii].innerHTML.includes('nivel1'))
				{
					
					var nivel1 = value[ii].innerHTML.split(" ")
					////console.log(nivel1[0])
					setNivel1(nivel1[0])
				}
				if(value[ii].innerHTML.includes('nivel2'))
				{
					
					var nivel2 = value[ii].innerHTML.split(" ")
					////console.log(nivel2[0])
					setNivel2(nivel2[0])
				}
				if(value[ii].innerHTML.includes('nivel3'))
				{
					
					var nivel3 = value[ii].innerHTML.split(" ")
					////console.log(nivel3[0])
					setNivel3(nivel3[0])
				}
				if(value[ii].innerHTML.includes('nivel4'))
				{
					
					var nivel4 = value[ii].innerHTML.split(" ")
					////console.log(nivel4[0])
					setNivel4(nivel4[0])
				}
				if(value[ii].innerHTML.includes('nivel5'))
				{
					
					var nivel5 = value[ii].innerHTML.split(" ")
					////console.log(nivel5[0])
					setNivel5(nivel5[0])
				}
				if(value[ii].innerHTML.includes('nivel6'))
				{
					
					var nivel6 = value[ii].innerHTML.split(" ")
					////console.log(nivel6[0])
					setNivel6(nivel6[0])
				}
				if(value[ii].innerHTML.includes('nivel7'))
				{
					
					var nivel7 = value[ii].innerHTML.split(" ")
					////console.log(nivel7[0])
					setNivel7(nivel7[0])
				}
				if(value[ii].innerHTML.includes('id_domicilio'))
				{
					var iddomicilio = value[ii].innerHTML.split(" ")
					////console.log(iddomicilio[0])
					setIddomicilio(iddomicilio[0])
				}
			}
			console.log(id_domicilio)
			var param = {
				"nivel1": nivel1[0],
				"nivel2": nivel2[0],
				"nivel3": nivel3[0],
				"nivel4": nivel4[0],
				"nivel5": nivel5[0],
				"nivel6": nivel6[0],
				"nivel7": nivel7[0],
				"nivel0": iddomicilio[0],
				"lat": campolat,
				"lon": campolon
			}
		setTimeout(()=>{
			
		iniciar(param)
		},6000)
        })
    }, []);

    return (
        <>
            <div className="section section-typo">
                <img
                    alt="..."
                    className="path"
                    src={require("../../assets/img/path1.png")}
                />
                <img
                    alt="..."
                    className="path path1"
                    src={require("../../assets/img/path3.png")}
                />
                <Container style={{ maxWidth: "90%" }}>
                    <Breadcrumb>
                        <BreadcrumbItem><a href="/home">Home</a></BreadcrumbItem>
                        <BreadcrumbItem ><a href="/selector">Selector</a></BreadcrumbItem>
                        <BreadcrumbItem active>Excepcionadas</BreadcrumbItem>
                    </Breadcrumb>
                    <Input
                        type="text"
                        name="info"
                        id="info-input"
                        value={infoValue}
                    />
                    <PaperStyled>
                        <List>

                            {addressesData.map((row, index) =>
                                <ListItem dense disablePadding onClick={() => handleSearchItemClick(row)} style={testSelection(row) ? { backgroundColor: 'gray' } : {}}>
                                    <ListItemButton>
                                        <ListItemText
                                            primary={<Typography variant="body2" style={(index === 0 ) ? {  } : {}}>{row.formatted_address}</Typography>} />
                                    </ListItemButton>
                                </ListItem>)}
                        </List>
                    </PaperStyled>
                    <br />
                    <Row>
                        <Col>
						{(selectedDirection && loaded) ?
                                <MapComponent location={markerCoord ? markerCoord : getLocationCoord()} zoom={zoom} handleChangeMarkerCoord={handleChangeMarkerCoord} ppa={loaded} />
                                : omap ? <MapContainer center={[50.5, 30.5]} zoom={zoom} style={{height: '90vh'}} scrollWheelZoom={true}>
						<TileLayer
					url='http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
		  subdomains={['mt1','mt2','mt3']}
        />
      <MyComponent />
	  <Marker position={position} draggable={true} onDragend={odrag} ref={markerRef} eventHandlers={eventHandlers}>
        </Marker>
    </MapContainer>
								
								: <div style={{ width: '100%', height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    Cargando el mapa...
                                    <img
                                        alt="..."
                                        width="150"
                                        src={require("../../assets/img/loadingIndicator.gif")}
                                    />
</div>}
                                   
                        </Col>
                        <Col>
                            <MapDataForm
                                data={selectedDirection}
                                handleInfoChanged={handleInfoChanged}
                                openSaveConfirmation={handleOpenSaveConfirmationDialog}
                                openIndeterminateConfirmation={handleOpenIndeterminateConfirmationDialog}
                                markerCoord={markerCoord}
                                dirnorm={infoValue}
                            />
                        </Col>
                    </Row>
                </Container>
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={isOpenSaveConfirmation}
                    onClose={handleCloseConfirmationDialog}
                    scroll='paper'
                    PaperComponent={() =>
                        ConfirmationDialog({
                            title: 'Confirmación',
                            message: '¿Está seguro que esta dirección es la normalizada?',
                            confirmButton: true,
                            cancelButton: true,
                            confirmButtonText: 'Sí Seguro',
                            cancelButtonText: 'Cancelar',
                            handleConfirmAction: handleConfirmSaving,
                            handleCancelAction: handleCloseConfirmationDialog
                        })}
                    TransitionComponent={Zoom}
                />
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={isOpenIndeterminateConfirmation}
                    onClose={handleCloseConfirmationDialog}
                    scroll='paper'
                    PaperComponent={() =>
                        ConfirmationDialog({
                            title: 'Confirmación',
                            message: '¿Está seguro que esta dirección es indeterminada?',
                            confirmButton: true,
                            cancelButton: true,
                            confirmButtonText: 'Sí Seguro',
                            cancelButtonText: 'Cancelar',
                            handleConfirmAction: handleConfirmIndeterminating,
                            handleCancelAction: handleCloseConfirmationDialog
                        })}
                    TransitionComponent={Zoom}
                />
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity={snackbarType} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
export default ExcepcionadasPage;
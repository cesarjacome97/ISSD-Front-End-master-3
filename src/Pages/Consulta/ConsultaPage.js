import React, { useEffect,useState,useMemo,useCallback } from 'react';
import { Container, Breadcrumb, BreadcrumbItem, Input, Row, Col } from 'reactstrap';
import MapComponent from '../../Components/MapComponent';
import { withStyles } from '@mui/styles';
import { Alert, List, ListItem, ListItemButton, ListItemText, Paper, Snackbar, Typography } from '@mui/material';
import { alpha } from "@mui/material";
import MapDataForm from '../../Components/MapDataForm';
import AddressServices from '../../Services/AddressServices';
import axios from 'axios';
import {cadena, apikey} from '../../Config/apiUrl';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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

const PaperStyled = withStyles(theme => ({
    root: {
        backgroundColor: `${alpha("#1E1E2F", 0.5)} !important`,
        width: '100%',
        margin: '5px 0px 0px 0px',
        overflow: 'auto',
        maxHeight: 117
    },
}))(Paper);




const ConsultaPage = () => {
	console.log(apikey)
	console.log("ssss")
	const [loaded, setload] = useState(null);
	const [omap, setomap] = useState(null);
	const [ocoor, setocoor] = useState(null);
    const [selectedDirection, setSelectedDirection] = useState(null);
    const [zoom, setZoom] = useState(2);
    const [searchValue, setSearchValue] = useState('');
    const [infoValue, setInfoValue] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
	
	
	const [map, setMap] = useState(null)
	function MyComponent() {
	var row = ocoor
	console.log(row)
	if(row && row._source)
	{
	var position = {
    lat: row._source.latitud,
    lng: row._source.longitud
  }
	}
	else{
		var position = {
    lat: 0.0,
    lng: 0.0
  }
	}
  const map = useMap()
  if(row && row._source)
  map.setView(position, 15)
	else
		map.setView(position,2)
}

    const handleDragEndMarker = (address) => {
        console.log(address)
        setSelectedDirection(address);
    }

    const handleSearchItemClick = item => {
        console.log(item)
        setSelectedDirection(item)
        setZoom(15);
    }

    const handleInfoChanged = (value) => {
        setInfoValue(value);
    }

    const handleSearchValueChange = (e) => {
        const { value } = e.target;
        console.log(value)

        if (value !== '') {
            // const filteredList = listItems.filter(item => item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
            // setSearchData(filteredList);
            const query = {
                query: {
                    bool: {
                        must: [
                            {
                                match_phrase: {
                                    "direccion_normalizada": value
                                }
                            }
                        ]
                    }

                },
                size: 30
            };
            axios.get('http://192.168.50.79:9200/direcciones/_search', {
                params: {
                    source: JSON.stringify(query),
                    source_content_type: 'application/json'
                }
            }).then((res) => {
                console.log(res.data.hits.hits);
                setSearchData(res.data.hits.hits);
            }).catch(err => { handleShowSnackBar('error', 'Error al conectarse al servidor') })
        } else setSearchData([])
        setSearchValue(value);
    }

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    }

    const handleShowSnackBar = (type, message) => {
        setSnackbarType(type);
        setSnackbarMessage(message);
        setOpenSnackBar(true);
    }
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

  if(selectedDirection)
  {
	  console.log(selectedDirection)
	  var position = {
    lat: selectedDirection._source.latitud,
    lng: selectedDirection._source.longitud
  }
  }
  else
  {
	  var position = {
    lat: 0.0,
    lng: 0.0
  }
  }
  
  function selectedm(row)
  {
	  handleSearchItemClick(row)
	  //MyComponent(row)
	  setocoor(row)
  }
	const cargar = () => {
setload(cadena())
if(loaded!==null)
{
	setomap(true)
	console.log("6666666666666666666666666666666666666666666666666")
	console.log(loaded)
}
	}
	useEffect(() => {
		setTimeout(()=>{
		cargar()
		},6000)
	}, []);
	//const map1 = useMap()

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
                        <BreadcrumbItem active>Consulta</BreadcrumbItem>
                    </Breadcrumb>

                    <Input
                        type="text"
                        name="search"
                        id="search-input"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleSearchValueChange}
                    />
                    {searchData.length > 0 && <PaperStyled>
                        <List>
                            {searchData.map(row =>
                                <ListItem dense disablePadding onClick={() => selectedm(row)} style={row._id === selectedDirection?._id ? { backgroundColor: 'gray' } : {}}>
                                    <ListItemButton>
                                        <ListItemText
                                            primary={<Typography variant="body2">{row._source.direccion_normalizada}</Typography>} />
                                    </ListItemButton>
                                </ListItem>)}
                        </List>
                    </PaperStyled>}
                    <br />
                    <Row>
                        <Col>

	{loaded ?
                            <MapComponent
                                location={selectedDirection ?
                                    { lat: parseFloat(selectedDirection?._source.latitud), lng: parseFloat(selectedDirection?._source.longitud) }
                                    : { lat: 0.00, lng: 0.00 }}
                                zoom={zoom}
                                handleDragEndMarker={handleDragEndMarker}
						isConsult 
						ppa={loaded}/>
							: !loaded ?
							<MapContainer center={[50.5, 30.5]} zoom={6} style={{height: '90vh'}} scrollWheelZoom={true}>
						<TileLayer
          url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
		  subdomains={['mt1','mt2','mt3']}
        />
      <MyComponent />
	  <Marker position={position}>
        </Marker>
    </MapContainer>
							:<div style={{ width: '100%', height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    Cargando el mapa...
                                    <img
                                        alt="..."
                                        width="150"
                                        src={require("../../assets/img/loadingIndicator.gif")}
                                    />
</div>}
                        </Col>
                        <Col>
                            <MapDataForm handleInfoChanged={handleInfoChanged} data={selectedDirection} dirnorm={infoValue} isConsult />
                        </Col>
                    </Row>
                </Container>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                    <Alert onClose={handleCloseSnackBar} severity={snackbarType} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </>
    );
}

export default ConsultaPage;
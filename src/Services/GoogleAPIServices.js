import axios from 'axios';
import { googleApi, googleMapsApiKey } from '../Config/apiUrl';
import {cadena} from '../Config/apiUrl';

const googleGeoCoder = (lat, lng) => axios.get(`${googleApi}/api/geocode/json?latlng=` + lat + `,` + lng + `&key=`+cadena(), {})
const googleRevGeoCoder = (dirnor,apikey) => axios.get(`${googleApi}/api/geocode/json?address=` + dirnor + `&key=`+cadena(), {})

const GoogleAPIServices = {
    googleGeoCoder,
	googleRevGeoCoder
}

export default GoogleAPIServices;
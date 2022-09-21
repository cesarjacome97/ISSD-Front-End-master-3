import axios from 'axios';
import { backendAPI } from '../Config/apiUrl';

const searchByQuery = (query) => axios.get(`${backendAPI}/direcciones/_search`, {
    params: {
        source: JSON.stringify(query),
        source_content_type: 'application/json'
    }
});

const getById = (id,query) => axios.get(`${backendAPI}/api/consulta/` + id,
	{
		params: {
        query
    }
	});
	
const setInd = (id,query) => axios.get(`${backendAPI}/indeterminadas/` + id,
	{
		params: {
        query
    }
	});
	
const getInd = (query) => axios.get(`${backendAPI}/indeterminadas/`,
	{
		params: {
        query
    }
	})

const getByQuery = (query) => axios.get(`${backendAPI}/api/consulta`, {
	    params: {
        query
    }
})

const getExceptionsByQuery = () => axios.get(`${backendAPI}/api/consulta`, {

})

const buscaxml = () => axios.get(`${backendAPI}/xml`, {

})

const actualizeAddress = (id, params) => axios.post(`${backendAPI}/api/actualiza/` + id, null, {
    params
})

const confirmIndeterminate = (id, query) => axios.put(`${backendAPI}/api/indetermina/` + id, {
		params: {
        query
    }
})


const AddressServices = {
    searchByQuery,
    getById,
    getByQuery,
    actualizeAddress,
    confirmIndeterminate,
	buscaxml,
	getInd,
	setInd
}

export default AddressServices;
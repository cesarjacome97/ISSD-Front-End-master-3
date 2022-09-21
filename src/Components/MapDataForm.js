/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    Label,
    Input,
    Button,
    Card,
    CardBody
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { backendAPI } from '../Config/apiUrl';




const MapDataForm = (props) => {
    const {
        data,
        handleInfoChanged,
        isConsult,
        openSaveConfirmation,
        openIndeterminateConfirmation,
        markerCoord,
        dirnorm
    } = props;
	
	console.log(openSaveConfirmation)

    const [addressId, setAddressId] = useState('')
    const [estadoNormalizacion, setEstadoNormalizacion] = useState('')
    const [tipo, setTipo] = useState('')
    const [lestado, setLestado] = useState('')
    const [elmuni, setElmuni] = useState('')
    const [lcolonia, setLcolonia] = useState('')
    const [tipoCalle, setTipoCalle] = useState('');
    const [lcalle, setLcalle] = useState('')
    const [lnumero, setLnumero] = useState('')
    const [lpostal, setLpostal] = useState('')
    const [fechaInsercion, setFechaInsercion] = useState('')
    const [fechaCambio, setFechaCambio] = useState('')
    const [llat, setLlat] = useState('')
    const [llng, setLlng] = useState('')

    const { id } = useParams();

    const onSaveClick = () => {
        // this data needs some preparation before sending it to the server
        //console.log('aqui va la data',data);
        const formData = {
            id,
            estadoNormalizacion,
            tipo,
            lestado,
            elmuni,
            lcolonia,
            tipoCalle,
            lcalle,
            lnumero,
            lpostal,
            fechaInsercion,
            fechaCambio,
            llat,
            llng
        }
        console.log(formData);
        openSaveConfirmation(formData);
    }

    const onIndeterminateClick = () => {
        openIndeterminateConfirmation();
    }

    useEffect(() => {
        if (id) {
            setAddressId(id);
        }
        else setAddressId('');

    }, [])

    useEffect(() => {
        if (markerCoord) {
            setLlat(markerCoord.lat)
            setLlng(markerCoord.lng)
        }
    }, [markerCoord])

    useEffect(() => {
        const dirnorm = tipoCalle + " " + lcalle + " " + lnumero + " " + lcolonia + " " + lpostal + " " + elmuni + " " + lestado;
        handleInfoChanged(dirnorm);
    }, [tipoCalle, lcalle, lnumero, lcolonia, lpostal, elmuni, lestado])

    useEffect(() => {
		console.log("//////////////////////////////////7")
		console.log(data)
        var elmuni1 = "";
        var lcalle1 = "";
        var lnumero1 = "";
        var lcolonia1 = "";
        var lpostal1 = "";
        var lestado1 = "";
        var llat1 = "";
        var llng1 = "";
        var tipoCalle1 = "";
        var addressId1 = "";
        var tipo1 = "";
        var fechaInsercion1 = "";
        var fechaCambio1 = "";
        var estadoNormalizacion1 = "";
		console.log("Aquí va la data!!!!!!!!!!!!!!!!!!!!!")
		console.log(data)
		if(data && data.marcador)
		{
			axios.get("http://localhost:9090/geo2?data="+data['latitud']+','+data['longitud'],{
				//"data": data['latitud']+','+data['longitud']
			}).then(function (res){
				var fff = []
				console.log("la respuesta!!!!!!!!!!!!!")
				console.log(res.data)
				var dir2=res.data[0].direccion.split(",")
				var primera = dir2[0].slice(0,1)
				var valoresAceptados = /^[0-9]+$/;
				var k = 2;
				if(primera.match(valoresAceptados))
				{
					console.log(dir2)
					var scalle = dir2[1].slice(4,dir2[1].length)
					var scalle1 = dir2[1].split(" ")
					var lllnumero = scalle1[1]
					var lslnumero = lllnumero
					console.log(scalle1)
					console.log(lllnumero.toString())
					console.log(lllnumero.lenght)
					let contador=0
					while(lllnumero>=1)
					{
						contador = contador+1
						lllnumero = lllnumero / 10
					}
					console.log(contador)
				var llscalle =dir2[1].slice(contador+2,dir2[1].lenght)
				console.log(lscalle)
					var lnumero  = scalle.split(" ")
					var snumero = lnumero[lnumero.length-1]
					var lscalle = scalle.substr(0,scalle.length-snumero.length)
					/*fff[k].calle = llscalle
					fff[k].numero = lslnumero*/
					var posci = dir2[3].split(" ")
					var cpostal = posci[2]
					console.log("posci")
					console.log(posci)
					console.log(dir2[3])
					console.log(cpostal)
					if(cpostal)
					var sciudad = dir2[3].substr(1,dir2[3].length - cpostal.length-2)
					else
						var sciudad = dir2[3]
					/*fff[k].ciudad = sciudad
					fff[k].postal = cpostal
					fff[k].estado = dir2[4]
					fff[k].lallave= "1"
					fff[k].colonia = dir2[2]
					
					fff[k].id = k
				res.data[0].id = 1
				res.data[0].formatted_address = res.data[0].direccion
				fff[0] = res.data[0]
				fff[1] = window.f
				console.log("Aqui va separado por comas,,,,,,,,,,,,,,,,,,,,,,,,,,,,,")
				console.log(fff)*/
				if (llscalle.includes("Cll")) {
                setTipoCalle("calle")
				llscalle = llscalle.slice(4)
            } else if (llscalle.includes("Calle")) {
                setTipoCalle("calle")
				llscalle = llscalle.slice(6)
			}
				setLestado(dir2[4])
        setElmuni(sciudad)
        setLcolonia(dir2[2])
        setLcalle(llscalle)
        setLnumero(lslnumero)
		
		setLpostal(cpostal)
				}
				else{
					console.log("---------------------------")
					console.log(dir2)
					if(dir2.length<7)
					{
					console.log(llscalle)
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
					console.log(temp)
					setLestado(eestado)
        setElmuni(eciudad)
        setLcolonia(ecolonia)
        //setLcalle(llscalle)
        //setLnumero(lslnumero)
		setLpostal(epostal)
					}
					else
					{
						console.log(llscalle)
					console.log("la primera es letra")
					console.log(dir2[dir2.length-1])
					console.log(dir2[dir2.length-2])
					console.log(dir2[dir2.length-4])
					console.log(dir2[dir2.length-5])
					
					var eestado = dir2[dir2.length-1]
					var temp = dir2[dir2.length-2].split(" ")
					var eciudad = temp[1]
					var epostal = temp[2]
					var ecolonia = dir2[dir2.length-4]
					console.log(temp)
					setLestado(eestado)
        setElmuni(eciudad)
        setLcolonia(ecolonia)
        setLcalle(dir2[dir2.length-5])
        //setLnumero(lslnumero)
		setLpostal(epostal)
					}
					/*if(dir2.length===5)
					{
						console.log("aqui debe entrar")
						var lscalle = dir2[2]
						console.log(lscalle)
						/*if (llscalle.includes("Cll")) {
                setTipoCalle("calle")
				llscalle = lscalle.slice(4)
				} else if (lscalle.includes("Calle")) {
                setTipoCalle("calle")
				llscalle = llscalle.slice(6)
				}*//*
						var lscolonia = dir2[3]
						var posci = dir2[3].split(" ")
					var cpostal = posci[2]
					console.log("posci")
					console.log(posci)
					console.log(dir2[4])
					console.log(cpostal)
					if(cpostal)
					var sciudad = dir2[3].substr(1,dir2[3].length - cpostal.length-2)
					else
						var sciudad = dir2[4]
					var llsestado=dir2[5]
					setLestado(dir2[4])
        setElmuni(sciudad)
        setLcolonia(dir2[2])
        //setLcalle(llscalle)
        setLnumero(lslnumero)

		setLpostal(cpostal)
					}
					else if(dir2.length===6)
					{
						var lscolonia = dir2[3]
						var posci = dir2[3].split(" ")
					var cpostal = posci[2]
					console.log("posci")
					console.log(posci)
					console.log(dir2[4])
					console.log(cpostal)
					if(cpostal)
					var sciudad = dir2[3].substr(1,dir2[3].length - cpostal.length-2)
					else
						var sciudad = dir2[3]
					var llsestado=dir2[4]
					setLestado(dir2[5])
        setElmuni(sciudad)
        setLcolonia(lscolonia)
        setLcalle(llscalle)
        setLnumero(lslnumero)
		setLpostal(cpostal)
					}
					else if(dir2.length===7)
					{
						var lscolonia = dir2[2]
						var posci = dir2[3].split(" ")
					var cpostal = posci[2]
					console.log("posci")
					console.log(posci)
					console.log(dir2[4])
					console.log(cpostal)
					if(cpostal)
					var sciudad = dir2[3].substr(1,dir2[3].length - cpostal.length-2)
					else
						var sciudad = dir2[3]
					var llsestado=dir2[4]
					setLestado(dir2[4])
        setElmuni(sciudad)
        setLcolonia(dir2[2])
        setLcalle(llscalle)
        setLnumero(lslnumero)
		setLpostal(cpostal)
					}
					else if(dir2.length===4)
					{
						console.log(dir2)
						console.log("entra aqui!!!")
						/*var llscalle = dir2[2]
						if (llscalle.includes("Cll")) {
                setTipoCalle("calle")
				llscalle = llscalle.slice(4)
				} else if (llscalle.includes("Calle")) {
                setTipoCalle("calle")
				llscalle = llscalle.slice(6)
				}*/
						/*var lscolonia = dir2[3]
						var posci = dir2[2].split(" ")
					var cpostal = posci[2]
					console.log("posci")
					console.log(posci)
					console.log(dir2[6])
					console.log(cpostal)
					if(cpostal)
						var llscolonia = dir2[2].substr(1,dir2[2].length - cpostal.length-2)
					else
						var sciudad = dir2[3]
					var llsestado=dir2[7]
					setLestado(dir2[7])
        setElmuni(dir2[3])
        setLcolonia(llscolonia)
        //setLcalle(llscalle)
        setLnumero(lslnumero)
		setLpostal(cpostal)
					} 
					else
					{
						console.log(dir2)
						console.log("entra aqui!!!")
						var llscalle = dir2[2]
						if (llscalle.includes("Cll")) {
                setTipoCalle("calle")
				llscalle = llscalle.slice(4)
				} else if (llscalle.includes("Calle")) {
                setTipoCalle("calle")
				llscalle = llscalle.slice(6)
				}
						var lscolonia = dir2[3]
						var posci = dir2[6].split(" ")
					var cpostal = posci[2]
					console.log("posci")
					console.log(posci)
					console.log(dir2[6])
					console.log(cpostal)
					if(cpostal)
					var sciudad = dir2[6].substr(1,dir2[6].length - cpostal.length-2)
					else
						var sciudad = dir2[3]
					var llsestado=dir2[7]
					setLestado(dir2[7])
        setElmuni(sciudad)
        setLcolonia(dir2[3])
        setLcalle(llscalle)
        setLnumero(lslnumero)

		setLpostal(cpostal)
					}*/
					
				}
				
			})
			console.log("por marcador")
			
		setTipo("Manual por movimiento de marcador")
		}
		else if(data && data.addon)
		{
			if(data.id>-1)
				setTipo("Manual por sugerencia de google")
			else
				setTipo("Manual por coordenadas cliente")
			console.log("por add on")
			console.log("la respuesta!!!!!!!!!!!!!")
				console.log(data)
				var dir2=data.direccion.split(",")
				var primera = dir2[0].slice(0,1)
				var valoresAceptados = /^[0-9]+$/;
				var k = 2;
				if(primera.match(valoresAceptados))
				{
					console.log(dir2)
					var scalle = dir2[1].slice(4,dir2[1].length)
					var scalle1 = dir2[1].split(" ")
					var lllnumero = scalle1[1]
					var lslnumero = lllnumero
					console.log(scalle1)
					console.log(lllnumero.toString())
					console.log(lllnumero.lenght)
					let contador=0
					while(lllnumero>=1)
					{
						contador = contador+1
						lllnumero = lllnumero / 10
					}
					console.log(contador)
				var llscalle =dir2[1].slice(contador+2,dir2[1].lenght)
				console.log(lscalle)
					var lnumero  = scalle.split(" ")
					var snumero = lnumero[lnumero.length-1]
					var lscalle = scalle.substr(0,scalle.length-snumero.length)
					/*fff[k].calle = llscalle
					fff[k].numero = lslnumero*/
					var posci = dir2[3].split(" ")
					var cpostal = posci[2]
					console.log("posci")
					console.log(posci)
					console.log(dir2[3])
					console.log(cpostal)
					if(cpostal)
					var sciudad = dir2[3].substr(1,dir2[3].length - cpostal.length-2)
					else
						var sciudad = dir2[3]
					/*fff[k].ciudad = sciudad
					fff[k].postal = cpostal
					fff[k].estado = dir2[4]
					fff[k].lallave= "1"
					fff[k].colonia = dir2[2]
					
					fff[k].id = k
				data.id = 1
				data.formatted_address = data.direccion
				fff[0] = data
				fff[1] = window.f
				console.log("Aqui va separado por comas,,,,,,,,,,,,,,,,,,,,,,,,,,,,,")
				console.log(fff)*/
				if (llscalle.includes("Cll")) {
                setTipoCalle("calle")
				llscalle = llscalle.slice(4)
            } else if (llscalle.includes("Calle")) {
                setTipoCalle("calle")
				llscalle = llscalle.slice(6)
			}
				setLestado(dir2[4])
        setElmuni(sciudad)
        setLcolonia(dir2[2])
        setLcalle(llscalle)
        setLnumero(lslnumero)
		setLlat(data.lat)
		setLlng(data.long)
		setLpostal(cpostal)
				}
		}
		else if(data && data.lallave)
		{
			console.log(data.id)
			if(data.id>-1)
				setTipo("Manual por sugerencia de google")
			else
				setTipo("Manual por coordenadas cliente")
			console.log(data)
		setLestado(data.estado)
        setElmuni(data.ciudad)
        setLcolonia(data.colonia)
        setLcalle(data.calle)
        setLnumero(data.numero)
		setLpostal(data.postal)
		setLlat(data.lat)
        setLlng(data.long)
		}
        else if (data && data._source && data._source.id_sw) {
			console.log(data._source)
			setLestado(data._source.nivel_1)
        setElmuni(data._source.nivel_2)
        setLcolonia(data._source.nivel_3)
        setLcalle(data._source.nivel_5)
        setLnumero(data._source.nivel_6)
		setAddressId(data._id)
		setFechaCambio(data._source.fecha_actualizacion)
		setFechaInsercion(data._source.fecha_alta)
		if(data._source.nivel_7)
        setLpostal(data._source.nivel_7)
		else
		setLpostal("")
        setLlat(data._source.latitud)
        setLlng(data._source.longitud)
        setTipoCalle(data._source.nivel_4)
		handleInfoChanged(data._source.direccion_normalizada)

        } else if (data && data.address_components) {

            console.log(data._source)

            var address_components = data.address_components;
            //console.log(results[2].address_components);

            var components = {};
            for (var cc = 0; cc < data.address_components.length; cc++) {
                var address_components1 = data.address_components;
                var components1 = {}
                //console.log(address_components1[cc])
                // eslint-disable-next-line no-loop-func
                address_components1.forEach(v1 => {
                    v1.types.forEach(v2 => {
                        components1[v2] = v1.long_name
                    })
                })
                if (components1.administrative_area_level_2 != null) {
                    elmuni1 = components1.administrative_area_level_2
                }
                if (components1.administrative_area_level_1 != null) {
                    lestado1 = components1.administrative_area_level_1
                }
                if (components1.administrative_area_level_3 != null) {
                    elmuni1 = components1.administrative_area_level_3
                }
                if (components1.locality != null) {
                    elmuni1 = components1.locality
                }
                if (components1.route != null) {
                    lcalle1 = components1.route
                }
                if (address_components1[cc].types[0] === 'street_number') {
                    lnumero1 = components1.street_number
                }
                if (components1.sublocality != null) {
                    lcolonia1 = components1.sublocality
                }
                if (components1.postal_code != null) {
                    lpostal1 = components1.postal_code
                }
            }
            address_components.forEach(v1 => {
                v1.types.forEach(v2 => {
                    components[v2] = v1.long_name
                })
            })
            var formato = data.formatted_address.split(",");
            //console.log(formato[formato.length-4])
            //console.log(formato)
            var ncalle = null;
            if (lcalle.includes("Avenida")) {
                tipoCalle1 = "Avenida";
                ncalle = lcalle
                lcalle1 = ncalle.slice(8)
            } else if (lcalle.includes("Calle")) {
                tipoCalle1 = "Calle";
                ncalle = lcalle
                lcalle1 = ncalle.slice(6)
            } else if (lcalle.includes("Calle")) {
                tipoCalle1 = "Calle";
                ncalle = lcalle
                lcalle1 = ncalle.slice(6)
            }
			else if (lcalle.includes("Callejón")) {
                tipoCalle1 = "Callejón";
                ncalle = lcalle
                lcalle1 = ncalle.slice(8)
            } else if (lcalle.includes("Prolongacion")) {
                tipoCalle1 = "Prolongacion";
                ncalle = lcalle
                lcalle1 = ncalle.slice(13)
            } else if (lcalle.includes("Prolongación")) {
                tipoCalle1 = "Prolongación";
                ncalle = lcalle
                lcalle1 = ncalle.slice(13)
            } else if (lcalle.includes("Callejon")) {
                tipoCalle1 = "Callejon";
                ncalle = lcalle
                lcalle1 = ncalle.slice(8)
            } else if (lcalle.includes("Andador")) {
                tipoCalle1 = "Andador";
                ncalle = lcalle
                lcalle1 = ncalle.slice(8)
            } else if (lcalle.includes("Carretera")) {
                tipoCalle1 = "Carretera";
                ncalle = lcalle
                lcalle1 = ncalle.slice(10)
            } else if (lcalle.includes("Viaducto")) {
                tipoCalle1 = "Viaducto";
                ncalle = lcalle
                lcalle1 = ncalle.slice(9)
            } else if (lcalle.includes("Autopista")) {
                tipoCalle1 = "Autopista";
                ncalle = lcalle
                lcalle1 = ncalle.slice(10)
            } else if (lcalle.includes("Calzada")) {
                tipoCalle1 = "Calzada";
                ncalle = lcalle
                lcalle1 = ncalle.slice(8)
            } else if (lcalle.includes("Cerrada")) {
                tipoCalle1 = "Cerrada";
            } else if (lcalle.includes("Boulevard")) {
                tipoCalle1 = "Boulevard";
            } else if (lcalle.includes("cll")) {
                tipoCalle1 = "calle";
				lcalle1 = ncalle.slice(4)
            }
			else {
                tipoCalle1 = "";
            }

            if (elmuni1 == null) {
                elmuni1 = formato[formato.length - 4]
            }
            console.log(data['geometry'].location)
            llat1 = data['geometry'].location.lat;
            llng1 = data['geometry'].location.lng;
setLestado(lestado1)
        setElmuni(elmuni1)
        setLcolonia(lcolonia1)
        setLcalle(lcalle1)
        setLnumero(lnumero1)
        setLpostal(lpostal1)
        setLlat(llat1)
        setLlng(llng1)
        setTipoCalle(tipoCalle1)	
		if(data.id<1)
		setTipo("Manual por coordenadas cliente")		 
		else
		setTipo("Manual por sugerencia Google")
        }
        else if (data != null && data.lallave!= undefined) {
			console.log("aqui es-----")
            axios.get(`${backendAPI}/api/consulta/` + id, {

            }).then((res) => {
                //console.log(res.data)
                //setSelectedDirection(res.data[0])
                //console.log(res.data[0]['ID_DOMICILIO_RNUM'])
				console.log("está entrando---------------------------")
                var dirnom = res.data[0]['SUBTITULO'] + " " + res.data[0]['CALLE'] + " " + res.data[0]['NUMERO'] + " " + res.data[0]['CIUDAD'] + " " + res.data[0]['ESTADO']
                handleInfoChanged(dirnom);
				window.tcalle = res.data[0]['SUBTITULO'];
                window.calle = res.data[0]['CALLE']
                window.numero = res.data[0]['NUMERO']
                window.ciudad = res.data[0]['CIUDAD']
                window.estado = res.data[0]['ESTADO']
                window.colonia = res.data[0]['COLONIA']
                window.postal = res.data[0]['CODIGO_POSTAL']
				window.$postal =res.data[0]['CODIGO_POSTAL']+""
				var tpostal = window.$postal.substring(0,5)
         setLestado(res.data[0]['ESTADO'])
        setElmuni(res.data[0]['CIUDAD'])
        setLcolonia(res.data[0]['COLONIA'])
        setLcalle(res.data[0]['CALLE'])
        setLnumero(res.data[0]['NUMERO'])
        setLpostal(tpostal)
		console.log(data)
		if(data.latitud){
        setLlat(data.latitud)
        setLlng(data.longitud)
		}
		else{
			setLlat(data.latitud())
        setLlng(data.longitud())
		}
        setTipoCalle(res.data[0]['SUBTITULO'])
		setTipo('Manual por Marcador')
            })

            //setTipoCalle(ltipocalle)
        }
		else if(data){
			console.log("aqui es-----")
				console.log("está entrando---------------------------")
				console.log(data)
                //var dirnom = res.data[0]['SUBTITULO'] + " " + res.data[0]['CALLE'] + " " + res.data[0]['NUMERO'] + " " + res.data[0]['CIUDAD'] + " " + res.data[0]['ESTADO']
                //handleInfoChanged(dirnom);
				setTipoCalle(data.nivel_4)
                setLcalle(data.nivel_5)
                setLnumero(data.nivel_6)
                setElmuni(data.nivel_2)
                setLestado(data.nivel_1)
                setLcolonia(data.nivel_3)
                setLpostal(data.nivel_7)

		console.log(data)
		if(data.latitud){
        setLlat(data.latitud)
        setLlng(data.longitud)
		}
		else{
			setLlat(data.latitud())
        setLlng(data.longitud())
		}

		setTipo('Manual por Marcador')
		}

        /*setLestado(lestado1)
        setElmuni(elmuni1)
        setLcolonia(lcolonia1)
        setLcalle(lcalle1)
        setLnumero(lnumero1)
        setLpostal(lpostal1)
        setLlat(llat1)
        setLlng(llng1)
        setTipoCalle(tipoCalle1)
        setAddressId(addressId1)
        setTipo(tipo1)
        setFechaInsercion(fechaInsercion1)
        setFechaCambio(fechaCambio1)
        setEstadoNormalizacion(estadoNormalizacion1)*/
    }, [data])
	
	
	const handleSearchValueChange = (e) => {
        const { value } = e.target;
		//console.log(props.data)
		//console.log(e.target.id)
		//console.log(props.data.latitud())
		if(props.data["marcador"]||props.data.latitud()){
			//if(e.target.id==="nivel_estado")
				//setLestado(value);
			if(e.target.id==="nivel_municipio")
				setElmuni(value);
			if(e.target.id==="nivel_colonia")
				setLcolonia(value);
			if(e.target.id==="nivel_tipo_calle")
				setTipoCalle(value);
			if(e.target.id==="nivel_calle")
				setLcalle(value);
			if(e.target.id==="nivel_numero")
				setLnumero(value);
			if(e.target.id==="nivel_codigo_postal")
				setLpostal(value);
		}
    }
	

    return (
        <Card>
            <CardBody>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>ID</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="id"
                            Placeholder="ID"
                            value={addressId}
                        />
                    </div>
                </div>

                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Tipo de Normalización</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="tipo"
                            Placeholder="Tipo"
                            value={tipo}
							onChange={handleSearchValueChange}
                        />
                    </div>
                </div>
               {isConsult &&  <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Direccion Normalizada</Label>
                    </div>
                    <div className="col" colSpan="4" style={{ paddingLeft: 30, paddingRight: 10 }}>
                        <h6>
                            {dirnorm}
                        </h6>
                    </div>
			   </div>}
                <br />
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Estado</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="nivel_estado"
                            Placeholder="Estado"
                            value={lestado}
							onChange={handleSearchValueChange}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Municipio</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="nivel_municipio"
                            Placeholder="Municipio"
                            value={elmuni}
							onChange={handleSearchValueChange}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Barrio</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="nivel_colonia"
                            Placeholder="Colonia"
                            value={lcolonia}
							onChange={handleSearchValueChange}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Tipo Calle</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="nivel_tipo_calle"
                            Placeholder="Tipo Calle"
                            value={tipoCalle}
							onChange={handleSearchValueChange}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Calle</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="nivel_calle"
                            Placeholder="Nombre Calle"
                            value={lcalle}
							onChange={handleSearchValueChange}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Número</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="nivel_numero"
                            Placeholder="Nivel Numero"
                            value={lnumero}
							onChange={handleSearchValueChange}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Codigo Postal</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="nivel_codigo_postal"
                            Placeholder="Codigo Postal"
                            value={lpostal}
							onChange={handleSearchValueChange}
                        />
                    </div>
                </div>
                {isConsult && <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Fecha Inserción</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="fecha_insercion"
                            Placeholder="Fecha Inserción"
                            value={fechaInsercion}
                        />
                    </div>
                </div>}
                {isConsult && <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Fecha Último Cambio</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="fecha_ultimo_cambio"
                            Placeholder="Fecha Último Cambio"
                            value={fechaCambio}
                        />
                    </div>
                </div>}
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Lat</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="latitud"
                            Placeholder="Lat"
                            value={llat}
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 8 }}>
                    <div className="col-md-3">
                        <Label>Long</Label>
                    </div>
                    <div className="col" colSpan="4">
                        <Input
                            type="text"
                            id="longitud"
                            Placeholder="Long"
                            value={llng}
                        />
                    </div>
                </div>
                {!isConsult && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button color="warning" onClick={onIndeterminateClick}>
                        Indeterminada
                    </Button>
                    <Button color="primary" onClick={onSaveClick}>
                        Guardar
                    </Button>
                </div>}
            </CardBody>
        </Card >);
}

export default MapDataForm;
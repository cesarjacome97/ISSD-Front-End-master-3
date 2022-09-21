import React, { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableRow, Dialog } from '@mui/material';
import { withStyles } from '@mui/styles';
import { Breadcrumb, BreadcrumbItem, Container, Button, Input } from 'reactstrap'
import ConfirmationDialog from '../../Components/ConfirmationDialog';
import PaginationComponent from '../../Components/PaginationComponent';
import AddressServices from '../../Services/AddressServices';

let PageSize = 10;

const PaperStyled = withStyles(theme => ({
    root: {
        backgroundColor: '#1E1E2F !important',
    },
}))(Paper);

const SelectorPage = props => {
    const [direcciones, setDirecciones] = useState([])
    const [currentPage, setCurrentPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
	const [infoValue, setInfoValue] = useState('');
	const [nivel1, setNivel1] = useState('');
	const [nivel2, setNivel2] = useState('');
	const [nivel3, setNivel3] = useState('');
	const [nivel4, setNivel4] = useState('');
	const [nivel5, setNivel5] = useState('');
	const [nivel6, setNivel6] = useState('');
	const [nivel7, setNivel7] = useState('');
	const [id_domicilio, setIddomicilio] = useState('');

    const history = useHistory();

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
		console.log(direcciones)
        return direcciones.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, direcciones]);

    const emptyRows = () => {
        if (currentPage === Math.ceil(direcciones.length / PageSize)) {
            return PageSize - currentTableData.length;
        }
        return 0;
    }

    const handleOpenRow = (row) => {
        history.push({
            pathname: '/excepcionadas/' + row[id_domicilio],

        });
    }

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    }

    const handleShowSnackBar = (type, message) => {
        setSnackbarType(type);
        setSnackbarMessage(message);
        setOpenSnackBar(true);
    }
	const onSaveClick = () => {
        // this data needs some preparation before sending it to the server
        //console.log('aqui va la data',data);
		//alert(infoValue)
		AddressServices.getById(infoValue,id_domicilio).then((res) => {
		console.log(res)
		var valido = true
		if(infoValue===''||infoValue===' ')
		{
			valido = false
		}
		if(valido)
		{
		if(res.data[0])
		{
			if(res.data[0]['EDO_NORMALIZACION']==='x')
			{
				history.push({
					pathname: '/excepcionadas/' + infoValue,
				});
			}
			else
			handleShowSnackBar('warning', 'La dirección no es excepcionada')
		}
		else
			handleShowSnackBar('warning', 'El id no es valido')
		}
		else
		{
			handleShowSnackBar('warning', 'Ingrese un valor id para buscar')
		}
        }).catch(err => { handleShowSnackBar('error', 'Error al conectarse al servidor') });
		
	
    }


    useEffect(() => {

        // Timeout used only for demo purpose
		AddressServices.buscaxml().then((res1) => {
            //console.log(res.data)
			const parser = new DOMParser();
			const xmlDOM = parser.parseFromString(res1.data,"text/xml");
			const value = xmlDOM.getElementsByTagName("campo_entrada");
			//console.log(value)
			for(var ii=0;ii<value.length;ii++)
			{
				//console.log(value[ii].innerHTML)
				if(value[ii].innerHTML.includes('long_cliente'))
				{
					
					var campolon = value[ii].innerHTML.split(" ")
					//console.log(campolon[0])
					//console.log(res.data)
				}
				if(value[ii].innerHTML.includes('lat_cliente'))
				{
					
					var campolat = value[ii].innerHTML.split(" ")
					//console.log(campolat[0])
				}
				if(value[ii].innerHTML.includes('nivel1'))
				{
					
					var nivel1 = value[ii].innerHTML.split(" ")
					//console.log(nivel1[0])
					setNivel1(nivel1[0])
				}
				if(value[ii].innerHTML.includes('nivel2'))
				{
					
					var nivel2 = value[ii].innerHTML.split(" ")
					//console.log(nivel2[0])
					setNivel2(nivel2[0])
				}
				if(value[ii].innerHTML.includes('nivel3'))
				{
					
					var nivel3 = value[ii].innerHTML.split(" ")
					//console.log(nivel3[0])
					setNivel3(nivel3[0])
				}
				if(value[ii].innerHTML.includes('nivel4'))
				{
					
					var nivel4 = value[ii].innerHTML.split(" ")
					//console.log(nivel4[0])
					setNivel4(nivel4[0])
				}
				if(value[ii].innerHTML.includes('nivel5'))
				{
					
					var nivel5 = value[ii].innerHTML.split(" ")
					//console.log(nivel5[0])
					setNivel5(nivel5[0])
				}
				if(value[ii].innerHTML.includes('nivel6'))
				{
					
					var nivel6 = value[ii].innerHTML.split(" ")
					//console.log(nivel6[0])
					setNivel6(nivel6[0])
				}
				if(value[ii].innerHTML.includes('nivel7'))
				{
					
					var nivel7 = value[ii].innerHTML.split(" ")
					//console.log(nivel7[0])
					setNivel7(nivel7[0])
				}
				if(value[ii].innerHTML.includes('id_domicilio'))
				{
					var iddomicilio = value[ii].innerHTML.split(" ")
					//console.log(iddomicilio[0])
					setIddomicilio(iddomicilio[0])
				}
			}
			        
			setTimeout(function () {
				console.log(iddomicilio[0])
					
				const query = {
							id: iddomicilio[0]
					}
					console.log(iddomicilio[0])
            AddressServices.getByQuery(iddomicilio[0]).then((res) => {
				console.log(res.status)
                
				
				//--------------------------------
				//--------------------------------
				
				setCurrentPage(1);
                setLoading(false);
                setDirecciones(res.data)
            }).catch(err => {
                setLoading(false);
				console.log(err)
				if(err.response.status === 500)
				handleShowSnackBar('error', 'Ocurrió un error en el servidor')
				else
                handleShowSnackBar('error', 'Error al conectarse al servidor')
            });
        }, 2000);
        })
        
    }, [])
	const handleSearchValueChange = (e) => {
        const { value } = e.target;
		setInfoValue(value)
    }

    return (
        <>
            <div className="section section-basic" id="basic-elements">
                <img
                    alt="..."
                    className="path"
                    src={require("../../assets/img/path1.png")}
                />
                <Container style={{ marginBottom: -20, maxWidth: "90%" }}>
                    <Breadcrumb>
                        <BreadcrumbItem><a href="/home">Home</a></BreadcrumbItem>
                        <BreadcrumbItem active>Selector</BreadcrumbItem>
                    </Breadcrumb>
                    <h3 className="d-none d-sm-block text-center">
                        Direcciones Excepcionadas Pendientes
                    </h3>
					    <Input
                        type="text"
                        name="search"
                        id="search-input"
                        placeholder="Search..."
						value={infoValue}
						onChange={handleSearchValueChange}
                    />
					<Button color="primary" onClick={onSaveClick}>
                        Buscar
                    </Button>
                    {loading ?
                        <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                alt="..."
                                width="150"
                                src={require("../../assets/img/loadingIndicator.gif")}
                            /></div> :
                        currentTableData.length > 0 ?
                            <TableContainer component={PaperStyled}>
                                <Table sx={{ minWidth: 500 }} size="small" aria-label="custom pagination table">
                                    <TableBody>
                                        {currentTableData.map((row, index) => (
                                            <TableRow hover key={index} onDoubleClick={() => handleOpenRow(row)}>
                                                <TableCell component="th" scope="row" style={(row['EDO_NORMALIZACION'] === 'X' ) ? { color: '#FFFF00' } : {}}>
                                                    {/*row[id_domicilio]*/}
														{row[id_domicilio]}
                                                </TableCell>
                                                <TableCell component="th" scope="row" style={(row['EDO_NORMALIZACION'] === 'X' ) ? { color: '#FFFF00' } : {}}>
                                                    {row[nivel4] + " " + row[nivel5] + " " + row[nivel6] + " " + row[nivel3] + " " + row[nivel2] + " " + row[nivel1]}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    <Button className="btn-simple btn-icon" size="sm" color="success"
                                                        onClick={() => handleOpenRow(row)}>
                                                        <i className="tim-icons icon-simple-add" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        {emptyRows() > 0 && (
                                            <TableRow style={{ height: 33 * emptyRows() }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                <br />
                                <PaginationComponent
                                    totalCount={direcciones.length}
                                    currentPage={currentPage}
                                    pageSize={PageSize}
                                    onPageChange={page => setCurrentPage(page)}
                                    siblingCount={0} />
                            </TableContainer>
                            :
                            <PaperStyled>
                                <h6 className="d-none d-sm-block text-center" style={{ padding: 50 }}>
                                    No hay direcciones excepcionadas pendientes
                                </h6>
                            </PaperStyled>
                    }
                </Container>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity={snackbarType} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default SelectorPage;
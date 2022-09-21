import React, { useEffect } from 'react';
import App from '../../App';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { isExpired } from 'react-jwt';
import IndexNavbar from '../../Components/IndexNavbar';
import SelectorPage from '../../Pages/selector/SelectorPage';
import ExcepcionadasPage from '../../Pages/excepcionadas/ExcepcionadasPage';
import IndeterminadasPage from '../../Pages/indeterminadas/IndeterminadasPage';
import ConsultaPage from '../../Pages/Consulta/ConsultaPage';

const Application = (props) => {
    const history = useHistory();

    useEffect(() => {
        const AUTH_TOKEN = localStorage.getItem('token');
        console.log(AUTH_TOKEN)
        console.log(isExpired(AUTH_TOKEN))
        /*if (AUTH_TOKEN && !isExpired(AUTH_TOKEN)) {
            // axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
        } else {
            console.log('token expired');
            history.push({
                pathname: '/home',
            });
        }*/
    });

    return (
        <Switch>
            <Route path="/home" render={(props) => <App {...props} />} />
            <Route
                path="/selector"
                render={(props) => (<><IndexNavbar /><SelectorPage {...props} /></>)}
            />
            <Route
                path="/excepcionadas/:id"
                render={(props) => (<><IndexNavbar /><ExcepcionadasPage {...props} /></>)}
            />
            <Route
                path="/consulta"
                render={(props) => (<><IndexNavbar /><ConsultaPage {...props} /></>)}
            />
			<Route
                path="/indeterminadas"
				render={(props) => (<><IndexNavbar /><IndeterminadasPage {...props} /></>)}
            />
            <Redirect from="/" to="/home" />
        </Switch>
    );
}

export default Application;
import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    Container,
} from "reactstrap";
import { useHistory } from 'react-router-dom';
import { Divider, Tooltip } from "@mui/material";

const MainDialog = (props) => {
    const history = useHistory();

    const [squares1to6, setSquares1to6] = React.useState("");
    const [greetingMessage, setGreetingMessage] = useState('');
    const [loggedUser, setLoggedUser] = useState(null);

    const followCursor = (event) => {
        let posX = event.clientX - window.innerWidth / 2;
        let posY = event.clientY - window.innerWidth / 6;
        setSquares1to6(
            "perspective(500px) rotateY(" +
            posX * 0.05 +
            "deg) rotateX(" +
            posY * -0.05 +
            "deg)"
        );
    };

    const logout = () => {
        localStorage.clear();
        props.handleLogout();
    }

    useEffect(() => {
        document.documentElement.addEventListener("mousemove", followCursor);
        // Specify how to clean up after this effect:
        const date = new Date();
        const hour = date.getHours()
        console.log(hour)
        console.log(hour < 12)
        console.log(hour >= 12 && hour < 18)
        console.log(hour >= 18)
        if (hour < 12) {
            setGreetingMessage('Buenos días')
        } else setGreetingMessage('Buenas tardes');

        const AUTH_USER = localStorage.getItem('user');
        const user = JSON.parse(AUTH_USER);
        console.log(user);
        setLoggedUser(user);

        return function cleanup() {
            document.documentElement.removeEventListener("mousemove", followCursor);
        };
    }, [])

    return (
        <Container style={{ maxWidth: "700px"}}>
            <Card className="card-register" style={{ boxShadow: "0px 0px 30px 2px rgba(255,255,255,.05)" }}>
                <div className="main-dialog">
                    <div className="section section-examples" data-background-color="black">
                        <Container align="center">
                            <h3>
                                {greetingMessage}<span className="text-info"> {loggedUser?.fullname}</span>
                            </h3>
                            <Divider style={{ width: '50%' }} />
                            <br />
                            <h3 className="d-none d-sm-block">
                                Accede a ...
                            </h3>
                            <div style={{ display: 'flex', justifyContent: "space-around" }}>
                                <Button
                                    className="btn-round"
                                    color="primary"
                                    style={{ width: 200 }}
                                    onClick={() => {
										{/*window.location.href = '/consulta'*/}
                                        {history.push({
                                            pathname: '/consulta',
											
									});}
                                    }}>
                                    Consulta de direcciones
                                </Button>
                                <Button
                                    className="btn-round"
                                    color="primary"
                                    size="lg"
                                    onClick={() => {
                                        history.push({
                                            pathname: '/selector',

                                        });
                                    }}
                                >
                                    Excepcionadas
                                </Button>
								
								<Button
                                    className="btn-round"
                                    color="primary"
                                    size="lg"
                                    onClick={() => {
                                        history.push({
                                            pathname: '/Indeterminadas',

                                        });
                                    }}
                                >
                                    Indeterminadas
                                </Button>
                            </div>

                        </Container>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: "center", marginBottom: 10 }}>
                        <Tooltip title="Cerrar sesión">
                            <span>
                                <Button className="btn-round btn-link" size="sm"
                                    // onClick={() => setOpenDialog(true)}
                                    onClick={logout}
                                >
                                    <i className="tim-icons icon-button-power" />
                                </Button>
                            </span>
                        </Tooltip>
                    </div>
                    <div className="main-dialog-bg" />
                    <div
                        className="square square-2"
                        id="square2"
                        style={{ transform: squares1to6 }}
                    />
                    <div
                        className="square square-3"
                        id="square3"
                        style={{ transform: squares1to6 }}
                    />
                    <div
                        className="square square-4"
                        id="square4"
                        style={{ transform: squares1to6 }}
                    />
                    <div
                        className="square square-5"
                        id="square5"
                        style={{ transform: squares1to6 }}
                    />
                    <div
                        className="square square-6"
                        id="square6"
                        style={{ transform: squares1to6 }}
                    />
                </div>
            </Card>

        </Container >
    );
}

export default MainDialog;

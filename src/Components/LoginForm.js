import React, { useState } from "react";
import classnames from "classnames";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
  CardImg,    CardTitle,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    FormText
} from "reactstrap";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";						  
import { CircularProgress } from "@mui/material";
import AuthServices from "../Services/AuthServices";
import jQuery from "jquery"

const LoginForm = (props) => {
    const [emailFocus, setUsernameFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isCredentialsError, setIsCredentialsError] = useState(false);
    const [isServerError, setIsServerError] = useState(false);
    const [isUsernameError, setIsUsernameError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        // this data needs some preparation before sending it to the server
        setIsServerError(false);
        let isValid = true;
        if (username === '') {
            isValid = false;
            setIsUsernameError(true)
        }
        /*if (password === '') {
            isValid = false;
            setIsPasswordError(true)
        }*/
        if (isValid) {
            setIsLoading(true)
            axios.get('http://localhost:9090/login?usuario='+username+'&pass='+password, { user: username, password: password })
                .then(response => {
					//console.log(response.data)
					var xmldoc = jQuery.parseXML(response.data)
					console.log(xmldoc)
					var resultado = xmldoc.getElementsByTagName('ns1:result')[0].childNodes
					console.log(resultado[0].textContent)
                    if (resultado[0].textContent === 'OK') {
						var token = xmldoc.getElementsByTagName('ns1:token')[0].childNodes
						var doccc = xmldoc.getElementsByTagName('ns1:name')[0].childNodes
						if(doccc.length===0)
						{
							doccc = " "
						}
						console.log(doccc)
                        console.log(response.data.token)
						console.log("entra")
                        localStorage.setItem('token', token[0].textContent);
                        let user = {
                            "name": xmldoc.getElementsByTagName('ns1:demo')[0].childNodes[0].textContent,
                            "fullname": doccc
                        };
						console.log(user)
                        localStorage.setItem('user', JSON.stringify(user));
                        setIsLoading(false)
                        props.isSuccessLogin();
                    }
                    console.log(response)
                })
                .catch(error => {
                    setIsLoading(false)
                    console.log(error);
                    if (error.response?.data?.msg && error.response.data.msg === "Usuario / Password no son correctos - correo") {
                        setIsCredentialsError(true)
                    }
                    else setIsServerError(true)
                })
        }
        console.log({ username, password });
		
		
		
		//------------------------------------
		/*let user = {
                            "name": " ",
                            "fullname": " "
                        };
		localStorage.setItem('user', JSON.stringify(user));
		props.isSuccessLogin();*/
    }

    const handleChangeValue = (name, value) => {
        setIsCredentialsError(false);
        switch (name) {
            case 'username':
                setUsername(value)
                setIsUsernameError(false)
                break;
            case 'password':
                setPassword(value);
                setIsPasswordError(false)
                break;
            default: ; break;
        }
    }

    console.log(isUsernameError)
    return (
        <Container style={{ maxWidth: "500px", height: '50vh' }}>
            <Card className="card-register" style={{ boxShadow: "0px 0px 30px 2px rgba(255,255,255,.05)" }}>
                <CardHeader>
                    <CardImg
                        alt="..."
                        src={require("../assets/img/square-purple-1.png")}
                    />
                    <CardTitle tag="h4">Login</CardTitle>
                </CardHeader>
                <CardBody>
                    <InputGroup
                        className={classnames({
                            "input-group-focus": emailFocus,
                            "has-danger": isUsernameError,
                        })}
                    >
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            onChange={(e) => handleChangeValue('username', e.target.value)}
                            placeholder="Usuario"
                            type="text"
                            onFocus={(e) => setUsernameFocus(true)}
                            onBlur={(e) => setUsernameFocus(false)}
                        />
                    </InputGroup>

                    <InputGroup
                        className={classnames({
                            "input-group-focus": passwordFocus,
                            "has-danger": isPasswordError
                        })}
                    >
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            onChange={(e) => handleChangeValue('password', e.target.value)}
                            placeholder="Contraseña"
                            type={isPasswordVisible ? "text" : "password"}
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => setPasswordFocus(false)}
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <i className="tim-icons" onClick={() => setIsPasswordVisible(!isPasswordVisible)} >
                                    {isPasswordVisible ?
                                        <VisibilityOffIcon style={{ fontSize: '15px', margin: '-25 0 -20 0 ' }} />
                                        : <VisibilityIcon style={{ fontSize: '15px', margin: '-25 0 -20 0 ' }} />
                                    }
                                </i>
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    {isCredentialsError && <FormText style={{ marginLeft: 10 }} color="danger">
                        Las credenciales son incorrectas
                    </FormText>}
                    {isServerError && <FormText style={{ marginLeft: 10 }} color="danger">
                        error al conectarse al servidor
                    </FormText>}
                </CardBody>
                <CardFooter>
                    {isLoading ? <CircularProgress color="secondary" />
                        :
                        <Button className="btn-round" color="primary" size="lg" onClick={handleSubmit}>
                            Login
                        </Button>}
                </CardFooter>
            </Card>
        </Container>
    );
}

export default LoginForm;

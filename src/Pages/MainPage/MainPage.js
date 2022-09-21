import { Dialog, Slide } from "@mui/material";
import React, { useState } from "react";
import { Container, Button } from "reactstrap";
import LoginForm from "../../Components/LoginForm";
import MainDialog from "./MainDialog";
import { isExpired } from 'react-jwt';


const MainPage = (props) => {
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openMainDialog, setOpenMainDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenLoginDialog(false);
        setOpenMainDialog(false);
    }

    const isSuccessLogin = () => {
        setOpenLoginDialog(false);
        setOpenMainDialog(true);
    }

    const handleLogout = () => {
        setOpenLoginDialog(true);
        setOpenMainDialog(false);
    }

    return (
        <div className="page-header header-filter">
            <div className="squares square1" />
            <div className="squares square2" />
            <div className="squares square3" />
            <div className="squares square4" />
            <div className="squares square5" />
            <div className="squares square6" />
            <div className="squares square7" />
            <Container>
                <div className="content-center brand">
				{/*{!openLoginDialog && !openMainDialog && <img
                        alt="..."
                        style={{ width: 300, marginBottom: 30, marginTop: '-20vh' }}
                        src={require("../../assets/img/RNUM_logo.png")}
				/>}*/}
                    <h1 className="h1-seo">ISSD• W</h1>
                    <h3 className="d-none d-sm-block">
                        GET STARTED
                    </h3>
                    <Button className="btn-round btn-icon" size="lg" color="primary"
                        /* onClick={() => {
                            history.push({
                                pathname: '/selector',
                            });
                        }}*/
                        onClick={() => {
                            const AUTH_TOKEN = localStorage.getItem('token');
                             if (AUTH_TOKEN) {
                                setOpenMainDialog(true)
                            } else {
                                setOpenLoginDialog(true)
									
								
                            }
                        }}
                    >
                        <i className="tim-icons icon-double-right" />
                    </Button>
                </div>
            </Container>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={openLoginDialog}
                onClose={handleCloseDialog}
                scroll='paper'
                PaperComponent={() => LoginForm({ isSuccessLogin: isSuccessLogin })}
                BackdropProps={{ style: { backgroundColor: "transparent" } }}
                TransitionComponent={Slide}
                TransitionProps={{ direction: "right" }}
                transitionDuration={300}
            />
            <Dialog
                fullWidth
                maxWidth="sm"
                open={openMainDialog}
                onClose={handleCloseDialog}
                scroll='paper'
                PaperComponent={() => MainDialog({ handleLogout: handleLogout })}
                BackdropProps={{ style: { backgroundColor: "transparent" } }}
                TransitionComponent={Slide}
                TransitionProps={{ direction: "left" }}
                transitionDuration={300}
            />
        </div>
    );
}

export default MainPage;

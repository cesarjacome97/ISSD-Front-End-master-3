import { Divider } from "@mui/material";
import React from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Container,
} from "reactstrap";

const ConfirmationDialog = (props) => {
    const {
        title,
        message,
        confirmButton,
        cancelButton,
        confirmButtonText,
        cancelButtonText,
        handleConfirmAction,
        handleCancelAction } = props;


    return (
        <Container style={{ maxWidth: "500px" }}>
            <Card>
                <CardHeader>
                    <CardTitle tag="h6">{title}</CardTitle>
                    <Divider style={{ width: '100%' }} />
                </CardHeader>
                <CardBody>
                    <h6>{message}</h6>
                </CardBody>
                <CardFooter>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        {confirmButton &&
                            <Button className="btn-round" color="success" size="sm" onClick={handleConfirmAction}>
                                {confirmButtonText}
                            </Button>}
                        {cancelButton &&
                            <Button className="btn-round" color="danger" size="sm" onClick={handleCancelAction}>
                                {cancelButtonText}
                            </Button>}
                    </div>

                </CardFooter>
            </Card>
        </Container >
    );
}

export default ConfirmationDialog;

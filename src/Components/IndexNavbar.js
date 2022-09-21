import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
} from "reactstrap";
import { useHistory } from 'react-router-dom';

export default function IndexNavbar() {
  const history = useHistory();

  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };

  const logout = () => {
    localStorage.clear();
    history.push({
      pathname: '/home',

    });
  }
  return (
    <Navbar className={"position-absolute " + color} expand="sm">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/home" tag={Link} id="navbar-brand">
            <span>ISSD• </span>
            Web application
          </NavbarBrand>
        </div>
        <Nav navbar>
          <NavItem>
            <Button
              className="btn-link"
              onClick={logout}
            >
              Cerrar sesión <i className="tim-icons icon-button-power" />
            </Button>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
}

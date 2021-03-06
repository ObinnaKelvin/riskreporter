import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class navbar extends Component {
    render() {
        return (
                <div>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="#home">Risk Reporter</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">Risk Log</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/create" className="nav-link">Create Risk Report</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">Create Location</Link>
                                </li>
                                    {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                        </NavDropdown> */}
                            </Nav>
                            {/* <Nav>
                                <Nav.Link href="#deets">More deets</Nav.Link>
                                <Nav.Link eventKey={2} href="#memes">
                                    Dank memes
                                </Nav.Link>
                            </Nav> */}
                        </Navbar.Collapse>
                    </Navbar>
                </div>

        )
    }
}

export default navbar;

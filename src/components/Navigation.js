// React
import React, {
    useState,
    useEffect
} from 'react';

// Bootstrap
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/NavBar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Import PDFs
import resumePDF from './pdfs/joe_wlos_resume.pdf';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFile,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { 
  faTwitterSquare,
  faLinkedin,
  faGithubSquare
} from '@fortawesome/free-brands-svg-icons';

// Import CSS for the navigation
import './css/Navigation.css';

// State for the homepage message and fill when we have scrolled
function Navigation(props) {
    const [scroll, setScroll] = useState(false)

    // Listen for a scroll on the page
    const listenerScroll = () => {
        const scrollCheck = window.scrollY > 0
        if ((!scroll) && (scrollCheck)) {
          setScroll(scrollCheck);
        }
      };

    // Update the state when the position moves
    useEffect(() => {
        window.addEventListener("scroll", listenerScroll);
        return () => {
          window.removeEventListener("scroll", listenerScroll);
        };
    });

    // Change the color class based on state
    const changeColor = (c) => {
        if (!props.transition) {
            return [c, 'joe-navbar-solid'].join(' ');
        } else if (scroll) {
            return [c, 'joe-navbar-color'].join(' ');
        } else {
            return c;
        }
    };

    // Return the JSX navigation
    return (
        <NavBar 
            className={ changeColor('joe-navbar') }
            expand="md" 
            fixed="top"
        >

            {/* Name */}
            <NavBar.Brand className="joe-brand" href="/">
                Joe Wlos
            </NavBar.Brand>

            {/* Toggle for mobile */}
            <NavBar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-icon">
                <FontAwesomeIcon icon={ faBars } />
            </NavBar.Toggle>

            {/* Internal links */}
            <NavBar.Collapse 
                id="basic-navbar-nav" 
                className={ changeColor('') }
            >
                <Nav>
                    <Nav.Link href="#action/2" className="joe-menu-item">About</Nav.Link>

                    {/* Dropdown Links */}
                    <NavDropdown title="Projects" id="basic-nav-dropdown" className="joe-menu-dropdown">
                        <NavDropdown.Item href="#action/3.1">Red Mirage</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">PredictIt</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Income Tax</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Cook County</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">This Site</NavDropdown.Item>
                    </NavDropdown>

                {/* Close the internal links */}
                </Nav>
            </NavBar.Collapse>

            {/* External links */}
            <NavBar.Collapse 
                id="basic-navbar-nav" 
                className={ changeColor('justify-content-end joe-nav-pad') }
            >
                <Nav>

                    {/* FontAwesome */}
                    <Nav.Item className="joe-icon-row">
                        <a href="https://www.linkedin.com/in/joewlos/" target="_blank" rel="noreferrer" className="joe-menu-icon"><FontAwesomeIcon icon={ faLinkedin } /></a>
                        <a href="https://twitter.com/joewlos?lang=en" target="_blank" rel="noreferrer" className="joe-menu-icon"><FontAwesomeIcon icon={ faTwitterSquare } /></a>
                        <a href="https://github.com/joewlos" target="_blank" rel="noreferrer" className="joe-menu-icon"><FontAwesomeIcon icon={ faGithubSquare } /></a>
                        <a href={ resumePDF } target="_blank" rel="noreferrer" className="joe-menu-icon"><FontAwesomeIcon icon={ faFile } /></a>
                    </Nav.Item>

                {/* Close the navigation */}
                </Nav>
            </NavBar.Collapse>
        </NavBar>
    );}

export default Navigation;

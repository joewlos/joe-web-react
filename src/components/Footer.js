// React
import React from 'react';

// Bootstrap
import { 
    Row, 
    Col 
  } from 'react-bootstrap';

// Import CSS for the footer
import './css/Footer.css';

// Footer is static at bottom of page
function Footer() {

    // Return the JSX footer
    return (
        <div className="joe-footer-container">
            <Row className="joe-footer">
                <Col md={ 12 }>
                    <p>© 2021 Joe Wlos</p>
                </Col>
            </Row>
        </div>
    );}

export default Footer;

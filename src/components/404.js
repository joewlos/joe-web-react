// React
import React from 'react';

// Import components
import Navigation from './Navigation.js';
import Footer from './Footer.js';

// Import CSS for the homepage
import './css/404.css';

// State for the homepage message
function NotFound() {
  return (
    <div>
      <Navigation transition={ false }/>

        {/* Full body div with message */}
        <div className='container-404'>
          <h1 className='msg-404'>Page Not Found <br></br>: (</h1>
        </div>

      {/* Close out the page with the footer */}
      <Footer />
    </div>
  );
}

export default NotFound;

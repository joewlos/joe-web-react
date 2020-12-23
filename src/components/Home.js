// React
import React, {
  useState,
  useEffect
} from 'react';

// Bootstrap
import { 
  Row, 
  Col,
  Carousel
} from 'react-bootstrap';

// Import components
import Navigation from './Navigation.js';
import Footer from './Footer.js';

// Import CSS for the homepage
import './css/Home.css';

// Import headshot
import aquaHeadshot from './images/aqua_headshot.png';
import redMirageMap from './images/red_mirage_map.svg';

// State for the homepage message
function Home() {
  const [homeMessage, setHomeMessage] = useState(0);

  // Fetch the message from the API and update state
  useEffect(() => {
    fetch('/api/v1/home_message').then(res => res.json()).then(data => {
      setHomeMessage(data.message);
    });
  }, []);

  // Make the navigation transition its color
  return (
    <div>
      <Navigation transition={ true }/>
      <div className='joe-welcome'>
        <h1 className='joe-welcome-msg'>{ homeMessage }</h1>
      </div>
      <div className='joe-intro'>
        <Row className='joe-intro-row'>
          <Col md={ 6 } className='joe-headshot-column'>
            <img src={ aquaHeadshot } alt="Headshot of Joe" className="joe-headshot" />
          </Col>
          <Col md={ 6 } className='joe-description-column'>
            <h1 className='joe-text'>
              I'm a data nerd and news junkie, interested in the intersection of politics and technology, housing policy, and financial markets.
            </h1>
          </Col>
        </Row>
        <Row className="joe-project">
          <Row className='joe-display-row'>
            <Col md={ 12 }>
              <h1 className='joe-text'>
                  Check out my projects to see more of my work.
              </h1>
              <Carousel data-interval={ 10000 }>
                <Carousel.Item>
                  <img
                    className="w-100"
                    src={ redMirageMap }
                    alt="Red Mirage"
                  />
                  <Carousel.Caption>
                    <h3 className="joe-slider-headline">Red Mirage</h3>
                    <p className="joe-slider-text">Election 2020</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="w-100"
                    src={ redMirageMap }
                    alt="Red Mirage"
                  />
                  <Carousel.Caption>
                    <h3 className="joe-slider-headline">Red Mirage</h3>
                    <p className="joe-slider-text">Election 2020</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

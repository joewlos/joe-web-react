// React
import React, {
  useState,
  useEffect
} from 'react';

// Bootstrap
import { 
  Row, 
  Col
} from 'react-bootstrap';

// Import components
import Navigation from './Navigation.js';
import Footer from './Footer.js';

// Import CSS for the homepage
import './css/Home.css';

// Import images
import aquaHeadshot1 from './images/aqua_web_transparent_1.png';
import aquaHeadshot2 from './images/aqua_web_transparent_2.png';
import aquaHeadshot3 from './images/aqua_web_transparent_3.png';
import aquaHeadshot4 from './images/aqua_web_transparent_4.png';
import aquaHeadshotMobile from './images/aqua_web_transparent.png';
import wAbout from './images/w_about.svg';
import wAboutHighlight from './images/w_about_highlight.svg';
import redMirageMap from './images/red_mirage_map.svg';

// Import PDFs
import resumePDF from './pdfs/joe_wlos_resume.pdf';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFile,
  faAngleUp,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { 
  faTwitterSquare,
  faLinkedin,
  faGithubSquare
} from '@fortawesome/free-brands-svg-icons';

// State for the homepage message
function Home() {
  const [homeMessage, setHomeMessage] = useState(false);
  const [project, setProject] = useState('red-mirage');  // Start with Red Mirage

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

      {/* Welcome message */}
      <div className='joe-welcome'>
        <h1 className='joe-welcome-msg'>{ homeMessage }</h1>
      </div>

      {/* Introductory information */}
      <div>
        <Row id='joe-dynamic-headshots' className='joe-intro-row joe-headshot-background'>

          {/* Four boxes with headshot in bottom left */}
          <Col md={ 6 } className='joe-headshot-column'>
            <Row className='joe-headshot-row'>
              <Col md={ 6 } className='joe-headshot-column joe-headshot-box-2 order-2'>
                <img src={ aquaHeadshot2 } alt="Headshot of Joe" className="joe-headshot" />
              </Col>
              <Col md={ 6 } className='joe-headshot-column joe-headshot-box-1 order-1'>
                <img src={ aquaHeadshot1 } alt="Headshot of Joe" className="joe-headshot" />
              </Col>
              <Col md={ 6 } className='joe-headshot-column joe-headshot-box-3 order-3'>
                <img src={ aquaHeadshot3 } alt="Headshot of Joe" className="joe-headshot" />
              </Col>
              <Col md={ 6 } className='joe-headshot-column joe-headshot-box-4 order-4'>
                <img src={ aquaHeadshot4 } alt="Headshot of Joe" className="joe-headshot" />
              </Col>
            </Row>
          </Col>
          
          {/* Mobile headshot */}
          <Col md={ 12 } className='joe-mobile-headshot'>
                <img src={ aquaHeadshotMobile } alt="Headshot of Joe" className="joe-headshot" />
          </Col>
          
          {/* Description text */}
          <Col md={ 6 } className='joe-description-column'>
            <Row className='joe-description-content'>
              <Col md={ 12 } className='joe-description-padded'>
                <h1 className='joe-intro-text'>
                  I'm a data nerd and news junkie, interested in the intersection of politics and technology, housing policy, and financial markets.
                </h1>
              </Col>
            </Row>
            <Row className='joe-description-content'>
              <Col md={ 6 } className='joe-description-left'>
                <h1 className='joe-projects-text'>
                  I strive to investigate problems, discover their causes, and (when possible) communicate and implement their solutions.
                </h1>
              </Col>
              <Col md={ 6 } className='joe-description-right'>
                <a href='#action/2' className='joe-link-a'>
                  <img src={ wAbout } alt="W Logo" className="joe-w-about" />
                  <img src={ wAboutHighlight } alt="W Logo Highlighted" className="joe-w-about-highlight" />
                  <h1 className='joe-about-text'>
                    About Me
                  </h1>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {/* Project selection */}
      <div className='joe-projects joe-hide-mobile'>
        <Row className='joe-intro-row'>
          <Col md={ 4 } className='joe-link-column joe-projects-select'>
            <Row className='joe-projects-row'>
              <Col md={ 12 } className='joe-projects-name'>
                <FontAwesomeIcon icon={ faAngleDown } className='joe-hide-mobile joe-projects-name-text' />
                <div 
                  id={ project === 'red-mirage' ? 'joe-projects-name-active' : ''}
                  className='joe-projects-name-text joe-projects-name-click'
                  onClick={ () => setProject('red-mirage') }
                >
                  Red Mirage
                </div>
                <div 
                  id={ project === 'predictit' ? 'joe-projects-name-active' : ''}
                  className='joe-projects-name-text joe-projects-name-click'
                  onClick={ () => setProject('predictit') }
                >
                  PredictIt
                </div>
                <div 
                  id={ project === 'income-tax' ? 'joe-projects-name-active' : ''}
                  className='joe-projects-name-text joe-projects-name-click'
                  onClick={ () => setProject('income-tax') }
                >
                  Income Tax
                </div>
                <div 
                  id={ project === 'cook-county' ? 'joe-projects-name-active' : ''}
                  className='joe-projects-name-text joe-projects-name-click'
                  onClick={ () => setProject('cook-county') }
                >
                  Cook County
                </div>
                <FontAwesomeIcon icon={ faAngleUp } className='joe-hide-mobile joe-projects-name-text' />
              </Col>
            </Row>
          </Col>

          {/* Project display */}
          <Col md={ 8 } className='joe-link-column joe-project-linked'>
            
            {/* Red mirage */}
            {
              project === 'red-mirage' ? (
                <a href='#action/2' id='red-mirage' className='joe-project-a'>
                  <Row className='joe-projects-row'>
                      <Col md={ 5 } className='joe-projects-column'>
                        <h1 className='joe-projects-title'>Red Mirage</h1>
                        <div className='joe-projects-container'>
                          <h1 className='joe-projects-text'>
                            A record number of voters mailed-in their ballots in 2020. I assessed vote-by-mail's impact and helped develop the "Red Mirage" communications strategy to forewarn its effects.
                          </h1>
                        </div>
                      </Col>
                      <Col md={ 7 } className='joe-link-column'>
                        <div className='joe-projects-image-box'>
                          <img src={ redMirageMap } alt="Red Mirage" className="joe-projects-image" />
                        </div>
                      </Col>
                  </Row>
                </a>
              
              // PredictIt
              ) : project === 'predictit' ? (
                <a href='#action/2' id='predictit' className='joe-project-a'>
                  <Row className='joe-projects-row'>
                      <Col md={ 5 } className='joe-projects-column'>
                        <h1 className='joe-projects-title'>PredictIt</h1>
                        <div className='joe-projects-container'>
                          <h1 className='joe-projects-text'>
                            A record number of voters mailed-in their ballots in 2020. I assessed vote-by-mail's impact and helped develop the "Red Mirage" communications strategy to forewarn its effects.
                          </h1>
                        </div>
                      </Col>
                      <Col md={ 7 } className='joe-link-column'>
                        <div className='joe-projects-image-box'>
                          <img src={ redMirageMap } alt="Red Mirage" className="joe-projects-image" />
                        </div>
                      </Col>
                  </Row>
                </a>

              // Income Tax
              ) : project === 'income-tax' ? (
                <a href='#action/2' id='income-tax' className='joe-project-a'>
                  <Row className='joe-projects-row'>
                      <Col md={ 5 } className='joe-projects-column'>
                        <h1 className='joe-projects-title'>Income Tax</h1>
                        <div className='joe-projects-container'>
                          <h1 className='joe-projects-text'>
                            A record number of voters mailed-in their ballots in 2020. I assessed vote-by-mail's impact and helped develop the "Red Mirage" communications strategy to forewarn its effects.
                          </h1>
                        </div>
                      </Col>
                      <Col md={ 7 } className='joe-link-column'>
                        <div className='joe-projects-image-box'>
                          <img src={ redMirageMap } alt="Red Mirage" className="joe-projects-image" />
                        </div>
                      </Col>
                  </Row>
                </a>

              // Cook County
              ) : (
                <a href='#action/2' id='cook-county' className='joe-project-a'>
                  <Row className='joe-projects-row'>
                      <Col md={ 5 } className='joe-projects-column'>
                        <h1 className='joe-projects-title'>Cook County</h1>
                        <div className='joe-projects-container'>
                          <h1 className='joe-projects-text'>
                            A record number of voters mailed-in their ballots in 2020. I assessed vote-by-mail's impact and helped develop the "Red Mirage" communications strategy to forewarn its effects.
                          </h1>
                        </div>
                      </Col>
                      <Col md={ 7 } className='joe-link-column'>
                        <div className='joe-projects-image-box'>
                          <img src={ redMirageMap } alt="Red Mirage" className="joe-projects-image" />
                        </div>
                      </Col>
                  </Row>
                </a>
              )

            // Close projects
            }
          </Col>
        </Row>
      </div>

      {/* Links */}
      <div className='joe-links'>
        <Row className='joe-intro-row'>
          <Col md={ 3 } className='joe-link-column'>
            <a href="https://www.linkedin.com/in/joewlos/" target="_blank" rel="noreferrer" className="joe-link-box-purple joe-link-a">
              <FontAwesomeIcon className='joe-home-icon' icon={ faLinkedin } />
              <h1 className='joe-link-text'>
                LinkedIn
              </h1>
            </a>
          </Col>
          <Col md={ 3 } className='joe-link-column'>
            <a href="https://twitter.com/joewlos?lang=en" target="_blank" rel="noreferrer" className="joe-link-box-purple joe-link-a">
              <FontAwesomeIcon className='joe-home-icon' icon={ faTwitterSquare } />
              <h1 className='joe-link-text'>
                Twitter
              </h1>
            </a>
          </Col>
          <Col md={ 3 } className='joe-link-column'>
            <a href="https://github.com/joewlos" target="_blank" rel="noreferrer" className="joe-link-box-purple joe-link-a">
              <FontAwesomeIcon className='joe-home-icon' icon={ faGithubSquare } />
              <h1 className='joe-link-text'>
                GitHub
              </h1>
            </a>
          </Col>
          <Col md={ 3 } className='joe-link-column'>
            <a href={ resumePDF } target="_blank" rel="noreferrer" className="joe-link-box-purple joe-link-a">
              <FontAwesomeIcon className='joe-home-icon' icon={ faFile } />
              <h1 className='joe-link-text'>
                Resume
              </h1>
            </a>
          </Col>
        </Row>
      </div>




      {/* Project carousel */}
      {/* <div>
        <Row className='joe-intro-row joe-carousel-background'>
          <Col md={ 9 }>
            <h1 className='joe-projects-text joe-carousel-push'>
              Check out my projects to see some of my work.
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
      </div> */}

      {/* <div className='joe-intro'>
        <Row className="joe-project">
          <Row className='joe-display-row'>
            <Col md={ 12 }>
              <h1 className='joe-text'>
                  Check out my projects to see more of my work.
              </h1>

            </Col>
          </Row>
        </Row>
      </div> */}
      <Footer />
    </div>
  );
}

export default Home;

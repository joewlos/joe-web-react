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
  faAngleLeft,
  faAngleRight
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
  const projectList = {
    0: 'red-mirage',
    1: 'predictit',
    2: 'income-tax',
    3: 'cook-county'
  }

  // Select the correct project for display
  function changeProject(event, i) {
    var position = Object.keys(projectList).find(key => projectList[key] === project);
    var nextPosition = parseInt(position) + i;

    // Get the maximum position in our project list
    var maxPosition = parseInt(Object.keys(projectList).reduce((a, b) => a > b ? a : b));

    // Reset to max if above zero and reset to zero if above max
    if (nextPosition < 0) {
      nextPosition = maxPosition;
    } else if (nextPosition > maxPosition) {
      nextPosition = 0;
    }

    // Set the correct project to our state
    setProject(projectList[nextPosition]);
  }

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

      {/* Project Section */}
      <div className='joe-projects'>
        <Row className='joe-intro-row'>
          <Col className='joe-angle-col joe-hide-mobile' md={ 2 }>
            <div className='joe-angle-hover' onClick={ (event) => changeProject(event, -1) }>
              <FontAwesomeIcon className='joe-angle' icon={ faAngleLeft } />
              <div className='joe-angle-text'>Prev</div>
            </div>
          </Col>
          <Col md={ 8 } className='joe-link-column joe-project-linked'>
            
            {/* Red mirage */}
            {
              project === 'red-mirage' ? (
                <a href='#action/2' id='red-mirage' className='joe-project-a'>
                  <Row className='joe-projects-row'>
                      <Col md={ 12 } className='joe-projects-column'>
                        <div className='joe-projects-image-box'>
                          <img src={ redMirageMap } alt="Red Mirage" className="joe-projects-image red-mirage" />
                        </div>
                        <h1 className='joe-projects-title'>Red Mirage</h1>
                        <h1 className='joe-projects-text joe-mobile-smaller'>
                          A record number of voters mailed their ballots in 2020. <br class='joe-hide-mobile' />My team identified the "Red Mirage," assessed its impact, and developed a communications strategy to forewarn its effects.
                        </h1>
                      </Col>
                  </Row>
                </a>
              
              // PredictIt
              ) : project === 'predictit' ? (
                <a href='#action/2' id='predictit' className='joe-project-a'>
                  <Row className='joe-projects-row'>
                      <Col md={ 12 } className='joe-projects-column'>
                        <div className='joe-projects-image-box'>
                          <img src={ redMirageMap } alt="Red Mirage" className="joe-projects-image" />
                        </div>
                        <h1 className='joe-projects-title'>PredictIt</h1>
                        <h1 className='joe-projects-text joe-mobile-smaller'>
                          PredictIt is an online prediction market, which allows users to buy "yes" or "no" contracts on the outcome of political events. <br className='joe-hide-mobile' />In 2019 and 2020, I tracked my performance on the site.
                        </h1>
                      </Col>
                  </Row>
                </a>

              // Income Tax
              ) : project === 'income-tax' ? (
                <a href='#action/2' id='income-tax' className='joe-project-a'>
                  <Row className='joe-projects-row'>
                      <Col md={ 12 } className='joe-projects-column'>
                        <div className='joe-projects-image-box'>
                          <img src={ redMirageMap } alt="Red Mirage" className="joe-projects-image" />
                        </div>
                        <h1 className='joe-projects-title'>Income Tax</h1>
                        <h1 className='joe-projects-text joe-mobile-smaller'>
                          In 2020, Illinois rejected a new progressive income tax. <br class='joe-hide-mobile' />Using public data, I examined how a progressive tax–similar to systems in other states–would affect IL's residents and budget.
                        </h1>
                      </Col>
                  </Row>
                </a>

              // Cook County
              ) : (
                <a href='#action/2' id='cook-county' className='joe-project-a'>
                  <Row className='joe-projects-row'>
                      <Col md={ 12 } className='joe-projects-column'>
                        <div className='joe-projects-image-box'>
                          <img src={ redMirageMap } alt="Red Mirage" className="joe-projects-image" />
                        </div>
                        <h1 className='joe-projects-title'>Cook County</h1>
                        <h1 className='joe-projects-text joe-mobile-smaller'>
                          In Cook County, the assessed values of single-family homes are often not uniform. I used property tax data to determine in which neighborhoods this problem is prevelant.
                        </h1>
                      </Col>
                  </Row>
                </a>
              )

            // Close projects
            }
          </Col>
          <Col className='joe-angle-col' md={ 2 }>
          <div className='joe-angle-hover' onClick={ (event) => changeProject(event, 1) }>
              <FontAwesomeIcon className='joe-angle' icon={ faAngleRight } />
              <div className='joe-angle-text'>Next</div>
            </div>
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

      {/* Close out the page with the footer */}
      <Footer />
    </div>
  );
}

export default Home;

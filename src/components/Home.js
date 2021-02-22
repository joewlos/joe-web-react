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

// Graphing
import LineChart from './LineChart.js';

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
  const [predictItData, setPredictItData] = useState({
    performance_x: false,
    performance_y: false
  });
  const projectList = {
    0: 'red-mirage',
    1: 'predictit',
    // 2: 'income-tax',
    // 3: 'cook-county'
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
    fetch('/api/v1/predictit_data').then(res => res.json()).then(data => {
      setPredictItData(data);
  });
  }, []);

  // Make the navigation transition its color
  return (
    <div>
      <Navigation transition={ true }/>

      {/* Welcome message */}
      <div className='joe-welcome'>
        <p className='joe-welcome-msg'>{ homeMessage }</p>
      </div>

      {/* Introductory information */}
      <div>
        <Row id='joe-dynamic-headshots' className='joe-intro-row joe-headshot-background'>

          {/* Four boxes with headshot in bottom left */}
          <Col md={ 6 } className='joe-headshot-column'>
            <Row className='joe-headshot-row'>
              <Col md={ 6 } className='joe-headshot-column joe-headshot-box-2 order-2'>
                <img src={ aquaHeadshot2 } alt="Joe Wlos Partial Headshot Square 1" className="joe-headshot" />
              </Col>
              <Col md={ 6 } className='joe-headshot-column joe-headshot-box-1 order-1'>
                <img src={ aquaHeadshot1 } alt="Joe Wlos Partial Headshot Square 2" className="joe-headshot" />
              </Col>
              <Col md={ 6 } className='joe-headshot-column joe-headshot-box-3 order-3'>
                <img src={ aquaHeadshot3 } alt="Joe Wlos Partial Headshot Square 3" className="joe-headshot" />
              </Col>
              <Col md={ 6 } className='joe-headshot-column joe-headshot-box-4 order-4'>
                <img src={ aquaHeadshot4 } alt="Joe Wlos Partial Headshot Square 4" className="joe-headshot" />
              </Col>
            </Row>
          </Col>
          
          {/* Mobile headshot */}
          <Col md={ 12 } className='joe-mobile-headshot'>
                <img src={ aquaHeadshotMobile } alt="Joe Wlos Headshot 2020" className="joe-headshot" />
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
                <p className='joe-description-text mb-0'>
                  I strive to investigate problems, discover their causes, and (when possible) communicate and implement their solutions.
                </p>
              </Col>
              <Col md={ 6 } className='joe-description-right'>
                <a href='/about' className='joe-link-a'>
                  <img src={ wAbout } alt="Joe Wlos 'W' Logo" className="joe-w-about" />
                  <img src={ wAboutHighlight } alt="Joe Wlos 'W' Logo Highlighted" className="joe-w-about-highlight" />
                  <h2 className='joe-about-text'>
                    About Me
                  </h2>
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
            
            {/* Red Mirage */}
            {
              project === 'red-mirage' ? (
                <a href='/red-mirage' id='red-mirage' className='joe-project-a'>
                  <Row className='joe-projects-row'>
                      <Col md={ 12 } className='joe-projects-column'>
                        <div className='joe-projects-image-box'>
                          <img src={ redMirageMap } alt="Red Mirage on Electoral Map" className="joe-projects-image red-mirage" />
                        </div>
                        <h2 className='joe-projects-title'>Red Mirage</h2>
                        <h3 className='joe-projects-text joe-mobile-smaller'>
                          A record number of voters mailed their ballots in 2020. <br className='joe-hide-mobile' />My team identified the <i>Red Mirage</i>, assessed its impact, and developed a communications strategy to forewarn its effects.
                        </h3>
                      </Col>
                  </Row>
                </a>
              
              // PredictIt
              ) : (
                <a href='/predictit' id='predictit' className='joe-project-a'>
                  <Row className='joe-projects-row'>
                      <Col md={ 12 } className='joe-projects-column'>
                        <div className='joe-projects-graph-box'>
                          <LineChart 
                            className="joe-projects-graph" 
                            x={ predictItData.performance_x }
                            y={ predictItData.performance_y }
                          />
                        </div>
                        <h2 className='joe-projects-title'>PredictIt</h2>
                        <h3 className='joe-projects-text joe-mobile-smaller'>
                          PredictIt is an online prediction market, which allows users to buy "yes" or "no" contracts on the outcome of political events. <br className='joe-hide-mobile' />In 2019 and 2020, I tracked my performance on the site.
                        </h3>
                      </Col>
                  </Row>
                </a>

              // // Income Tax
              // ) : project === 'income-tax' ? (
              //   <a href='#action/2' id='income-tax' className='joe-project-a'>
              //     <Row className='joe-projects-row'>
              //         <Col md={ 12 } className='joe-projects-column'>
              //           <div className='joe-projects-image-box'>
              //             <img src={ redMirageMap } alt="Red Mirage" className="joe-projects-image" />
              //           </div>
              //           <h2 className='joe-projects-title'>Income Tax</h2>
              //           <h3 className='joe-projects-text joe-mobile-smaller'>
              //             In 2020, Illinois rejected a new progressive income tax. <br className='joe-hide-mobile' />Using public data, I examined how a progressive tax–similar to systems in other states–would affect IL's residents and budget.
              //           </h3>
              //         </Col>
              //     </Row>
              //   </a>

              // // Cook County
              // ) : (
              //   <a href='#action/2' id='cook-county' className='joe-project-a'>
              //     <Row className='joe-projects-row'>
              //         <Col md={ 12 } className='joe-projects-column'>
              //           <div className='joe-projects-image-box'>
              //             <img src={ redMirageMap } alt="Red Mirage" className="joe-projects-image" />
              //           </div>
              //           <h2 className='joe-projects-title'>Cook County</h2>
              //           <h3 className='joe-projects-text joe-mobile-smaller'>
              //             In Cook County, the assessed values of single-family homes are often not uniform. I used property tax data to determine in which neighborhoods this problem is prevelant.
              //           </h3>
              //         </Col>
              //     </Row>
              //   </a>
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
              <p className='joe-link-text'>
                LinkedIn
              </p>
            </a>
          </Col>
          <Col md={ 3 } className='joe-link-column'>
            <a href="https://twitter.com/joewlos?lang=en" target="_blank" rel="noreferrer" className="joe-link-box-purple joe-link-a">
              <FontAwesomeIcon className='joe-home-icon' icon={ faTwitterSquare } />
              <p className='joe-link-text'>
                Twitter
              </p>
            </a>
          </Col>
          <Col md={ 3 } className='joe-link-column'>
            <a href="https://github.com/joewlos" target="_blank" rel="noreferrer" className="joe-link-box-purple joe-link-a">
              <FontAwesomeIcon className='joe-home-icon' icon={ faGithubSquare } />
              <p className='joe-link-text'>
                GitHub
              </p>
            </a>
          </Col>
          <Col md={ 3 } className='joe-link-column'>
            <a href={ resumePDF } target="_blank" rel="noreferrer" className="joe-link-box-purple joe-link-a">
              <FontAwesomeIcon className='joe-home-icon' icon={ faFile } />
              <p className='joe-link-text'>
                Resume
              </p>
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

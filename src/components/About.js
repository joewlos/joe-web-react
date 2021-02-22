// React
import React, { useEffect } from 'react';

// Bootstrap
import { 
    Row, 
    Col
} from 'react-bootstrap';

// Import components
import Navigation from './Navigation.js';
import Footer from './Footer.js';

// Images
import crownHeights from './images/crown_heights.jpg';
import bike from './images/bike.jpg';
import wDynamic from './images/w-dynamic.svg';

// Import CSS for the page and content
import './css/Page.css';
import './css/About.css';

// Content for About
function About() {

    // Change the title
    useEffect(() => {
        document.title = "Joe Wlos - About";
    }, []);

    // No transition for the navigation on pages
    return (
        <div>
            <Navigation transition={ false }/>

                {/* Content */}
                <div className='container-page'>
                    <div className='container-content'>

                        {/* Summary text */}
                        <Row>
                            <Col md={ 12 }>
                                <h1 className='page-title mb-5 text-left'>
                                    About Me
                                </h1>
                            </Col>
                        </Row>
                        <Row className='align-items-center mb-5'>
                            <Col md={ 5 } className='text-left'>
                                <p>
                                    One of my first memories growing up is reading the <i>Chicago Tribune</i>'s weather section with my family.
                                    Soon after, I had moved on to the front page, learning about politics, companies, and events in my hometown and country.
                                </p>
                                <p>
                                    At Grinnell College in Iowa, I focused on current events, studying political science to better understand
                                    America's systems of governance and <a rel="noreferrer" target="_blank" href="https://gumag.org/">founding a magazine</a> to better depict our campus community.
                                </p>
                                <p>
                                    In my career, I have developed my skills in analyzing intricate systems and
                                    communicating their complexities. 
                                    I'm always looking forward to new opportunities to use those skills to build a better world.
                                </p>
                            </Col>
                            <Col md={ 7 } className='text-center flex-row'>
                                <img src={ crownHeights } alt="Joe Wlos in Winter" className="joe-image" />
                                <img src={ bike } alt="Joe Wlos on a Bike" className="joe-image" />
                            </Col>
                        </Row>

                        {/* This website */}
                        <Row>
                            <Col md={ 12 }>
                                <h1 className='page-title mb-5 text-left'>
                                    This Website
                                </h1>
                            </Col>
                        </Row>
                        <Row id='this-website' className='align-items-center mb-3'>
                            <Col md={ 5 } className='text-left'>
                                <p>
                                    My dad's family immigrated from Poland to the United States in the early 20th Century.
                                    Due to <a rel="noreferrer" target="blank" href="https://linguistics.stackexchange.com/questions/19775/why-does-polish-use-w-instead-of-v#:~:text=Polish%20spells%20%2Fv%2F%20as%20%22,%22w%22%20does%20not%20exist.">German influence</a> on
                                    the Polish written language, the first letter of my last name "Wlos" is pronounced like a "V" (/v/).
                                </p>
                                <p>
                                    For this website, I wanted to create a graphic representation of this pronunciation.
                                    Because I had previously worked with SVG animations,
                                    I chose to highlight the two "V" shapes
                                    within the Raleway font family's "W" character.
                                    This SVG is featured in a grid on the background of the homepage.
                                </p>
                                <p>
                                    To build this website, I blended the JavaScript frontend library React with Python's web framework Flask,
                                    using <a rel="noreferrer" target="blank" href="https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project">this tutorial</a> as a guide. 
                                    I produced the data visualizations using Plotly's JavaScript library.
                                    You can find the code of the website on my personal <a rel="noreferrer" target="blank" href="https://github.com/joewlos">GitHub</a>.
                                </p>
                            </Col>
                            <Col md={ 7 } className='text-center flex-row'>
                                <img src={ wDynamic } alt="Dynamic 'W' in Joe Wlos" className="joe-w" />
                            </Col>
                        </Row>
                    </div>
                </div>

            {/* Close out the page with the footer */}
            <Footer />
        </div>
    );
}

export default About;
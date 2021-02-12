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

// Import CSS for the page and content
import './css/Page.css';

// Content for Red Mirage
function PredictIt() {
    const [mirageData, setMirageData] = useState(false);

    // Fetch the message from the API and update state
    useEffect(() => {
        fetch('/api/v1/red_mirage_data').then(res => res.json()).then(data => {
            setMirageData(data);
        });
    }, []);

    // No transition for the navigation on pages
    return (
        <div>
            <Navigation transition={ false }/>

                {/* Content */}
                <div className='container-page'>
                    <div className='container-content'>

                        {/* Summary text */}
                        <Row className='align-items-center mb-5'>
                            <Col md={ 5 } className='text-left'>
                                <h1 className='page-title mb-5'>
                                    Event Forecasting on PredictIt
                                </h1>
                                <p>
                                    <a target="_blank" rel="noreferrer" href="https://www.predictit.org/">PredictIt</a> is an online prediction market
                                    which allows users to buy "yes" or "no" contracts on the outcome of political events.
                                    Before the event occurs, owned contracts can be sold at a profit or a loss.
                                    After the event occurs, the prediction market resolves, and each winning contract receives $1.00.
                                </p>
                                <p>
                                    In February 2019, I created an account and decided to track the performance of my initial $50.00 deposit. 
                                    While my own political opinions often aligned with my bets, I tried to focus on buying undervalued contracts. 
                                    Therefore, the data displayed here are not necessarily a reflection of my personal opinions.
                                </p>
                                <p>
                                    When I started working at Hawkfish in February 2020, I stopped actively trading contracts on PredictIt.
                                </p>
                                <p>
                                    This page uses my last active "account history export"–before the 2020 Iowa Caucus–to display my performance.
                                </p>
                            </Col>
                            <Col md={ 7 } className='text-center'>
                            </Col>
                        </Row>
                    </div>
                </div>

            {/* Close out the page with the footer */}
            <Footer />
        </div>
    );
}

export default PredictIt;
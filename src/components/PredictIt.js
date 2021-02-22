// React
import React, {
    useState,
    useEffect
} from 'react';

// Bootstrap
import { 
    Row, 
    Col,
    Table
} from 'react-bootstrap';

// Graphing
import LineChart from './LineChart.js';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faEquals
} from '@fortawesome/free-solid-svg-icons';

// Import components
import Navigation from './Navigation.js';
import Footer from './Footer.js';

// Import CSS for the page and content
import './css/Page.css';
import './css/PredictIt.css';

// Content for PredictIt
function PredictIt() {
    const [predictItData, setPredictItData] = useState({
        overall: {
            invested: false, 
            cash: false, 
            total: false
        },
        performance_x: false,
        performance_y: false,
        monthly_table: [],
        best: [],
        worst: []
    });

    // Fetch the message from the API and update state
    useEffect(() => {
        fetch('/api/v1/predictit_data').then(res => res.json()).then(data => {
            setPredictItData(data);
        });
        document.title = "Joe Wlos - PredictIt";
    }, []);

    // No transition for the navigation on pages
    return (
        <div>
            <Navigation transition={ false }/>

                {/* Content */}
                <div className='container-page'>
                    <div className='container-content'>

                        {/* Summary text */}
                        <Row className='align-items-center mb-4'>
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
                                    In February 2019, I created an account and decided to track the performance of <b>my initial $50.00 deposit</b>. 
                                    While my own political opinions often aligned with my bets, I tried to focus on buying undervalued contracts. 
                                    Therefore, the data displayed here are not necessarily a reflection of my personal opinions.
                                </p>
                                <p>
                                    When I started working at Hawkfish in February 2020, I stopped actively trading contracts on PredictIt.
                                    This page uses my last active "account history export"–before the 2020 Iowa Caucus–to display my performance.
                                </p>
                            </Col>
                            <Col md={ 7 } className='text-center mt-2'>
                                <div className='ml-5 mr-5'>
                                    <Row className='align-items-center'>
                                        <Col md={ 3 } className='text-center mb-3'>
                                            <p className='overall-title'>Contracts<br />Owned</p>
                                            <p className='overall-number'>${ predictItData.overall.invested }</p>
                                        </Col>
                                        <Col md={ 1 } className='text-center mb-3'>
                                            <FontAwesomeIcon className='overall-symbol' icon={ faPlus } />
                                        </Col>
                                        <Col md={ 3 } className='text-center mb-3'>
                                            <p className='overall-title'>Cash<br />Available</p>
                                            <p className='overall-number'>${ predictItData.overall.cash }</p>
                                        </Col>
                                        <Col md={ 2 } className='text-center mb-3'>
                                            <FontAwesomeIcon className='overall-symbol' icon={ faEquals } />
                                        </Col>
                                        <Col md={ 3 } className='text-center mb-3'>
                                            <p className='overall-title'>Total<br />Portfolio</p>
                                            <p className='overall-number positive'>${ predictItData.overall.total }</p>
                                        </Col>
                                    </Row>
                                    <Row className='align-items-center'>
                                        <Col md={ 12 } className='text-center mt-3'>
                                            <p className='page-subtitle'>
                                                February 2019 to January 2020
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row className='align-items-center'>
                                        <Col md={ 12 } className='text-center'>
                                            <div className='performance-line'>
                                                <LineChart
                                                    x={ predictItData.performance_x }
                                                    y={ predictItData.performance_y }
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>

                        {/* Monthly returns */}
                        <Row className='align-items-center d-none d-md-block'>
                            <Col md={ 12 } className='text-center mb-1'>
                                <p className='page-subtitle'>
                                    Monthly Performance
                                </p>
                            </Col>
                        </Row>
                        <Row className='align-items-center mb-5 d-none d-md-block'>
                            <Col md={ 12 } className='text-center'>
                                <Table bordered className='predictit-table'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            { predictItData.monthly && predictItData.monthly.length > 0 ?
                                                predictItData.monthly.map((object, i) => {
                                                    return (
                                                        <th key={ i }>{ object.Month }</th>
                                                    );
                                                })
                                                : null
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='text-left predictit-column'><b>EoM Value</b></td>
                                            { predictItData.monthly && predictItData.monthly.length > 0 ?
                                                predictItData.monthly.map((object, i) => {
                                                    return (
                                                        <td key={ i } className='value'>${ object.Total.toFixed(2) }</td>
                                                    );
                                                })
                                                : null
                                            }
                                        </tr>
                                        <tr>
                                            <td className='text-left predictit-column'><b>Monthly Return</b></td>
                                            { predictItData.monthly && predictItData.monthly.length > 0 ?
                                                predictItData.monthly.map((object, i) => {
                                                    return (
                                                        <td 
                                                            key={ i }
                                                            className={ object.MonthReturn < 0 ? 'loss' : 'profit' }
                                                        >
                                                            { (object.MonthReturn * 100).toFixed(1) }%
                                                        </td>
                                                    );
                                                })
                                                : null
                                            }
                                        </tr>
                                        <tr>
                                            <td className='text-left predictit-column'><b>Total Return</b></td>
                                            { predictItData.monthly && predictItData.monthly.length > 0 ?
                                                predictItData.monthly.map((object, i) => {
                                                    return (
                                                        <td 
                                                            key={ i }
                                                            className={ object.InceptReturn < 0 ? 'loss' : 'profit' }
                                                        >
                                                            { (object.InceptReturn * 100).toFixed(1) }%
                                                        </td>
                                                    );
                                                })
                                                : null
                                            }
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                        {/* Best and worst trades */}
                        <Row className='align-items-center'>
                            <Col md={ 6 } className='text-center'>
                                <p className='page-subtitle mb-4'>
                                    Best Trades!
                                </p>
                                { predictItData.best && predictItData.best.length > 0 ?
                                    predictItData.best.map((object, i) => {
                                        return (
                                            <Row 
                                                key={ i }
                                                className='align-items-center predictit-market mb-3 mt-3 ml-1 mr-1'
                                            >
                                                <Col md={ 3 }>
                                                    <p className='best-amt mb-0'>+ ${ object.CreditDebit.toFixed(2) }</p>
                                                </Col>
                                                <Col md={ 9 }>
                                                    <Row className='align-items-center text-center'>
                                                        <Col md={ 12 }>
                                                            <a rel="noreferrer" target="_blank" href={ "https://www.predictit.org/markets/detail/" + object.MarketID }>
                                                                <p className='market-link'>{ object.MarketName }</p>
                                                            </a>
                                                        </Col>
                                                        <Col md={ 6 } className='extra-info'>
                                                            <p className='mb-0'>Final Trade</p>
                                                            <p>{ object.DateExecuted.substring(0, 10) }</p>
                                                        </Col>
                                                        <Col md={ 6 } className='extra-info'>
                                                            <p className='mb-0'>Contracts Traded</p>
                                                            <p>{ object.Shares }</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        );
                                    })
                                    : null
                                }
                            </Col>
                            <Col md={ 6 } className='text-center'>
                                <p className='page-subtitle mb-4'>
                                    Worst Trades...
                                </p>
                                { predictItData.worst && predictItData.worst.length > 0 ?
                                    predictItData.worst.map((object, i) => {
                                        return (
                                            <Row 
                                                key={ i }
                                                className='align-items-center predictit-market mb-3 mt-3 ml-1 mr-1'
                                            >
                                                <Col md={ 3 }>
                                                    <p className='worst-amt mb-0'>- ${ (0 - object.CreditDebit).toFixed(2) }</p>
                                                </Col>
                                                <Col md={ 9 }>
                                                    <Row className='align-items-center text-center'>
                                                        <Col md={ 12 }>
                                                            <a rel="noreferrer" target="_blank" href={ "https://www.predictit.org/markets/detail/" + object.MarketID }>
                                                                <p className='market-link'>{ object.MarketName }</p>
                                                            </a>
                                                        </Col>
                                                        <Col md={ 6 } className='extra-info'>
                                                            <p className='mb-0'>Final Trade</p>
                                                            <p>{ object.DateExecuted.substring(0, 10) }</p>
                                                        </Col>
                                                        <Col md={ 6 } className='extra-info'>
                                                            <p className='mb-0'>Contracts Traded</p>
                                                            <p>{ object.Shares }</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        );
                                    })
                                    : null
                                }
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
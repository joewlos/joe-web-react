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

// Twitter
import { TwitterTweetEmbed } from 'react-twitter-embed';

// Graphing
import Sunburst from './Sunburst.js';
import StackedBar from './StackedBar.js';

// Import components
import Navigation from './Navigation.js';
import Footer from './Footer.js';

// Import CSS for the page and content
import './css/Page.css';
import './css/RedMirage.css';

// Import images
import redMirageMap from './images/red_mirage_map.svg';
import cnn from './images/cnn.png';
import usatoday from './images/usatoday.png';
import nymag from './images/newyork.png';
import reuters from './images/reuters.png';
import nyt from './images/nyt.png';
import politico from './images/politico.png';

// Content for Red Mirage
function RedMirage() {
    const [mirageData, setMirageData] = useState(false);

    // Fetch the message from the API and update state
    useEffect(() => {
        fetch('/api/v1/red_mirage_data').then(res => res.json()).then(data => {
            setMirageData(data);
        });
        document.title = "Joe Wlos - Red Mirage";
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
                                    Anticipating the Red Mirage
                                </h1>
                                <p>
                                    As a data scientist at <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/hawkfish/">Hawkfish</a> in 2020,
                                    my team polled Americans on their voting method preferences for the general election.
                                </p>
                                <p>
                                    A record number of voters intended to mail in or drop off their ballots. 
                                    However, many Trump supporters still planned to vote in person.
                                </p>
                                <p>
                                    Because in-person ballots are counted and reported before mail-in ballots in most states, my team anticipated a <b><i>Red Mirage</i></b> on election night.
                                </p>
                                <p>
                                    We endeavored to counter disinformation about vote-by-mail
                                    and preempt Trump's false victory claim through an earned media campaign, which reached millions of Americans.
                                </p>
                            </Col>
                            <Col md={ 7 } className='text-center'>
                                <img src={ redMirageMap } alt="Red Mirage on the Electoral Map" className='red-mirage-map' />
                                <p className='graph-subtitle mt-3'>
                                    On election night, Trump led in swing states where in-person ballots were counted and reported first.
                                    Four days later, after states had tallied mail-in ballots, Biden's victory was apparent.
                                </p>
                            </Col>
                        </Row>

                        {/* Analyzing our data */}
                        <Row className='align-items-center mb-3'>
                            <Col md={ 12 } className='text-left'>
                                <h2 className='page-subtitle'>
                                    Partisanship in Voting Method Selection
                                </h2>
                            </Col>
                        </Row>
                        <Row className='align-items-center'>
                            <Col md={ 5 } className='text-left'>
                                <p>
                                    In the summer before election day, <a href='https://www.linkedin.com/in/ellen-konar-a5a4591/' target="_blank" rel='noreferrer'>Dr. Ellen Konar</a>–Hawkfish's Vice President of Voter Research–and
                                    I began polling likely voters on their preferred voting method: in person or by mail.
                                </p>
                                <p>
                                    7 in 10 Democrats perceived a moderate or high risk of coronavirus transmission at polling places.
                                    8 in 10 Republicans believed the transmission risk was low.
                                </p>
                                <p>
                                    Voters intended to act in accordance with their risk assessments.
                                    Nationally, over half of Biden's supporters planned to mail in or drop off their ballots,
                                    and three quarters of Trump's supporters planned to vote in person at their polling places.
                                </p>
                            </Col>
                            <Col md={ 7 } className='text-center'>
                                <h1 className='graph-title mb-4 mt-3'>
                                    Which voting method will you use to<br />cast your ballot in the general election?
                                </h1>
                                <div className='sunburst-fill'>
                                    <Sunburst
                                        data={ mirageData.vbm_sunburst }
                                    />
                                </div>
                                <p className='graph-subtitle mt-3'>
                                    Source: Hawkfish Polling | July 1, 2020 - August 16, 2020 | n = 17,263 Likely Voters
                                </p>
                            </Col>
                        </Row>

                        {/* Recognizing the pattern */}
                        <Row className='align-items-center mt-5 mb-4'>
                            <Col md={ 12 } className='text-left'>
                                <h2 className='page-subtitle'>
                                    Ballot Counting Delays
                                </h2>
                            </Col>
                        </Row>
                        <Row className='align-items-center mb-4'>
                            <Col md={ 12 } className='text-left'>
                                <p>
                                    In 2020, vote-by-mail was a well-established, universal voting method in some western states.
                                    However, during the primaries, the pandemic strained the mail-in ballot counting infrastructure in swing states like Pennsylvania and Georgia.
                                    The reporting of their results was significantly delayed.                                   
                                </p>
                                <p>
                                    Using Hawkfish's survey data, we calculated state-specific estimates of candidate choice for each voting method.
                                    Because Trump's support was concentrated amongst in-person voters, swing states would need to count a very large
                                    percentage of mail-in ballots before Biden's lead became evident.
                                </p>
                                <p>
                                    Given onerous regulations for the verification and counting of mail-in ballots,
                                    these swing states were not optimistic they would be able to quickly declare the winner of their elections.
                                </p>
                            </Col>
                        </Row>
                        <Row className='align-items-center mb-5 d-none d-md-block'>
                            <Col md={ 12 } className='text-center'>
                                <Table bordered className='red-mirage-table'>
                                    <thead>
                                        <tr>
                                            <th rowSpan='2'>State</th>
                                            <th rowSpan='2'>Description</th>
                                            <th colSpan='2'>FiveThirtyEight Polling Avg (9/23)</th>
                                            <th colSpan='2'>Supporters Intending to Mail-In or Drop-Off Ballot</th>
                                            <th colSpan='2'>Reported Results after In-Person Ballots Counted</th>
                                            <th rowSpan='2'>Percent of Mail-In Ballots for Biden to Lead</th>
                                        </tr>
                                        <tr>
                                            <th>Biden</th>
                                            <th>Trump</th>
                                            <th>Biden</th>
                                            <th>Trump</th>
                                            <th>Biden</th>
                                            <th>Trump</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>Minnesota</b></td>
                                            <td>No "instant gratification" on election night - <a href='https://www.sctimes.com/story/news/local/2020/10/22/voter-fraud-mn-stearns-county-absentee-ballots/3680419001/' target='_blank' rel="noreferrer">SoS</a></td>
                                            <td>51%</td>
                                            <td>42%</td>
                                            <td>49%</td>
                                            <td>17%</td>
                                            <td>43%</td>
                                            <td>57%</td>
                                            <td className='red-1'><b>50%</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Michigan</b></td>
                                            <td>Doesn't expect full results until 11/06 - <a href='https://www.freep.com/story/news/politics/elections/2020/10/16/absentee-ballots-michigan-counting-processing/3680090001/' target='_blank' rel="noreferrer">SoS</a></td>
                                            <td>50%</td>
                                            <td>42%</td>
                                            <td>70%</td>
                                            <td>29%</td>
                                            <td>33%</td>
                                            <td>67%</td>
                                            <td className='red-2'><b>69%</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Nevada</b></td>
                                            <td>Advising patience - <a href='https://www.kunr.org/post/unsubstantiated-fraud-claims-could-delay-nevada-vote-count-adding-election-day-uncertainty#stream/0' target='_blank' rel="noreferrer">University of Nevada</a></td>
                                            <td>47%</td>
                                            <td>41%</td>
                                            <td>55%</td>
                                            <td>21%</td>
                                            <td>39%</td>
                                            <td>61%</td>
                                            <td className='red-2'><b>70%</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Wisconsin</b></td>
                                            <td>Milwaukee not expected until 11/04 - <a href='https://madison.com/wsj/news/local/govt-and-politics/wisconsin-officials-worried-about-confusion-from-vote-count/article_f0067a56-6ce2-50e5-9fda-7a217c5cd61d.html' target='_blank' rel="noreferrer">Election Commission</a></td>
                                            <td>50%</td>
                                            <td>44%</td>
                                            <td>61%</td>
                                            <td>20%</td>
                                            <td>36%</td>
                                            <td>64%</td>
                                            <td className='red-2'><b>71%</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Pennsylvania</b></td>
                                            <td>Overwhelming majority of ballots by 11/06 - <a href='https://www.inquirer.com/politics/election/spl/pa-kathy-boockvar-precanvassing-republicans-gov-tom-wolf-20201019.html?cid=Philly.com+Twitter&utm_campaign=Philly.com+Twitter+Account&utm_medium=social&utm_source=t.co' target='_blank' rel="noreferrer">SoC</a></td>
                                            <td>50%</td>
                                            <td>45%</td>
                                            <td>55%</td>
                                            <td>6%</td>
                                            <td>35%</td>
                                            <td>65%</td>
                                            <td className='red-3'><b>83%</b></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <p className='graph-subtitle mt-4'>
                                    Source: Hawkfish Polling | September 9, 2020 - September 14, 2020 | n = 9,771 Likely Voters
                                </p>
                            </Col>
                        </Row>
                        <Row className='align-items-center mt-5 d-block d-md-none'>
                            <Col md={ 12 } className='text-left'>
                                <h2 className='page-subtitle'>
                                    The Red Mirage
                                </h2>
                            </Col>
                        </Row>
                        <Row className='align-items-center mt-4 mb-2'>
                            <Col md={ 12 } className='text-left'>
                                <p>
                                    The potential size of Trump's lead on election night exceeded the "<a target="_blank" rel="noreferrer" href="https://www.theatlantic.com/ideas/archive/2020/08/brace-blue-shift/615097/">blue shift</a>" phenomenon,
                                    first observed by OSU Professor Edward B. Foley in 2012 and attributed to provisional–rather than mail-in–ballots.
                                </p>
                                <p>
                                    To more effectively communicate this unique dynamic, Dr. Konar and I searched for a metaphor to illustrate the illusory nature of Trump's lead.
                                </p>
                                <p>
                                    <b>We named this scenario the <i>Red Mirage</i></b>, and we worked to quantify and describe its effects.
                                </p>
                            </Col>
                        </Row>

                        {/* Trump's threat */}
                        <Row className='align-items-center mt-5 mb-4'>
                            <Col md={ 12 } className='text-left'>
                                <h2 className='page-subtitle'>
                                    Defusing Trump's Threat
                                </h2>
                            </Col>
                        </Row>
                        <Row className='align-items-center'>
                            <Col md={ 5 } className='text-left'>
                                <p>
                                    For months, Trump had falsely questioned the safety and security of mail-in ballots.
                                    Over half of his supporters were susceptible to this disinformation and expected fraudulent mail-in ballots.
                                </p>
                                <p>
                                    As election day approached, Trump escalated his rhetoric and planned to leverage his lead on election night to <a target="_blank" rel="noreferrer" href="https://www.axios.com/trump-claim-election-victory-ballots-97eb12b9-5e35-402f-9ea3-0ccfb47f613f.html">prematurely declare victory</a>.
                                </p>
                                <p>
                                    In our surveys, <b><i>Red Mirage</i></b> messaging out-performed standard descriptions of mail-in ballot counting timelines.
                                    We determined an earned media campaign–featuring our scenarios and data visualizations–would 
                                    help innoculate the public against disinformation, alert the media, and defuse Trump's threat to American democracy.
                                </p>
                            </Col>
                            <Col md={ 7 } className='text-center'>
                                <h2 className='graph-title mb-5 mt-2'>
                                    What is the likelihood of substantial mail-in ballot fraud?
                                </h2>
                                <div className='stack-fill'>
                                    <StackedBar
                                        data={ mirageData.fraud_stacked }
                                        x={ true }
                                    />
                                </div>
                                <p className='graph-subtitle mt-5'>
                                    Source: Hawkfish Polling | September 9, 2020 - September 14, 2020<br />n = 9,771 Likely Voters
                                </p>
                            </Col>
                        </Row>

                        {/* Press campaign */}
                        <Row className='align-items-center mt-5 mb-4'>
                            <Col md={ 12 } className='text-left'>
                                <h2 className='page-subtitle'>
                                    Alerting the Press
                                </h2>
                            </Col>
                        </Row>
                        <Row className='align-items-center'>
                            <Col md={ 12 } className='text-left'>
                                <p>
                                    After building a custom web application to calculate election night scenarios,
                                    Dr. Konar and I began <a rel="noreferrer" target="_blank" href="https://www.scribd.com/document/474743229/Red-Mirage-memo">selectively briefing</a> Democratic Party decision makers, state leaders, the press, and election night analysts
                                    about the likelihood of the <b><i>Red Mirage</i></b>.
                                </p>
                                <p>
                                    In late August, <i>Axios on HBO</i> featured Hawkfish's CEO <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/joshmendelsohn">Josh Mendelsohn</a>,
                                    who explained our analysis, spurring reports on the safety and security of vote-by-mail
                                    and investigations into states' preparedness to process mail-in ballots.
                                </p>
                            </Col>
                        </Row>
                        <Row className='align-items-center mt-4'>
                            <Col md={ 5 } className='text-center mb-1'>
                                <iframe title="Hawkfish on Axios" className='axios-video' src="https://www.youtube.com/embed/C74GXN2fock" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </Col>
                            <Col md={ 7 } className='text-center press-section mt-3'>
                                <div className='press-number'>
                                    <p>
                                        <b> With over 2,000 press mentions,<br />the <i>Red Mirage</i> featured prominently in election reporting.</b> 
                                    </p>
                                </div>
                                <div className='press-clip'>
                                    <a target="_blank" rel="noreferrer" href="https://www.cnn.com/2020/09/01/politics/2020-election-count-red-mirage-blue-shift/index.html">
                                        <img src={ cnn } alt="Link to Red Mirage on CNN" className='press-logo-h' />
                                    </a>
                                </div>
                                <div className='press-clip'>
                                    <a target="_blank" rel="noreferrer" href="https://www.nytimes.com/2020/09/02/us/politics/voting-election-day.html">
                                        <img src={ nyt } alt="Link to Red Mirage on NYT" className='press-logo-v' />
                                    </a>
                                </div>
                                <div className='press-clip'>
                                    <a target="_blank" rel="noreferrer" href="https://www.politico.com/news/2020/09/03/pennsylvania-democrats-election-day-408147">
                                        <img src={ politico } alt="Link to Red Mirage on Politico" className='press-logo-v' />
                                    </a>
                                </div>                                
                                <div className='press-clip'>
                                    <a target="_blank" rel="noreferrer" href="https://www.reuters.com/article/us-usa-election-mirage-explainer/explainer-red-mirage-blue-mirage-beware-of-early-u-s-election-wins-idUSKBN2771CL">
                                        <img src={ reuters } alt="Link to Red Mirage on Reuters" className='press-logo-v' />
                                    </a>
                                </div>
                                <div className='press-clip'>
                                    <a target="_blank" rel="noreferrer" href="https://nymag.com/intelligencer/2020/09/trump-could-have-election-night-lead-due-to-mail-in-voting.html">
                                        <img src={ nymag } alt="Link to Red Mirage on New York Magazine" className='press-logo-v' />
                                    </a>
                                </div>
                                <div className='press-clip'>
                                    <a target="_blank" rel="noreferrer" href="https://www.usatoday.com/story/news/politics/elections/2020/09/03/vote-mail-absentee-strategy-could-hurt-democrats-election-day/5633132002/">
                                        <img src={ usatoday } alt="Link to Red Mirage on USA Today" className='press-logo-h' />
                                    </a>
                                </div>
                            </Col>
                        </Row>

                        {/* Engaging the public */}
                        <Row className='align-items-center mt-5 mb-4'>
                            <Col md={ 12 } className='text-left'>
                                <h2 className='page-subtitle'>
                                    Engaging the Public
                                </h2>
                            </Col>
                        </Row>
                        <Row className='align-items-center'>
                            <Col md={ 12 } className='text-left'>
                                <p>
                                    On social media, public figures, celebrities, and influencers amplified the <b><i>Red Mirage</i></b> narrative,
                                    informing Americans about mail-in ballot counting timelines. After the polls closed on election night, they encouraged their followers
                                    to disregard false victory claims and patiently wait for states to count every vote.
                                </p>
                                <p className='text-center mt-4'>
                                    <b>Twitter users mentioned the <i>Red Mirage</i> over 200,000 times, including tweets from over 2,000 verified accounts.</b>
                                </p>
                            </Col>
                        </Row>
                        <Row className='align-items-stretch'>
                            <Col md={ 4 } className='align-items-stretch'>
                                <TwitterTweetEmbed
                                    tweetId={'1321647861780676609'}
                                />
                                <TwitterTweetEmbed
                                    tweetId={'1323849637510434816'}
                                />
                            </Col>
                            <Col md={ 4 } className='align-items-stretch'>
                                <TwitterTweetEmbed
                                    tweetId={'1323854303447175168'}
                                />
                                <TwitterTweetEmbed
                                    tweetId={'1323837243589595137'}
                                />
                            </Col>
                            <Col md={ 4 } className='align-items-stretch'>
                                <TwitterTweetEmbed
                                    tweetId={'1323842528232329217'}
                                />
                                <TwitterTweetEmbed
                                    tweetId={'1324499382452985857'}
                                />
                            </Col>
                        </Row>

                        {/* Our Impact */}
                        <Row className='align-items-center mt-5 mb-4'>
                            <Col md={ 12 } className='text-left'>
                                <h2 className='page-subtitle'>
                                    Our Impact
                                </h2>
                            </Col>
                        </Row>
                        <Row className='align-items-center'>
                            <Col md={ 5 } className='text-left'>
                                <p>
                                    By October, a plurality of Americans correctly expected to 
                                    learn the results of the presidential election in the week 
                                    following election day.
                                </p>
                                <p>
                                    As we anticipated, Trump falsely declared victory on election night,
                                    but this initial attempt to subvert the will of the American people failed.
                                </p>
                                <p>
                                    Biden eventually won Arizona, Georgia, Michigan, Nevada, Pennsylvania, and Wisconsin
                                    after significant delays in the counting of their mail-in ballots.
                                </p>
                                <p>
                                    I remain proud our forewarning of and forearming for the <b><i>Red Mirage</i></b> played
                                    a role in that successful defense of America's democracy.
                                </p>
                            </Col>
                            <Col md={ 7 } className='text-center'>
                                <h2 className='graph-title mb-5 mt-2'>
                                    When do you expect to know the results of the presidential election?
                                </h2>
                                <div className='stack-fill'>
                                    <StackedBar
                                        data={ mirageData.expect_stacked }
                                    />
                                </div>
                                <p className='graph-subtitle mt-5'>
                                    Source: Hawkfish Polling | October 15, 2020 - October 22, 2020<br />n = 13,738 Likely Voters
                                </p>
                            </Col>
                        </Row>
                    </div>
                </div>

            {/* Close out the page with the footer */}
            <Footer />
        </div>
    );
}

export default RedMirage;
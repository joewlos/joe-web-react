// React
import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

// Import CSS for the application
import './css/App.css';

// Import components
import Home from './Home.js';
import NotFound from './404.js';
import RedMirage from './RedMirage.js';
import PredictIt from './PredictIt.js';
import About from './About.js';

// Route to the components
function App() {
  return (
    <main>
      <Switch>
        <Route path='/' component={ Home } exact />
        <Route path='/red-mirage' component={ RedMirage } exact />
        <Route path='/predictit' component={ PredictIt } exact />
        <Route path='/about' component={ About } exact />
        <Route component={ NotFound } exact />
      </Switch>
    </main>
  );
}

// Export the application for import in index
export default App;

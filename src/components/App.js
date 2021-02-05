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

// Route to the components
function App() {
  return (
    <main>
      <Switch>
        <Route path='/' component={ Home } exact />
        <Route component={ NotFound } exact />
      </Switch>
    </main>
  );
}

// Export the application for import in index
export default App;

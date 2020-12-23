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

// Route to the components
function App() {
  return (
    <main>
      <Switch>
        <Route path='/' component={ Home } exact />
      </Switch>
    </main>
  );
}

// Export the application for import in index
export default App;

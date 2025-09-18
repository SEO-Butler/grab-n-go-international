import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import './App.css';
import { ErrorBoundaryRoutes } from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundaryRoutes>
        <div className="App">
          <LandingPage />
        </div>
      </ErrorBoundaryRoutes>
    </Router>
  );
}

export default App;

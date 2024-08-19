import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDashboard from './pages/EventDashbord';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Switch>
        <Route path="/login" render={() => <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" component={Register} />
        <Route
          path="/dashboard"
          render={() => isAuthenticated ? <EventDashboard /> : <Redirect to="/login" />}
        />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
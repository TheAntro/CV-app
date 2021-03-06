import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Cv from './components/Cv';
import Profile from './components/Profile';

import './App.css';

const App = () => 
<Provider store={store}>
  <Router>
    <Fragment>
      <Cv />
      <Route exact path="/:id" component={Profile} />
    </Fragment>
  </Router>
</Provider>


export default App;

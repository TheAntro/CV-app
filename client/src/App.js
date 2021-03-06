import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Cv from './components/cv/Cv';

import './App.css';

const App = () => 
<Provider store={store}>
  <Router>
    <Fragment>
      <Route exact path="/:id" component={Cv} />
    </Fragment>
  </Router>
</Provider>


export default App;

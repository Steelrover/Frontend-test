import React, { Component }  from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from './components/Header/Header.js';
import MainPage from './components/Containers/MainPage.js';
import NewsPage from './components/Containers/NewsPage.js';

import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header/>

            <Switch>

              <Route exact path="/">
                <Redirect to="/main/all"/>
              </Route>

              <Route
                path="/main/:marker"
                render = { ({ match }) => <MainPage match = {match} /> }
              />

              <Route path="/news/:id"
                render = { ({ match }) => <NewsPage id = {match.params.id} /> }
              />

            </Switch>

          </div>
        </div>
      </Router>
    )
  }
}

export default App;

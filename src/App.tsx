import React from 'react';
import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/Footer';
import { Grid } from '@material-ui/core';
import Home from './paginas/home/Home';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* Instalar o React Router:
  yarn add react-router-dom@5.3.0
  yarn add @types/react-router-dom@5.1.8
*/

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Switch>
          <div>
            <Route path='/home'>
              <Home />
            </Route>
          </div>
        </Switch>
      <Footer />
    </Router>
    </>
  );
}

export default App;

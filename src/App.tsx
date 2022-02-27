import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/Footer';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import './App.css';
import ListaPostagem from './components/postagens/listapostagem/ListaPostagem';
import ListaTema from './components/temas/listatema/ListaTema';
import ListaPostagemTitulo from './components/postagens/listapostagemtitulo/ListaPostagemTitulo';
import ListaTemaDescricao from './components/temas/listatemadescricao/ListaTemaDescricao';


function App() {
  return (
    <Router>
      <Navbar />
        <Switch>
          <div style={{minHeight: '100vh'}}>

            <Route exact path='/'>
              <Login />
            </Route>

            <Route path='/login'>
              <Login />
            </Route>

            <Route path='/home'>
              <Home />
            </Route>

            <Route path='/cadastrousuario'>
              <CadastroUsuario />
            </Route>

            <Route path='/temas'>
              <ListaTema />
            </Route>
            
            <Route path='/postagens'>
              <ListaPostagem />
            </Route>

            <Route path='/titulo'>
              <ListaPostagemTitulo />
            </Route>

            <Route path='/descricao'>
              <ListaTemaDescricao />
            </Route>

          </div>
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;
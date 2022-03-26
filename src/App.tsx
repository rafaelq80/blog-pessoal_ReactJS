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
import CadastroPostagem from './components/postagens/cadastroPostagem/CadastroPostagem';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import ListaUsuarios from './components/usuarios/listausuarios/ListaUsuarios';
import AtualizarUsuario from './components/usuarios/atualizarUsuario/AtualizarUsuario';
import { Provider } from 'react-redux';
import store from './store/store';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <Navbar />
        <Switch>
          <div style={{ minHeight: '100vh' }}>

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

            <Route exact path='/formularioPostagem'>
              <CadastroPostagem />
            </Route>
            <Route exact path='/formularioPostagem/:id'>
              <CadastroPostagem />
            </Route>
            <Route exact path='/formularioTema'>
              <CadastroTema />
            </Route>
            <Route exact path='/formularioTema/:id'>
              <CadastroTema />
            </Route>
            <Route path='/deletarPostagem/:id'>
              <DeletarPostagem />
            </Route>
            <Route path='/deletarTema/:id'>
              <DeletarTema />
            </Route>

            <Route path='/usuarios'>
              <ListaUsuarios />
            </Route>

            <Route exact path='/atualizausuario/:id'>
              <AtualizarUsuario />
            </Route>

          </div>
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
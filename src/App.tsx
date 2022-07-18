import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <Navbar />

        <div style={{ minHeight: '100vh' }}>

          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastrousuario" element={<CadastroUsuario />} />
            <Route path="/temas" element={<ListaTema />} />
            <Route path="/postagens" element={<ListaPostagem />} />
            <Route path="/titulo" element={<ListaPostagemTitulo />} />
            <Route path="/descricao" element={<ListaTemaDescricao />} />
            <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
            <Route path="/formularioPostagem" element={<CadastroPostagem />} />
            <Route path="/formularioPostagem/:id" element={<CadastroPostagem />} />
            <Route path="/deletarTema/:id" element={<DeletarTema />} />
            <Route path="/formularioTema" element={<CadastroTema />} />
            <Route path="/formularioTema/:id" element={<CadastroTema />} />
            <Route path="/usuarios" element={<ListaUsuarios />} />
            <Route path="/atualizausuario/:id" element={<AtualizarUsuario />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home" element={<Home />} />

          </Routes>

        </div>

        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
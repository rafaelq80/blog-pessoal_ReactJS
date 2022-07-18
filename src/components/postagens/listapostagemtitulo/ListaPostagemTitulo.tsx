import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@material-ui/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './ListaPostagemTitulo.css';

function ListaPostagemTitulo() {

  const [posts, setPosts] = useState<Postagem[]>([])
  const [titulo, setTitulo] = useState<string>("")

  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token === "") {
      toast.error('Você precisa estar logado', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      navigate("/login")

    }
  }, [token])

  async function getPost() {
    await busca(`/postagens/titulo/${titulo}`, setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getPost()

  }, [posts.length, getPost])

  function updateTitulo(e: ChangeEvent<HTMLInputElement>) {

    setTitulo(
      e.target.value
    )

  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    getPost();
  }

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <Box display="flex" justifyContent="center" marginTop={2} marginBottom={2} width="100%">
          <TextField
            label="Título"
            id="titulo"
            value={titulo}
            variant="outlined"
            className="input"
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateTitulo(e)}
          />

        </Box>
      </form>

      {
        posts.map(post => (
          <Box m={2} >
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Postagens
                </Typography>
                <Typography variant="h5" component="h2">
                  {post.titulo}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.texto}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.tema?.descricao}
                </Typography>

                {/* Add esse campo para mostrar o nome do User que criou a Postagem  */}
                <Typography variant="body2" component="p">
                  {post.usuario?.nome}
                </Typography>

              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>

                  <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                    <Box mx={1}>
                      <Button variant="contained" className="marginLeft" size='small' color="primary" >
                        atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" size='small' color="secondary">
                        deletar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>
        ))
      }
    </>
  );
}

export default ListaPostagemTitulo
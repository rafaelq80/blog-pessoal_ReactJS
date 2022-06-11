import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@material-ui/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Tema from '../../../models/Tema';
import { busca } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './ListaTemaDescricao.css';

function ListaPostagemDescricao() {

  const [temas, setTemas] = useState<Tema[]>([])
  //const [token, setToken] = useLocalStorage('token');
  let history = useHistory();
  const [descricao, setDescricao] = useState<string>("")

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token === "") {
      //alert("Você precisa estar logado")
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
      history.push("/login")

    }
  }, [token, history])

  async function getTema() {
    await busca(`/temas/descricao/${descricao}`, setTemas, {
      headers: {
        'Authorization': token
      }
      
    })
  
  }


  useEffect(() => {

    getTema()

  }, [temas.length, getTema])

  function updateDescricao(e: ChangeEvent<HTMLInputElement>) {

    setDescricao(
      e.target.value
    )
     
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    getTema();
  }

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <Box display="flex" justifyContent="center" marginTop={2} marginBottom={2} width="100%">
          <TextField
            label="Descrição"
            id="descricao"
            value={descricao}
            variant="outlined"
            className="input"
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateDescricao(e)}
          />
     
        </Box>
      </form>

      {
        temas.map(tema => (
          <Box m={2} >
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Tema
                </Typography>
                <Typography variant="h5" component="h2">
                  {tema.descricao}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5} >

                  <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" className="marginLeft" size='small' color="primary" >
                        atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
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

export default ListaPostagemDescricao
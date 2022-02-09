import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography, TextField, Grid } from '@material-ui/core';
import './ListaPostagemTitulo.css';

function ListaPostagem() {

  return (

    <Grid container direction='row' justifyContent='center' alignItems='center'>

      <Grid item xs={12} direction='row' justifyContent='center' alignItems='center' style={{ display: "flex" }}>
        <form action="" style={{ display: "flex" }}>
          <TextField
            id="titulo"
            variant="outlined"
            label="Título"
            size="small"
            fullWidth
            style={{ marginRight: "5px" }}
          />
          <Button className="botao"
            variant="contained"
            type="submit"
            color="primary"
            size="large">
            Pesquisar
          </Button>
        </form>
      </Grid>

        <Box m={2} >
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Postagens
              </Typography>
              <Typography variant="h5" component="h2">
                Título
              </Typography>
              <Typography variant="body2" component="p">
                Texto da Postagem
              </Typography>
              <Typography variant="body2" component="p">
                Tema
              </Typography>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5}>

                <Link to="" className="text-decorator-none" >
                  <Box mx={1}>
                    <Button variant="contained" className="marginLeft" size='small' color="primary" >
                      atualizar
                    </Button>
                  </Box>
                </Link>
                <Link to="" className="text-decorator-none">
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
    

    </Grid>
  );

}

export default ListaPostagem;
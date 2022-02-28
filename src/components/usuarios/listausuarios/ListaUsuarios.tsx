import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaUsuarios.css';
import useLocalStorage from 'react-use-localstorage';
import { useHistory } from 'react-router-dom';
import { busca } from '../../../services/Service';
import Usuario from '../../../models/Usuario';

function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [token, setToken] = useLocalStorage('token');
    let history = useHistory();

    useEffect(() => {
        if (token === '') {
            alert("Você precisa estar logado")
            history.push("/login")
        }
    }, [token])


    async function getUsuario() {
        await busca("/usuarios/all", setUsuarios, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        getUsuario()
    }, [usuarios.length])
    
    return (
        <>
            {
                usuarios.map(usuario => (
                    <Box m={2} >
                        <Card variant="outlined">
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Usuario
                                    <Typography variant="h5" component="h2">
                                        <img src={usuario.foto} alt="" width="50px" height="50px" />
                                    </Typography>
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {usuario.nome}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {usuario.usuario}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Box display="flex" justifyContent="center" mb={1.5} >

                                    <Link to={`/cadastrousuario/${usuario.id}`} className="text-decorator-none">
                                        <Box mx={1}>
                                            <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                                atualizar
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

export default ListaUsuarios;
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Usuario from '../../../models/Usuario';
import { busca } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './ListaUsuarios.css';

function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([])

    let navigate = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(() => {
        if (token === '') {
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


    async function getUsuario() {
        await busca("/usuarios/all", setUsuarios, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        getUsuario()
    }, [usuarios.length, getUsuario])

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

                                    <Link to={`/atualizausuario/${usuario.id}`} className="text-decorator-none">
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
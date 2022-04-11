import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserLogin from '../../models/UserLogin';
import { login } from '../../services/Service';
import { addToken } from '../../store/tokens/actions';
import './Login.css';

// Instalar useLocalStorage -> yarn add react-use-localstorage@3.5.3

function Login() {

    /**
     * Armazena o histórico de navegação
     */
    let history = useHistory();

    const dispatch = useDispatch()
    /**
     * Local Storage armazena o Token
     */
    //const [token, setToken] = useLocalStorage('token');

    const [token, setToken] = useState('');
    /**
     * Inicializa o Objeto UserLogin e atualiza o valor
     */
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        }
    )

    /**
     * 
     * @param e -> Captura os valores do input e insere na função setUserLogin
     */
    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    /**
     * Redireciona para a Home se o Token estiver vazio,
     * ou seja, não fez o login 
     * 
     */
    useEffect(() => {
        if (token !== '') {
            dispatch(addToken(token));
            history.push('/home')
        }
    }, [token, history, dispatch])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault(); //Previne o comportamento padrão do formulário (Atualizar a página)

        try {
            await login(`/usuarios/logar`, userLogin, setToken); //Chama a função login e armazena o Token no Local Storage

            //alert('Usuário logado com sucesso!');

            toast.success('Usuário logado com sucesso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });

        } catch (error) {
            //alert('Dados do usuário inconsistentes. Erro ao logar!');

            toast.error('Dados do usuário inconsistentes. Erro ao logar!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography>
                        <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='primary'>
                                Logar
                            </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastrousuario'>
                            <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className='imagem'>

            </Grid>
        </Grid>
    );
}

export default Login;
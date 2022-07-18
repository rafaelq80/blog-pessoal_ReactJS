import { Button, Container, TextField, Typography } from "@material-ui/core";
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Usuario from '../../../models/Usuario';
import { buscaId, put } from '../../../services/Service';
import { TokenState } from "../../../store/tokens/tokensReducer";
import './AtualizarUsuario.css';

function AtualizarUsuario() {
    
    const { id } = useParams<{ id: string }>();

    let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    const [confirmarSenha, setConfirmarSenha] = useState<String>("")

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

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/usuarios/${id}`, setUsuario, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedUsuario(e: ChangeEvent<HTMLInputElement>) {

        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        })

    }

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("usuário " + JSON.stringify(usuario))

        if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
            if (id !== undefined) {
                console.log(usuario)
                put(`/usuarios/atualizar`, usuario, setUsuario, {
                    headers: {
                        'Authorization': token
                    }
                })
                toast.success('Usuario atualizado com sucesso', {
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
        } else {
            toast.error('Dados inconsistentes. Favor verificar as informações de cadastro.', {
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

        back()

    }

    function back() {
        navigate('/usuarios')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de atualização usuário</Typography>
                <TextField value={usuario.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedUsuario(e)} id="nome" label="nome" variant="outlined" name="nome" margin="normal" fullWidth />
                <TextField value={usuario.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedUsuario(e)} id="usuario" label="usuario" variant="outlined" name="usuario" margin="normal" fullWidth />
                <TextField value={usuario.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedUsuario(e)} id="senha" label="senha" variant="outlined" name="senha" margin="normal" type='password' fullWidth />
                <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' label='confirmarSenha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                <TextField value={usuario.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedUsuario(e)} id="foto" label="foto" variant="outlined" name="foto" margin="normal" fullWidth />
                <Link to='/usuarios' className='text-decorator-none'>
                    <Button variant='contained' color='secondary' className='btnCancelar'>
                        Cancelar
                    </Button>
                </Link>
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default AtualizarUsuario;
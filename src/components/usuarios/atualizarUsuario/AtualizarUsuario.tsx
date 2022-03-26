import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import {useHistory, useParams } from 'react-router-dom'
import './AtualizarUsuario.css';
import useLocalStorage from 'react-use-localstorage';
import { buscaId, put } from '../../../services/Service';
import Usuario from '../../../models/Usuario';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';


function AtualizarUsuario() {
    let history = useHistory();
    const { id } = useParams<{id: string}>();
    //const [token, setToken] = useLocalStorage('token');
    
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

    const [confirmarSenha,setConfirmarSenha] = useState<String>("")

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado")
            history.push("/login")
    
        }
    }, [token])

    useEffect(() =>{
        if(id !== undefined){
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

        function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
            setConfirmarSenha(e.target.value)
        }
       
        async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
            e.preventDefault()
            console.log("usuário " + JSON.stringify(usuario))
            
            if(confirmarSenha === usuario.senha){
                if (id !== undefined) {
                    console.log(usuario)
                    put(`/usuarios/atualizar`, usuario, setUsuario, {
                        headers: {
                            'Authorization': token
                        }
                    })
                    alert('Usuário atualizado com sucesso!');
                }
            }else{
                alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
            }
            
            back()
    
        }
    
        function back() {
            history.push('/usuarios')
        }
  
        
    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de atualização usuário</Typography>
                <TextField value={usuario.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedUsuario(e)} id="nome" label="nome" variant="outlined" name="nome" margin="normal" fullWidth />
                <TextField value={usuario.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedUsuario(e)} id="usuario" label="usuario" variant="outlined" name="usuario" margin="normal" fullWidth />
                <TextField value={usuario.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedUsuario(e)} id="senha" label="senha" variant="outlined" name="senha" margin="normal" type='password' fullWidth />
                <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}id='confirmarSenha' label='confirmarSenha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                <TextField value={usuario.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedUsuario(e)} id="foto" label="foto" variant="outlined" name="foto" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default AtualizarUsuario;
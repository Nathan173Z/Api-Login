import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import api from "../../services/api";
import { Context } from "../../Context/AuthContext";
import { Table, Container, Button, Alert } from 'react-bootstrap';
import { NavBar } from '../../components/UI/NavBar/NavBar'
import './styles.css'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const ListaCategorias = () =>{
    const { authenticated, handleLogout} = useContext(Context);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type:'',
        mensagem:'',
        loading: true
    });

    const confirmDelete = (categories) => {   
            confirmAlert({
              title: "Deseja continuar",
              message:
                " Deseja excluir essa categoria " +
                categories.name + 
                "?",
              buttons: [
                {
                  label: "Sim",
                  onClick: () => handleDelete(categories.id)
                },
                {
                  label: "Não",
                  onClick: () => getCategories()
                }
              ]
            });
          };
        


    const handleDelete = async (idCategories) =>{
        const headers = {
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token')

            },
        }

        await api.delete("/categories/delete/"+idCategories, headers)
        .then((response) =>{
            setStatus({
                type:'success',
                mensagem: response.data.mensagem,
                loading:true
            })
            getCategories();

        }).catch((err) =>{
            if(err.response){
                setStatus({
                    type:'error',
                    mensagem: err.response.data.mensagem
                })
            } else {
                setStatus({
                    type:'error',
                    mensagem: 'Erro: Tente mais tarde'
                })
            }
        })
    }

    const getCategories = async () =>{

        const headers = {
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token')

            },
        }   
        
        await api.get("/categories/all", headers)
        .then((response) =>{
            setData(response.data.categories);
            setStatus({loading:false})
        }).catch((err) =>{
            if(err.response){
                setStatus({
                    type:'error',
                    mensagem: err.response.data.mensagem
                })
            } else {
                setStatus({
                    type:'error',
                    mensagem: 'Erro: Tente mais tarde!'
                })
            }
        })
    }

    useEffect( () =>{
        getCategories();
    }, [])


    return(
        <>
            <NavBar />                    
            <Container>
            {status.loading ? <Alert variant="warning">Carregando...</Alert> : ""}
            <div className="btnNovo">
            <h1>Categorias</h1>
            <Button variant="outline-success">
                <Link className="noLink" to="/categorias/novo">Novo Categoria</Link>
            </Button>
            </div>
            <Table striped bordered hover>  
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Descrição</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {(!status.loading &&
                data.map(categories =>(
                    <tr key={categories.id}>
                        <td>{categories.id}</td>
                        <td>{categories.name}</td>
                        <td>{categories.description}</td>
                        <td className="spaceFlex">
                        <Button variant="outline-warning">
                            <Link className="noLink " to={"/categories/editar/"+categories.id}>Editar</Link>
                        </Button>
                        <Button variant="outline-danger" onClick={() => confirmDelete(categories)}>
                            Excluir
                        </Button>
                        </td>
                    </tr>
                ))

            )}
            </tbody>
            </Table>            
        </Container>
        </>
    )
}





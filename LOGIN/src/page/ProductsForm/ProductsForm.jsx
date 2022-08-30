import React, { useState, useEffect } from "react";
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { NavBar } from '../../components/UI/NavBar/NavBar'

const initialValue = {
    name: '',
    quantity: '',
    price: '',
    description: ''
}

export const ProductsForm = (props) => {

    const history = useHistory();
    const [categories, setData] = useState ([])
    const [id] = useState(props.match.params.id);
    const [values, setValues] = useState(initialValue);
    const [acao, setAcao] = useState('Novos');
    const [status, setStatus] = useState({
        type: '',
        mensagem: '',
        loading: false
    })

    

    const valorInput = e => setValues({
        ...values,
        [e.target.name]: e.target.value
    })

    const FormSelect = e => setValues({
        ...values,
        [e.target.name]: e.target.value
    })

    useEffect(() => {
        const getProducts = async () => {
            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }

            await api.get("/products/show/" + id, headers)
                .then((response) => {
                    if (response.data.products) {
                        setValues(response.data.products);
                        setAcao('Editar');
                    } else {
                        setStatus({
                            type: 'warning',
                            mensagem: 'Nenhum produto encontrado',
                        })
                    }
                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'error',
                            mensagem: err.response.data.mensagem
                        })
                    } else {
                        setStatus({
                            type: 'error',
                            mensagem: 'Erro: Tente mais tarde!'
                        })
                    }
                })
        }
        if (id) getProducts();

    }, [id])

    const getCategories = async () =>{
        const headers = {
          'headers': {
            'Authorization' : 'Bearer ' +  localStorage.getItem('token')
          }
        }
        await api.get("/categories/all", headers)
        .then((response)=>{
            setData(response.data.categories)
        }).catch((error)=>{
          if(error.response){
            setStatus({
              type:'error',
              mensagem: error.response.data.mensagem
            })
          }else{
              setStatus({
                type:'error',
                mensagem: 'Erro: tente mais tarde'
              })
          }
        })
      }

      useEffect(()=>{
        getCategories()
      },[])
    
    const formSubmit = async e => {
        e.preventDefault();
        setStatus({ loading: true });

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }

        if(!id){
            await api.post("/products/create", values, headers)
                .then((response) => {
                    setStatus({ loading: false })
                    return history.push('/products')
                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'error',
                            mensagem: err.response.data.mensagem,
                            loading: false
                        })
                    } else {
                        setStatus({
                            type: 'error',
                            mensagem: 'Erro: tente mais tarde',
                            loading: false
                        })
                    }
                })
        } else {
            await api.put("/products/update", values, headers)
                .then((response) => {
                    setStatus({ loading: false })
                    return history.push('/products')
                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'error',
                            mensagem: err.response.data.mensagem,
                            loading: false
                        })
                    } else {
                        setStatus({
                            type: 'error',
                            mensagem: 'Erro: tente mais tarde',
                            loading: false
                        })
                    }
                })
        }    
    }

    return (
        <>
            <NavBar />
            <Container className="box">
                <Form onSubmit={formSubmit} className="borderForm">
                    <h2>{acao} Produtos</h2>

                    {status.type == 'error'
                        ? <Alert variant="danger">{status.mensagem}</Alert>
                        : ""}
                    {status.type == 'success'
                        ? <Alert variant="success">{status.mensagem}</Alert>
                        : ""}

                    {status.loading ? <Alert variant="warning">Enviando...</Alert> : ""}

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" name="name" value={values.name} onChange={valorInput} placeholder="Nome" required />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicQuantity">
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Control type="number" name="quantity" value={values.quantity} onChange={valorInput} placeholder="Quantidade" required />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control type="number" name="price" value={values.price} onChange={valorInput} placeholder="Preço" required />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control type="text" name="description" value={values.description} onChange={valorInput} placeholder="Descrição"  required/>
                        <Form.Text className="text-muted">
                            Adicione uma descrição ao seu produto.
                        </Form.Text>
                    </Form.Group>

                 
                    <Form.Group className="mb-3">
                        <Form.Select  aria-label="categorieId"  name="categorieId" onChange={FormSelect} value={values.categorieId}>
                        <option>Selecione uma categoria</option>
                        {categories.map(categories => (
                        <option key={categories.id} value={categories.id}>{categories.name} </option>
                         ))}
                        </Form.Select>
                     </Form.Group>

                    {status.loading
                        ? <Button variant="primary" disabled type="submit">Enviando...</Button>
                        : <Button variant="primary" type="submit">Enviar</Button>
                    }
                </Form>
            </Container>
        </>
    )}
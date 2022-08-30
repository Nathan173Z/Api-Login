import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from '../Context/AuthContext';

import { Login } from '../components/Login/Login';
import { Dashboard } from '../page/Dashboard';
import { ListaCategorias } from '../page/Categorias/ListaCategorias';
import { CategoriaForm } from '../page/CategoriaForm/CategoriaForm';
import { ListaProducts } from '../page/Products/ListaProducts';
import { ProductsForm } from '../page/ProductsForm/ProductsForm';

function CustomRoute({ isPrivate, ...rest}){

    const { authenticated } = useContext(Context);
    if( isPrivate && !authenticated){
        return <Redirect to="/" />
    }
    return <Route { ...rest } />

}

export default function PrivateRoute(){
    return (
        <Switch>
            <CustomRoute exact path="/" component={Login} />
            <CustomRoute isPrivate path="/dashboard" component={Dashboard} />
            {/* Routes de categorias */}
            <CustomRoute isPrivate path="/categorias/novo" component={CategoriaForm} />
            <CustomRoute isPrivate path="/categories/editar/:id" component={CategoriaForm} />
            <CustomRoute isPrivate path="/categorias" component={ListaCategorias} />
            {/* Routes de products */}
            <CustomRoute isPrivate path="/products/novo" component={ProductsForm}/>
            <CustomRoute isPrivate path="/products/editar/:id" component={ProductsForm}/>
            <CustomRoute isPrivate path="/products" component={ListaProducts}/>
            
            
        </Switch>
    )
}
import * as React from 'react';
import {Route} from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import {LoginForm} from './components/Pages/User/LoginForm/LoginForm';
import {RegistrationForm} from './components/Pages/User/RegistrationForm/RegistrationForm';
import {ViewAllFilms} from './components/Pages/ViewAllFilms/ViewAllFilms';
import {EditFilm} from './components/Pages/EditFilm/EditFilm';
import {AddFilm} from './components/Pages/AddFilm/AddFilm';
import {ViewMyFilms} from './components/Pages/ViewAllFilms/ViewMyFilms';
import {ViewFilmInfo} from './components/Pages/ViewFilmInfo/ViewFilmInfo';


import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home}/>
        <Route exact path='/Login' component={LoginForm}/>
        <Route exact path='/Registration' component={RegistrationForm}/>
        <Route exact path='/ViewAllFilms' component={ViewAllFilms}/>
        <Route exact path='/AddFilm' component={AddFilm}/>
        <Route exact path='/EditFilm/:id' component={EditFilm}/>
        <Route exact path='/ViewMyFilms' component={ViewMyFilms}/>
        <Route exact path='/ViewFilmInfo/:id' component={ViewFilmInfo}/>
    </Layout>
);

import express, { Application } from 'express';
import dotenv from 'dotenv';
//Cargar rutas desde awilix-express
//Se cargan las clases donde agreguemos el decoradr
//@route()
import { loadControllers } from 'awilix-express';
import loadContainer  from './container';

//Config of ENV variables
dotenv.config({
    path: `${__dirname}/../config/${process.env.NODE_ENV}.env`
});

const app: Application = express();

//EJEMPLO CONTENEDOR DE DEPENDENCIAS
//import { container } from './container';
//import { TestService } from './service/test.service';
//Obtener dependencia
//const testService = container.resolve<TestService>('testService');
//console.log(testService.get());

//Cargar contenedor
loadContainer(app);
//Middlewares
app.use(loadControllers(
    'controllers/*.ts' //Ruta de los controladors
, { cwd: __dirname }));

export { app };
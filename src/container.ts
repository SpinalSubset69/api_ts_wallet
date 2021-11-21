import { asClass, createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application } from "express";
import { SubscriptionMySqlRepository } from "./service/repositories/impl/mysql/subscription.repository";
import { SubscriptionService } from "./service/subscription.service";
import { TestService } from "./service/test.service";

export default (app: Application) => {
    //Crear contenedor
    const container = createContainer({
        injectionMode: 'CLASSIC' // Establece la inyeccion de manera clasica
    });


    //Registrar dependencias
    container.register({
        //se especifica la clase que sera la dependencia
        //Repositories
        subscriptionRepository: asClass(SubscriptionMySqlRepository).scoped(),

        //Services
        subscriptionService: asClass(SubscriptionService).scoped(),
        testService: asClass(TestService).scoped()
    });

    //Se agrega para registar awilix-express
    //Este modulo espera que al meno un contenedor de dependencias
    //se encuentra registrado
    app.use(scopePerRequest(container));
};
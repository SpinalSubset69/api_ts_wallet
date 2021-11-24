import { asClass, createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application } from "express";
import { MovementService } from "./service/movement.service";
import { BalanceMySqlRepository } from "./service/repositories/impl/mysql/balance.repository";
import { MovementMysqlRepository } from "./service/repositories/impl/mysql/movement.repository";
import { SubscriptionMySqlRepository } from "./service/repositories/impl/mysql/subscription.repository";
import { SubscriptionService } from "./service/subscription.service";

export default (app: Application) => {
    //Crear contenedor
    const container = createContainer({
        injectionMode: 'CLASSIC' // Establece la inyeccion de manera clasica
    });


    //Registrar dependencias
    container.register({
        //se especifica la clase que sera la dependencia
        //MySql Repositories
        subscriptionRepository: asClass(SubscriptionMySqlRepository).scoped(),
        movementRepository: asClass(MovementMysqlRepository).scoped(),
        balanceRepository: asClass(BalanceMySqlRepository).scoped(),

        //Services
        subscriptionService: asClass(SubscriptionService).scoped(),   
        movementService: asClass(MovementService).scoped(),        
    });

    //Se agrega para registar awilix-express
    //Este modulo espera que al meno un contenedor de dependencias
    //se encuentra registrado
    app.use(scopePerRequest(container));
};
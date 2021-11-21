import { Request, Response } from 'express'
import { GET, route } from 'awilix-express'
import { TestService } from '../service/test.service';

//Establecemos que esta clase sera una ruta
@route('/')
export class DefaultController{
    //Se inyecta la dependencia automaticamente
    constructor(private readonly testService: TestService){}
    //GET    
    @GET()
    public index(req: Request, res: Response): void{
        res.send({message: 'HOla'})
    }

    @route('test')
    @GET()
    public test(req: Request, res: Response): void{
        res.send({date: this.testService.get()})
    }
}
import { DELETE, GET, POST, PUT, route } from "awilix-router-core";
import { BaseController } from "../common/controller/base.contrller";
import { MovementService } from "../service/movement.service";
import { Request, Response } from 'express';
import { MakeMovement } from "../factory/make.movement";

@route('/movement')
export class MovementController extends BaseController{
    
    constructor(private readonly movementService:MovementService){
        super();
    }

    @GET()
    public async all(req: Request, res: Response){
        try{
            const movements = await this.movementService.all();
            res.send({
                statusCode: 200,
                message: 'List of movements',
                data: movements
            })
        }catch(err:any){
            this.handleException(err,res);
        }
    }

    @GET()
    @route('/:id')
    public async findById(req: Request, res:Response){
        try{
            const id = parseInt(req.params.id);
            const movement = await this.movementService.find(id);

            res.send({
                statusCode: 200,
                message: 'Movement found',
                data: movement
            })
        }catch(err:any){
            this.handleException(err, res);
        }
    }

    @POST()
    public async create(req: Request, res: Response){
        try{
            const validatedMovement = MakeMovement(req.body);
            const storedMovement = await this.movementService.store(validatedMovement);

            res.send({
                statusCode: 200,
                message: 'Movement stored',
                data: storedMovement
            })
        }catch(err:any){
            this.handleException(err, res);
        }
    }   
}
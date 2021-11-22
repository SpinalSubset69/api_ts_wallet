import { DELETE, GET, POST, PUT, route } from "awilix-router-core";
import { BaseController } from "../common/controller/base.contrller";
import { MovementService } from "../service/movement.service";
import { Request, Response } from 'express';
import { MakeMovement } from "../factory/make.movement";
import { MakeUpdateMovement } from "../factory/make.updateMovement";

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

    @PUT()
    @route('/:id')
    public async update(req: Request, res: Response){
        try{
            const id = parseInt(req.params.id);
            const validatedMovementToUpdate = MakeUpdateMovement(req.body);
            const updatedMovement = await this.movementService.update(id, validatedMovementToUpdate);

            res.send({
                statusCode: 200,
                message: 'Movement updated',
                data: updatedMovement
            })
        }catch(err:any){
            this.handleException(err, res);
        }
    }

    @DELETE()
    @route('/:id')
    public async remove(req: Request, res: Response){
        try{
            const id = parseInt(req.params.id);
            await this.movementService.delete(id);

            res.json({
                statusCode: 200,
                message: 'Movement Removed'
            })
        }catch(err:any){
            this.handleException(err, res);
        }
    }

}
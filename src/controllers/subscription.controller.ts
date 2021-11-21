import { Request, Response } from 'express'
import { GET, route, POST } from 'awilix-express'
import { SubscriptionService } from '../service/subscription.service';
import { SubscriptionCreateDto } from '../dtos/subscription.dto';

//Establecemos que esta clase sera una ruta
@route('/subscription')
export class SubscriptionController {
    //Se inyecta la dependencia automaticamente
    constructor(private readonly subscriptionService: SubscriptionService) { }

    //GET    
    @GET()
    public async All(req: Request, res: Response) {        
        res.send(await this.subscriptionService.all());
    }

    @route(':id')
    @GET()
    public async find(req: Request, res: Response){
        const id = req.params.id;

        res.send(
            await this.subscriptionService.find(parseInt(id))
        )
    }
    
    @POST()
    public async store(req: Request, res: Response){        
        await this.subscriptionService.store({
            user_id: req.body.user_id,
            code: req.body.code,
            amount: req.body.amount,
            cron: req.body.cron
        } as SubscriptionCreateDto)
        res.send()
    }
}
import { Request, Response } from 'express'
import { GET, route, POST, PUT, DELETE } from 'awilix-express'
import { SubscriptionService } from '../service/subscription.service';
import { SubscriptionCreateDto, SubscriptionUpdateDto } from '../dtos/subscription.dto';
import { BaseController } from '../common/controller/base.contrller';
import { MakeSubscription } from '../factory/make.subscription';
import { MakeUpdateSubscription } from '../factory/make.updateSusbcription';

//Establecemos que esta clase sera una ruta
@route('/subscription')
export class SubscriptionController extends BaseController {
    //Se inyecta la dependencia automaticamente
    constructor(private readonly subscriptionService: SubscriptionService) {
        super();
    }

    //GET    
    @GET()
    public async All(req: Request, res: Response) {
        try {
            const subscriptions = await this.subscriptionService.all()
            res.status(200).send({
                statusCode: 200,
                message: 'Get Subscriptions success',
                data: subscriptions
            });
        } catch (err: any) {
            this.handleException(err, res);
        }
    }

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const subscription = await this.subscriptionService.find(parseInt(id));
            res.send({
                statusCode: 200,
                message: 'Subscription Found',
                data: subscription
            });
        } catch (err: any) {
            this.handleException(err, res);
        }
    }

    @POST()
    public async store(req: Request, res: Response) {
        try {
            //Validate body            
            const subscriptionDtoValidated = MakeSubscription(req.body);
            //Store Subscription
            const storedSubscription = await this.subscriptionService.store(subscriptionDtoValidated)

            res.send({
                statusCode: 200,
                message: 'Subscription stored',
                data: storedSubscription
            })
        } catch (err: any) {
            this.handleException(err, res);
        }
    }

    @PUT()
    @route('/:id')
    public async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const validatedUpdateSubscriptionDto = MakeUpdateSubscription(req.body);
            const updatedSubscription = await this.subscriptionService.update(id, validatedUpdateSubscriptionDto);
            res.send({
                statusCode: 200,
                message: 'Subscription Updated',
                data: updatedSubscription
            });
        } catch (err: any) {
            this.handleException(err, res);
        }
    }

    @DELETE()
    @route('/:id')    
    public async remove(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
        
        await this.subscriptionService.remove(id);
        res.send({
            statusCode: 200,
            message: 'Subscription removed'
        });
        }catch(err:any){
            this.handleException(err, res);
        }
    }
}
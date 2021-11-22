import { ApplicationException } from "../common/exceptions/application.exception";
import { SubscriptionCreateDto, SubscriptionUpdateDto } from "../dtos/subscription.dto";
import { Subscription } from "./repositories/domain/subscription";
import { ISubscriptionRepository } from "./repositories/subscription.repository";


export class SubscriptionService{
    constructor(private readonly subscriptionRepository:ISubscriptionRepository){}

    public async find(id:number): Promise<Subscription | null> {
        return await this.subscriptionRepository.find(id);
    }

    public async all(): Promise<Subscription[]>{
        return  await this.subscriptionRepository.all();
    }

    public async store(entry: SubscriptionCreateDto): Promise<Subscription>{
        const originalEntry = await this.subscriptionRepository.findByUserAndCode(entry.user_id, entry.code);

        if(!originalEntry){
            const subscriptionStored = await this.subscriptionRepository.store(entry as Subscription);            
            return subscriptionStored;
        }else{
            throw new ApplicationException('user subscription already exists.');
        }                
    }

    public async update(id:number, entry: SubscriptionUpdateDto): Promise<Subscription>{
        let originalEntry = await this.subscriptionRepository.find(id);

        if(originalEntry){
            //Se actualizan las propiedades
          entry.amount ? originalEntry.amount = entry.amount : originalEntry.amount = originalEntry.amount;
          entry.code ? originalEntry.code = entry.code : originalEntry.code = originalEntry.code;
          entry.cron ? originalEntry.cron = entry.cron : originalEntry.cron = originalEntry.cron;
        }else{
            throw new ApplicationException('user subscription was not found');
        }        
        const updatedSubscription = await this.subscriptionRepository.update(originalEntry);

        return updatedSubscription;
    }

    public async remove(id: number): Promise<void>{
        const originalEntry = await this.subscriptionRepository.find(id);

        if(originalEntry){
            return await this.subscriptionRepository.remove(id);                     
        }else{
            throw new ApplicationException('user subscription doesnt exists.');
        }  
        
    }
};
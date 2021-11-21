import { ApplicationException } from "../common/exceptions/application.exception";
import { SubscriptionCreateDto, SubscriptionUpdateDto } from "../dtos/subscription.dto";
import { Subscription } from "./repositories/domain/subscription";
import { SubscriptionRepository } from "./repositories/subscription.repository";


export class SubscriptionService{
    constructor(private readonly subscriptionRepository:SubscriptionRepository){}

    public async find(id:number): Promise<Subscription | null> {
        return await this.subscriptionRepository.find(id);
    }

    public async all(): Promise<Subscription[]>{
        return  await this.subscriptionRepository.all();
    }

    public async store(entry: SubscriptionCreateDto): Promise<void>{
        const originalEntry = await this.subscriptionRepository.findByUserAndCode(entry.user_id, entry.code);

        if(!originalEntry){
            this.subscriptionRepository.store(entry as Subscription);
        }else{
            throw new ApplicationException('user subscription already exists.');
        }        
    }

    public async update(id:number, entry: SubscriptionUpdateDto): Promise<void>{
        let originalEntry = await this.subscriptionRepository.find(id);

        if(originalEntry){
           originalEntry.code = entry.code;
           originalEntry.amount = entry.amount;
           originalEntry.cron = entry.cron ;
        }else{
            throw new ApplicationException('user subscription was not found');
        }

    }

    public async remove(id: number): Promise<void>{
        return await this.subscriptionRepository.remove(id);
    }
};
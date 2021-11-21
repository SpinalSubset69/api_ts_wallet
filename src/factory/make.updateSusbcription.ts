import { InvalidPropertyError } from "../common/exceptions/application.exception";
import { RequiredParam } from "../common/exceptions/required.param";
import { SubscriptionUpdateDto } from "../dtos/subscription.dto";

export function MakeUpdateSubscription(subscriptionInfo: SubscriptionUpdateDto){
    if(!subscriptionInfo){
        RequiredParam('Subscription Info')
    }
    const validateSubscriptionInfo = Validate(subscriptionInfo);
    return Object.freeze(validateSubscriptionInfo);
}

function Validate(info:SubscriptionUpdateDto): SubscriptionUpdateDto{    
    if(!info.code){
        RequiredParam('Code');
    }
    
    if(!info.amount){
        RequiredParam('Amount');
    }

    if(!info.cron){
        RequiredParam('Cron');
    }
    
    //Validar la propiedades, en caso de no cumplir con los requreimientos
    //Se lanza una exception IvalidPropertyError
    ValidateCode(info.code);
    ValidateAmount(info.amount);
    ValidateCron(info.cron);        
    return info;
}

function ValidateCode(code:string){
    if(code.length < 2){
        throw new InvalidPropertyError('Code length can not be less than 2 chars ')
    }
}

function ValidateAmount(amount:number){
    if(amount <= 0){
        throw new InvalidPropertyError('Amount must be major then 0');
    }
}

function ValidateCron(cron:string){
    if(cron.length <= 2){
        throw new InvalidPropertyError('Cron must be major than 2 chars')
    }
}
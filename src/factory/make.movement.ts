import { InvalidPropertyError } from "../common/exceptions/application.exception";
import { RequiredParam } from "../common/exceptions/required.param";
import { MovementCreateDto } from "../dtos/movement.dto";

export function MakeMovement(movementInfo:MovementCreateDto){    
    if(Object.keys(movementInfo).length === 0){
        RequiredParam('Movement Info')
    }

    const validatedMovement = Validate(movementInfo);

    return Object.freeze(validatedMovement);
}

function Validate(info:MovementCreateDto): MovementCreateDto{
    if(!info.user_id){
        RequiredParam('User_Id');
    }

    if(!info.type){
        RequiredParam('Type');
    }

    if(!info.amount){
        RequiredParam('Amount');
    }

    ValidateUserId(info.user_id);
    ValidateType(info.type);
    ValidateAmount(info.amount);

    return info;
}

function ValidateUserId(user_id:number){
    if(user_id <= 0){
        throw new InvalidPropertyError('Insert a valid User ID');
    }
}

function ValidateType(type:number){

    if(isNaN(type)){
        throw new InvalidPropertyError('Type must be a number');
    }

    if(type < 0  || type > 1){
        throw new InvalidPropertyError('Invalid Movement Type, valid type: { 0 , 1}');
    }
}

function ValidateAmount(amount:number){
    if(isNaN(amount)){
        throw new InvalidPropertyError('Amount must be a number');
    }
    if(amount <= 0){
        throw new InvalidPropertyError('Amount must be major than 0');
    }
}
import { MovementType } from "../common/enums/movement.enum";

export interface MovementCreateDto{
    user_id: number;
    type: MovementType;
    amount: number;    
}

export interface MovementUpdateDto{
    user_id?: number;
    type?: MovementType;
    amount?: number;    
}
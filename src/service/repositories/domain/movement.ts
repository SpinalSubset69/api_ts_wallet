import { MovementType } from "../../../common/enums/movement.enum";

export interface Movement{
    id?: number;
    user_id: number;
    type: MovementType; //Enum, outcome: 1, income: 0
    amount: number;
    created_at: Date | null;
    updated_at?: Date | null;
}
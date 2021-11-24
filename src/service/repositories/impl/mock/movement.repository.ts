import { Movement } from "../../domain/movement";
import db from '../../../../common/persistence/mock.persistence';
import { NotFoundException } from "../../../../common/exceptions/application.exception";
import { IMovementRepository } from "../../movement.repository";
import { couldStartTrivia } from "typescript";

export class MovementMockRepository implements IMovementRepository{
    
    getByUserid(userId: number): Promise<Movement[]> {
        throw new Error("Method not implemented.");
    }
    
    public async all(): Promise<Movement[]> {
        const table: any[] = db.movements as Movement[];
        //Todos los elementos en el arreglo implemenaran la interfaz Subscription
        //Para quitar la mutabilidad de la tabla 
        return Object.assign([...table]);
    }

    public async find(id: number): Promise<Movement | null> {
        const table = db.movements as Movement[];
        const result = table.find(x => x.id === id);        

        if(!result){
            throw new NotFoundException('Movement')
        }

        return Object.assign({...result});
    }

    public async store(entry: Movement): Promise<Movement> {
        const table = db.movements as Movement[];   
        const now = new Date();

        db._movementId++;
        const storedMovement = {
            id: db._movementId,
            type: entry.type,
            amount: entry.amount,
            user_id: entry.user_id,  
            created_at: now,
            updated_at: null
        }
        table.push(storedMovement as Movement);
        return Object.freeze(storedMovement as Movement);
    }

    public async update(entry: Movement): Promise<Movement> {
        const now = new Date();
        const table = db.movements as Movement[];
        const originalEntry = table.find(e => e.id === entry.id);

        if(originalEntry){
            originalEntry.amount = entry.amount;
            originalEntry.user_id = entry.user_id;
            originalEntry.type = entry.type;
            originalEntry.updated_at = now;
        }

        return originalEntry as Movement;
    }

    public async remove(id: number): Promise<void> {
        let table = db.movements as Movement[];
        db.movements = table.filter(x => x.id !== id) as any;
    }
    
}
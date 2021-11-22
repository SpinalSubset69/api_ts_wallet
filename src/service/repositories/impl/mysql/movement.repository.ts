import { Movement } from "../../domain/movement";
import connector from '../../../../common/persistence/mysql.persistence';
import { NotFoundException } from "../../../../common/exceptions/application.exception";
import { IMovementRepository } from "../../movement.repository";
import { couldStartTrivia } from "typescript";

export class MovementMysqlRepository implements IMovementRepository{
    
    public async all(): Promise<Movement[]> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_movement ORDER BY id DESC'
        );

        if (!rows.length) {
            throw new NotFoundException('Movements');
        }
        //Todos los elementos en el arreglo implemenaran la interfaz Subscription
        return rows as Movement[];
    }

    public async find(id: number): Promise<Movement | null> {
        const [rows] : any = await connector.query(
            'SELECT * FROM wallet_movement WHERE id = ?',
            [id]
        );

        if(!rows.length){
            throw new NotFoundException('Movement')
        }

        return rows[0] as Movement;
    }

    public async store(entry: Movement): Promise<Movement> {
        const now = new Date();
        const storedMovement ={
            user_id : entry.user_id,
            amount:entry.amount,
            type: entry.type,
            created_at: now
        };
        await connector.execute(
            'INSERT INTO wallet_movement(user_id, type, amount, created_at) values( ?, ?, ?, ?) ',
            [storedMovement.user_id, 
            storedMovement.type,
            storedMovement.amount, 
            storedMovement.created_at]
        )
        return storedMovement as Movement;
    }

    public async update(entry: Movement): Promise<Movement> {
        const now = new Date();
        console.log(entry);
        const updatedMovement = {
            updated_at: now,
            user_id: entry.user_id,
            type: entry.type,
            amount: entry.amount,
            created_at: entry.created_at,
            id: entry.id
        }
        await connector.execute(
            'UPDATE wallet_movement SET user_id = ?, type = ?, amount = ?, updated_at = ? WHERE id = ?',
            [updatedMovement.user_id, 
             updatedMovement.type,
            updatedMovement.amount,
            updatedMovement.updated_at,
            updatedMovement.id]
        );
        return updatedMovement as Movement;
    }

    public async remove(id: number): Promise<void> {
        await connector.execute(
            'DELETE FROM wallet_movement WHERE id = ?',
            [id]
        );
    }
    
}
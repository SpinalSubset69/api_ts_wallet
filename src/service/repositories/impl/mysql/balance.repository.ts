import { NotFoundException } from "../../../../common/exceptions/application.exception";
import { IBalanceRepository } from "../../balance.repository";
import { Balance } from "../../domain/balance";
import connector from './../../../../common/persistence/mysql.persistence';

export class BalanceMySqlRepository implements IBalanceRepository{
    

    public async all(): Promise<Balance[]> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_balance ORDER BY DESC'
        )

        if(!rows.length){
            throw new NotFoundException('No Balance found');
        }

        return rows as Balance[];
    }

    public async find(id: number): Promise<Balance | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_balance WHERE id = ?',
            [id]
        );

        if(!rows.length){
            throw new NotFoundException('Balance not found');
        }

        return rows[0] as Balance;
    }
    public async findByUserId(userId: number): Promise<Balance | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_balance WHERE user_id = ?',
            [userId]
        );        
        return rows.length ? rows[0] as Balance : null; 
    }
    public async store(entry: Balance): Promise<void> {
        const now = new Date();
        await connector.execute(
            'INSERT INTO wallet_balance(user_id, amount, created_at) VALUES(?,?,?)',
            [entry.user_id, entry.amount, now]
        );        
    }

    public async update(entry: Balance): Promise<void> {
        const now = new Date();    
        await connector.execute(
            'UPDATE wallet_balance SET user_id = ?, amount = ?, updated_at =? WHERE id = ?',
            [entry.user_id, entry.amount, now, entry.id]
        );
    
    }

    public async remove(id: number): Promise<void> {
        await connector.execute(
            'DELETE FROM wallet_balance WHERE id = ?',
            [id]
        )
    }

}
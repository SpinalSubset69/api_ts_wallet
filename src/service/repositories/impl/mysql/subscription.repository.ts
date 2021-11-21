//Se necesita la conexion
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../subscription.repository';
import connector from './../../../../common/persistence/mysql.persistence'

export class SubscriptionMySqlRepository implements SubscriptionRepository {

    public async all(): Promise<Subscription[]> {
        const [rows] = await connector.execute(
            'SELECT * FROM wallet_subscription ORDER BY id DESC'
        );            
        //Todos los elementos en el arreglo implemenaran la interfaz Subscription
        return rows as Subscription[];
    }
    
    public async find(id: number): Promise<Subscription | null> {
        const [rows]: any[] = await connector.query(
            'SELECT * FROM wallet_subscription WHERE id = ?',
            [id]
        )
        return rows ? rows[0] as Subscription : null;
    }

    public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> {
        const [rows]: any[] = await connector.query(
            'SELECT * FROM wallet_subscription WHERE id = ? AND code = ?',
            [user_id, code]
        )
        return rows ? rows[0] as Subscription : null;
    }

    public async store(entry: Subscription): Promise<void> {
        const now = new Date();
        await connector.execute(
            'INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES(?,?,?,?,?)',
            [entry.user_id, entry.code, entry.amount, entry.cron, now]
        );
    }

    public async update(entry: Subscription): Promise<void> {
        const now = new Date();
        await connector.execute(
            'UPDATE  wallet_subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?',
            [entry.user_id, entry.code, entry.amount, entry.cron, now, entry.id]
        );
    }

    public async remove(id: number): Promise<void> {
        const now = new Date();
        await connector.execute(
            'DELETE FROM wallet_subscription WHERE id = ?',
            [id]
        );
    }
}
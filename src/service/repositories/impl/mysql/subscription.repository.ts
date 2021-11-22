//Se necesita la conexion
import { NotFoundException } from '../../../../common/exceptions/application.exception';
import { Subscription } from '../../domain/subscription';
import { ISubscriptionRepository } from '../../subscription.repository';
import connector from './../../../../common/persistence/mysql.persistence'

export class SubscriptionMySqlRepository implements ISubscriptionRepository {

    public async all(): Promise<Subscription[]> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_subscription ORDER BY id DESC'
        );

        if (!rows.length) {
            throw new NotFoundException('Subscriptions');
        }
        //Todos los elementos en el arreglo implemenaran la interfaz Subscription
        return rows as Subscription[];
    }

    public async find(id: number): Promise<Subscription | null> {
        const [rows]: any[] = await connector.query(
            'SELECT * FROM wallet_subscription WHERE id = ?',
            [id]
        )
        if (!rows.length) {
            throw new NotFoundException('Subscription');
        }
        return rows[0] as Subscription;
    }

    public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> {
        const [rows]: any[] = await connector.query(
            'SELECT * FROM wallet_subscription WHERE user_id = ? AND code = ?',
            [user_id, code]
        )
        return rows ? rows[0] as Subscription : null;
    }

    public async store(entry: Subscription): Promise<Subscription> {
        const now = new Date();
        //Object to return
        const savedSubscription = {
            user_id: entry.user_id, 
            amount: entry.amount,
            code: entry.code,
            created_at: now,
            cron: entry.cron
        }
        await connector.execute(
            'INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES(?,?,?,?,?)',
            [savedSubscription.user_id, savedSubscription.code, savedSubscription.amount, savedSubscription.cron, savedSubscription.created_at]
        );

        return savedSubscription as Subscription;
    }

    public async update(entry: Subscription): Promise<Subscription> {
        const now = new Date();
        const updatedSubscription ={ 
            id: entry.id,            
            amount: entry.amount,
            code: entry.code,
            updated_at: now,
            cron: entry.cron
        }
        await connector.execute(
            'UPDATE  wallet_subscription SET code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?',
            [updatedSubscription.code, updatedSubscription.amount, updatedSubscription.cron, updatedSubscription.updated_at, updatedSubscription.id]
        );

        return updatedSubscription as Subscription;
    }

    public async remove(id: number): Promise<void> {        
        await connector.execute(
            'DELETE FROM wallet_subscription WHERE id = ?',
            [id]
        );        
    }
}
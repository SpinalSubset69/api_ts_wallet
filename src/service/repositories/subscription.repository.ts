import { Subscription } from "./domain/subscription";

export interface ISubscriptionRepository{
    all(): Promise<Subscription[]>;
    find(id: number): Promise<Subscription | null>;
    findByUserAndCode(user_id:number, code:string): Promise<Subscription | null >;
    store(entry: Subscription): Promise<Subscription>;
    update(entry: Subscription): Promise<Subscription>;
    remove(id: number): Promise<void>;
}
import { Balance } from "./domain/balance";

export interface IBalanceRepository{
    all(): Promise<Balance[]>;
    find(id: number): Promise<Balance | null>;
    findByUserId(userId:number): Promise< Balance | null >;
    store(entry: Balance): Promise<void>;
    update(entry: Balance): Promise<void>;
    remove(id: number): Promise<void>;
}
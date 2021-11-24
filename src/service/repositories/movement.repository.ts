import { Movement } from "./domain/movement";

export interface IMovementRepository{
    all(): Promise<Movement[]>;
    find(id: number): Promise<Movement | null>;
    getByUserid(userId: number): Promise<Movement[]>
    store(entry: Movement): Promise<Movement>;
    update(entry: Movement): Promise<Movement>;
    remove(id: number): Promise<void>;
}
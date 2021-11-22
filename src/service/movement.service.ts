import { NotFoundException } from "../common/exceptions/application.exception";
import { MovementCreateDto, MovementUpdateDto } from "../dtos/movement.dto";
import { Movement } from "./repositories/domain/movement";
import { IMovementRepository } from "./repositories/movement.repository";

export class MovementService{
    constructor(private readonly movementRepository:IMovementRepository){}

    public async all(): Promise<Movement[]>{
        return await this.movementRepository.all();
    }

    public async store(entry: MovementCreateDto): Promise<Movement>{
        return await this.movementRepository.store(entry as Movement);
    }

    public async find(id:number): Promise<Movement>{
        const movement = await this.movementRepository.find(id);

        if(!movement){
            throw new NotFoundException('Movement not Found');
        }
        return movement;
    }

    public async update(id:number, entry:MovementUpdateDto){
        let originalEntry = await this.movementRepository.find(id);        
    
        if(originalEntry){
            entry.amount ? originalEntry.amount = entry.amount : null;
            //Check if entry.tpye is 0 or 1
            entry.type === 0 ? originalEntry.type = entry.type : entry.type === 1 ? originalEntry.type = entry.type : null;
            //Check if entry.tpye is 0 or 1
            entry.user_id ? originalEntry.user_id = entry.user_id : null;            
            const updatedMovemnt = await this.movementRepository.update(originalEntry);
            return updatedMovemnt;
        }else{
            throw new NotFoundException('User not found');
        }        
    }

    public async delete(id:number): Promise<void>{
        await this.movementRepository.remove(id);
    }
}
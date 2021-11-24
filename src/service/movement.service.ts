import { MovementType } from "../common/enums/movement.enum";
import {
  ApplicationException,
  NotFoundException,
} from "../common/exceptions/application.exception";
import { MovementCreateDto, MovementUpdateDto } from "../dtos/movement.dto";
import { IBalanceRepository } from "./repositories/balance.repository";
import { Balance } from "./repositories/domain/balance";
import { Movement } from "./repositories/domain/movement";
import { IMovementRepository } from "./repositories/movement.repository";

export class MovementService {
  constructor(
    private readonly movementRepository: IMovementRepository,
    private readonly balanceRepository: IBalanceRepository
  ) {}

  public async all(): Promise<Movement[]> {
    return await this.movementRepository.all();
  }

  public async store(entry: MovementCreateDto): Promise<Movement> {
    const balance = await this.balanceRepository.findByUserId(entry.user_id);    
    if (entry.type === MovementType.income) {
      const storedMovement = await this.Income(entry, balance as Balance);
      return storedMovement;
    } else if (entry.type === MovementType.outcome) {
      const storedMovement = await this.Outcome(entry, balance as Balance);
      return storedMovement;
    } else {
      throw new ApplicationException("Invalide Movement Type");
    }
  }

  //MOVEMENT INCOME AND OUTCOME LOGIC

  private async Income(
    entry: MovementCreateDto,
    balance: Balance
  ): Promise<Movement> {
    if (!balance) {
      await this.balanceRepository.store({
        amount: entry.amount,
        user_id: entry.user_id,
      } as Balance);
    } else {
      balance.amount += entry.amount;
      await this.balanceRepository.update(balance);
    }

    const storedMovement = await this.movementRepository.store(
      entry as Movement
    );

    return storedMovement;
  }

  private async Outcome(
    entry: MovementCreateDto,
    balance: Balance
  ): Promise<Movement> {
    if (!balance || balance.amount < entry.amount) {
      throw new ApplicationException("User does not have enough balance");
    } else {
      balance.amount -= entry.amount;
      await this.balanceRepository.update(balance);
      const storedMovement = await this.movementRepository.store(
        entry as Movement
      );

      return storedMovement;
    }
  }

  //END MOVEMENT INCOME AND OUTCOME LOGIC

  public async find(id: number): Promise<Movement> {
    const movement = await this.movementRepository.find(id);

    if (!movement) {
      throw new NotFoundException("Movement not Found");
    }
    return movement;
  }

  public async update(id: number, entry: MovementUpdateDto) {
    let originalEntry = await this.movementRepository.find(id);

    if (originalEntry) {
      entry.amount ? (originalEntry.amount = entry.amount) : null;
      //Check if entry.tpye is 0 or 1
      entry.type ? (originalEntry.type = entry.type) : null;
      //Check if entry.tpye is 0 or 1
      entry.user_id ? (originalEntry.user_id = entry.user_id) : null;
      const updatedMovemnt = await this.movementRepository.update(
        originalEntry
      );
      return updatedMovemnt;
    } else {
      throw new NotFoundException("User not found");
    }
  }

  public async delete(id: number): Promise<void> {
    await this.movementRepository.remove(id);
  }
}

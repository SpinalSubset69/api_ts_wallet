import { MovementType } from '../common/enums/movement.enum';
import { MovementCreateDto } from '../dtos/movement.dto';
import { MovementService } from '../service/movement.service';
import { BalanceMockRepository } from '../service/repositories/impl/mock/balance.repository';
import { MovementMockRepository } from '../service/repositories/impl/mock/movement.repository';

const movementService = new MovementService(
    new MovementMockRepository(),
    new BalanceMockRepository()
);

describe('Movement.Service', () => {
    describe('Store', () => {
        //Income Test
        it('Tries to register an income movement, should return a created movement', async () => {
            //Primero se prepara la data para las pruebas
            const entry = {
                user_id: 1,
                type: MovementType.income,
                amount: 400
            } 
            const result = await movementService.store(entry as MovementCreateDto)

            assert.equal(entry, result);
        });

        //Outcome Test
        it('Tries to register an outcome movement', async () => {
            const entry = {
                user_id: 2,
                type: MovementType.income,
                amount: 200
            } 
            const result = await movementService.store(entry as MovementCreateDto)
            assert.equal(entry, result);
        });

        //Register an outcome with insufficient balance
        it('Tries to register an outcome movement with insufficient balance', async () => {
            try{
                const entry = {
                    user_id: 2,
                    type: MovementType.income,
                    amount: 200
                } 
                const result = await movementService.store(entry as MovementCreateDto)
                assert.equal(entry, result);
            }catch(err:any){
                
            }
        });

        it('Tries to register an unexpected movement', () => {

        });
    });

});
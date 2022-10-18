import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConstantsService } from './database-constants.service';

describe('DatabaseConstantsService', () => {
	let service: DatabaseConstantsService;
	
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ DatabaseConstantsService ],
		}).compile();
		
		service = module.get<DatabaseConstantsService>(DatabaseConstantsService);
	});
	
	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

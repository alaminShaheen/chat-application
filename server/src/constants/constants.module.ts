import { Global, Module } from '@nestjs/common';
import { AppConstantsService } from './app-constants.service';
import { TokenConstantsService } from './token-constants.service';

@Global()
@Module({
	providers: [ TokenConstantsService, AppConstantsService ],
	exports: [ TokenConstantsService, AppConstantsService ]
})
export class ConstantsModule {
}

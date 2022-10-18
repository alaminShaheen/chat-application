import { Global, Module } from '@nestjs/common';
import { AppErrorMessagesService } from './app-error-messages.service';
import { DocumentationMessagesService } from './documentation-messages.service';
import { DtoErrorMessagesService } from './dto-error--messages.service';

@Global()
@Module({
	providers: [ AppErrorMessagesService, DocumentationMessagesService, DtoErrorMessagesService ],
	exports: [ AppErrorMessagesService, DocumentationMessagesService, DtoErrorMessagesService ]
})
export class AppMessagesModule {
}

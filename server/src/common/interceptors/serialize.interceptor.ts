import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

// custom decorator to shorten serialize syntax
export function SerializeTo (dto: ClassConstructor<any>) {
	return UseInterceptors(new SerializeInterceptor(dto));
}

class SerializeInterceptor implements NestInterceptor {
	constructor (private readonly dto: ClassConstructor<any>) {
	}
	
	intercept (context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		// run something before request is handled
		return next.handle().pipe(
			map((data: any) => {
				// run something before sending response
				// converts User instance to dto instance
				return plainToInstance(this.dto, data, {
					excludeExtraneousValues: true
				});
			})
		);
	}
	
}

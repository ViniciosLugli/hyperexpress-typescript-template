import { Request, Response, MiddlewareNext } from 'hyper-express';

abstract class Middleware {
	public abstract handle(request: Request, response: Response, next: MiddlewareNext): Promise<void>;

	public getHandler(): (request: Request, response: Response, next: MiddlewareNext) => Promise<void> {
		return this.handle.bind(this);
	}
}

export default Middleware;

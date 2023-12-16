import { Request, Response } from 'hyper-express';

interface Handlers {
	[key: string]: (request: Request, response: Response) => Promise<void>;
}

abstract class Endpoint {
	public abstract path: string;

	public get?(request: Request, response: Response): Promise<void>;
	public post?(request: Request, response: Response): Promise<void>;
	public put?(request: Request, response: Response): Promise<void>;
	public delete?(request: Request, response: Response): Promise<void>;

	public getHandlers(): Handlers {
		const handlers: Handlers = {};
		const methods = ['get', 'post', 'put', 'delete'];

		methods.forEach((method) => {
			const handler = (this as unknown as Handlers)[method];
			if (handler) {
				handlers[method] = handler;
			}
		});

		return handlers;
	}
}

export default Endpoint;
export { Handlers };

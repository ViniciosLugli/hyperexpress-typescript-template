import { Server, Router } from 'hyper-express';
import EndPoint from './endpoint';

class Route {
	private endpoints: EndPoint[] = [];
	private router: Router;
	public path: string;

	constructor(path: string = '/') {
		this.path = path;
		this.router = new Router();
	}

	public addEndpoint(endpoint: EndPoint): void {
		this.endpoints.push(endpoint);
	}

	public setup(server: Server): void {
		this.endpoints.forEach((endpoint) => {
			const handlers = endpoint.getHandlers();
			for (const method in handlers) {
				if (handlers.hasOwnProperty(method)) {
					const handler = handlers[method];
					if (handler) {
						console.log(`Adding method ${method.toUpperCase()} to endpoint ${endpoint.path} on route ${this.path}`.yellow);
						(this.router as any)[method](endpoint.path, handler);
					}
				}
			}
		});

		console.log(`Adding router ${this.path} to server`.magenta);
		server.use(this.path, this.router);
	}
}

export default Route;

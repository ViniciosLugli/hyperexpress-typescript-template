import 'colorts/lib/string';
import { Server, Router } from 'hyper-express';
import Endpoint from './endpoint';
import Middleware from './middleware';

class Route {
	private endpoints: Endpoint[] = [];
	private middlewares: Middleware[] = [];
	private routers: Route[] = [];
	private router: Router;
	public path: string;

	constructor(path: string = '/') {
		this.path = path;
		this.router = new Router();
	}

	public add(object: Endpoint | Middleware | Route): void {
		if (object instanceof Endpoint) {
			this.endpoints.push(object);
		} else if (object instanceof Middleware) {
			this.middlewares.push(object);
		} else if (object instanceof Route) {
			this.routers.push(object);
		}
	}

	public setup(server: Server): void {
		if (this.routers.length !== 0) {
			console.log(`Adding routers to route '${this.path}'`.magenta);
			this.routers.forEach((router) => {
				console.log(`Adding router '${router.path}' to route '${this.path}'`.magenta);
				router.setup(server);
			});
		}

		if (this.middlewares.length !== 0) {
			console.log(`Adding middlewares to route '${this.path}'`.magenta);
			this.middlewares.forEach((middleware) => {
				console.log(`Adding middleware to route '${this.path}'`.magenta);
				this.router.use(middleware.getHandler());
			});
		}

		if (this.endpoints.length != 0) {
			console.log(`Adding endpoints to route '${this.path}'`.magenta);
			this.endpoints.forEach((endpoint) => {
				const handlers = endpoint.getHandlers();
				for (const method in handlers) {
					if (handlers.hasOwnProperty(method)) {
						const handler = handlers[method];
						if (handler) {
							console.log(`Adding method ${method.toUpperCase()} to endpoint '${endpoint.path}'`.yellow);
							(this.router as any)[method](endpoint.path, handler);
						}
					}
				}
			});
		}
		console.log(`Adding router '${this.path}' to server`.magenta);
		server.use(this.path, this.router);
	}
}

export default Route;

import { Request, Response } from 'hyper-express';
import WebServer from './base/webserver';
import Route from './base/route';
import EndPoint from './base/endpoint';
import Middleware from './base/middleware';

class HelloWorldEndpoint extends EndPoint {
	public path = '/';

	public async get(_request: Request, response: Response): Promise<void> {
		response.send(response.locals.message);
	}
}

class HelloWorldMiddleware extends Middleware {
	public async handle(_request: Request, response: Response, next: () => void): Promise<void> {
		response.locals.message = 'Hello, World!';
		next();
	}
}

const server = new WebServer();

const route = new Route();
route.add(new HelloWorldMiddleware());
route.add(new HelloWorldEndpoint());

server.add(route);

server.start(3000, '0.0.0.0');

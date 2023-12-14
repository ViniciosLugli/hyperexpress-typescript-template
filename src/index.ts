import { Request, Response } from 'hyper-express';
import WebServer from './base/webserver';
import Route from './base/route';
import EndPoint from './base/endpoint';
import Middleware from './base/middleware';

class HelloWorldEndpoint extends EndPoint {
	public path = '/';

	public async get(_request: Request, response: Response): Promise<void> {
		response.send('Hello, World!');
	}
}

class HelloWorldMiddleware extends Middleware {
	public async handle(_request: Request, _response: Response, next: () => void): Promise<void> {
		console.log('Hello, World! from middleware');
		next();
	}
}

const server = new WebServer();

const helloWorldEndpoint = new HelloWorldEndpoint();
const route = new Route();

route.add(new HelloWorldMiddleware());
route.add(helloWorldEndpoint);
server.add(route);

server.start(3000, '0.0.0.0');

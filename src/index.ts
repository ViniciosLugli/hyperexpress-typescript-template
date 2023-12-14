import EndPoint from './base/endpoint';
import { Request, Response } from 'hyper-express';
import WebServer from './base/webserver';
import Route from './base/route';

class HelloWorldEndpoint extends EndPoint {
	public path = '/';

	public async get(_request: Request, response: Response): Promise<void> {
		response.send('Hello, World!');
	}
}

const server = new WebServer();

const helloWorldEndpoint = new HelloWorldEndpoint();
const route = new Route();

route.addEndpoint(helloWorldEndpoint);
server.addRoute(route);

server.start(3000, '0.0.0.0');

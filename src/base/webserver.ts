import 'colorts/lib/string';
import { Server } from 'hyper-express';
import Route from './route';

class WebServer {
	private server: Server;

	constructor() {
		this.server = new Server();
	}

	public start(port: number = 3000, host: string = 'localhost'): void {
		this.server
			.listen(port, host)
			.then((_socket) => {
				console.log(`Server ready on http://${host}:${port}`.green);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	public addRoute(route: Route): void {
		route.setup(this.server);
	}
}

export default WebServer;

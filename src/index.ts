import { Request, Response } from 'hyper-express';
import WebServer from './base/webserver';
import Route from './base/route';
import EndPoint from './base/endpoint';
import Middleware from './base/middleware';
import SessionEngine from 'hyper-express-session';

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

//const sessionEngine = new SessionEngine({
//	duration: 1000 * 60 * 45,
//	cookie: {
//		name: 'he-session',
//		path: '/',
//		httpOnly: false,
//		secure: true,
//		sameSite: 'strict',
//		secret: process.env.SESSION_SECRET || 'secret',
//	},
//});

//sessionEngine.use('read', async (session) => {
//	const data = await redis.get('session:' + session.id);
//	if (typeof data == 'string') return JSON.parse(data);
//});

//sessionEngine.use('touch', async (session) => {
//	return await redis.pexpireat('session:' + session.id, session.expires_at);
//});

//sessionEngine.use('write', async (session) => {
//	const key = 'session:' + session.id;

//	// We use redis pipeline to perform two operations in one go
//	return await redis.pipeline().set(key, JSON.stringify(session.get())).pexpireat(key, session.expires_at).exec();
//});

//sessionEngine.use('destroy', async (session) => {
//	return await redis.del('session:' + session.id);
//});

//server.use(TestEngine)

const server = new WebServer();

const route = new Route();
route.add(new HelloWorldMiddleware());
route.add(new HelloWorldEndpoint());

server.add(route);

server.start(3000, '0.0.0.0');

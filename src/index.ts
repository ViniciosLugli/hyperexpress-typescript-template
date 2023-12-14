import HyperExpress from 'hyper-express';

const webserver = new HyperExpress.Server();
const PORT = Number(process.env.PORT) || 3000;

webserver.get('/', (request, response) => {
	response.send('Hello World');
});

webserver
	.listen(3000)
	.then((socket) => console.log(`Webserver started on port ${PORT}`))
	.catch((error) => console.log(`Webserver failed to start: ${error}`));

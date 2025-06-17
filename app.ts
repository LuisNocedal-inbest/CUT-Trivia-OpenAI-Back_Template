import Server from "./src/server";
import serverless from 'serverless-http';

const server = new Server();
server.listen();

export const handler = serverless(server.app);
import express, { Application } from 'express';
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger'; // Ajusta la ruta si es necesario
import * as dotenv from 'dotenv'
dotenv.config()

import { PORT } from './helpers/constants';

import userRouter from './routes/user.routes';
import chatyRouter from './routes/chaty.routes';

class Server {

    public app: Application;
    private port: number;
    private apiPaths: { [key: string]: string }

    constructor() {
        this.app = express();
        this.port = PORT;
        this.apiPaths = {
            user: '/user/',
            chaty: '/chaty/',
        }

        this.initSwagger();

        this.middlewares();
        this.routes();
        this.treblleCofig();
    }

    private async treblleCofig() {

    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
    }

    private routes() {
        this.app.use(this.apiPaths.user, userRouter);
        this.app.use(this.apiPaths.chaty, chatyRouter);
    }

    private initSwagger() {
        this.app.get('/',(req, res) => { res.send("API Works!") })
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en http://localhost:' + this.port);
        })
    }
}

export default Server;
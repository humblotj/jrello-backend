import express from "express"; //web demon
import morgan from "morgan"; //log middleware
import helmet from "helmet"; //express secure module
import compression from "compression"; //source compress
import cors from "cors"; //Cross Origin Resource Sharing.. ex) a-client.com <-> b-api.com
import mongoose from "mongoose"; //mongodb framework
import dotenv from "dotenv"; //.env use for typescript
dotenv.config();

import BoardRoutes from './routes/board.routes';
import ListRoutes from './routes/list.routes';
import CardRoutes from './routes/card.routes';

class Server {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        mongoose
            .connect(String(process.env.MONGODB_URI))
            .then((db) => {
                console.log(`MongoDB is connected on ${process.env.MONGODB_URI}`);
                console.log(db);
            })
            .catch((err) => {
                console.log(`MongoDB error : ${err}`);
            });
        this.app.set("port", process.env.API_PORT || 3800);
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended:  }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes() {
        this.app.use("/board", BoardRoutes);
        this.app.use("/list", ListRoutes);
        this.app.use("/card", CardRoutes);
    }

    start() {
        this.app.listen((process.env.PORT || 3800), () => {
            console.log(`Server on port ${this.app.get("port")}`);
        });
    }
}

const server = new Server();
server.start();

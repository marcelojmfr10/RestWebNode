
import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {

        //* middlewares

        //* public folder
        this.app.use(express.static(this.publicPath));

        //* routes
        this.app.use(this.routes);

        // esto funciona en la versión 4.8
        // this.app.get('*', (req, res) => {
        //     console.log(req.url);
        //     res.send('hola mundo');
        // });

        //* Manejador de rutas para SPA    
        this.app.use((req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            // res.sendFile(path.join(process.cwd(), "public", "index.html")); 
            res.sendFile(path.join(indexPath));
        });

        this.app.listen(this.port, () => {
            console.log(`server running on port ${this.port}`);
        });
    }
}


import express from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
    }

    async start() {

        //* middlewares

        //* public folder
        this.app.use(express.static(this.publicPath));

        // this.app.get('*', (req, res) => {
        //     console.log(req.url);
        //     res.send('hola mundo');
        // });

        // Manejador de rutas para SPA    
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

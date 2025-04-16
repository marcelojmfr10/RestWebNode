
import http from 'http';

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.write('hola mundo');
    res.end();
});

server.listen(8080, () => {
    console.log('server running on port 8080');
});


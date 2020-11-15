const http = require ('http');
const app = require ('./backend/app')

const porta = process.env.PORT || 3100;



app.set('port', porta);

const server = http.createServer (app);

server.listen (porta);

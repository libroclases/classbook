import https from "https";
import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes';
import fs from 'fs';

var cors = require('cors');

const hostname = '0.0.0.0';

const environment = process.env.NODE_ENV || 'development';

const port = 3000;
const app = express() // setup express application

app.use(cors({origin: '*'}));

app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

if (environment === 'development') {

  const server = http.createServer(app);

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    });

  app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the default API route',
    }));
          

} else if (environment === 'production') {

  https.createServer({
    cert: fs.readFileSync('/etc/letsencrypt/live/libroclases.cl/cert.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/libroclases.cl/privkey.pem')
  },app).listen(port, function(){
         console.log(`Servidor https corriendo en el puerto ${port}`);
 });

}



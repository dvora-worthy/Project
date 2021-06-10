import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import {config} from 'dotenv-flow'

import healthcheckRouteRoute from './routes/healthcheck.route';
import creditCardRoute from './routes/creditCard.routes';

// Create Express server
const app = express();
config()

// Express configuration
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Primary app routes.
 */

app.use('/healthcheck', healthcheckRouteRoute);

app.post('/api/charge', creditCardRoute)


export default app;

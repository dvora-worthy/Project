import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import healthcheckRouteRoute from './routes/healthcheck.route';
import creditCardRoute from './routes/creditCard.routes';

import config from './config';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import logger from './util/logger';
import {CreditCardController} from "./controllers/creditCard.controller";

// Create Express server
const app = express();
app.set('config', config);


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

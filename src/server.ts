import app from './app';
import logger from './util/logger';

const port = process.env.PORT || 8000
/**
 * Start Express server.
 */

const server = app.listen(port, () => logger.info(`app is listening on port ${port}`));


export default server;

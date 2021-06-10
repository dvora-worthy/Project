import { Logger, LoggerOptions, transports } from 'winston';

const logLevel = process.env.LOG_LEVEL;

const options: LoggerOptions = {
    transports: [
        new transports.Console({
            level: logLevel,
        }),
    ],
};

const logger = new Logger(options);

logger.debug(`Logging initialized at ${logLevel} level`);

export default logger;

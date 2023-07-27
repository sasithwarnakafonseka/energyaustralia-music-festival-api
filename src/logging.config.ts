import * as winston from 'winston';
import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';

const logFormat = winston.format.printf(
  ({ timestamp, level, message, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `[${timestamp}] ${level}: ${message} ${metaString}`;
  },
);

const logDirectory = path.resolve(__dirname, '..', 'logs');
if (!existsSync(logDirectory)) {
  mkdirSync(logDirectory);
}

const logFilePath = path.join(logDirectory, 'application.log');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      filename: logFilePath,
      maxsize: 10485760, // 10MB
      maxFiles: 5,
      tailable: true,
      format: winston.format.combine(winston.format.timestamp(), logFormat),
    }),
  ],
});

export { logger };

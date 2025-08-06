import winston from "winston";

const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, stack }) => {
            return `${timestamp} [${level}]: ${stack || message}`;
        })
    ),
});

export const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp()
    ),
    transports: [consoleTransport],
});

const { createLogger, format, transports } = require("winston");;
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    level = level.padEnd(5);
    //format le timestamp pour être plus joli
    return `${timestamp} [${level}]: ${message}`;
});

const logs = createLogger({
    level: 'debug',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log', level: 'info' }),
        new transports.File({ filename: 'logs/debug.log', level: 'debug'}),
    ],
});

module.exports = (req, res, next) => { // next() sert à passer le relai au middleware suivant
    try {
        const { method, url, baseUrl } = req;
        const log = method + ' ' + baseUrl + url;
        logs.debug(log);
        next();
    } catch {
        res.status(501).json({message: 'Erreur au niveau du middleware : logger'})
    }
};
import fs from "fs";
import path from "path";
import winston from "winston";

const logDir = "logs";

// garante que a pasta exista
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, "app.log") }),
    new winston.transports.Console(), // também mostra no terminal
  ],
});

export default logger;
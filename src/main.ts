// app entry point 

import App from "./app";
import LoggerService from "./logger/logger.service";

async function bootstrap() {
    const app = new App(new LoggerService());
    app.init();
}

bootstrap();
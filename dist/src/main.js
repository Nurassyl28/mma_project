"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    var _a, _b;
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        exceptionFactory: (errors) => new common_1.BadRequestException(errors.map((err) => { var _a; return Object.values((_a = err.constraints) !== null && _a !== void 0 ? _a : {}); }).flat())
    }));
    const port = +((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000);
    const host = (_b = process.env.HOST) !== null && _b !== void 0 ? _b : '127.0.0.1';
    const listenDisabled = process.env.DISABLE_HTTP_LISTEN === 'true';
    if (listenDisabled) {
        logger.warn('HTTP listener disabled via DISABLE_HTTP_LISTEN=true; initializing app without binding a port.');
        await app.init();
        await new Promise(() => { });
        return;
    }
    try {
        await app.listen(port, host);
    }
    catch (error) {
        const errno = error === null || error === void 0 ? void 0 : error.code;
        if (errno === 'EPERM' || errno === 'EADDRINUSE') {
            logger.warn(`Port binding blocked (${errno}). Continuing without HTTP listener. Set DISABLE_HTTP_LISTEN=true to skip binding altogether.`);
            await app.init();
            await new Promise(() => { });
            return;
        }
        throw error;
    }
}
bootstrap();
//# sourceMappingURL=main.js.map
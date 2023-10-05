"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorization = void 0;
function checkAuthorization(req, res, next) {
    if (req.headers['authorization']) {
        return next(); // Продолжаем, если пользователь авторизован и имеет необходимое право
    }
    res.status(403).send('Нет доступа');
}
exports.checkAuthorization = checkAuthorization;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.perm = void 0;
function perm(req, res, next) {
    if (req.body['authorization']) {
        return next(); // Продолжаем, если пользователь авторизован и имеет необходимое право
    }
    res.status(403).send('Нет доступа');
}
exports.perm = perm;

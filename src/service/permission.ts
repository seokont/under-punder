import express, { NextFunction, Request, Response } from "express";

export function perm(req:Request, res:Response, next:NextFunction) {
    if (req.body['authorization'] ) {
        return next(); // Продолжаем, если пользователь авторизован и имеет необходимое право
    }
    res.status(403).send('Нет доступа');
}

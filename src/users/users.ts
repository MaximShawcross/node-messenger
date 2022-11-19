import express, { Router } from "express";
// создание марщрута. доступ к ним осуществим через
// /users/login, /users/register
export const router: Router = express.Router();

router.post('/login', (req, res) => {
    res.send("login");
});

router.post('/register', (req, res) => {
    res.send("register");
});

import { Router } from "express";
import { check } from "express-validator";
import { createUser, loginUser, renewToken } from "../controllers/user.js";
import { validateJwt } from "../middlewares/validate-jwt.js";
import { validarCampos } from "../helpers/validar-campos.js";

export const userRouter = Router()

userRouter.post('/new', [
    check('username', "the field is obligatory").not().isEmpty(),
    check('email',"the field is obligatory").isEmail(),
    check('password', "the field is obligatory").isLength({min: 6}),
    validarCampos
],createUser);
userRouter.post('/login',[
    check('email',"the field is obligatory").isEmail(),
    check('password', "the field is obligatory").isLength({min: 6}),
    validarCampos
] ,loginUser)
userRouter.get('/renew', validateJwt, renewToken)

import { Router } from "express";
import { deleteUrl, generateShortenUrl, getUrls, redirectUrl, updateUrl } from "../controllers/url.js";
import { validateJwt } from "../middlewares/validate-jwt.js";


export const urlRouter = Router();

urlRouter.post('/', generateShortenUrl)

urlRouter.get('/:id', redirectUrl)

urlRouter.get('/',validateJwt,getUrls)
urlRouter.patch('/:id', validateJwt,updateUrl)
urlRouter.delete('/:id', validateJwt,deleteUrl)

import { response } from 'express'
import {validationResult} from 'express-validator'

export const validarCampos =  async(req, res=response, next)=>{
    const validation = validationResult(req)
     

    if(!validation.isEmpty()){
        return res.status(400).json({
            ok:false,
            msg: validation.mapped()
        })
    }

    next()
 }
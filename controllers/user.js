import { response } from "express";
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { generateToken } from "../helpers/jwt.js";

export const createUser = async(req,res=response)=>{
    const{username,email,password}  = req.body
    try {
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                ok:false,
                msg:'User with that email already in the database'
            })
        }

        user = new User(req.body)
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt)
        await user.save()
        const token = await generateToken(user.id, user.username)
        res.status(201).json({
            ok:true,
            userName:user.username,
            uuid: user.id,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Communicate with admins'
        })
    }
}


export const loginUser = async(req, res=response)=>{
    const{email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                ok:false,
                msg:'Email or password incorrect'
            })
        }
       const validPassword = bcrypt.compareSync(password,user.password)
       if(!validPassword){
        return res.status(404).json({
            ok:false,
            msg:'Email or password incorrect'
        })
       } 
        const token = await generateToken(user.id,user.username)
       res.status(200).json({
        ok:true,
        userName:user.username,
        uuid: user.id,
        token
       })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Communicate with admins'
        })
    }
}

export const renewToken = async(req,res=response)=>{
    try {
        const uid = req.uid
        const username = req.username
        const token = await generateToken(uid,username)
        
        res.status(201).json({
            ok:true,
            username,
            uid,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Communicate with admins'
        })
    }
}
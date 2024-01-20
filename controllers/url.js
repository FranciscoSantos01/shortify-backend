import { response } from "express"
import URL from "../models/url.js"

export const generateShortenUrl = async(req,res=response)=>{
    
    const newUrl = new URL(req.body)
    try {
        await newUrl.save()
         return res.status(201).json({
            ok:true,
            newUrl
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Communicate with server admins'
        })
    }
}

export const getUrls = async(req,res=response)=>{
    const uid = req.uid;

    try {
        const urls = await URL.find({creator:uid})
        res.status(200).json({
            ok:true,
            urls
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Communicate with server admins'
        })
    }
}

export const updateUrl = async(req,res=response)=>{
    const {id} = req.params
    try {
        let url = await URL.findById(id)
        if(!url){
            return res.status(404).json({
                ok:false,
                msg:'There no url with that id'
            })
        }
       const newPost  = {...req.body, creator:req.uid}
       const postUpdated  =  await URL.findByIdAndUpdate(id,newPost,{new:true})
       res.status(201).json({
        ok:true,
        postUpdated
       })
    } catch (error) {
        console.log(error)
    }
}
export const deleteUrl = async(req,res=response)=>{
    const{id} = req.params
    try {
        let url = await URL.findById(id)
        if(!url){
            return res.status(404).json({
                ok:false,
                msg:'There no url with that id'
            })
        }
        await URL.findOneAndDelete(id)
        res.status(200).json({
            ok:true,
            msg:'url deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Communicate with admins'
        })
    }
}
export const redirectUrl = async(req,res=response)=>{
    const{id} = req.params
    try {
        const url= await URL.findOne({shortUrl:id})
        if(!url){
            return res.status(404).json({
                ok:false,
                error:'Theres no url with that identifier'
            })
        }
        if(url.disabled){
            return res.status(404).json({
                ok:false,
                msg:'This link is inactive'
            })
        }
        url.totalClicks++
        url.save()
        res.redirect(url.fullUrl)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Communicate with server admins'
        })
    }
}
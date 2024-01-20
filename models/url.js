import {Schema, model} from 'mongoose'
import { nanoid } from 'nanoid'

 const UrlModel = new Schema({
    urlName:{
        type:String,
        required:true,
        default:()=>`random_user${nanoid(3)}`
    },
    fullUrl:{
        type:String,
        required: true
    },
    shortUrl:{
        type:String,
        required:true,
        default:()=>nanoid(8)
    },
    disabled:{
        type:Boolean,
        required:true,
        default: false
    },
    totalClicks:{
        type:Number,
        default: 0
    },
    creator:{
        type:String,
    }

})

export default model('shortUrl', UrlModel)
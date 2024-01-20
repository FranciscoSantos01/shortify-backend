import jwt from 'jsonwebtoken'

export const generateToken = (uid, username)=>{
    return new Promise((resolve,reject)=>{
        const payload ={uid,username}
        jwt.sign(payload,process.env.JWT_KEY,{expiresIn: '2hr'},
        (err, token)=>{
            if(err){
                console.log(err)
                reject('Token failed production')
            }
            resolve(token)
        }
        )
    })
}
import { dbConnection } from "./database/config.js"
import express,{json} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { urlRouter } from "./router/url.js"
import { userRouter } from "./router/user.js"

const app = express()
dotenv.config();
dbConnection();
app.use(json())
app.use(cors())

app.use('/short',urlRouter)
app.use('/auth/', userRouter)

const PORT = process.env.PORT ?? 4000


app.listen(PORT,()=>{
    console.log(`Server runing in http://localhost:${PORT}`)
})
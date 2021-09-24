import express from "express"
import cors from "cors"
import mediaRoute from "./media/index.js"
import { badRequestHandler, notFoundHandler, forbiddenErrorHandler,internalServerErrorHandler } from "./errorHandlers.js"

const server = express()

const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL]

const corsOpts = {
    orgin: function (origin, next){

        console.log("current origin:", origin)
        if (!origin || whitelist.indexOf(origin) !== -1){
            next(null, true)
        }else{
            next(new Error(`Origin ${origin} not allowed!`))
        }
    },

}

server.use(cors(corsOpts))
server.use(express.json())


server.use("/media", mediaRoute)

const port = process.env.PORT

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(forbiddenErrorHandler);
server.use(internalServerErrorHandler);

server.listen(port, () => {
    console.log("server running on this port:", port)
})
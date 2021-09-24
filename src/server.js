import express from "express"
import cors from "cors"
import mediaRoute from "./media/index.js"
import { badRequestHandler, notFoundHandler, forbiddenErrorHandler,internalServerErrorHandler } from "./errorHandlers.js"

const server = express()

server.use(cors())
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
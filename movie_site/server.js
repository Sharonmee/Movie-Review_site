//setting up the server side of the application
import reviews from "./api/reviews.route.js"//contains the routes
import express from 'express'//import the express framework
import cors from "cors"//allows your api to be used in different locations

const app = express()//creates an instance of the express application

app.use(cors())
app.use(express.json())

app.use("/api/v1/reviews", reviews)
app.use("*",(req,res) => 
res.status(404).json({error: "not found"}))

export default app
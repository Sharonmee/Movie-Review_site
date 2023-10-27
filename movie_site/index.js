import dotenv from "dotenv"
dotenv.config()//used to load environment variables
import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

//setting up mongodb connection parameters
const MongoClient = mongodb.MongoClient
const mongo_username = process.env['Mongo_Username']
const mongo_password = process.env['Mongo_Password']
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.ce4z8ht.mongodb.net/?retryWrites=true&w=majority`

const port = 8080
//after you connect to the mongo database uri specified on the top here, with these settings ,if there is an error catch 
//Mongonot then you create a port that this pc can use to communicate with the database
MongoClient.connect(
    uri,
    {
       maxPoolSize: 50,
       wtimeoutMS: 2500
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit()
})
.then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})
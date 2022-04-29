import express from 'express'
import listendpoints from 'express-list-endpoints'
import mongoose from 'mongoose'
import cors from 'cors'
import reviewRouter from './services/reviews/index.js'

const server = express()
const port = process.env.PORT || 3002


server.use(cors())
server.use(express.json())


// server.use('/product')
server.use('/reviews', reviewRouter)


mongoose.connect(process.env.MONGO_CONNECTION)
mongoose.connection.on('connected', ()=> {
    console.log('Successfully connected to DB')

    server.listen(port, ()=>{
        console.log(`Server is running on port ${port}`)
        console.table(listendpoints(server))
    })
})



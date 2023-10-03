const express = require('express')
const cors = require('cors');
require('./db/mongoose')
const app = express()
const port = 3000
const userRouter = require('./routers/user')

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
}))
app.use(express.json())
app.use(userRouter)

app.listen(port,()=>{
  console.log("listening to the server")
})
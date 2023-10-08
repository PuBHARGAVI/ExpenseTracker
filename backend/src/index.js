const express = require('express')
const cors = require('cors');
const auth = require('./middleware/auth')
require('./db/mongoose')
const app = express()
const port = 3000
const userRouter = require('./routers/user')
const budgetRouter = require('./routers/budget')
const expenseRouter = require('./routers/expense');

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
}))
app.use(express.json())
app.use(userRouter);
app.use(auth);
app.use(budgetRouter);
app.use(expenseRouter);

app.listen(port,()=>{
  console.log("listening to the server")
})
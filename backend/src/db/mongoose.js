const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/expenses-tracker',{
    useNewUrlParser: true
}).then((res) => {
  console.log('Connected to MongoDB',res);
})
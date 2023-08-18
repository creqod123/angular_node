var mongoose = require('mongoose')
mongoose.connect(process.env.DB_HOST)
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.log(err.message))
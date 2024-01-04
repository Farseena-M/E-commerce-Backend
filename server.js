const dotenv=require('dotenv');
dotenv.config({path:'./src/config/config.env'})
const app = require('./app')
const connectDB = require('./src/config/dbconnect');

connectDB()

const port = 9000
app.listen(port, () => {
  console.log(`Listening to ${port}`);
})
// start \Users\Wind\mongodb\bin\mongod.exe --dbpath=\Users\Wind\mongodb-data

const express = require('express');
const userRouter = require('./router/userRouter');
const taskRouter = require('./router/taskRouter');

require('./db/mongoose');

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(userRouter,taskRouter);


app.listen(port, () => {
    console.log('Server is up on port ' + port);
}); 


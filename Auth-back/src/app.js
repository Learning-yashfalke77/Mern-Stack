const app = require('./config/express')
const mongoose = require('./config/mongoose')
const { port } = require('./config/vars')
const error = require('./api/middlewares/error')

mongoose.connect().catch(err => console.log(err));

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})

app.use(error.handler)
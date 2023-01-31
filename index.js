const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log('DB connection successfull'))
  .catch((err) => console.log(err));

//Middleware Function
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

app.listen(process.env.PORT, () => {
  console.log(`The Server Running On the Port ${process.env.PORT}`);
});

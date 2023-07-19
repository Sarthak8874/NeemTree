const express = require("express");
require("./db/mongoose");

var cors = require('cors')
const userRouter = require("./routers/users");
const app = express();

app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use(express.json());
app.use(userRouter);

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

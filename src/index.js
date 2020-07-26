const express = require("express");
const app = express();

require("./db/mongoose");

const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

//middlewares
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));

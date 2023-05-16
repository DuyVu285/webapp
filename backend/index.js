const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const registerRouter = require('./auth/register');
const loginRouter = require('./auth/login');
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRoute');

const app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "ecommerce", 
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.get("/", (req, res) => {
  res.send("Welcome to our online shop API...");
});

app.use(productRouter);
app.use(categoryRouter);
app.use(userRouter);
app.use(express.urlencoded({ extended: true }));
app.use(registerRouter);
app.use(loginRouter);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`));

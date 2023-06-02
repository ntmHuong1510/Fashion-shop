require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3000;
const login = require("./routes/login.route");
const product = require("./routes/product.route");
const user = require("./routes/user.route");
const cart = require("./routes/cart.route");
const payment = require("./routes/payment.route");
const comment = require("./routes/comment.route");
const order = require("./routes/order.route");
const auth = require("./middlewares/auth.middleware");
const cors = require("cors");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan("tiny"));
app.use("/auth", login);
app.use("/user", user);
app.use("/product", product);
app.use("/cart", auth, cart);
app.use("/order", auth, order);
app.use("/payment", payment);
app.use("/comment", comment);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.get("/", auth, (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

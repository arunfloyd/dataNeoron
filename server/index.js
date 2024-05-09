const express = require("express");
const connect = require("./config/dbConnect");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/todoRoutes");
// const { updateTotalCount } = require("./middleware/updatetotalCount");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ res: "Welcome " });
  console.log('good Morning')
});

app.use("/api", routes);

app.listen(PORT, () => {
  connect()
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.error("Error connecting to database:", err);
    });
  console.log(`App is running on http://localhost:${PORT}`);
});

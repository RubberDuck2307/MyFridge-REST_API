require("dotenv").config();

const db = require("./config/db")
const cors = require("cors")
const express = require("express");
const app = express();

// Middleware
app.use(express.json()); // parse json bodies in the request object
app.use(cors({ origin:"http://localhost:63342"
}))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

app.use("/food", require("./routes/foodRouter"));
app.use("/users", require("./routes/usersRouter"))


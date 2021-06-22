const express = require("express");
const dbConfig = require("./config/db.config");
const mongoose = require("mongoose");

mongoose
  .connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Successfully connected to the database...`))
  .catch((err) => {
    console.log(`Could not connect to the databse. Exiting now..., ${err}`);
    process.exit();
  });

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Welcome to Notes App" }));

require("./routes/note.routes")(app);
const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`app listening at localhost:${port}`));

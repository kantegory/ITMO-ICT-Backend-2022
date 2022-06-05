const express = require("express");
const { sequelize, User } = require("../models");
const app = express();
const port = 8000;

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("This is PW2 express app");
});

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.send(user.toJSON());
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.send(user.toJSON());
  } else {
    res.status(404).send({ msg: "user not found" });
  }
});

app.get("/users/email/:email", async (req, res) => {
  const user = await User.findOne({
    where: { email: req.params.email },
  });
  if (user) {
    res.send(user.toJSON());
  } else {
    res.status(404).send({ msg: "user not found" });
  }
});

app.put("/users/:id", async (req, res) => {
  const num = await User.update(req.body, {
    where: { id: req.params.id },
  });
  if (num == 1) {
    res.send({ msg: "user has been updated" });
  } else {
    res.status(404).send({ msg: "user not found" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const user = await User.destroy({ where: { id: req.params.id } });
  if (user) {
    res.send({ msg: "user deleted" });
  } else {
    res.status(404).send({ msg: "user not found" });
  }
});

app.listen(port, async () => {
  await sequelize.sync({ force: true });
  console.log(`PW2 express app on http://127.0.0.1:${port}`);
  console.log("Database synced");
});

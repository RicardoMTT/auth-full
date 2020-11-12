const { Router } = require("express");
const User = require("../models/User");
const router = Router();

const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  await newUser.save();
  const token = jwt.sign({ _id: newUser._id }, "secretKey");
  res.status(200).json({ token });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return res.status(401).send("Yhe email does not exist");
  }
  if (user.password !== password) {
    return res.status(401).send("Wrong password");
  }
  const token = jwt.sign({ _id: user.id }, "secretKey");
  return res.status(200).json({ token });
});

router.get("/tasks", (req, res) => {
  res.json([
    {
      _id: 1,
      name: "task one",
      description: "lorem",
      date: "2020-11-09T21:50:20.741Z",
    },
    {
      _id: 2,
      name: "task two",
      description: "lorem",
      date: "2020-11-09T21:50:20.741Z",
    },
    {
      _id: 3,
      name: "task three",
      description: "lorem",
      date: "2020-11-09T21:50:20.741Z",
    },
  ]);
});

router.get("/private-task", verifyToken, (req, res) => {
  res.json([
    {
      _id: 1,
      name: "task one",
      description: "lorem",
      date: "2020-11-09T21:50:20.741Z",
    },
    {
      _id: 2,
      name: "task two",
      description: "lorem",
      date: "2020-11-09T21:50:20.741Z",
    },
    {
      _id: 3,
      name: "task three",
      description: "lorem",
      date: "2020-11-09T21:50:20.741Z",
    },
  ]);
});

router.get("/hola", (req, res) => {
  res.send("holaa");
});
function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorize request");
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send("Unauthorize request");
  }
  const payload = jwt.verify(token, "secretKey");
  req.userId = payload._id;
  next();
}

module.exports = router;

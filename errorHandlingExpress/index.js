const express = require("express");
const app = express();
const morgan = require("morgan");
const appError = require("./appError");
app.use(morgan("dev"));

app.use("/dogs", (req, res, next) => {
  console.log("Log for any HTTP request type to /dogs");
  next();
});
//This will run on every single request, no matter the type!
//i.e app.use(express.urlencoded)
// app.use((req, res, next) => {
//   console.log("FIRST MIDDLEWARE");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("SECOND MIDDLEWARE");
//   next();
// });

//This will console log the request type and
//the path the user requested. Close to what Morgan does.
// app.use((req, res, next) => {
//   //   req.method = "POST";
//   console.log(req.method, req.path);
//   req.requestTime = Data.now();
//   next();
// });

const passwordChecker = (req, res, next) => {
  const { password } = req.query;
  if (password === "thePassword") {
    next();
  }
  res.send("WRONG PASSWORD");
};

app.get("/", (req, res) => {
  res.send("HOME");
});

const Xe = 2;

app.get("/error", async (req, res, next) => {
  const x = await Xe.findById(Number);
  if (!x) {
    next(new appError("ERRORRR", 404));
  }
  res.send("NO ERRORR");
});

app.get("/secret", passwordChecker, (req, res) => {
  res.send("OUR SECRET WEBSITE");
});

app.get("/dogs", (req, res) => {
  res.send("DOGS");
});

app.use((err, req, res, next) => {
  console.log("**********There's been an error.**********");
  const { status = 403, message = "COULD NOT FIND REQUEST" } = err;
  res.status(status).send(message);
});

app.use((req, res) => {
  res.status(404).send("ERROR, NO CONTENT WAS FOUND");
});

app.listen(3000, () => {
  console.log("Port 3000 running.");
});

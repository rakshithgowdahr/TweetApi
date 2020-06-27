var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const Twitter = require("twitter");
const cors = require("cors");

global.client = new Twitter({
  consumer_key: "cFyLTyeP2PBoBxWrOWkZatlxN",
  consumer_secret: "8QQncJ9MKv30pFnqnrt1VqeCYddeBajKSttYSyso4ZAiVscHKe",
  access_token_key: "908880958576668672-mFlHQUD4tJ3JPd22oh2eDkdwiqKie73",
  access_token_secret: "cEPxdCuKKLyzDSPdbJP5aHuqfUz4MleI7OeHmTSo3SsFY"
  //bearer_token: 'AAAAAAAAAAAAAAAAAAAAAFM5FQEAAAAANCeok8AHVAp3mRi%2BI4TSvuAFNgU%3DBOLwo96ZWnuPGYktugGQPJsrvASJU6EoJTNx0x9ZLgYPpOnT89'
});

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;

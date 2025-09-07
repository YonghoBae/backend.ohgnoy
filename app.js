#!/usr/bin/env node

/**
 * Module dependencies.
 */
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var studysRouter = require("./routes/study");
var postRouter = require("./routes/post");
var sequelize = require("./models/index.js").sequelize;
const cors = require("cors");
var http = require("http");
var debug = require("debug")("ohgnoy-backend:server");
const webSocket = require("./socket");

var app = express();

const MAX_RETRIES = 10;
const RETRY_DELAY = 3000; // 3초

const connectWithRetry = async (retries = MAX_RETRIES) => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB 연결 성공');
    await sequelize.sync();
    console.log('✅ 모델 동기화 완료');
  } catch (err) {
    console.error(`❌ DB 연결 실패. 남은 시도: ${retries - 1}`, err.message);
    if (retries > 1) {
      setTimeout(() => connectWithRetry(retries - 1), RETRY_DELAY);
    } else {
      console.error('🔥 DB 연결 시도 모두 실패. 서버 종료');
      process.exit(1);
    }
  }
};

connectWithRetry();


// 모든 웹사이트/모바일 프론트에서 RESTAPI를 접근할 수 있게 허락함
app.use(cors());

// app.use(
//   cors({
//     methods: ["GET", "POST", "DELETE", "OPTIONS"],
//     origin: ["http://localhost:3000"],
//   })
// );

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/study", studysRouter);
app.use("/post", postRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);

webSocket(server);

server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

module.exports = app;

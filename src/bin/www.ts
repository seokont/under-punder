import host from "../app";

import debug from "debug";
import ErrnoException = NodeJS.ErrnoException;

const { app, server } = host;
const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

process.on("unhandledRejection", (error) => {
  throw error;
});

process.on("uncaughtException", (error) => {
  setTimeout(() => process.exit(1), 1500);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: number | string) {
  const port = parseInt("" + val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error: ErrnoException) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

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

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debug("Listening on " + bind);
}

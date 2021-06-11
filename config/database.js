const mongoose = require("mongoose");
const colors = require("colors");
module.exports = function (url) {
  mongoose.connect(url);
  mongoose.connection.on("connected", () =>
    console.log(`Mongoose conectado em ${url}`.blue)
  );

  mongoose.connection.on("disconected", () =>
    console.log(`Mongoose desconectado`.yellow)
  );

  mongoose.connection.on("error", (err) =>
    console.log(`Mongoose Error: ${err}`.red)
  );

  process.on("SIGINT", () =>
    mongoose.connection.close(() => {
      console.log("Mongoose Encerrado");
      process.exit(0);
    })
  );
};

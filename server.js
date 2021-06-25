const colors = require("colors");
const app = require("./config/express")();
require("./config/database")(
  "mongodb+srv://lucasalmeida:lucasalmeida12@cluster0.mmsst.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

app.listen(
  app.get("port"),
  console.log("Server on http://localhost:3000".blue)
);

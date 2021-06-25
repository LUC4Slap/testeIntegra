const jwt = require("jsonwebtoken");
const enviroment = require("../common/envarioment");
module.exports = function auth(req, res, next) {
  const authorization = req.headers.authorization;
  if (authorization) {
    let data = authorization.split(" ");
    let token = data[1].replace(/'/g, "");
    jwt.verify(token, enviroment.saltJWT, function (error, decode) {
      if (error) {
        res.status(404).json({ message: "Token invalido" });
      }
      if (decode.level !== "admin") {
        res.status(404).json({ message: "Voçê não é administrador" });
        next(false);
      }
      next();
    });
  } else {
    res
      .status(404)
      .json({ message: "Somente adminitradores podem ver os usuarios" });
    next(false);
  }
};

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // "Bearer " + token
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    req.userData = { mail: decodedToken.email, userId: decodedToken.userId}
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed",
      error: error
    });
  }
}

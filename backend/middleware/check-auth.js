const jwt = require("jsonwebtoken");

module.exports = (request, reply, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    // check id token is valid using the secret we created it with
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    request.userData = {
      email: decodedToken.email,
      userType: decodedToken.userType,
      partnerId: decodedToken.partnerId,
    };
    done();
  } catch (error) {
    reply.status(401).send({
      message: "You are not authenticated!",
    });
  }
};

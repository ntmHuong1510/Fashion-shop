const jwt = require("jsonwebtoken");
const { extractToken } = require("../utils/common.util");
const jwtSecret = process.env.JWT_SERECT;
const commonUtils = require("../utils/common.util");

const verifyToken = (req, res, next) => {
  const token = extractToken(req);

  if (token) {
    jwt.verify(token, jwtSecret, (err) => {
      if (err) {
        return res.json(
          commonUtils.formatResponse(
            "Not authorized, token not available",
            401,
          ),
        );
      } else {
        next();
      }
    });
  } else {
    return res
      .status(200)
      .json(
        commonUtils.formatResponse("Not authorized, token not available", 401),
      );
  }
};

module.exports = verifyToken;

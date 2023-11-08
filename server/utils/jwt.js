const jwt = require("jsonwebtoken");

async function signToken(data) {
  return jwt.sign({ data }, process.env.JSON_WEB_TOKEN_SECRET);
}

module.exports = {
  signToken,
};
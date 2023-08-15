async function authorization(req, res) {

  const failedResponse = { error: 'Wrong Token' };

  const authorizationHeader = req.get("Authorization");
  if (!authorizationHeader) {
    return res.status(403).json(failedResponse);
  }

  if (!authorizationHeader.startsWith('Bearer ')) {
    return res.status(403).json(failedResponse);
  }

  const token = authorizationHeader.substring(7); // Remove 'Bearer ' from the token

  let decodedUser;

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json(failedResponse);
    } else {
      decodedUser = decoded;
    }
  });


  if (!decodedUser || !decodedUser.id) {
    return res.status(403).json(failedResponse);
  }

  req.authorization_id = decodedUser.id;

  return;
};

module.exports = authorization;
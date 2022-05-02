const badRequest = (res, message) => {
  return res.status(401).send({ message });
};
module.exports = badRequest;

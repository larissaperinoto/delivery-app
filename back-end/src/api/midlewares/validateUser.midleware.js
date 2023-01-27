const validateLoginFields = require('../utils/validateLoginFields');

const validateLogin = (req, res, next) => {
  const message = validateLoginFields(req.body);
  if (message) return res.status(400).json({ message });

  next();
};

module.exports = validateLogin;

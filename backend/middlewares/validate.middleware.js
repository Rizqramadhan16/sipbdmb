const { error } = require('../utils/response');

module.exports = (schema) => {
  return (req, res, next) => {
    const { error: err, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (err) {
      const messages = err.details.map((d) => d.message).join(', ');
      return error(res, messages, 422);
    }

    req.body = value;
    next();
  };
};
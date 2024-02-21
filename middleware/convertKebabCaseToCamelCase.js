const _ = require('lodash');

function convertKebabCaseToCamelCase(req, res, next) {
  if (req.body) { 
    const convertedBody = {};
    Object.keys(req.body).forEach((key) => {
      const camelCaseKey = _.camelCase(key);
      convertedBody[camelCaseKey] = req.body[key];
    });
    req.body = convertedBody;
  }
  next();
}

module.exports = convertKebabCaseToCamelCase;

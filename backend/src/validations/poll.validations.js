const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .min(1)
    .required(),
  entries: Joi.array()
    .required()
    .min(2)
    .max(7)
});

//TODO: add in validation for duplicate values;

const validateAgainstSchema = requestBody => {
  return schema.validate(requestBody);
};

module.exports = validateAgainstSchema;

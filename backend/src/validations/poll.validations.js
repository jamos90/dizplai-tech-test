const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .min(1)
    .required(),
  description: Joi.string()
    .required()
    .min(1),
  status: Joi.string()
    .required()
    .valid("inactive"),
  totalVotes: Joi.number()
    .required()
    .default(0),
  options: Joi.array()
    .required()
    .min(2)
    .max(7)
    .items(
      Joi.object({
        name: Joi.string()
          .min(1)
          .max(20)
          .required(),
        totalVotes: Joi.number()
          .required()
          .default(0)
      })
    )
});

//TODO: add in validation for duplicate values;

const validateAgainstSchema = requestBody => {
  return schema.validate(requestBody);
};

module.exports = validateAgainstSchema;

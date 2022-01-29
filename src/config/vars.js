const dotenv = require('dotenv');
const path = require('path');
const joi = require('joi');

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: joi
      .number()
      .postive()
      .default(3000),
    JWT_TOKEN: joi
      .string()
      .required()
      .description('JWT token'),
    JWT_EXPIRATION: joi
      .string()
      .default(30)
      .description('JWT valid duration before expired'),
    MONGODB_URL: joi
      .string()
      .required()
      .description('MongoDB host URL')
    ,
  })
  /* Override the handling of unknown keys
    (if there are more evironments variables in process.env)*/
  .unknown();

const {
  value: envVars,
  error,
} = envVarsSchema
  .prefs({
    errors: {
      label: 'key',
    },
  })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
  },
  jwt: {
    token: envVars.JWT_TOKEN,
    expiration: envVars.JWT_EXPIRATION,
  },
};

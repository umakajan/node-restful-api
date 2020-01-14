/**
 * Create and export configuration variables
 */

const environments = {
  staging: {
    httpPort: 3000,
    httpsPort: 3001,

    envName: 'staging',
  },
  production: {
    httpPort: 5000,
    httpsPort: 5001,
    envName: 'production',
  },
};

const currentEnvironment =
  typeof process.env.NODE_ENV === 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : '';

// Default to staging environment
module.exports = environments[currentEnvironment] || environments.staging;

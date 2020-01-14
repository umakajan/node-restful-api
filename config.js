/**
 * Create and export configuration variables
 */

const environments = {
  staging: {
    port: 3000,
    envName: 'staging',
  },
  production: {
    port: 5000,
    envName: 'production',
  },
};

const currentEnvironment =
  typeof process.env.NODE_ENV === 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : '';

// Default to staging environment
module.exports = environments[currentEnvironment] || environments.staging;

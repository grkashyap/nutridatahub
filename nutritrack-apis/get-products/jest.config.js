/** @type {import('jest').Config} */
const config = {
    extensionsToTreatAsEsm: ['.ts'],
    "transform": {
        "^.+\\.(ts|tsx)$": "babel-jest"
        }
  };
  
  module.exports = config;
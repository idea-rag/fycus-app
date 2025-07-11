const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable package exports to support victory-native
config.resolver.unstable_enablePackageExports = true;

module.exports = config;

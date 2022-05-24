const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = process.env.RN_SRC_EXT
    ? [...process.env.RN_SRC_EXT.split(',').concat(config.resolver.sourceExts), 'cjs']
    : [...config.resolver.sourceExts, 'cjs'] 

// config.resolver.extraNodeModules = require('node-libs-react-native');

module.exports = config;
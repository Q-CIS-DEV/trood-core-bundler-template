const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const paths = require('./paths')
const appPackageJson = require(paths.appPackageJson)

const {
  cssRegex,
  cssModuleRegex,
  sassRegex,
  sassModuleRegex,
  getBabelLoader,
  getStyleLoaders,
} = require('./webpack.global')

module.exports = function ({
  isProduction = false,
  isDevelopment = false,
  shouldUseSourceMap = false,
}) {
  return {
    mode: isProduction ? 'production' : isDevelopment && 'development',
    entry: paths.craftIndexJs,
    output: {
      path: isProduction ? paths.appBuild : undefined,
      filename: isProduction
        ? `static/${appPackageJson.version}/js/craft.index.js`
        : isDevelopment && 'static/js/craft.index.js',
      libraryTarget: 'commonjs2',
    },
    externals: {
      react: 'react',
      '@craftjs/core': '@craftjs/core',
      'prop-types': 'prop-types',
      classnames: 'classnames',
      '$trood/components': '$trood/components',
    },
    resolve: {
      modules: ['node_modules', paths.appNodeModules, paths.appSrc],
    },
    module: {
      rules: [
        getBabelLoader({ compact: true }),
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: getStyleLoaders({
            isCssInJs: true,
            isProduction: true,
            options: {
              importLoaders: 1,
              sourceMap: shouldUseSourceMap,
            },
          }),
          sideEffects: true,
        },
        {
          test: cssModuleRegex,
          use: getStyleLoaders({
            isCssInJs: true,
            isProduction: true,
            options: {
              importLoaders: 1,
              sourceMap: shouldUseSourceMap,
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          }),
        },
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: getStyleLoaders({
            isCssInJs: true,
            isProduction: true,
            preProcessor: 'sass-loader',
            options: {
              importLoaders: 3,
              sourceMap: shouldUseSourceMap,
            },
          }),
          sideEffects: true,
        },
        {
          test: sassModuleRegex,
          use: getStyleLoaders({
            isCssInJs: true,
            isProduction: true,
            preProcessor: 'sass-loader',
            options: {
              importLoaders: 3,
              sourceMap: shouldUseSourceMap,
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          }),
        },
      ],
    },
  }
}

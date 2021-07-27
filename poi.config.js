module.exports = () => {
  const format = process.env.FORMAT_ENV
  
  return {
    entry: 'lib/index.js',
    format: format || 'umd',
    filename: {
      js: `http.${format === 'cjs' ? 'common' : 'min'}.js`
    },
    minimize: true,
    hash: false,
    extendWebpack (config) {
      config.merge({
        externals: {
          axios: 'axios',
        },
      })
    },
  }
}
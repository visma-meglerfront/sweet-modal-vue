module.exports = (options, req) => ({
  entry: './src/main.js',
  extractCSS: false,
  filename: {
    js: 'build.js',
  },
  sourceMap: false,
  html: false,
  format: 'cjs'
})
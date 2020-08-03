import babel from 'rollup-plugin-babel';
import server from 'rollup-plugin-serve';

const env = process.env.ENV
const serverConfig = {
  open: true,
  openPage: '/public/index.html',
  port: 3000,
  contentBase: ''
}

export default {
  input: './src/index.js',

  output: {
    format: 'umd',
    file: 'dist/umd/vue.js',
    name: 'Vue',
    sourcemap: true
  },

  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    env === 'development' ? server(serverConfig) : null
  ]
}
import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'
import size from 'rollup-plugin-size'
import externalDeps from 'rollup-plugin-peer-deps-external'

const external = ['react']

const config = {
  input: 'src/index.js',
  output: {
    file: env === 'production' ? 'react-table.min.js' : 'react-table.js',
    format: 'umd',
    globals: {
      react: 'React',
    },
    name: 'ReactTable',
    exports: 'named',
  },
  external: ['react'],
  plugins: [
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    commonjs({
      namedExports: {
        'react-is': ['isValidElementType', 'isElement'],
      },
    }),
  ],
}

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'ReactTable',
      file: 'dist/react-table.development.js',
      format: 'umd',
      sourcemap: true,
      globals,
    },
    external,
    plugins: [babel(), externalDeps()],
  },
  {
    input: 'src/index.js',
    output: {
      name: 'ReactTable',
      file: 'dist/react-table.production.min.js',
      format: 'umd',
      sourcemap: true,
      globals,
    },
    external,
    plugins: [
      babel(),
      externalDeps(),
      terser(),
      size({
        writeFile: false,
      }),
    ],
  },
]

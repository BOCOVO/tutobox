//import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
//import unused from "rollup-plugin-unused"
import postcss from 'rollup-plugin-postcss';
import { version } from './package.json';
import jsx from "acorn-jsx"

const inputPath = './src'
const outputPath = './dist';

const banner = `/*!
 * Tuto-Box v${version}
 *
 * Copyright (C) 2022 Bocovo Juste (@bocovo_juste).
 *
 * Date: ${new Date().toUTCString()}
 */
`;

const jsPlugins = [
  //unused(),
  resolve(),
  json(),
  alias({
    entries: [
      {
        find: "react",
        replacement: "preact/compat"
      },
      {
        find: "react-dom/test-utils",
        replacement: "preact/test-utils"
      },
      {
        find: "react-dom",
        replacement: "preact/compat"
      },
      {
        find: "react/jsx-runtime",
        replacement: "preact/jsx-runtime"
      }
    ]
  }),
  typescript(),
  commonjs(),
  terser(),
  replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' ),
      preventAssignment:true
    })
];

export default [
  {
    input: `${inputPath}/index.tsx`,
    output: {
      file: `${outputPath}/minified/${pkg.main.replace(/\.js$/, '.min.js')}`,
      banner,
      format: 'umd',
      name: 'TutoBox',
      sourcemap: true,
    },
    plugins: jsPlugins,
    external: ["react"],
    acornInjectPlugins: [jsx()]
  },
  {
    input: `${inputPath}/ui/style/index.scss`,
    output: {
      file: `${outputPath}/minified/index.min.css`,
      format: 'es'
    },
    plugins: [
      postcss({
        sourceMap: true,
        minimize:true,
        extract: true,
      }),
    ]
  },
];

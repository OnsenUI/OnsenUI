import path from 'path';
import pkg from './package.json';
import dateformat from 'dateformat';

// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import execute from 'rollup-plugin-execute';

const local = (...args) => path.resolve(__dirname, ...args);

const banner = `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`;
const babelrc = Object.assign({}, pkg.babel);
babelrc.babelrc = babelrc.presets[0][1].modules = false;
babelrc.plugins = ['external-helpers'];

export default [
    // Angular Bindings
    {
        input: local('index.js'),
        output: {
            file: `dist/${ pkg.name }.js`,
            format: 'umd',
            name: 'angularOns',
            sourcemap: 'inline',
            banner: banner,
        },
        plugins: [
            eslint({
                include: [
                    'js/**/*.js',
                    'directives/**/*.js',
                    'services/**/*.js',
                    'views/**/*.js',
                ],
            }),
            resolve(),
            commonjs({ include: 'node_modules/**' }),
            babel(Object.assign({}, babelrc, { plugins: [['angularjs-annotate', { explicitOnly: false }]] })),
            progress(),
            filesize(),
            execute(`node_modules/.bin/uglifyjs dist/${pkg.name}.js -c -m --comments '/${pkg.name} v/' --output dist/${pkg.name}.min.js`),
        ],
    },
];

import resolve from 'rollup-plugin-node-resolve'
import tsc from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'

import pkg from './package.json'

export default {
    input: 'src/typescript/start.ts',
    treeshake: true,
    output: [
        {
            name: 'todomvc',
            file: 'docs/todomvc.js',
            format: 'iife',
            sourcemap: true,
            banner: `/* feather-ts/todomvc v${pkg.version} */`,
            exports: 'named'
        }
    ],
    plugins: [
        commonjs(),
        resolve({
            browser: true
        }),
        postcss(),
        tsc({
            tsconfigOverride: {
                compilerOptions: {
                    "module": "ES2015",
                    "target": "es5",
                    "declaration": false
                },
                clean: true
            }
        }),
    ],
    external: [
        '@fortawesome/fontawesome-free-webfonts',
        'bulma'
    ]
}

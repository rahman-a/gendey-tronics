// @ts-nocheck
import esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'
import * as packages from "../server/package.json" with { type: 'json' }
const listPackages = [...Object.keys(packages.default.dependencies)]
esbuild
  .build({
    entryPoints: ['index.js'], // Your entry file
    bundle: true,
    platform: 'node',
    target: 'node20', // Set the target Node.js version
    outfile: 'dist/index.cjs',
    plugins: [nodeExternalsPlugin()], // Exclude node_modules
    minify: true, // Minify the output
    sourcemap: true, // Generate a source map
    loader: { '.html': 'file' }, // Load HTML files as text
    external: [
      'esbuild-node-externals',
      'mock-aws-s3',
      'aws-sdk',
      'nock',
      ...listPackages,
    ], // Exclude these packages
    packages: 'external',
  })
  .catch(() => process.exit(1))

/**
 *     "server:build": "rm -rf dist && esbuild index.js --bundle --platform=node --outfile=dist/bundle.cjs --loader:.html=file --external:esbuild-node-externals --external:mock-aws-s3 --external:aws-sdk --external:nock",
 */

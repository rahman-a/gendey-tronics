// @ts-nocheck
import fs from 'fs'
import { simpleSitemapAndIndex } from 'sitemap'
const hostname = 'https://www.gendyecu.com'

const urls = [
  { url: '/', changefreq: 'daily', priority: 1 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
  // Add additional pages here
]

simpleSitemapAndIndex({
  hostname,
  destinationDir: './',
  // or (only works with node 10.17 and up)
  sourceData: urls,
  gzip: false,
}).then((data) => {
  console.log('Data: ', data)
})

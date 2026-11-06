// Rebuild the local 1200 x 630 social card from its HTML source; no network requests.
import { readFileSync } from 'node:fs'
import { chromium } from '@playwright/test'

const font = readFileSync('site/fonts/inter-latin-wght.woff2').toString('base64')
const art = readFileSync('site/img/valley.webp').toString('base64')
const grid = readFileSync('site/img/print-grain.svg').toString('base64')
const html = readFileSync('site-src/share-card.html', 'utf8')
  .replace('__FONT_URL__', `data:font/woff2;base64,${font}`)
  .replace('__ART_URL__', `data:image/webp;base64,${art}`)
  .replace('__GRID_URL__', `data:image/svg+xml;base64,${grid}`)
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.setContent(html)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'site/img/vegeta-share.jpg', type: 'jpeg', quality: 86 }) // the print grid makes a PNG several times larger
} finally {
  await browser.close()
}

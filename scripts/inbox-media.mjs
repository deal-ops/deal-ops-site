// Plan 13 §5.11 (site handbook §5): records the /inbox/ page's clips and stills from the real Deal Ops Inbox UI, in its local
// demo mode (fictional data, recorded model replies, no outbound connections), light or dark.
// Usage: start the demo from a checkout of the public Inbox repo at the commit in inbox.ref, as its README says
//   (DOI_SECRETS_DIR=./demo-secrets docker compose -f docker-compose.yml -f deploy/compose.demo.yml up -d --force-recreate),
// wait until http://127.0.0.1:8080 shows the sign-in page, then here `node scripts/inbox-media.mjs light` (or dark).
// The clips approve a reply and confirm fields, so start the demo again (every `up` resets its database) before the other
// scheme. Needs ffmpeg on PATH. Writes site/inbox/media/{read,understand,check,prepare}-<scheme>-focus.{mp4,jpg}.
// The demo's sign-in page lists its fictional accounts; the clips start after sign-in, so no password is ever in a frame.
import { chromium } from '@playwright/test'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const scheme = process.argv[2]
const BASE = process.argv[3] ?? 'http://127.0.0.1:8080'
if (!['light', 'dark'].includes(scheme)) {
  console.error('usage: node scripts/inbox-media.mjs light|dark [baseURL]')
  process.exit(1)
}
const OUT = 'site/inbox/media'
const VIEW = { width: 1440, height: 860 }
const DPR = 2
mkdirSync(OUT, { recursive: true })
const pause = (page, ms) => page.waitForTimeout(ms)

async function start(page) {
  await page.goto(BASE)
  await page.getByRole('button', { name: 'reviewer', exact: true }).click()
  await page.getByRole('button', { name: 'Sign in', exact: true }).click()
  await page.getByRole('heading', { name: 'Cases' }).waitFor()
  // after a fresh `up` the demo is still taking in its emails for a moment
  await page.getByText(BANK, { exact: true }).first().waitFor({ timeout: 120000 })
  await page.evaluate((z) => document.documentElement.style.setProperty('zoom', String(z)), DPR)
}
async function openCase(page, subject) {
  await page.getByText(subject, { exact: true }).first().click()
  await page.getByRole('heading', { name: subject }).waitFor()
  // right after a fresh `up` a Case may still be in processing: reload until its classification is there
  for (let i = 0; i < 40 && !(await page.getByRole('heading', { name: 'Classification', exact: true }).count()); i++) {
    await pause(page, 3000)
    await page.reload()
    await page.getByRole('heading', { name: subject }).waitFor()
    await page.evaluate((z) => document.documentElement.style.setProperty('zoom', String(z)), DPR)
  }
  await pause(page, 400)
}
const PAID = 'Northwind Robotics payment - has it arrived?'
const BANK = 'Northwind Robotics - change of bank account'

/** Scrolls so `locator` sits `offset` px below the top, either at once or eased over `ms`. */
async function scrollTo(page, locator, offset, ms = 0) {
  const box = await locator.boundingBox()
  const y = (await page.evaluate(() => scrollY)) + box.y - offset
  await page.evaluate(
    ([to, dur]) =>
      new Promise((done) => {
        const from = scrollY
        if (!dur) return done(scrollTo(0, to))
        const t0 = performance.now()
        const step = (t) => {
          const k = Math.min(1, (t - t0) / dur)
          scrollTo(0, from + (to - from) * (1 - Math.pow(1 - k, 3)))
          if (k < 1) requestAnimationFrame(step)
          else done()
        }
        requestAnimationFrame(step)
      }),
    [y, ms],
  )
}

// Each clip: set up the frame, then the recorded actions (≤ 5 s, WCAG 2.2.2). `focus` is the 640 × 400 close-up, from the
// main column's left edge and just above the `top` heading.
const FOCUS = { width: 640, height: 400 }
const CLIPS = {
  // the Case list: each email with its risk, status, queue and due time
  read: {
    focus: { top: 'Cases', dy: -20 },
    crf: '35',
    async setup(page) {
      await start(page)
    },
    async act(page) {
      await pause(page, 900)
      await page.evaluate(
        ([by, dur]) =>
          new Promise((done) => {
            const from = scrollY
            const t0 = performance.now()
            const step = (t) => {
              const k = Math.min(1, (t - t0) / dur)
              scrollTo(0, from + by * (1 - Math.pow(1 - k, 3)))
              if (k < 1) requestAnimationFrame(step)
              else done()
            }
            requestAnimationFrame(step)
          }),
        [340 * DPR, 2200],
      )
      await pause(page, 1300)
    },
  },
  // the email, then the model's categories and the fields, at the foot of the Case (the page cannot scroll further, so the
  // frame is measured at the end and the clip scrolls down into it)
  understand: {
    focus: { top: 'Classification' },
    crf: '31',
    lead: 520,
    async setup(page) {
      await start(page)
      await openCase(page, PAID)
      await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight))
      await pause(page, 300)
    },
    async act(page) {
      await pause(page, 1000)
      await page.evaluate(
        (dur) =>
          new Promise((done) => {
            const from = scrollY
            const to = document.documentElement.scrollHeight
            const t0 = performance.now()
            const step = (t) => {
              const k = Math.min(1, (t - t0) / dur)
              scrollTo(0, from + (to - from) * (1 - Math.pow(1 - k, 3)))
              if (k < 1) requestAnimationFrame(step)
              else done()
            }
            requestAnimationFrame(step)
          }),
        1700,
      )
      await pause(page, 1700)
    },
  },
  // a change-of-bank-account email: its signals, then the risk the rules set
  check: {
    focus: { top: 'Signals' },
    crf: '33',
    async setup(page) {
      await start(page)
      await openCase(page, BANK)
      await scrollTo(page, page.getByRole('heading', { name: 'Signals', exact: true }), 24)
    },
    async act(page) {
      await pause(page, 1300)
      await scrollTo(page, page.getByRole('heading', { name: 'Risk', exact: true }), 24, 1400)
      await pause(page, 1700)
    },
  },
  // the prepared reply approved, then copied for the person's own mail client
  prepare: {
    // the frame starts below the heading, so the copy feedback under the buttons is in it
    focus: { top: 'Reply', dy: 80 },
    async setup(page) {
      await start(page)
      await openCase(page, PAID)
      await scrollTo(page, page.getByRole('heading', { name: 'Reply', exact: true }), 24)
    },
    async act(page) {
      await pause(page, 800)
      await page.getByRole('button', { name: 'Approve', exact: true }).click()
      await page.getByRole('button', { name: 'Copy text', exact: true }).waitFor()
      await pause(page, 1000)
      await page.getByRole('button', { name: 'Copy text', exact: true }).click()
      await pause(page, 1300)
    },
  },
}

async function contentBox(page) {
  return page.evaluate(() => {
    const m = document.querySelector('main') ?? document.body
    const r = m.getBoundingClientRect()
    return { x: Math.max(0, Math.round(r.left)) }
  })
}

const ff = (args) => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args])

// Chrome's screencast gives frames at the real device-pixel density (Playwright's recordVideo does not upscale the page);
// frames arrive only when the page changes, so each is held until the next one (ffmpeg concat with durations).
async function capture(context, page, act) {
  const cdp = await context.newCDPSession(page)
  const frames = []
  cdp.on('Page.screencastFrame', (f) => {
    frames.push({ data: f.data, t: f.metadata.timestamp })
    cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {})
  })
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 95, maxWidth: VIEW.width * DPR, maxHeight: VIEW.height * DPR, everyNthFrame: 1 })
  await page.waitForTimeout(300)
  const t0 = frames.length ? frames[0].t : Date.now() / 1000
  await act()
  const t1 = Date.now() / 1000
  await cdp.send('Page.stopScreencast')
  return { frames, t0, t1 }
}

const browser = await chromium.launch()
for (const [name, clip] of Object.entries(CLIPS).filter(([n]) => !process.env.ONLY || process.env.ONLY.split(',').includes(n))) {
  const dir = mkdtempSync(join(tmpdir(), 'inbox-media-'))
  const context = await browser.newContext({ viewport: { width: VIEW.width * DPR, height: VIEW.height * DPR }, colorScheme: scheme })
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: BASE })
  const page = await context.newPage()
  await clip.setup(page)
  const box = await contentBox(page)
  const head = await page.getByRole('heading', { name: clip.focus.top, exact: true }).boundingBox()
  const fy = Math.max(0, Math.round(head.y) + ((clip.focus.dy ?? 0) - 16) * DPR)
  // a clip that scrolls down into its frame starts `lead` px higher
  if (clip.lead) await page.evaluate((d) => scrollBy(0, -d), clip.lead * DPR)
  const { frames, t0, t1 } = await capture(context, page, () => clip.act(page))
  if (process.env.DEBUG)
    console.log(name, 'heading before', head.y, 'after', (await page.getByRole('heading', { name: clip.focus.top, exact: true }).boundingBox())?.y)
  await context.close()
  const list = frames.map((f, i) => {
    const file = join(dir, `f${String(i).padStart(5, '0')}.jpg`)
    writeFileSync(file, Buffer.from(f.data, 'base64'))
    const next = i + 1 < frames.length ? frames[i + 1].t : t1
    return `file '${file}'\nduration ${Math.max(0.001, next - Math.max(f.t, t0)).toFixed(4)}`
  })
  writeFileSync(join(dir, 'list.txt'), list.join('\n') + `\nfile '${join(dir, `f${String(frames.length - 1).padStart(5, '0')}.jpg`)}'\n`)
  const len = t1 - t0
  const base = join(OUT, `${name}-${scheme}`)
  const fcrop = `crop=${FOCUS.width * DPR}:${FOCUS.height * DPR}:${box.x}:${fy}`
  const last = join(dir, `f${String(frames.length - 1).padStart(5, '0')}.jpg`)
  // prettier-ignore
  ff(['-f', 'concat', '-safe', '0', '-i', join(dir, 'list.txt'), '-vf', `fps=30,${fcrop}`, '-t', len.toFixed(2), '-an', '-c:v', 'libx264', '-crf', clip.crf ?? '27', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${base}-focus.mp4`])
  ff(['-i', last, '-frames:v', '1', '-vf', fcrop, '-q:v', '3', `${base}-focus.jpg`])
  rmSync(dir, { recursive: true, force: true })
  console.log(`${base}: ${len.toFixed(2)}s, ${frames.length} frames`)
}
await browser.close()

// Checks out the public Deal Ops Toolkit repo at the commit in toolkit.ref into vendor/toolkit (not committed).
// check-site reads the app's privacy and disclaimer sentences, on-screen labels, CSV header aliases and release notes from it,
// so the website is checked against the released app. After each Toolkit release, put the new public commit in toolkit.ref.
// TOOLKIT_REF=main checks out the public repo's latest main instead (the weekly "Toolkit drift" CI job), so a Toolkit
// release that changes a sentence the site quotes is noticed even before toolkit.ref is updated.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'

const REPO = 'https://github.com/deal-ops/deal-ops-toolkit'
const DIR = 'vendor/toolkit'
const ref = process.env.TOOLKIT_REF ?? readFileSync('toolkit.ref', 'utf8').trim()
if (!process.env.TOOLKIT_REF && !/^[0-9a-f]{40}$/.test(ref)) {
  console.error('toolkit: toolkit.ref must hold one full commit id')
  process.exit(1)
}
const git = (...a) => execFileSync('git', ['-C', DIR, ...a], { stdio: 'pipe' }).toString().trim()
if (!existsSync(`${DIR}/.git`)) {
  mkdirSync(DIR, { recursive: true })
  git('init', '-q')
}
let head = ''
try {
  head = git('rev-parse', 'HEAD')
} catch {
  // empty repository: nothing checked out yet
}
if (head === ref && !git('status', '--porcelain')) {
  console.log(`toolkit: already at ${ref.slice(0, 7)}`)
} else {
  try {
    git('fetch', '-q', '--depth', '1', REPO, ref)
    git('checkout', '-q', '--force', '--detach', 'FETCH_HEAD')
    git('clean', '-q', '-fdx')
  } catch (e) {
    console.error(`toolkit: cannot check out ${ref} from ${REPO} (${String(e.stderr ?? e.message).trim().split('\n').pop()})`)
    process.exit(1)
  }
  console.log(`toolkit: checked out ${git('rev-parse', '--short', 'HEAD')}`)
}

// Checks out the public Deal Ops Inbox repo at the commit in inbox.ref into vendor/inbox (not committed).
// check-site reads the Inbox release notes (CHANGELOG.md), its English docs and its on-screen labels from it, so the
// /inbox/ page is checked against the released Inbox (plan 13 §8.1 K3–K5). After each Inbox release, put the new public
// commit in inbox.ref and the new demo package in site/inbox/demo/ (scripts/inbox-demo.mjs).
// INBOX_REF=main checks out the public repo's latest main instead (the weekly drift CI job).
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'

const REPO = 'https://github.com/deal-ops/deal-ops-inbox'
const DIR = 'vendor/inbox'
const ref = process.env.INBOX_REF ?? readFileSync('inbox.ref', 'utf8').trim()
if (!process.env.INBOX_REF && !/^[0-9a-f]{40}$/.test(ref)) {
  console.error('inbox: inbox.ref must hold one full commit id')
  process.exit(1)
}
const git = (...a) =>
  execFileSync('git', ['-C', DIR, ...a], { stdio: 'pipe' })
    .toString()
    .trim()
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
  console.log(`inbox: already at ${ref.slice(0, 7)}`)
} else {
  try {
    git('fetch', '-q', '--depth', '1', REPO, ref)
    git('checkout', '-q', '--force', '--detach', 'FETCH_HEAD')
    git('clean', '-q', '-fdx')
  } catch (e) {
    console.error(
      `inbox: cannot check out ${ref} from ${REPO} (${String(e.stderr ?? e.message)
        .trim()
        .split('\n')
        .pop()})`,
    )
    process.exit(1)
  }
  console.log(`inbox: checked out ${git('rev-parse', '--short', 'HEAD')}`)
}

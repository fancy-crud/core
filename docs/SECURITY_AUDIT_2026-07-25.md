# Security audit — 2026-07-25

Audit of the dependency tree of this monorepo, triggered by 81 open Dependabot alerts. `pnpm audit` reported **114 advisories: 3 critical, 71 high, 45 moderate and 8 low**, spread across 28 distinct packages.

The tree is now clean: **0 advisories at every severity**. No major version was bumped and no published API changed.

## The number that mattered was not 114

Most of those advisories never reached anyone installing `@fancy-crud/*`. Attributing every advisory path to the workspace it comes from gives a blunt answer:

| Origin | Advisory paths |
|---|---|
| Root `devDependencies` (eslint, nx, semantic-release, vitest, …) | 118 |
| `demo-primevue` | 9 |
| `packages/*` | 0 |

Not a single advisory path was rooted in a published package. That is the useful framing: the alert count was driven by build tooling and demo apps, which are never installed by a consumer.

**One exception carried all the real risk**, and it does not show up in that table because it is a direct dependency rather than a transitive one.

## `esno` shipped to every consumer of `@fancy-crud/vue`

`packages/vue/package.json` declared `esno` at an exact `4.8.0`, in **both `dependencies` and `peerDependencies`**. `esno` is an esbuild-powered TypeScript runner for Node — a development tool with no role in a component library. `pnpm why` confirms it as a production dependency:

```
@fancy-crud/vue
dependencies:
esno 4.8.0
└─┬ tsx 4.21.0
  └── esbuild 0.27.1
```

So every project installing `@fancy-crud/vue` also installed `esno`, `tsx` and `esbuild`, and, because of the peer entry, was additionally told it needed `esno@4.8.0` itself. `esbuild` was the only advisory in the whole report reaching consumers, and this is how it got there.

It is not imported anywhere. A search across the repository finds `esno` only in that `package.json` and in the lockfile — no source file, no build script, no workflow. It was removed from both blocks.

## What was changed

**Updates within the declared semver ranges** (`pnpm update -r`) closed 109 of the 114 advisories. This is worth stating plainly because the alert list suggested otherwise: every advisory in the report had a fix available inside the major version already in use. In particular `vite` needed `>=7.3.5` rather than Vite 8, and `vitest` needed `>=3.2.6` rather than Vitest 4.

**Three `pnpm.overrides`** for what remained, all of it transitive under the eslint stack, `nx` and `@vue/test-utils`:

| Override | Reason |
|---|---|
| `minimatch@9` → `^9.0.7` | 9.0.3 was pulled by the eslint packages; the fix is a patch inside the same major. |
| `brace-expansion@<5.0.8` → `^5.0.8` | Both the 1.x and 2.x lines are affected with no backport, so 5.x is the only fixed line. |
| `esbuild@<0.28.1` → `^0.28.1` | Vite 7 pins the 0.27 line. The bump was verified against the full build rather than assumed. |

**Deliberately not done: major version bumps.** `eslint` 9→10, `@antfu/eslint-config` 5→9, `nx` 21→23, `vite` 7→8 and `vitest` 3→4 are all available, and none are necessary: no advisory required them. Vite in particular builds every published package, so bumping it is a change to the release artifacts that belongs in its own reviewed change, not in a security fix.

**Deliberately reverted: the dependency floors of the published packages.** `pnpm update -r` also raised the declared ranges inside `packages/*`, moving `vue` from `^3.5.22` to `^3.5.40`, `@vueuse/core` to `^14.3.0`, `primevue` to `^4.5.5` and `vuetify` to `^3.12.11`. None of those fixes an advisory, and all of them raise what a consumer is required to install. They were reverted so this change does not quietly move the compatibility floor. The `quasar` floor of `^2.22.0`, set earlier for the `extend()` prototype pollution advisory, is untouched.

## Verification

| Check | Result |
|---|---|
| `pnpm audit` | 0 advisories, all severities |
| `pnpm build` (full monorepo) | no `error TS`, no failures |
| `pnpm vitest run` | 24 files, 73 passing, 1 skipped — same as before the changes |
| Emitted declarations | unchanged: 172 for `core`, 64 for `vue`, 21 each for the quasar, element-plus and primevue wrappers, 0 unresolved `@packages/*` aliases |
| Consumer probe | the symbols imported by the downstream projects still typecheck against the built packages |

The test suite was run before the changes to establish a baseline, so the 73 passing tests are a comparison and not just an assertion.

## Pre-existing issue, not fixed here

`pnpm lint` **already failed before any of this**, and still does. The repository configures ESLint through `.eslintrc` and `.eslintignore` while running ESLint 9, which no longer reads either:

```
ESLintIgnoreWarning: The ".eslintignore" file is no longer supported.
Switch to using the "ignores" property in "eslint.config.js"
```

This is worth recording for two reasons. It means linting has not actually run in this repository for some time, and it is the reason the `brace-expansion` and `minimatch` overrides could be applied without fear of breaking the lint step: there was no working lint step to break. Migrating to flat config is a separate change, and it would also unlock the `eslint` 10 and `@antfu/eslint-config` 9 upgrades.

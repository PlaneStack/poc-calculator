# Sprint 131 Pack
## Theme
**Deterministic Read Fixture + QA Infrastructure**

## Sprint intent
Sprint 131 establishes one **canonical engineering fixture project** and the matching **QA infrastructure** needed to use it as a durable read-only inspection and regression asset across the entire PlaneStack product.

This sprint is **not** a product-facing onboarding sprint. It is an internal quality and determinism sprint that creates:

- one seeded project with broad cross-plane read coverage
- deterministic reset/hydration behavior for dev and QA
- route traversal + zero-console-error QA harness
- fixture health checks and continuity assertions
- a clean separation between **system genesis seed**, **fixture project seed**, and **suite-specific overlays**

## Why now
The current product has broad plane coverage, but simple route traversal can still expose browser/runtime errors. A stable, deterministic, read-heavy fixture lets developers and QA verify UI breadth without needing artifact creation or ad hoc local setup.

## Product framing
This sprint must be framed as:

- **deterministic read fixture**
- **engineering QA asset**
- **UI regression baseline**
- **cross-plane continuity fixture**

This sprint must **not** be framed as:

- a customer-facing demo project
- a real setup/install wizard
- a fake “local environment” replacement for real onboarding
- a substitute for real org/integration/provider/environment setup

## Core distinction
### A. Genesis / system seed
Minimum seed needed for PlaneStack itself to boot and behave correctly.

Examples:
- tenant / OU / project shell
- auth / authz baseline
- required registries / policy scaffolding
- control-plane baseline records

### B. Deterministic read fixture seed
A canonical project such as:

- key: `plane-read-fixture`
- display: `PlaneStack Read Fixture`

Purpose:
- broad read-only inspection
- deterministic route traversal
- UI error detection
- screenshot / DOM conformance baselines
- continuity testing across planes

### C. Suite-specific overlays
Small, deterministic deltas layered on top of the base fixture for specialized tests.

Examples:
- blocked governance state
- no-data analytics filter state
- retry lineage path
- degraded operate readiness
- redacted actor visibility case

## Non-negotiable invariants
- The fixture must use **canonical records and projections**, not UI-only mocks.
- Audit evidence goes only to `project_root/.planestack/**`.
- Scratch / caches / runtime junk stay under `bridge_root`.
- Normal validate / gate / closeout flows may write only to the **active sprint** evidence/runlog/manifest paths.
- Historical sprint repair/backfill must remain a separate explicit mode.
- The fixture is internal QA infrastructure, **not** a product feature.

## Required outcome
Create one seeded engineering fixture project that is:

- visible in dev/test environments
- broad enough to exercise read coverage across all major planes
- deterministic enough for automated assertions
- stable enough for future route traversal, screenshot, and console gating
- resettable enough for repeated local/CI runs
- clearly separated from future real customer onboarding

## Coverage expectations

### Center
- project scope
- goals
- artifact explorer entry points
- enough truth to avoid empty-only experience

### Plan
- work-items
- tasks
- sprints
- ideas
- templates
- overview projections
- component linkage
- lineage visibility

### Jobs
- runs list/detail
- workflows list/detail
- retry lineage
- compare path
- outputs vs runtime artifacts vs evidence separation

### Review
- release candidates
- review queue
- shared reviews
- governance-linked blocked / approval context
- continuity from Jobs

### Operate
- overview
- environments
- sessions
- execution
- incidents
- runbooks
- objective / health posture
- Review → Operate continuity

### Observe
- analytics overview
- library browse
- chronicle continuity
- explicit no-data states
- drill-through behavior

### Manage
- integrations
- credential validation results
- writeback policy lifecycle
- writeback center
- admin system
- environments
- components
- cross-plane entry links from Jobs / Review / Operate

## Deliverables

### Tranche 1 — ps-dev: fixture seed architecture + hydration
- add `seed-genesis`
- add `seed-read-fixture`
- add optional `seed-qa-overlay`
- add `fixture-health-check`
- add `hydrate-dev`
- add `hydrate-qa`
- add active-sprint write guard reuse for S131 evidence writes
- ensure fixture reseed is deterministic and idempotent

### Tranche 2 — ps-api / ps-contracts: fixture backing truth and health projections
- fixture project definition and canonical seeded records
- fixture health projection endpoint(s)
- optional fixture metadata endpoint(s)
- explicit no-data and continuity-ready record coverage
- contract coverage for fixture health / readiness projections if needed

### Tranche 3 — ps-web: route traversal and UI confidence
- route traversal proof spec
- zero-console-error expectation on major surfaces
- stable render checks for key list/detail/grouped/no-data surfaces
- no fake/demo labels or product-facing fixture framing

### Tranche 4 — QA harness
- route traversal smoke
- zero-console-error check
- key-surface render checks
- continuity checks:
  - Plan → Jobs
  - Jobs → Review
  - Review → Operate or Observe
  - Jobs / Review / Operate → Manage
- screenshot or DOM conformance checks where stable
- fixture health check before UI traversal

## Repo-by-repo deltas

### ps-dev
- new fixture seed definition(s)
- hydration targets
- overlay targets
- fixture health-check target
- S131 route traversal smoke
- S131 UI smoke
- S131 write-validate summary
- S131 truth refresh
- S131 closeout evidence check

### ps-api
- fixture health/readiness projection routes as needed
- deterministic fixture record hydration support
- any projection fixes required so broad route traversal succeeds without create/mutate work

### ps-contracts
- schema/route additions only if fixture health/readiness projections need new contract truth

### ps-web
- route traversal support
- any stable test IDs / render consistency needed for proof surfaces
- ensure no misleading “demo” framing leaks into product copy

### fixture project repo
- seeded `plane-read-fixture` mirror content
- S131 sprint mirror
- S131 governance evidence
- no unrelated historical sprint drift

## Required proof paths

### Proof A — Full-read fixture exists
- hydrate genesis seed
- hydrate read fixture seed
- fixture project appears in dev/test
- major plane/surface read coverage exists without create/mutate work

### Proof B — Route traversal
- open each major plane/surface using the fixture project
- assert render success
- fail on browser/runtime errors caused by navigation

### Proof C — Continuity
- verify:
  - Plan → Jobs
  - Jobs → Review
  - Review → Operate or Observe
  - Jobs / Review / Operate → Manage
- preserve relevant context across transitions

### Proof D — No-data and grouped/detail trust
- assert explicit no-data states where intended
- assert grouped/detail/list surfaces render consistently
- assert fixture health check fails if required breadth is missing

## Validation and closeout
Required green bar:
- `s131-fixture-health-check`
- `s131-route-traversal-smoke`
- `s131-ui-smoke`
- `s131-truth-refresh`
- `s131-write-validate-summary`
- `sprint131-validate`
- `contract-test-docker`
- `e2e-gate`

Closeout-only:
- `s131-closeout-evidence-check`

## Success bar
Sprint 131 succeeds if:

- one canonical seeded engineering fixture project exists
- developers can manually inspect breadth without creation work
- automated tests can traverse major surfaces deterministically
- browser/runtime navigation regressions are detectable in CI/gates
- fixture health is checked before traversal
- genesis seed, read fixture seed, and test overlays remain clearly distinct
- the fixture is clearly positioned as internal QA infrastructure, not a product feature

# PlaneStack — Sprint 100 Pack
**Sprint:** 100  
**Theme:** Operate v6 — User-Defined Environments  
**Status:** Plan (locked for implementation)  
**Date:** 2026-03-09

## Intent
Sprint 100 converts Operate environments from **static product scaffolding** into **real governed project resources**.

Today the local environment is real, while the non-local environment names are represented as pre-populated placeholder rows. Sprint 100 removes that placeholder model entirely. After this sprint:
- every project starts with **Local** only,
- any additional environments exist **only if a user creates them**,
- Operate reads environment state from governed project data only,
- runbooks can be bound to real environments,
- readiness/status is derived from configured checks and evidence,
- and the Calculator project proves the full loop end to end.

This sprint is a **completion sprint**, not a scaffolding sprint. It must finish the model, contracts, API, UI, validation, and evidence chain.

## Completion bar (no partial stubs)
Sprint 100 is complete only if all of the following land end to end:

1. **Static placeholder removal**
   - Dev / Stage / Prod placeholder rows are removed.
   - No “Coming soon” environment rows remain anywhere in Operate.
   - New/empty projects show Local only plus a clear add-environment affordance.

2. **Governed environment resource model**
   - Canonical project environment records exist under the governed library.
   - Local is seeded as the default environment record.
   - Users can create draft custom environments, activate them, archive them, and view them in Operate.

3. **Operate environment management UX**
   - Operate includes a real environment management surface under the existing plane.
   - Add / edit / activate / archive flows work.
   - Empty states, no-data states, and archived filtering are explicit and understandable.

4. **Runbook binding and execution by environment**
   - Runbooks can declare applicable environments.
   - Environment detail shows bound runbooks.
   - Preview/run flows show the selected environment explicitly.
   - Calculator proves Local plus at least one user-created custom environment.

5. **Environment status/readiness**
   - Status is derived from configured checks and evidence, not hard-coded labels.
   - If an environment has no checks configured, it renders `not_configured`, not fake green.

6. **Validation and evidence completeness**
   - `sprint100-validate`, `contract-test-docker`, and `e2e-gate` all pass.
   - All required artifacts in `S100-evidence.json` exist.
   - Missing evidence is a closeout failure even if tests are green.

If any of the above exists only as schema, placeholder UI, or inert route without proof, Sprint 100 is not complete.

## Governance preflight
All Sprint 100 work-producing runs must honor the active governance and filesystem invariants.

- `project_root` and `bridge_root` remain distinct filesystem roots.
- Governed outputs and versioned evidence are written only under `project_root` (for example `poc-calculator/.planestack/**`).
- Scratch workspaces, temp files, caches, ephemeral screenshots, and transient logs remain under `bridge_root`.
- Work-producing runs must set:
  - `SPRINT_CODE=S100`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence must begin with:
  - `make -C ps-dev governance-lock-check`
- Lock-check evidence must be written under:
  - `.planestack/governance/evidence/s100/lock-check.json`

`governance-lock-check` is required before any of the following:
- create / update / activate / archive environment
- bind or unbind runbook from environment
- readiness/status-producing work that writes evidence
- any environment-scoped runbook execution that writes evidence

## Why Sprint 100 now
Operate has become real enough that static environment scaffolding now creates UX noise and weakens trust.

Replacing fake predefined environments with user-defined governed resources is the right next move because it:
- removes placeholder noise,
- makes Operate feel real and project-owned,
- keeps environment state inside the artifact-native governance model,
- improves runbook targeting and status clarity,
- and sets a strong base for any future remote or production-adjacent environment work.

---
## Governing posture (Sprint 100 locks)
These locks are non-negotiable.

### 1) Operate remains the canonical plane
Sprint 100 adds no new plane.

UI remains under the existing Operate route family:
- `/ou/{ouKey}/p/{projectKey}/plane/operate/:surface`

Sprint 100 may add or refine Operate surfaces, but must not create a parallel top-level mode.

### 2) Environments become first-class governed resources
Canonical project environment file:
- `.planestack/governance/operate/environments.json`

Suggested companion index/registry support may be included only if it points back to this file as the authoritative project source.

Canonical schema source:
- `ps-contracts/schemas/operate-environments.schema.json`

The environment model must include at minimum:
- `env_key`
- `display_name`
- `kind: local | custom`
- `mode: local_readwrite | local_readonly | remote_readonly`
- `status`
- `description`
- `resource_refs[]`
- `auth_profile_ref` (optional)
- `runbook_refs[]`
- `lifecycle_state: draft | active | archived`
- `created_at`
- `updated_at`
- `schema_version`

### 3) Local is seeded, real, and protected
Every project starts with exactly one seeded environment:
- `env_key = local`

Rules:
- Local is a real record in `environments.json`, not a hard-coded UI row.
- Local cannot be deleted or archived.
- Local may be editable only in limited non-identity fields:
  - `display_name` (optional if needed)
  - `description`
  - attached runbooks / readiness config
- `env_key=local`, `kind=local`, and base semantics are immutable.

### 4) No static placeholders, no “Coming soon”
Static pre-populated environment rows are forbidden in Sprint 100.

Explicitly remove:
- hard-coded Dev / Stage / Prod / similar placeholder rows
- disabled environment pills/cards that imply future capabilities
- “Coming soon” labels for environments

Operate must render only:
- Local
- user-created environments
- explicit empty state when no additional environments exist

### 5) CRUD-lite, not destructive delete
Sprint 100 supports:
- list/read
- create draft
- update draft
- activate
- archive

Sprint 100 does **not** support hard delete.

Archived environments:
- remain visible in filtered/history contexts,
- disappear from the default active selector,
- preserve lineage and evidence references.

### 6) Environment creation is project-scoped and current-project only
Environment creation and management are project-scoped.

Sprint 100 does **not** include:
- cross-project environment install/sharing
- global environment templates
- automatic infrastructure discovery
- production mutation workflows

### 7) Runbook binding is first-class
Runbooks may declare or receive applicable environments through governed binding.

Lock:
- environment detail must show bound runbooks
- runbook detail must show applicable environments
- preview/run must show chosen environment explicitly
- bindings must be preserved in governed project data, not browser-only state

### 8) Status is derived, not decorative
Environment status must come from configured checks and evidence.

Canonical display statuses for Sprint 100:
- `met`
- `at_risk`
- `breached`
- `not_configured`
- `insufficient_data`
- `auth_failed`
- `unreachable`
- `blocked`

Rules:
- `not_configured` means no readiness/check policy exists yet.
- `blocked` is policy/admin/gate denial only.
- transport/runtime failures must not collapse into `blocked` if a more specific state exists.

### 9) One source of truth for environments in the UI
Operate UI must read environment state from the canonical environment APIs / governed project data only.

No:
- hard-coded environment arrays in the UI
- client-generated pseudo environments
- fallback seeded placeholder lists

### 10) UX scope is concrete and bounded
Sprint 100 UX must focus on environment ergonomics:
- environment list/cards
- add/edit/activate/archive flow
- empty/no-data states
- active/archived filters
- environment detail with runbook bindings and status/readiness summary
- clear environment selector in preview/run flows

Do not let general Operate restyling absorb the sprint.

### 11) Idempotency and validation discipline
Environment create/activate/archive operations must be deterministic and safe under retry.

Required:
- support `Idempotency-Key` on create / activate / archive operations
- duplicate `env_key` is a validation failure
- archive of Local is a validation failure
- activation of invalid/incomplete environment config must fail with explicit reason

### 12) Evidence completeness is mandatory
Missing required environment evidence is a closeout failure even if tests are green.

Sprint 100 must prove:
- Local-only default state
- custom environment creation
- activation
- archive
- runbook binding
- environment selector behavior
- blocked/invalid flows
- Calculator litmus proof

---
## Sprint 100 target outcomes
By the end of Sprint 100, a user should be able to:

1. Open Operate and see **Local only** by default.
2. Add a new custom environment with a clean guided flow.
3. Activate that environment and see it appear in the selector.
4. Bind Calculator runbooks to Local and the custom environment.
5. Preview and run against the chosen environment with clear environment context.
6. See `not_configured` or real derived status instead of fake placeholders.
7. Archive the custom environment and watch it leave the active selector while preserving history.

---
## Suggested contract / API scope
Canonical routes for Sprint 100:

**Operate environments**
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/environments`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/environments/:envKey`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/environments:create`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/environments/:envKey:update-draft`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/environments/:envKey:activate`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/environments/:envKey:archive`

**Operate environment bindings**
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/environments/:envKey:bind-runbook`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/environments/:envKey:unbind-runbook`

**Operate execution compatibility**
- existing preview/run flows must accept or preserve explicit `env_key`
- environment selection must be validated against active environment records

## Suggested implementation order
1. `ps-contracts`
   - environment schema
   - OpenAPI routes
   - runbook execution contract update to carry explicit environment refs
2. `ps-api`
   - environment model / list/create/update/activate/archive routes
   - runbook binding routes
   - duplicate/local/archive/invalid validation
3. `ps-web`
   - remove static placeholders
   - environment management UX
   - environment selector + detail + archive filtering
4. `ps-dev/tests`
   - validation harness
   - smoke scripts
   - evidence completeness checks
5. evidence wiring / archive / closeout

---
## Calculator litmus requirements
Calculator is the required proof project for Sprint 100.

Mandatory litmus proof:
- Local exists by default
- no static placeholder environments render
- one custom environment is created and activated
- at least two Calculator runbooks are bound across Local + custom
- selector + preview/run flows show correct environment context
- archive of custom environment works and removes it from active selector
- evidence written under project-root S100 bucket

Stretch (good but not required):
- two custom environments
- one `remote_readonly` example in addition to local modes

---
## Explicit non-goals
Sprint 100 does **not** include:
- deployment/pipeline work
- public/anonymous environment sharing
- environment marketplace/templates
- auto-discovery of infrastructure
- production mutation operations
- cross-project environment federation
- broad generic Operate redesign beyond environment ergonomics

---
## Acceptance criteria
Sprint 100 is done when:

1. Operate shows **Local only** by default with no fake Dev/Stage/Prod placeholders.
2. Users can create, activate, and archive custom environments through governed flows.
3. Operate UI reads environments only from canonical project data/APIs.
4. Runbooks can be bound to and executed against real environments.
5. Environment states are explicit and non-deceptive (`not_configured` instead of fake green).
6. Calculator proves the full environment loop end to end.
7. `sprint100-validate`, `contract-test-docker`, and `e2e-gate` pass.
8. All required artifacts in `S100-evidence.json` exist.
9. Pack/mirror/archive/tag closeout completes cleanly.

---
## Screenshots desired for review
Capture at least:
- Operate with Local-only default state
- Add environment flow
- Environment detail with runbook bindings
- Preview/run flow showing explicit selected environment
- Archive result / active-vs-archived view
- Any blocked invalid flow (duplicate env key or archive-local denial)

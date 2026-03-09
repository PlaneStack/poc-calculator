# PlaneStack — Sprint 101 Pack
**Sprint:** 101  
**Theme:** Operate v7 — Environment-Aware Runbook Library + Guided Diagnostics  
**Status:** Plan (locked for implementation)  
**Date:** 2026-03-09

## Intent
Sprint 101 is the **completion sprint that makes Operate feel like a daily-driver operating system for a project**.

Sprint 98 made governed runbooks executable. Sprint 100 made environments real user-defined project resources. Sprint 101 must make those two capabilities work **beautifully together**:
- operators can find the right runbook for the current environment quickly,
- template/derive flows work without copy-paste drift,
- runs surface guided diagnostics and next actions instead of raw log hunting,
- environment context is visible everywhere that matters,
- and `poc-calculator` becomes the first polished **gold operations library**.

This sprint stays inside the **Operate plane**. It does not add a new plane and it does not expand into deployment/pipeline work.

## Completion bar (meaty, not stubby)
Sprint 101 is complete only if all of the following land end to end:

1. **Environment-aware runbook library**
   - real library/catalog experience under Operate,
   - browse/filter/search/detail,
   - environment applicability shown explicitly,
   - recent run status and success-rate summaries are visible,
   - library/detail surfaces link to evidence and diagnostics.

2. **Current-project template library + derivation**
   - active runbooks can be published as templates,
   - templates can be installed/derived into the current project as draft runbooks,
   - lineage is preserved and visible,
   - preview-before-activate is required,
   - no copy/paste primary path.

3. **Guided diagnostics**
   - failed/blocked/manual runs emit structured diagnostics,
   - run detail renders reason code, summary, severity, next actions, safe-to-rerun state, and evidence links,
   - environment context is included in the diagnostic view.

4. **Environment-aware execution ergonomics**
   - runbook detail shows applicable environments,
   - environment detail shows bound runbooks and recent run summaries,
   - preview/run flows require explicit environment selection,
   - empty/no-data/not-applicable states are explicit and calm.

5. **Calculator gold reference library**
   - five polished Calculator runbooks remain present,
   - at least one template-derived runbook exists,
   - at least one environment-specific runbook variation exists,
   - at least two diagnostic proof runs exist with next-action UX.

6. **Validation and evidence completeness**
   - `sprint101-validate`, `contract-test-docker`, and `e2e-gate` all pass,
   - all required artifacts in `S101-evidence.json` exist,
   - missing evidence is a closeout failure even if tests are green.

If any of the above exists only as schema, placeholder route, or inert UI surface, Sprint 101 is not complete.

## Governance preflight
All Sprint 101 work-producing runs must honor the active governance and filesystem invariants.

- `project_root` and `bridge_root` remain distinct filesystem roots.
- Governed outputs and versioned evidence are written only under `project_root` (for example `poc-calculator/.planestack/**`).
- Scratch workspaces, temp files, caches, ephemeral screenshots, and transient logs remain under `bridge_root`.
- Work-producing runs must set:
  - `SPRINT_CODE=S101`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence must begin with:
  - `make -C ps-dev governance-lock-check`
- Lock-check evidence must be written under:
  - `.planestack/governance/evidence/s101/lock-check.json`

`governance-lock-check` is required before any of the following:
- publish template
- install/derive template
- activate/archive runbook
- run runbook
- any diagnostics or library rollup generation that writes evidence

## Why Sprint 101 now
Operate now has enough real capability that the next bottleneck is no longer “can it run?” but “can an operator trust it, discover the right action quickly, and understand failures without reading raw logs?”

Sprint 101 is the right next move because it:
- compounds the investment in executable runbooks and real environments,
- keeps Operate focused on local-first project operations,
- improves daily ergonomics and trust,
- and makes Calculator a persuasive gold-standard project.

---
## Governing posture (Sprint 101 locks)
These locks are non-negotiable.

### 1) Operate remains the canonical plane
Sprint 101 adds no new plane.

UI remains under the existing Operate route family:
- `/ou/{ouKey}/p/{projectKey}/plane/operate/:surface`

Sprint 101 may add/refine Operate surfaces, but must not create a parallel top-level “Library” or “Diagnostics” plane.

### 2) Environment records remain the binding source of truth
Canonical environment file remains:
- `.planestack/governance/operate/environments.json`

Environment→runbook binding remains canonical on environment records (`runbook_refs[]`).
Runbook detail may show applicable environments, but that must be **server-derived**, not separately persisted on the runbook.

### 3) Runbook contracts remain structured JSON
Canonical executable runbook and template paths:
- `.planestack/runbooks/operate/index.json`
- `.planestack/runbooks/operate/<runbook_key>.runbook.json`
- `.planestack/runbooks/operate/templates/index.json`
- `.planestack/runbooks/operate/templates/<template_key>.template.runbook.json`
- optional rendered companions:
  - `.planestack/runbooks/operate/<runbook_key>.md`
  - `.planestack/runbooks/operate/templates/<template_key>.md`

Markdown is optional and non-executable.

### 4) Resources remain governed and allowlisted
The authoritative resource inventory remains:
- `.planestack/governance/operate/resources.json`

All executable steps must resolve only through governed `command_ref` entries sourced from `resources.json`.
Unknown/unsafe `command_ref` resolution must fail as `blocked` with explicit reason code.

### 5) Two-root enforcement applies to every step
Every step and template-rendered step must declare:
- `writes_evidence: true|false`
- `evidence_paths[]`
- `scratch_paths[]`

Rule:
- evidence outputs → `project_root/.planestack/**`
- scratch/temp/workspace → `bridge_root/**`

Any attempted evidence write outside `project_root` is a blocking failure.

### 6) Template publish/install remains current-project only in Sprint 101
Sprint 101 completes **current-project template publishing and derivation**.

Permitted model:
- an **active runbook** may be **published** as a template,
- a **published template** may be **installed/derived** into the current project as a **draft runbook**,
- activation remains a separate explicit action.

Forbidden in Sprint 101:
- cross-project install targets,
- cross-OU sharing,
- public sharing,
- template auto-activation on install.

### 7) Draft/active/archive safety rail remains in force
Runbooks use:
- `draft`
- `active`
- `archived`

Templates use:
- `draft`
- `published`
- `archived`

Only:
- **active** runbooks appear in the standard execution lane,
- **published** templates appear in install/derive flows.

### 8) Versioning, immutability, and preview→run binding are mandatory
When a run starts, it must pin the exact runbook version.

Lock:
- run requests reference `runbook_key` and `runbook_version` or `runbook_hash`
- activation creates a new immutable version
- every run stores:
  - `runbook_ref: { key, version, artifact_id, integrity_hash }`
- `:preview` returns `plan_hash` and `confirm_token`
- `:run` must include `plan_hash` and `confirm_token`
- server verifies token matches the plan hash and runbook hash/version

### 9) Idempotency and dedupe are required on mutate operations
Required on:
- `:publish-template`
- `:install`
- `:activate`
- `:archive`
- `:run`

Use `Idempotency-Key`; same key inside the bounded dedupe window returns the same result and must not duplicate work.

### 10) Guided diagnostics are first-class outputs
Canonical diagnostics taxonomy file:
- `.planestack/governance/operate/diagnostics-taxonomy.json`

Required endpoint:
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runs/:runId/diagnostics`

Minimum response fields:
- `run_id`
- `runbook_ref`
- `env_key`
- `plan_hash`
- `reason_code`
- `summary`
- `operator_message`
- `severity`
- `next_actions[]`
- `step_refs[]`
- `safe_to_rerun`
- `taxonomy_version`
- `evidence_refs[]`
- `generated_at`

Unknown reason codes are a contract violation.

### 11) Explicit run state machine is required
Canonical run states for Sprint 101:
- `queued`
- `running`
- `waiting_manual`
- `completed_pass`
- `completed_fail`
- `blocked`
- `canceled`

`waiting_manual` is distinct from `blocked`.

### 12) UX scope is broad enough to matter, bounded enough to finish
Sprint 101 UX must focus on:
- runbooks library/catalog
- runbook detail with environment applicability and evidence history
- templates catalog and publish/install/derive flow
- preview + run progress + step evidence links
- diagnostics panel inside run detail
- environment detail with bound runbooks and recent summaries

Do not let unrelated general Operate restyling absorb the sprint.

### 13) Calculator remains the gold reference project
`poc-calculator` is the required litmus project and the first gold reference library.

Sprint 101 must prove:
- all five Calculator runbooks exist and remain polished,
- at least one template-derived runbook exists,
- at least one environment-specific runbook variation exists,
- at least two diagnostic proof runs exist,
- library/install/diagnostics flows work end to end against Calculator data.

### 14) Validation remains three-track and evidence-complete
Sprint 101 requires all three gates:
- `sprint101-validate`
- `contract-test-docker`
- `e2e-gate`

All are blocking for closeout.

Missing required evidence artifacts is also a closeout failure, even if tests pass.

### 15) Integrity discipline is unchanged
All new Sprint 101 evidence artifacts use the existing integrity rule:
- `sha256` of canonical JSON excluding `generated_at` and `integrity`

Do not introduce a Sprint 101-specific hash scheme.

## Canonical route set for Sprint 101
### Operate runbooks / templates
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runbook-templates`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runbook-templates/:templateKey`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey:publish-template`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbook-templates/:templateKey:install`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey:preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey:run`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runs/:runId`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runs/:runId/diagnostics`

### Operate environments (consumed, not reinvented)
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/environments`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/environments/:envKey`

## Required developer tasks
### ps-contracts
- add/update schemas for runbook library catalog, template catalog, publish/install lineage, and diagnostics response
- wire canonical routes into OpenAPI
- ensure runbook/template metadata includes environment-aware fields and stable summary window definitions

### ps-api
- implement environment-aware library aggregation and template routes
- derive runbook applicability from environment bindings server-side
- implement diagnostics endpoint and taxonomy enforcement
- preserve preview→run binding, version pinning, and idempotency

### ps-web
- add Operate `runbooks` library experience and `templates` surface under existing plane
- render environment applicability, summaries, and diagnostics panel
- keep diagnostics inside run detail, not a new top-level surface

### ps-dev / tests
- add `sprint101-validate` and smoke scripts for catalog, templates, diagnostics, calculator gold library, and blocked flows
- keep `contract-test-docker` and `e2e-gate` blocking

## Out of scope
Sprint 101 does **not** include:
- new top-level planes
- deployment/pipeline work
- cross-project or cross-OU template installation
- public/global sharing
- broad MFA/admin hardening as headline scope
- generic Operate redesign not tied to runbook/environment usability
- free-form shell execution surfaces

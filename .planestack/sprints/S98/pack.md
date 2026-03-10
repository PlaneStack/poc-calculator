# PlaneStack — Sprint 98 Pack
**Sprint:** 98  
**Theme:** Operate v4 — Local Operator UX + Executable Runbooks (Calculator litmus)  
**Status:** Plan (locked for implementation)  
**Date:** 2026-03-08

## Intent
Sprint 98 keeps the next major investment inside the **Operate plane**, with a deliberate emphasis on the **local development environment**, **operator ergonomics**, and **governed executable runbooks**.

Operate is already a real top-level mission-control surface. Sprint 98 does not add another plane and does not add another reporting architecture. Instead, it makes local operations simpler, safer, and visually better while turning project runbooks into **first-class executable resources** that an AI session may draft, a human may review/activate, and Operate may execute through the existing **command → processor → run → evidence** model.

This sprint remains:
- local-first
- deterministic
- vendor-neutral
- governed and auditable
- pre-deployment

## Governance preflight
All Sprint 98 work-producing runs must honor the active governance and filesystem invariants.

- `project_root` and `bridge_root` remain distinct filesystem roots.
- Governed outputs and versioned evidence are written only under `project_root` (for example `poc-calculator/.planestack/**`).
- Scratch workspaces, temp files, caches, ephemeral screenshots, and transient logs remain under `bridge_root`.
- Work-producing runs must set:
  - `SPRINT_CODE=S98`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence must begin with:
  - `make -C ps-dev governance-lock-check`
- Lock-check evidence must be written under:
  - `.planestack/governance/evidence/s98/lock-check.json`

Any run that writes governed outputs outside `project_root`, writes scratch data into `project_root`, or omits the sprint env contract is invalid for closeout.

---

## Why Sprint 98 now
The next enterprise-grade improvement is not more reporting. It is to make **local operations** easier to understand, easier to execute safely, visually cleaner, and useful enough that a human or AI can rely on them daily.

This sprint also closes an important loop: PlaneStack should be able to model a project’s local resources, let an AI session draft a runbook against those resources, and then execute that runbook through governed Operate runs with evidence. `poc-calculator` is the required litmus project.

---

## Governing posture (Sprint 98 locks)
These locks are non-negotiable.

### 1) Operate remains a plane, not a shell wrapper
Sprint 98 improves the existing Operate route family (`/plane/operate/:surface`) and does not create a new top-level mode.

Operate may execute governed runbooks, but it must **not** become a free-form shell runner.

### 2) Project resources are governed config
Sprint 98 introduces the canonical project resource inventory:

- `.planestack/governance/operate/resources.json`

This file is the authoritative inventory of local project resources used by Operate and runbooks.

Minimum resource categories:
- repositories / roots
- services / processes
- ports / URLs
- data stores / volumes
- commands / targets
- evidence locations
- dependencies / prerequisites

No second project-resource registry may be created.

### 3) Runbook format is a contract, not markdown
Executable runbooks are standardized under:

- `.planestack/runbooks/operate/index.json`
- `.planestack/runbooks/operate/<runbook_key>.runbook.json`
- optional companion docs under `.planestack/runbooks/operate/<runbook_key>.md`

`index.json` is the catalog. Each `*.runbook.json` file is the **canonical executable contract**. Markdown companions are optional rendered/reference views only and must not be parsed for execution.

### 4) Every runbook step is root-aware
Runbook steps must obey the two-root invariant.

Required step fields:
- `writes_evidence: true|false`
- `evidence_paths[]` (library-relative, project-root only)
- `scratch_paths[]` (bridge-root only)

Rule:
- evidence outputs → `project_root/.planestack/**`
- scratch/workspace/temp output → `bridge_root/**`

### 5) Step types are typed, allowlisted, and safety-classified
Permitted Sprint 98 step kinds:
- `check`
- `command_ref`
- `http_probe`
- `file_assert`
- `test_target`
- `capture_evidence`
- `manual_confirm`
- `note`

`command_ref` must reference a named resource/action from `resources.json` or another governed allowlist. Inline arbitrary shell commands are forbidden.

Every executable step must also declare:
- `safety_level: read_only | local_mutate | manual_confirm`

Defaults and rules:
- default = `read_only`
- `local_mutate` requires explicit confirmation UI and governance preflight
- `manual_confirm` steps never auto-run

### 6) Runbook execution reuses the existing runs + evidence model
A runbook execution is a first-class Operate run. Sprint 98 must not invent a parallel execution engine.

Canonical output shape:
- `.planestack/governance/evidence/s98/operate/runbooks/<run_id>/runbook-run.json`
- `.planestack/governance/evidence/s98/operate/runbooks/<run_id>/steps/<n>-<step_id>.json`
- `.planestack/governance/evidence/s98/operate/runbooks/<run_id>/logs.txt`
- optional screenshots or attachments under the same run directory

Logs must be bounded. Final status must be explicit.

### 7) AI may draft; humans must review and activate
AI may generate a **draft** runbook from project state and the resource inventory.

AI may not silently activate a runbook.

Runbook lifecycle must preserve:
- `draft`
- `active`
- `archived`

Only **active** runbooks appear in the normal Operate execution UI. Drafts may be previewed and edited, but not executed as standard runs until activated by a human.

### 8) UX scope is bounded to runbook ergonomics
Sprint 98 is a UX sprint, but not a general Operate polish sweep.

Required UX focus:
- runbooks list/detail
- runbook metadata and prerequisites
- step preview before execution
- execution progress / step outcomes
- evidence links
- clear failure / blocked / no-data / next-action states

Do not let broad Operate restyling consume the sprint.

### 9) Calculator is the required litmus project
Sprint 98 must prove the full loop on `poc-calculator`.

Required Calculator runbooks:
- local bootstrap
- readiness / health validation
- test + evidence run
- diagnose common failure
- local reset / recovery

### 10) Validation remains three-track
Sprint 98 requires all three:
- `sprint98-validate`
- `contract-test-docker`
- `e2e-gate`

All remain independent and all are blocking for closeout.

### 11) Integrity discipline is unchanged
All new Sprint 98 evidence artifacts use the existing integrity rule:
- `sha256` of canonical JSON excluding `generated_at` and `integrity`

Do not introduce a Sprint 98-specific hash scheme.

---

## Strong-score targets
| Capability | Current posture entering S98 | Strong in S98 means… |
| --- | --- | --- |
| Operate local UX | Medium/Strong hybrid | Runbook-driven daily-driver quality with clear preview, progress, evidence, and next-action states |
| Project resource inventory | New | Governed inventory of local resources, actions, dependencies, and evidence locations |
| Executable runbooks | Emerging | Structured JSON runbooks with typed steps, safety levels, activation lifecycle, and runs + evidence outputs |
| AI-authored draft runbooks | New | AI can propose valid draft runbooks from governed resource data; humans review and activate |
| Calculator litmus operations | New | 3–5 canonical runbooks execute successfully against `poc-calculator` with evidence |
| Operate validation harness | Medium | Deterministic validation proves resource schema, runbook schema, execution, blocked flows, UX, and evidence completeness |

---

## Scope included
Sprint 98 is intentionally large, but sequencing matters.

### EPIC 98.1 — Project resource inventory model
Objective: create the governed resource inventory that runbooks and AI drafting rely on.

#### S98-101 Canonical resource inventory
- create `.planestack/governance/operate/resources.json`
- add JSON schema + OpenAPI/registry references
- define resource categories and named keys
- include Calculator local resources as seed/reference implementation

Acceptance:
- Calculator resources are represented in governed JSON.
- Resource keys are stable enough to be referenced from runbooks.

#### S98-102 Resource actions / allowlists
- define named action refs for allowed local commands
- bind command refs to allowlisted targets/working dirs
- capture safety level (`read_only`, `local_mutate`, `manual_confirm`)

Acceptance:
- Runbooks can reference named command actions without embedding arbitrary shell.
- High-risk actions are visibly classified.

### EPIC 98.2 — Executable runbook contract
Objective: turn runbooks into first-class executable project resources.

#### S98-201 Runbook schema and catalog
- create `.planestack/runbooks/operate/index.json`
- create runbook JSON schema
- support lifecycle states `draft|active|archived`
- include metadata: owner, env applicability, prerequisites, expected evidence, recovery guidance

Acceptance:
- Runbook catalog is authoritative.
- Every active runbook validates against schema.

#### S98-202 Typed step model
- define step contract for allowed step kinds
- require `writes_evidence`, `evidence_paths[]`, `scratch_paths[]`
- require `safety_level`
- define allowed outputs and failure semantics per step type
- define `blocking` vs `advisory` semantics

Acceptance:
- Every step kind is explicit and schema-validated.
- Failure / blocked semantics are deterministic.
- Two-root invariants are machine-checkable from the contract.

#### S98-203 Runbook lifecycle ops
- list/read runbooks
- upsert draft runbook
- activate runbook
- archive runbook
- refuse execute on archived/draft except explicit preview/validation mode

Acceptance:
- Draft and active states are preserved and auditable.
- Activation is explicit and governable.

### EPIC 98.3 — Runbook execution lane
Objective: execute runbooks as first-class Operate runs with evidence.

#### S98-301 Operate runbook execution API
- add/extend canonical Operate routes for runbook-triggered runs
- return `run_id` and pollable status
- persist step-level outcomes and final status

Acceptance:
- Runbook execution uses the existing command/processor/run/evidence model.
- UI and API both point to the same authoritative run record.

#### S98-302 Evidence-writing execution engine
- each step writes typed evidence or structured outcome
- blocked/manual-confirm steps produce explicit evidence
- local-mutate steps require confirmation/gating before execution
- reason codes preserved end-to-end
- logs are bounded and stored with the run directory

Acceptance:
- A reviewer can reconstruct what happened from evidence alone.
- Failed runs are diagnosable without tribal knowledge.

#### S98-303 Calculator execution proofs
- execute Calculator bootstrap runbook
- execute readiness runbook
- execute test/evidence runbook
- execute one diagnosis or recovery path

Acceptance:
- At least three Calculator runbooks execute end-to-end with evidence.
- At least one mutable or manual path proves confirmation semantics.

### EPIC 98.4 — Runbook ergonomics UX
Objective: make runbook preview/execution safe and pleasant for daily use.

#### S98-401 Runbooks list/detail ergonomics
- redesign runbooks list/detail for discoverability
- show draft / active / archived clearly
- show env applicability, prerequisites, and expected evidence
- emphasize runbook risk/safety and whether a step mutates local state

Acceptance:
- Runbook lifecycle and suitability are obvious from the UI.
- Active runbooks are clearly distinguished from drafts.

#### S98-402 Step preview and execution progress
- show what will run before execution
- show safety levels clearly
- show progress, reason codes, and next actions without requiring raw log spelunking
- link directly to evidence artifacts/results

Acceptance:
- Operator can understand what a runbook will do before clicking run.
- Step outcomes are understandable from the UI alone.

#### S98-403 Failure / blocked / no-data ergonomics
- explicit states and next-step guidance
- strong empty states
- deterministic `data-testid` coverage on new interactive surfaces

Acceptance:
- New Operate runbook surfaces never render blank/ambiguous states.
- Reviewers can validate state rendering deterministically.

### EPIC 98.5 — AI-authored draft flow
Objective: let AI propose runbooks safely after the contract and runtime exist.

#### S98-501 AI draft contract
- define input bundle for AI drafting:
  - project resource inventory
  - existing runbooks
  - recent operate evidence
  - optional incident context
- define output contract for AI draft `*.runbook.json`

Acceptance:
- AI output is schema-checkable before save.
- Invalid AI output fails safely and visibly.

#### S98-502 Draft review / activation UX
- show AI draft provenance
- show schema warnings / risk markers
- allow human edit, save draft, activate, or reject

Acceptance:
- AI proposals are transparent and governable.
- No silent activation path exists.

#### S98-503 Calculator AI litmus
- AI drafts at least one valid Calculator runbook from resource inventory
- human review + activation path is demonstrable
- activated runbook can execute through the normal run path

Acceptance:
- Calculator proves the AI → draft → review → execute loop end-to-end.

### EPIC 98.6 — Validation, evidence, and closeout proof
Objective: close Sprint 98 with strong proof, not only a nicer UI.

#### S98-601 Validation harness
Add deterministic targets such as:
- `s98-resource-inventory-smoke`
- `s98-runbook-schema-smoke`
- `s98-runbook-execution-smoke`
- `s98-runbook-preview-ui-smoke`
- `s98-ai-runbook-draft-smoke`
- `s98-blocked-flows-smoke`
- `sprint98-validate`

Acceptance:
- `sprint98-validate` orchestrates the required proof suite.

#### S98-602 Evidence completeness
Write evidence under:
- `.planestack/governance/evidence/s98/operate/**`
- `.planestack/governance/evidence/s98/runbooks/**`
- `.planestack/governance/evidence/s98/ui/**`
- `.planestack/governance/evidence/s98/ai/**`

Acceptance:
- Missing required artifacts is a closeout failure even if tests pass.

---

## Canonical Sprint 98 route direction
Sprint 98 should prefer extending the existing Operate route family rather than introducing a new plane or generic execution surface.

Recommended canonical route family:
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/resources`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks:draft`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey:activate`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey:archive`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey:preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey:run`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runs/:runId`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks:ai-draft`

These are planning locks, not permission to add parallel execution APIs.

---

## Calculator litmus pack (required)
Sprint 98 must ship these canonical Calculator runbooks:

1. `calculator.bootstrap.local`
   - verify prerequisites
   - install/restore deps if required through named actions only
   - start local services/processes
   - capture startup evidence

2. `calculator.readiness.local`
   - verify expected ports/URLs
   - verify required files/env markers
   - run health probes
   - write readiness evidence

3. `calculator.test-and-evidence.local`
   - execute governed test targets
   - capture summaries and evidence refs
   - link results into Operate/Chronicle evidence as appropriate

4. `calculator.diagnose.common-failure`
   - inspect a bounded set of known-failure signals
   - produce likely-cause summary
   - link to recovery guidance

5. `calculator.reset-recover.local`
   - explicit confirm gate required
   - clear/recreate local state using allowlisted actions only
   - re-run readiness

---

## Explicit non-goals
Keep Sprint 98 clean by excluding:
- deployments / pipelines / CD
- remote writeback or mutable production actions
- generic shell execution
- public/anonymous review surfaces
- new analytics/reporting architecture
- full Visual Evidence V3 before/after diff work as the headline
- broad Admin/Access redesign outside what runbook/Operate UX needs

---

## Acceptance gates
Sprint 98 is complete only if all of the following are true:

1. `resources.json` exists, validates, and is used by runbooks for Calculator.
2. Runbooks exist as canonical `*.runbook.json` resources, not just markdown notes.
3. Runbook execution works through first-class Operate runs and writes step evidence, bounded logs, and final status.
4. Two-root invariants are enforced at the step contract layer and by runtime evidence behavior.
5. Only active runbooks execute normally; AI drafts require explicit human activation.
6. Calculator proves at least three canonical runbooks end-to-end.
7. `sprint98-validate`, `contract-test-docker`, and `e2e-gate` all pass.
8. All required evidence artifacts exist; missing artifacts is a closeout failure.
9. UX improvements are visible in runbook preview/execution ergonomics and explicit state handling.

---

## Implementation order
Lock the implementation order:
1. `ps-contracts`
2. `ps-api`
3. `ps-web`
4. `ps-dev/tests`
5. evidence wiring / mirror sync / archive / tags

AI draft flow must not start implementation before the contract format and execution lane exist.

---

## Closeout tags
Create/push from `poc-calculator`:
- `sprint98-pass-YYYY-MM-DD`
- `sprint98-evidence-YYYY-MM-DD`

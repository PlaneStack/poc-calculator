# PlaneStack — Sprint 102 Pack
**Sprint:** 102  
**Theme:** Operate v8 — Effective Execution Resolution + User-Local Overlays  
**Status:** Pass (validated and ready for archive)  
**Date:** 2026-03-09

## Intent
Sprint 102 is the sprint that must move Operate from a governed launcher into a **real execution control system for a project**.

The target problem is no longer “can PlaneStack run a command?” The target problem is:
- can PlaneStack determine the **correct effective execution plan** for a project,
- in a chosen environment,
- for a specific user,
- on that user’s machine,
- while keeping **project-wide truth** and **user-local customization** rigorously separate?

Sprint 102 must complete that capability for the local-first operating model, using `poc-calculator` as the litmus project.

## The vision this sprint must satisfy
Operate must become capable of all of the following:
- starting from governed project-level execution truth,
- resolving environment-specific execution details,
- discovering machine-local facts safely,
- accepting only bounded user-local customizations,
- previewing the fully resolved plan before execution,
- executing the resolved plan through the existing run/evidence model,
- and explaining failures in terms operators can actually act on.

## Non-negotiable distinction
Sprint 102 must preserve a hard boundary between:

### A) Project-level execution truth
Shared, governed, versioned, authoritative.
Examples:
- canonical runbooks
- resource inventory
- environment definitions
- command allowlists
- project defaults
- allowed override slots
- readiness checks

### B) User-local customization
Per-user, per-machine, non-governed overlay.
Examples:
- local executable paths
- preferred local ports
- workspace path differences
- machine-local service endpoints
- machine-specific tool locations
- local-only convenience overrides

**Project truth is authoritative. User-local customization is an overlay, never a replacement.**
A user-local overlay may fill in or refine project-approved slots, but may not mutate project truth or silently change project defaults for other users.

## Completion bar (meaty, not stubby)
Sprint 102 is complete only if all of the following land end to end:

1. **Governed execution contract model**
   - resources, runbooks, environments, and override slots are explicitly modeled,
   - project-level defaults and local overlay boundaries are represented in contracts,
   - protected values cannot be overridden by user-local settings.

2. **User-local overlay model**
   - overlay files exist outside project truth in `bridge_root`,
   - users can create/update/clear allowed local overrides,
   - overlays are validated against the governed slot contract,
   - forbidden overrides are blocked with explicit reason codes and evidence.

3. **Effective execution resolution engine**
   - Operate can resolve a deterministic effective plan for a runbook + environment + user,
   - resolved values are provenance-labeled by source,
   - preview shows the exact plan that will run,
   - preview→run binding is enforced.

4. **Machine discovery + preflight**
   - discovery checks can resolve executable paths, cwd, port availability, and local prerequisites,
   - missing tools, invalid paths, and port collisions surface as first-class diagnostics,
   - suggestions are explicit and safe.

5. **Execution + diagnostics**
   - the resolved plan executes through the normal run/evidence model,
   - per-step resolved values and bounded logs are written,
   - failures produce diagnostics with reason code, source context, and next actions.

6. **Operate UX completion**
   - operators can inspect resources, edit user-local overlays, preview resolved plans, and execute safely,
   - UI distinguishes project defaults vs environment values vs user-local overlays vs resolved-for-run,
   - empty/no-data/blocked/error states are explicit and calm.

7. **Calculator gold proof bundle**
   - Calculator proves the full loop for Local plus at least one custom environment,
   - at least one successful user-local port override,
   - at least one successful executable-path override,
   - at least two deterministic failure proofs (e.g. port collision, executable missing),
   - at least one blocked protected-override proof.

8. **Validation and evidence completeness**
   - `sprint102-validate`, `contract-test-docker`, and `e2e-gate` all pass,
   - all required artifacts in `S102-evidence.json` exist,
   - missing evidence is a closeout failure even with green tests.

If any of the above exists only as a schema, a placeholder surface, or a partially wired suggestion system, Sprint 102 is not complete.

## Governance preflight
All Sprint 102 work-producing runs must honor the active governance and filesystem invariants.

- `project_root` and `bridge_root` remain distinct filesystem roots.
- Governed outputs and versioned evidence are written only under `project_root` (for example `poc-calculator/.planestack/**`).
- Scratch workspaces, temp files, local discovery caches, ephemeral screenshots, and bridge-local overlays remain under `bridge_root`.
- Work-producing runs must set:
  - `SPRINT_CODE=S102`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence must begin with:
  - `make -C ps-dev governance-lock-check`
- Lock-check evidence must be written under:
  - `.planestack/governance/evidence/s102/lock-check.json`

`governance-lock-check` is required before any of the following:
- activate/archive runbook or environment records that affect execution contracts,
- write or update user-local overlay evidence,
- preview or run when evidence will be written,
- generate AI-authored suggestions or draft overlays if they write evidence,
- generate effective-config rollups.

## Governing posture (Sprint 102 locks)
These locks are non-negotiable.

### 1) Operate remains the canonical plane
Sprint 102 adds no new plane.

UI remains under the existing Operate route family:
- `/ou/{ouKey}/p/{projectKey}/plane/operate/:surface`

Sprint 102 may add/refine Operate surfaces, but must not create a parallel top-level “Configs”, “Launcher”, or “Diagnostics” plane.

### 2) Canonical project truth stays in project_root
Authoritative project-scoped execution files remain governed in project root:
- `.planestack/governance/operate/resources.json`
- `.planestack/governance/operate/environments.json`
- `.planestack/governance/operate/execution-slots.json`
- `.planestack/runbooks/operate/index.json`
- `.planestack/runbooks/operate/<runbook_key>.runbook.json`
- `.planestack/runbooks/operate/templates/index.json`
- `.planestack/runbooks/operate/templates/<template_key>.template.runbook.json`

Optional rendered companions may exist as Markdown, but execution reads structured contracts only.

### 3) User-local overlays stay outside project truth
Canonical bridge-root paths for Sprint 102:
- `<bridge_root>/operate/users/<user_key>/projects/<project_key>/facts.json`
- `<bridge_root>/operate/users/<user_key>/projects/<project_key>/environments/<env_key>/overlay.json`

These files:
- are user-local,
- are not mirrored into project root,
- must never silently mutate governed project artifacts,
- may only fill slots marked as user-overridable.

### 4) Effective resolution precedence is fixed
Sprint 102 must resolve execution values in this exact order:
1. runbook defaults
2. environment configuration
3. resource bindings
4. discovery facts (machine-local, bridge-root)
5. user-local overlay (bridge-root)
6. per-run explicit overrides, only where allowed

Every resolved value must record its `source_kind`.

### 5) Override slots are governed explicitly
Canonical slot contract file:
- `.planestack/governance/operate/execution-slots.json`

Each slot must declare at minimum:
- `slot_key`
- `value_type`
- `default_source`
- `required`
- `user_local_allowed: true|false`
- `run_override_allowed: true|false`
- `protected: true|false`
- `validation`

A user-local overlay may only set slots with `user_local_allowed=true`.
Protected slots must reject user-local attempts with explicit reason code and evidence.

### 6) Resources remain governed and allowlisted
The authoritative resource inventory remains:
- `.planestack/governance/operate/resources.json`

All executable steps must resolve only through governed `command_ref` entries sourced from `resources.json`.
Each resource/command entry must declare:
- `exec_mode: local_bridge | server_only`
- `allowed_envs`
- `writes: [scratch | evidence]`
- `requires_confirmation: true|false`
- `resolvable_slots[]`

Unknown or unsafe `command_ref` resolution must fail as `blocked` with explicit reason code.

### 7) Two-root enforcement applies to every step and every resolved path
Every step and template-rendered step must declare:
- `writes_evidence: true|false`
- `evidence_paths[]`
- `scratch_paths[]`
- `path_slots[]`

Rule:
- evidence outputs → `project_root/.planestack/**`
- scratch/temp/workspace → `bridge_root/**`

Any attempted evidence write outside `project_root` or any attempt to treat bridge-root data as shared project truth is a blocking failure.

### 8) Preview is zero-side-effect and mandatory for local_mutate
Required routes:
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey:preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey:run`

`:preview` must:
- perform zero side effects,
- return the fully resolved execution plan,
- return `plan_hash`, `confirm_token`, warnings, blockers, and evidence targets,
- show source provenance for all resolved values.

Any run containing a `local_mutate` step must require a preview first.

### 9) Preview→run binding, version pinning, and idempotency are mandatory
- run requests must reference `runbook_key` and `runbook_version` or `runbook_hash`
- every run stores:
  - `runbook_ref: { key, version, artifact_id, integrity_hash }`
- `:preview` returns `plan_hash` and `confirm_token`
- `:run` must include both
- server verifies token matches plan hash and runbook hash/version
- `Idempotency-Key` is required on `:run` and any overlay-writing mutate routes

### 10) Explicit run state machine remains in force
Canonical run states for Sprint 102:
- `queued`
- `running`
- `waiting_manual`
- `completed_pass`
- `completed_fail`
- `blocked`
- `canceled`

`waiting_manual` is distinct from `blocked`.

### 11) Guided diagnostics are source-aware outputs
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
- `resolved_sources[]`
- `generated_at`

Diagnostics must be able to say which source layer produced the bad value.
Unknown reason codes are a contract violation.

### 12) UX scope is broad enough to matter, bounded enough to finish
Sprint 102 UX must focus on:
- resource inventory/detail,
- environment detail with effective-config summary,
- user-local overlay editor,
- resolved plan preview,
- run progress + per-step evidence,
- diagnostics panel with next actions,
- clear labels for project vs environment vs user-local vs resolved-for-run values.

Do not let unrelated visual polish absorb the sprint.

### 13) Calculator remains the gold reference project
`poc-calculator` is the required litmus project and the first gold reference for effective local execution resolution.

### 14) No silent writeback from user-local overlays
Sprint 102 must not allow:
- user-local path tweaks to become project defaults,
- user-local port overrides to rewrite environment defaults,
- bridge-root facts to be written into project truth by accident.

If a project-wide default needs to change, that must happen through a governed project-level change.

---
## Exhaustive feature set and implementation task list

## EPIC 102.1 — Execution contract model
### Goal
Model all execution inputs explicitly so Operate can resolve a real plan instead of guessing.

### Features
- governed slot catalog
- typed slot validation
- protected vs user-overridable slots
- resource-to-slot mapping
- runbook step slot usage
- environment slot bindings

### Tasks
1. Add `ps-contracts/schemas/operate-execution-slot.schema.json`.
2. Add `ps-contracts/schemas/operate-user-overlay.schema.json`.
3. Add `ps-contracts/schemas/operate-discovery-facts.schema.json`.
4. Add `ps-contracts/schemas/operate-effective-config.schema.json`.
5. Add `ps-contracts/schemas/operate-preview-plan.schema.json`.
6. Extend runbook schema to declare `required_slots[]`, `optional_slots[]`, `protected_slots[]`, `step.slot_refs[]`, `step.path_slots[]`, and `step.expected_ports[]`.
7. Extend resource schema to declare `resolvable_slots[]`, `command_ref`, `exec_mode`, `allowed_envs`, and write scopes.
8. Add OpenAPI components + examples for slot, overlay, discovery facts, effective config, and preview plan.
9. Update operation registry for all new Operate routes.
10. Add contract tests for slot validation and protected-slot enforcement.

## EPIC 102.2 — User-local overlay model
### Goal
Provide a safe, per-user bridge-root overlay that can refine execution without contaminating project truth.

### Features
- per-user overlay read/write
- bridge-root persistence only
- slot validation
- protected override blocking
- overlay clear/reset
- overlay provenance and evidence

### Tasks
1. Add API routes:
   - `GET /api/v1/ou/:ouKey/p/:projectKey/operate/environments/:envKey/overlay:me`
   - `POST /api/v1/ou/:ouKey/p/:projectKey/operate/environments/:envKey/overlay:upsert`
   - `POST /api/v1/ou/:ouKey/p/:projectKey/operate/environments/:envKey/overlay:clear`
2. Require `Idempotency-Key` on overlay mutate routes.
3. Validate overlay payload strictly against slot contract.
4. Reject any key not marked `user_local_allowed=true`.
5. Write overlay evidence artifacts into project-root evidence without writing the overlay itself into project root.
6. Add server-side proof object showing accepted keys, rejected keys, and source labels.
7. Add bridge-root file writer/reader utilities.
8. Add contract tests for protected override denial and overlay clearing.

## EPIC 102.3 — Discovery and preflight engine
### Goal
Discover machine-local facts and detect local execution blockers before a run starts.

### Features
- executable discovery
- cwd/path validation
- port availability probe
- local prerequisite probe
- deterministic evidence for discovery outcomes

### Tasks
1. Add discovery adapters for:
   - executable path existence
   - working-directory existence
   - port in-use detection
   - required file existence
   - service endpoint reachability where explicitly allowed
2. Materialize discovery facts at:
   - `<bridge_root>/operate/users/<user_key>/projects/<project_key>/facts.json`
3. Add proof writers for discovery evidence.
4. Add blocked reason codes for:
   - `executable_missing`
   - `cwd_missing`
   - `port_in_use`
   - `required_file_missing`
   - `resource_unreachable`
5. Add safe suggestions for resolvable discovery failures.
6. Add deterministic smoke scripts for discovery proofs.

## EPIC 102.4 — Effective resolution engine
### Goal
Resolve an exact execution plan with value provenance.

### Features
- stable precedence layering
- resolved value table
- source labeling
- protected-slot refusal
- required-slot completeness checks
- per-run explicit override validation

### Tasks
1. Implement a resolver that merges sources in the locked precedence order.
2. Emit a `resolved_values[]` table with:
   - `slot_key`
   - `resolved_value`
   - `source_kind`
   - `source_ref`
   - `protected`
3. Fail preview if required slots remain unresolved.
4. Fail preview if overlay tries to supply protected slots.
5. Produce stable `plan_hash` from canonical preview JSON excluding server timestamps/integrity.
6. Persist preview evidence object.
7. Add unit/contract tests for precedence and protection rules.

## EPIC 102.5 — Preview, confirm, and execute
### Goal
Make preview the trustworthy decision surface before execution.

### Features
- zero-side-effect preview
- explicit resolved command plan
- confirmation token binding
- per-step effective arguments/env values/path values
- run execution through existing run/evidence model

### Tasks
1. Expand `:preview` response to include:
   - resolved plan
   - plan hash
   - confirm token
   - warnings
   - blockers
   - evidence targets
   - resolved value provenance
2. Expand `:run` to require:
   - `env_key`
   - `plan_hash`
   - `confirm_token`
   - `runbook_version|hash`
3. Verify preview→run binding server-side.
4. Materialize per-run artifacts:
   - `resolved-plan.json`
   - `resolved-values.json`
   - `runbook-run.json`
   - `steps/<n>-<step_id>.json`
   - `logs.txt`
5. Bound logs and redact local-only sensitive fields where necessary.
6. Preserve current run state machine.
7. Add idempotency/dedupe handling for run starts.

## EPIC 102.6 — Diagnostics and suggestions
### Goal
Turn local execution failures into understandable, actionable diagnostics.

### Features
- source-aware diagnostics
- next-actions suggestions
- safe-to-rerun guidance
- resource/environment context
- known failure proofs for Calculator

### Tasks
1. Extend diagnostics taxonomy with effective-config and discovery failures.
2. Return structured diagnostics for:
   - missing executable
   - invalid cwd
   - unresolved required slot
   - protected override denied
   - port collision
   - resource unreachable
   - confirmation required
3. Add `resolved_sources[]` and `source_blame` style fields to diagnostics response.
4. Add next-action generation rules for common local failures.
5. Write deterministic evidence for at least two named Calculator failure scenarios.
6. Add UI support for “what changed?” and “what value came from where?” in diagnostics.

## EPIC 102.7 — Operate UX completion
### Goal
Give operators a clear way to inspect, tweak, preview, and run without guessing.

### Features
- resource inventory surface
- environment detail effective-config summary
- user-local overlay editor
- resolved plan preview panel
- run detail with source labels and evidence links
- calm empty/blocked/error states

### Tasks
1. Add/refine Operate surfaces:
   - `overview`
   - `environments`
   - `resources`
   - `runbooks`
   - `execution`
   - `settings`
2. Add resource list/detail UI.
3. Add overlay editor UI on environment detail or preview flow.
4. Add effective-config panel with labels:
   - `Project default`
   - `Environment value`
   - `Discovery fact`
   - `User-local override`
   - `Resolved for this run`
5. Add preview panel rendering blockers, warnings, evidence paths, and resolved values.
6. Add diagnostics panel rendering next actions, safe-to-rerun, and source labels.
7. Add deterministic `data-testid` coverage for all critical UI states.

## EPIC 102.8 — Calculator gold proof bundle
### Goal
Prove the whole model with the litmus project.

### Required proof cases
1. `Local` environment resolves and runs successfully with no user-local overrides.
2. A custom environment resolves and runs successfully.
3. A user-local port override resolves and runs successfully.
4. A user-local executable-path override resolves and runs successfully.
5. A protected override attempt is blocked with explicit evidence.
6. A port collision produces deterministic diagnostics and next actions.
7. An executable-missing condition produces deterministic diagnostics and next actions.

### Tasks
1. Update Calculator resource inventory.
2. Update Calculator runbooks to declare slots and expected ports.
3. Add one custom environment for proofing.
4. Generate evidence bundle for each required case.
5. Produce `calculator-gold-resolution-summary.json`.

## EPIC 102.9 — Migration and backward compatibility
### Goal
Move current execution flows into the effective-resolution model without silent breakage.

### Tasks
1. Keep existing runbook execution routes but route them through the new resolver.
2. Require explicit `env_key` on preview/run at the API layer.
3. UI may preselect Local, but must submit it explicitly.
4. Add migration for any legacy runbook/resource records missing slot declarations.
5. Reject unsupported legacy paths with explicit diagnostics, not silent fallback.

## EPIC 102.10 — Validation, evidence, and closeout
### Goal
Make Sprint 102 provable and closeable.

### Tasks
1. Add `sprint102-validate`.
2. Required subtargets:
   - `s102-resource-inventory-smoke`
   - `s102-user-overlay-smoke`
   - `s102-protected-override-blocked-smoke`
   - `s102-discovery-smoke`
   - `s102-effective-config-resolve-smoke`
   - `s102-preview-plan-smoke`
   - `s102-port-collision-smoke`
   - `s102-executable-missing-smoke`
   - `s102-effective-config-panel-ui-smoke`
   - `s102-user-overlay-editor-ui-smoke`
   - `s102-run-preview-ui-smoke`
   - `s102-calculator-gold-resolution-smoke`
   - `s102-evidence-completeness-check`
3. Keep `contract-test-docker` and `e2e-gate` as blocking gates.
4. Missing required artifacts remains a closeout failure.

---
## API and contract set to complete in Sprint 102
### Required routes
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/resources`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/resources/:resourceKey`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/environments`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/environments/:envKey`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/environments/:envKey/overlay:me`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/environments/:envKey/overlay:upsert`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/environments/:envKey/overlay:clear`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey:preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey:run`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runs/:runId`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runs/:runId/diagnostics`

### Required schema additions/updates
- `operate-execution-slot.schema.json`
- `operate-user-overlay.schema.json`
- `operate-discovery-facts.schema.json`
- `operate-effective-config.schema.json`
- `operate-preview-plan.schema.json`
- `operate-resource.schema.json` (expanded)
- `operate-runbook.schema.json` (expanded)
- `operate-run.schema.json` (expanded)
- `operate-run-diagnostics.schema.json` (expanded)

---
## UI minimum requirements
### Required Operate surfaces
- `overview`
- `environments`
- `resources`
- `runbooks`
- `execution`
- `settings`

### Required test ids
- `operate-surface-resources`
- `operate-surface-environments`
- `operate-surface-runbooks`
- `operate-resource-row-<resourceKey>`
- `operate-environment-row-<envKey>`
- `operate-overlay-editor-<envKey>`
- `operate-overlay-save-<envKey>`
- `operate-overlay-clear-<envKey>`
- `operate-effective-config-panel`
- `operate-effective-config-source-project`
- `operate-effective-config-source-environment`
- `operate-effective-config-source-discovery`
- `operate-effective-config-source-user`
- `operate-preview-plan`
- `operate-preview-blockers`
- `operate-preview-warnings`
- `operate-run-start`
- `operate-run-detail-diagnostics`
- `operate-run-detail-next-actions`
- `operate-run-detail-source-table`
- `operate-protected-override-blocked`

---
## Explicit out-of-scope items
Sprint 102 must **not** expand into:
- deployment or pipeline execution,
- remote production mutation,
- cross-project overlay sharing,
- cross-OU or public sharing,
- generic terminal access,
- free-form shell execution,
- broad admin/MFA headline work unrelated to Operate,
- non-Operate plane redesign.

---
## Acceptance criteria
Sprint 102 is done when:
1. Operate can resolve a deterministic execution plan for a runbook + environment + user.
2. User-local overlays exist and work only within allowed slots.
3. Protected/project-wide defaults cannot be overridden by user-local customizations.
4. Preview shows the real effective plan with value provenance.
5. Run execution writes resolved-plan and resolved-values evidence.
6. Diagnostics explain failures in terms of source layer and next actions.
7. Calculator proves successful and failure scenarios end to end.
8. `sprint102-validate`, `contract-test-docker`, and `e2e-gate` all pass.
9. All required evidence artifacts exist.

## Suggested tranche order
1. `ps-contracts`
2. `ps-api`
3. `ps-web`
4. `ps-dev/tests`
5. evidence wiring + pack backfill

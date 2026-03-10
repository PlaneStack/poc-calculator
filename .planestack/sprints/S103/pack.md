# PlaneStack — Sprint 103 Pack
**Sprint:** 103  
**Theme:** Operate v10 — Guided Local Setup + Remediation  
**Status:** Complete (implementation + validation + closeout in progress)  
**Date:** 2026-03-09

## Intent
Sprint 103 is the sprint that must turn Operate from a capable, governed execution system into a **daily-driver local operator assistant**.

Sprint 102 established effective execution resolution, strict separation between project-level execution truth and user-local overlays, and evidence-backed resolved-plan execution. Sprint 103 must now complete the next mile:
- get a real user from **zero → runnable → repaired** on their actual machine,
- surface missing prerequisites and bad local state before execution,
- suggest safe user-local remediation,
- preserve the hard boundary between governed project truth and local adaptation,
- and make the Operate UX clear enough that users trust it without reading raw JSON or spelunking logs.

`poc-calculator` remains the litmus project and must prove the full guided local setup + remediation loop.

## The problem this sprint must solve
A technically correct Operate system is still insufficient if users cannot reliably answer:
- What is missing on my machine?
- Which values are project defaults versus my local overrides?
- Why did this plan fail here but not elsewhere?
- What safe next action should I take now?
- Can PlaneStack suggest and apply **local-only** fixes without mutating project truth?

Sprint 103 must make those answers explicit, trustworthy, and evidence-backed.

## Completion bar (meaty, not stubby)
Sprint 103 is complete only if all of the following land end to end:

1. **Guided local setup flow**
   - Operate can walk a user through required resources, discovery facts, unresolved slots, local overlay values, and final plan readiness.
   - First-run and subsequent-run setup flows are both supported.
   - The flow explicitly distinguishes project truth, environment values, discovery facts, user-local overlay values, and resolved-for-run values.

2. **Safe remediation engine**
   - Operate can suggest safe local-only fixes for deterministic local failure classes.
   - At minimum, Sprint 103 must cover:
     - executable path binding,
     - port collision remediation,
     - workspace/cwd correction,
     - unresolved required user-local slot completion,
     - clearing an invalid overlay value.
   - Remediation must never mutate project truth.

3. **Setup/remediation UX completion**
   - Users can inspect setup blockers, apply allowed local fixes, preview the updated plan, and execute.
   - UI provides explicit calm states for:
     - ready,
     - not configured,
     - blocked,
     - waiting for user input,
     - failed preflight,
     - failed run,
     - remediated-and-ready.

4. **Resource-aware diagnostics**
   - Diagnostics must identify not only what failed, but which resource, which environment, which slot/source, and whether the fix belongs in project truth or user-local overlay.
   - Diagnostics must provide deterministic next actions, not just logs.

5. **Resolved-plan compare UX**
   - Operate can show current resolved plan versus the last successful plan for the same runbook/environment/user.
   - The compare must make source provenance explicit and highlight only meaningful changes.

6. **Machine discovery completion**
   - Discovery must support and prove:
     - executable discovery,
     - port availability check,
     - workspace/cwd validation,
     - required file presence,
     - prerequisite tool presence.
   - Discovery results must be clearly labeled as machine-local facts and never written back into project truth.

7. **Calculator gold proof bundle**
   - A new user can get `poc-calculator` from incomplete local state to runnable through Operate-guided setup.
   - At least three deterministic local failure cases must be detected and remediated:
     - executable missing or wrong path,
     - port collision,
     - invalid workspace/cwd or unresolved local slot.
   - At least one re-run after remediation must prove success.

8. **Validation and evidence completeness**
   - `sprint103-validate`, `contract-test-docker`, and `e2e-gate` all pass.
   - All required artifacts in `S103-evidence.json` exist.
   - Missing evidence is a closeout failure even with green tests.

If any of the above exists only as a schema, stub banner, or UI shell with no deterministic proof path, Sprint 103 is not complete.

## Governance preflight
All Sprint 103 work-producing runs must honor the active governance and filesystem invariants.

- `project_root` and `bridge_root` remain distinct filesystem roots.
- Governed outputs and versioned evidence are written only under `project_root`.
- Scratch workspaces, temp files, local discovery caches, screenshots, and user-local overlays remain under `bridge_root`.
- Work-producing runs must set:
  - `SPRINT_CODE=S103`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence must begin with:
  - `make -C ps-dev governance-lock-check`
- Lock-check evidence must be written under:
  - `.planestack/governance/evidence/s103/lock-check.json`

`governance-lock-check` is required before any of the following:
- runbook preview or run when evidence will be written,
- any remediation action that writes local overlay evidence,
- any overlay mutation,
- any setup wizard completion action that writes proof artifacts,
- any run/diagnostics compare rollup generation.

## Governing posture (Sprint 103 locks)

### 1) Operate remains the canonical plane
Sprint 103 adds no new plane.

UI remains under the existing Operate route family:
- `/ou/{ouKey}/p/{projectKey}/plane/operate/:surface`

Sprint 103 may add/refine Operate surfaces, but must not create a parallel “Setup”, “Launcher”, or “Diagnostics” plane.

### 2) Project truth remains authoritative
Project-level execution truth remains governed under `project_root` and may not be silently changed by setup or remediation flows.

Authoritative files remain:
- `.planestack/governance/operate/resources.json`
- `.planestack/governance/operate/environments.json`
- `.planestack/governance/operate/execution-slots.json`
- `.planestack/runbooks/operate/index.json`
- `.planestack/runbooks/operate/<runbook_key>.runbook.json`
- `.planestack/runbooks/operate/templates/index.json`
- `.planestack/governance/operate/diagnostics-taxonomy.json`

### 3) User-local overlay is local-only
Canonical bridge-root paths continue:
- `<bridge_root>/operate/users/<user_key>/projects/<project_key>/facts.json`
- `<bridge_root>/operate/users/<user_key>/projects/<project_key>/environments/<env_key>/overlay.json`

Sprint 103 may add bridge-root remediation/cache files, but none may be mirrored into project truth.

### 4) Remediation is local-only unless explicitly impossible
Sprint 103 remediation actions may only:
- set or clear allowed user-local slots,
- choose from machine-local discovery results,
- bind allowed local executable/workspace/port values,
- request manual confirmation for safe local mutation.

Sprint 103 remediation actions may not:
- change canonical runbook defaults,
- change environment contract values for all users,
- change protected slots,
- rewrite project resources or command allowlists.

### 5) Fixed failure/remediation reason taxonomy is required
Sprint 103 must extend and use a deterministic reason taxonomy for setup/remediation cases.
Minimum required reason codes:
- `required_slot_unresolved`
- `protected_override_denied`
- `resource_ref_missing`
- `discovery_facts_missing`
- `overlay_value_invalid`
- `command_plan_unresolvable`
- `executable_not_found`
- `port_collision_detected`
- `workspace_path_invalid`
- `required_file_missing`
- `tool_prerequisite_missing`
- `overlay_clear_recommended`
- `safe_local_remediation_available`
- `manual_local_input_required`

Unknown reason codes are a contract violation.

### 6) Preview remains zero-side-effect; remediation requires explicit confirmation where needed
`:preview` remains zero-side-effect.

Any remediation marked `local_mutate` requires:
- preview-bound `plan_hash`,
- preview-bound `confirm_token`,
- explicit confirmation in UI/API,
- evidence written with the run/remediation record.

### 7) Run state machine remains explicit
Required statuses remain:
- `queued`
- `running`
- `waiting_manual`
- `completed_pass`
- `completed_fail`
- `blocked`
- `canceled`

Sprint 103 may add setup/remediation sub-status in evidence, but not a second competing run state model.

### 8) Idempotency/dedupe remains required
Idempotency-Key is required on:
- `:run`
- overlay mutate routes
- remediation apply routes

Replay window for Sprint 103 remains 15 minutes.

## Scope: exhaustive feature/task set

### Epic 103.1 — Guided local setup model
Implement a real setup model, not just a checklist.

Tasks:
- Add setup-state contract describing:
  - required project resources,
  - required discovery facts,
  - unresolved slots,
  - current environment applicability,
  - remediation candidates,
  - readiness summary.
- Add `GET /api/v1/ou/:ouKey/p/:projectKey/operate/setup?env_key=&runbook_key=`.
- Add setup-state schema in `ps-contracts`.
- Add setup-state evidence artifact writer.
- Add setup-state compare against last successful run.
- Add no-data/not-configured state semantics.
- Add server-side source provenance labels for every displayed value.

### Epic 103.2 — Discovery completion and suggestion engine
Tasks:
- Extend bridge helpers to detect:
  - preferred Node executable path,
  - package manager path (`npm`, `pnpm`, or equivalent),
  - working directory validity,
  - required file presence,
  - port availability,
  - optional local service dependency reachability.
- Normalize discovery output into governed evidence.
- Map discovery failures to reason codes.
- Add suggestion engine for safe local fixes based on deterministic rules.
- Add evidence for discovery results and suggestions.

### Epic 103.3 — Local remediation actions
Tasks:
- Add explicit remediation action catalog.
- Add remediation contracts for:
  - bind executable path,
  - select alternate free port,
  - set workspace path,
  - clear invalid overlay slot,
  - fill unresolved user-local slot.
- Add API routes for remediation preview/apply.
- Ensure remediation writes only bridge-root overlay + project-root evidence.
- Ensure protected slot remediation is blocked.
- Add confirm-token binding for local_mutate remediation.
- Add idempotency support on remediation apply routes.

### Epic 103.4 — Effective plan UX and compare
Tasks:
- Add Operate effective-plan panel showing:
  - project defaults,
  - environment values,
  - discovery facts,
  - user-local overlay,
  - resolved-for-run values.
- Add source badges:
  - `project_default`
  - `environment_value`
  - `resource_binding`
  - `discovery_fact`
  - `user_local_overlay`
  - `run_override`
- Add compare-to-last-successful-run capability.
- Add explicit highlighting of changed resolved values.
- Add redaction handling for sensitive machine-local data.

### Epic 103.5 — Diagnostics and next actions
Tasks:
- Extend diagnostics contract to include:
  - resource context,
  - environment context,
  - source context,
  - remediable=true/false,
  - suggested next actions,
  - whether the next action is local-only or project-level.
- Add run detail diagnostics panel with:
  - summary,
  - severity,
  - step refs,
  - evidence links,
  - next actions,
  - safe-to-rerun,
  - “project-level change required” marker when applicable.
- Add deterministic next actions for Calculator failure classes.

### Epic 103.6 — Guided setup/remediation UX
Tasks:
- Add Operate setup surface or setup panel under existing Operate IA.
- Add setup checklist UI.
- Add guided remediation cards/actions.
- Add preview-before-apply for local_mutate remediation.
- Add run-after-remediation CTA.
- Add calm explicit states for ready/not-configured/blocked/waiting-manual/failed/remediated.
- Add required `data-testid` set for setup/remediation UI.

### Epic 103.7 — Calculator gold path
Tasks:
- Prove Local environment first-run setup.
- Prove at least one custom environment setup and run.
- Prove successful local port override.
- Prove successful executable path binding.
- Prove invalid overlay clear/remediate flow.
- Prove three deterministic failure scenarios with remediation:
  - executable missing,
  - port collision,
  - invalid workspace or unresolved slot.
- Prove rerun success after remediation.
- Produce gold proof summary artifact.

### Epic 103.8 — Validation, regressions, and evidence completeness
Tasks:
- Add `sprint103-validate`.
- Include:
  - setup-state smoke,
  - discovery smoke,
  - remediation preview smoke,
  - remediation apply smoke,
  - protected-slot denial smoke,
  - compare-to-last-success smoke,
  - diagnostics-next-actions smoke,
  - Calculator first-run guided setup smoke,
  - Calculator remediation-to-success smoke,
  - evidence completeness check.
- Include critical regressions from S100–S102:
  - environment selector,
  - runbook applicability,
  - overlay isolation,
  - explicit env_key on run/preview,
  - templates surface remains intact.

## Canonical routes (S103)
Required/extended routes:
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/setup?env_key=&runbook_key=`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/resources`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/environments`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey:preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/runbooks/:runbookKey:run`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runs/:runId`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/runs/:runId/diagnostics`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/overlay:me?env_key=`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/overlay:upsert`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/overlay:clear`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/remediation:preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/remediation:apply`

## Operate IA / surfaces
Sprint 103 required Operate surfaces:
- `overview`
- `environments`
- `resources`
- `runbooks`
- `templates`
- `execution`
- `incidents`
- `settings`

Sprint 103 may expose setup/remediation as:
- an explicit `overview`/`execution` embedded panel, or
- an `operate/setup` surface under the same plane

No new plane.

## Required UX/test IDs
Minimum required `data-testid` set:
- `operate-surface-overview`
- `operate-surface-resources`
- `operate-setup-panel`
- `operate-setup-checklist`
- `operate-setup-blocker-<reasonCode>`
- `operate-remediation-card-<reasonCode>`
- `operate-remediation-preview`
- `operate-remediation-apply`
- `operate-effective-config-panel`
- `operate-effective-config-compare-last-success`
- `operate-effective-config-source-<sourceKind>`
- `operate-overlay-editor`
- `operate-overlay-clear`
- `operate-diagnostics-panel`
- `operate-diagnostics-next-actions`
- `operate-run-after-remediation`
- `operate-library-filter-env`
- `operate-library-filter-status`
- `operate-library-search`

## Non-goals
Keep Sprint 103 focused and complete. Explicitly out of scope:
- cross-project overlay sharing,
- project-truth mutation from local remediation,
- deployment/pipeline work,
- public/external sharing,
- broad MFA/admin headline work,
- generic design-system cleanup unrelated to setup/remediation,
- remote production mutation features.

## Acceptance criteria
Sprint 103 is done only when all of the following are true:
- A user can go from incomplete local state to successful run through Operate-guided setup.
- PlaneStack can detect and explain at least three deterministic local failure classes.
- PlaneStack can safely apply local-only remediation for those classes without mutating project truth.
- Preview and remediation maintain strict source provenance and preview→run binding.
- Effective plan compare against last-successful run is visible and correct.
- Calculator proves the full loop end to end.
- `sprint103-validate`, `contract-test-docker`, and `e2e-gate` all pass.
- All required artifacts in `S103-evidence.json` exist.

# PlaneStack — Sprint 105 Pack
**Sprint:** 105  
**Theme:** Operate v12 — Governed Local Delivery Loop  
**Status:** Complete (locked for implementation)  
**Date:** 2026-03-09

## Intent
Sprint 105 is the sprint that must turn PlaneStack Operate from an increasingly-capable execution system into a **coherent, end-to-end local delivery loop** for a real project.

By the end of this sprint, PlaneStack should be able to take a project that already has scoped work, governed runbooks, environments, startup profiles, and bridge-supervised sessions, and make the **daily local workflow** feel complete:

- understand what the current work item / scope is trying to achieve,
- recommend the right governed local actions,
- resolve the correct startup profile and execution plan,
- launch and supervise the local session through the bridge,
- run governed install / build / test / watch / seed / reset actions,
- keep project truth separate from user-local overlays,
- explain failures and safe remediations clearly,
- and prove the full path with `poc-calculator`.

Sprint 105 is not complete if PlaneStack can merely *execute pieces*. It is complete only if the user can move through a **governed local delivery loop** without dropping into ad hoc shell behavior.

## Why this sprint exists
Operate has already accumulated a strong foundation:
- environments,
- runbooks,
- startup profiles,
- bridge-supervised sessions,
- effective plan resolution,
- local overlay handling,
- diagnostics and remediation.

The remaining product gap is that users still need the whole thing to feel like a **single local delivery workflow** rather than a set of adjacent capabilities.

This sprint closes that gap by binding together:
- **Work / Scope / Goals**
- **Resources / Runbooks / Startup Profiles**
- **Bridge-supervised local actions**
- **Runs / Sessions / Evidence**
- **Diagnostics / Remediation / Next actions**

## Completion bar (deep, completion-oriented)
Sprint 105 is complete only if **all** of the following land end to end:

1. **Work-to-Operate handoff is real**
   - PlaneStack can surface governed “next actions” from scoped work / current solution context into Operate.
   - Recommended runbooks/startup profiles/actions are visible and explainable.
   - The user can move from scoped work context into executable local delivery actions without manual hunting.

2. **Governed local action catalog is real**
   - Install, build, test, watch/dev, seed/reset, and verify/smoke actions are first-class governed actions.
   - Actions are resource-aware, previewable, bridge-executed, and evidence-writing.
   - Actions do not degrade into arbitrary shell wrappers.

3. **Bridge-supervised session hardening is complete**
   - Existing session orchestration is strong enough for daily use.
   - Start/stop/restart/restart-service remain stable.
   - Session state, logs, health polling, and degraded handling remain deterministic and evidence-backed.

4. **Effective plan UX is complete**
   - The user can see:
     - project defaults,
     - environment values,
     - startup profile choices,
     - user-local overlay values,
     - effective resolved values for this run,
     - and what changed from the last successful run.
   - Every major value source is labeled clearly.

5. **Guided remediation is local and safe**
   - Missing executable, invalid path, missing env value, port collision, unhealthy dependency, and invalid overlay cases all produce usable next actions.
   - Safe fixes remain local-only unless a project-level mutation is explicitly invoked through a governed admin path.
   - Remediation actions write evidence and can drive a successful rerun.

6. **Calculator gold local delivery path is real**
   - `poc-calculator` proves:
     - scoped work context,
     - recommended local action(s),
     - startup profile selection,
     - bridge session start,
     - governed build/test/watch/verify actions,
     - deterministic failure/remediation scenarios,
     - successful recovery back to green.

7. **Validation and proof are strict**
   - `sprint105-validate`
   - `contract-test-docker`
   - `e2e-gate`
   all pass.
   - Missing required evidence is a closeout failure.

## Hard design locks

### 1. PlaneStack service vs bridge
PlaneStack service owns:
- project truth
- work/scope linkage
- runbooks / startup profiles / resources
- effective plan resolution
- runs / sessions / evidence records
- diagnostics / next-actions UX

Bridge owns:
- machine discovery
- local action execution
- process/session supervision
- polling
- bounded logs
- user-local overlay application
- safe local remediation apply

### 2. Project truth vs user-local overlay
Project truth remains authoritative and governed.
User-local overlay remains local-only and may:
- fill unresolved local values,
- bind local executable paths,
- accept alternate ports or machine-local paths,
- record local safe fixes.

User-local overlay may **not** silently rewrite project defaults, startup profiles, runbooks, or resource truth.

### 3. Governed actions only
No arbitrary shell execution surface is introduced in Sprint 105.
All local actions must resolve through governed resources / command refs / action definitions.

### 4. Preview before mutation
Any local-mutating action must support preview and explicit confirmation before execution.

### 5. Evidence is required
Every significant local action, session transition, remediation, and rerun must write evidence under project root.

## Scope

### Epic 105.1 — Work / Scope → Operate binding
Turn scoped work context into actionable local delivery guidance.

#### Deliverables
- Work-context recommendation model for Operate:
  - current work item / goal / scoped summary
  - recommended runbooks
  - recommended startup profile
  - recommended next local actions
- Operate entry points from Work / Center / relevant summary surfaces
- Work-context evidence that explains why a runbook/profile/action was recommended
- Calculator proof that a scoped work item can drive the correct local delivery recommendation

#### Tasks
- Add recommendation contract/schema
- Add API route(s) for retrieving governed local recommendations from scoped work context
- Link runbooks/startup profiles/actions to work tags/goals/resource scope
- Add Operate UI component showing recommended actions from current scope
- Add deterministic selection rules and tie-breaks
- Write recommendation proof artifacts and regression tests

### Epic 105.2 — Governed local action catalog
Model the common local delivery actions as first-class governed actions.

#### Required action families
- install/setup
- seed/reset
- build
- test
- watch/dev
- verify/smoke
- recover local state

#### Deliverables
- Canonical action catalog under governed project truth
- Action definitions with:
  - key
  - title
  - category
  - resource_refs
  - command_ref
  - environment applicability
  - startup-profile applicability
  - safety level
  - writes_evidence
  - expected outputs
  - remediation hooks
- Preview + run support through the bridge
- Evidence and diagnostics for each action family

#### Tasks
- Add action catalog contract/schema
- Extend Operate resources schema/model to support action linkage
- Add API list/get/preview/run routes for local actions
- Add bridge job types for each action family within the existing local job transport
- Add bounded log capture and action output normalization
- Add proof actions for Calculator:
  - calculator-install
  - calculator-seed-reset
  - calculator-build
  - calculator-test
  - calculator-watch
  - calculator-verify
- Add blocked/invalid action coverage and evidence

### Epic 105.3 — Session hardening for daily use
Make the existing bridge-supervised session model feel dependable for daily work.

#### Deliverables
- Session lifecycle stability:
  - start
  - stop
  - restart
  - restart service
- Session summary panel
- Service cards with health, status, poll state, last action, last restart time
- Session-linked action execution (run build/test/watch against current session context)
- Durable session diagnostics and bounded logs

#### Tasks
- Strengthen session state machine
- Persist active session context and profile linkage
- Link session to current resolved plan snapshot
- Add “run action in current session” contract and UX
- Harden stale session cleanup / restart behavior
- Add deterministic proofs for:
  - startup success
  - partial service degradation
  - service restart recovery
  - full session restart recovery

### Epic 105.4 — Effective plan UX + provenance
Make the effective execution plan understandable and trustworthy.

#### Deliverables
- Effective plan panel showing:
  - project values
  - environment values
  - startup profile choices
  - user-local overlay values
  - resolved values for this run
- Provenance labels on each value
- Compare-to-last-success view
- Highlight of what changed and whether the change came from project truth, env choice, overlay, or runtime discovery

#### Tasks
- Extend plan preview contract to include per-value provenance and change classification
- Add compare-baseline retrieval keyed by `(project_key, env_key, profile_key, runbook_or_action_key, user_key)`
- Add UI panels for resolved plan and change delta
- Add evidence artifacts for:
  - current effective plan
  - compare-to-last-success
  - value-source summary
- Add regression coverage for provenance labeling and compare behavior

### Epic 105.5 — Guided remediation and rerun
Strengthen the “fix it here” story for local operation.

#### Required deterministic remediation classes
- missing executable / bad path
- port collision
- invalid or missing overlay slot
- dependency not ready / unhealthy
- verify/smoke failure after start
- watch/build/test action failure with known local-safe fix

#### Deliverables
- Remediation suggestion catalog enriched for local delivery loop
- Actionable next steps shown in setup/run/session/action detail contexts
- Safe local-only apply actions
- Automatic link to rerun or restart after remediation
- Evidence proving what was changed and why

#### Tasks
- Extend remediation catalog and diagnostics taxonomy
- Add rerun/restart suggestion contract
- Add apply-preview/apply-run path for local-safe remediation
- Add explicit distinction between:
  - project-level fix needed
  - env-level fix needed
  - user-local fix available
  - session runtime fix available
- Add proof bundle for deterministic failure → remediation → success loop

### Epic 105.6 — Calculator gold local delivery bundle
Use `poc-calculator` to prove the whole sprint end to end.

#### Required proof cases
1. Current work/scope recommends the correct runbook/profile/action
2. Install/setup action succeeds
3. Startup profile session starts healthy
4. Build action succeeds
5. Test action succeeds
6. Watch/dev action runs in session context
7. Verify/smoke action succeeds
8. Three deterministic failure scenarios with remediation and successful rerun/restart
9. Full local delivery loop returns to green with evidence complete

#### Tasks
- Create/refresh Calculator scoped-work fixture
- Create/refresh Calculator action catalog
- Create/refresh Calculator startup profiles
- Ensure Calculator resources/runbooks/profiles/actions are all linked coherently
- Generate gold proof artifacts and screenshots

## API / contract work
S105 must update contracts and code, not just UI.

### Required contract additions/changes
- local-action catalog schema
- local-action preview/run schema
- work-to-operate recommendation schema
- effective-plan compare schema extension
- remediation rerun schema extension
- session action binding schema
- bounded log summary schema update

### Required route family (canonical for S105)
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/recommendations`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/actions`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/actions/:actionKey`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/actions/:actionKey:preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/actions/:actionKey:run`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/sessions/:sessionId/actions/:actionKey:run`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/sessions/:sessionId/plan`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/sessions/:sessionId/compare-last-success`

### Required route rules
- `env_key` remains explicit
- startup profile explicit
- no implicit project-truth mutation from action/remediation flows
- idempotency required on action run and remediation apply

## UX scope (bounded but deep)
Sprint 105 UX is **not** generic polish. It is focused on the local delivery loop.

### Must-have surfaces/behaviors
- Operate overview: current work-context recommendations
- Operate actions surface or actions panel inside runbooks/resources context
- Session panel with action shortcuts
- Effective plan panel with provenance + compare
- Diagnostics panel with next actions + rerun/restart affordances
- Clear empty states and blocked states

### Required UI states
- no recommendation available
- action unavailable in current env/profile
- missing overlay value
- degraded session
- remediation available
- remediation requires manual confirmation
- project-level fix required (cannot apply locally)

## Non-goals
Sprint 105 explicitly does **not** include:
- MFA
- signup / public onboarding
- external reviewer expansion
- remote deployment / upper-environment rollout
- global/public action marketplace
- arbitrary shell terminal surface
- broad reporting expansion

## Tranche implementation order
Implementation must follow:
1. `ps-contracts`
2. `ps-api`
3. `ps-web`
4. `ps-dev/tests`
5. evidence wiring

## Governance preflight
Every work-producing sequence must begin with:

```bash
export SPRINT_CODE=S105
export PS_WORK_PRODUCING=1
make -C ps-dev governance-lock-check
```

Evidence artifact:
- `.planestack/governance/evidence/s105/lock-check.json`

## Validation and closeout rules
Sprint 105 closes only if:
- `sprint105-validate` passes
- `contract-test-docker` passes
- `e2e-gate` passes
- all required artifacts in `S105-evidence.json` exist
- archive/writeback succeeds
- tags are created from `poc-calculator`

## Definition of done
Sprint 105 is done only if a user can move from scoped project work to recommended local actions, start the correct local session through the bridge, run governed local delivery actions, remediate deterministic failures safely, and return the project to green in `poc-calculator` with evidence complete.

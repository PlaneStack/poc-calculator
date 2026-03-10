# PlaneStack — Sprint 107 Pack
**Sprint:** 107  
**Theme:** Blueprint-to-Build + Concierge v1  
**Status:** Plan (locked for implementation)  
**Date:** 2026-03-10

## Intent
Sprint 107 is the sprint that must turn PlaneStack from a governed design-and-operate system into a governed **project orchestration** system.

By the end of this sprint, PlaneStack should be able to:
- take **work/scope/blueprint** context,
- derive a governed **implementation plan** for build/config/test/writeback,
- supervise that plan through a new **Concierge plane** and **bottom operational console**,
- operate with explicit **role-aware** and **multi-user** boundaries,
- detect and surface **claims/collisions/blockers/handoffs**,
- execute only through **gated PlaneStack operations**,
- and preserve full **run / evidence / approval / blocker** lineage.

Sprint 107 is complete only if `poc-calculator` proves a full end-to-end flow where:
1. a scoped work item and/or active blueprint seeds a governed implementation plan,
2. Concierge creates a project-scoped plan and session using governed artifacts,
3. Concierge takes only allowed actions for the acting user’s role,
4. a multi-user conflict or policy blocker is surfaced correctly,
5. Concierge returns the correct next-state guidance (resolve now / request-handoff / wait / prepare in parallel / stop),
6. governed build/test/run proof is captured end to end.

## Why this sprint exists
PlaneStack now has strong foundations in:
- artifact-native system-of-record,
- work / scope / promotion,
- commands / processors / runs / evidence,
- governed runbooks / startup profiles / local actions,
- user-defined environments,
- bridge-supervised sessions,
- effective execution resolution,
- and local remediation.

The remaining gap is that PlaneStack still lacks a first-class, governed way to:
- turn Blueprint/work truth into an implementation plan,
- coordinate those steps across multiple users safely,
- and let AI act as a **bounded operational orchestrator** rather than only a suggestive drawer.

Sprint 107 closes that gap by combining:
- **Blueprint-to-Build derivation**, and
- **Concierge v1** as a **project-scoped orchestration plane** with a **live bottom console**.

## Completion bar (deep, completion-oriented)
Sprint 107 is complete only if **all** of the following land end to end:

1. **Implementation plans are first-class governed artifacts**
   - A project can derive governed implementation plans from work item + blueprint context.
   - Plans are versioned, previewable, evidence-backed, and activatable only through explicit governed flows.

2. **Concierge is a first-class plane and shell-level console**
   - Plane-level destination exists for plans, blockers, claims, handoffs, and sessions.
   - A bottom console exists for live user-over-AI supervision.

3. **Concierge is artifact-backed, not chat-backed**
   - Sessions, plans, claims, blockers, handoffs, and recommendations are durable project truth.
   - Concierge does not maintain a hidden memory/agenda that bypasses artifacts.

4. **Multi-user coordination is real**
   - Concierge supports scope claims (informational / soft / exclusive).
   - Overlap/conflict on governed scopes is detected and surfaced.
   - Conflict creates blockers or handoffs instead of silent overwrites.

5. **Concierge is role-shaped and policy-correct**
   - Recommendations and actions are filtered by plane visibility, operation execution rights, and approval state.
   - Blocked flows never bypass governance or permissions.

6. **Blocked-state handling is mature**
   - Concierge may return actionable next steps, request/handoff guidance, or an explicit wait state.
   - “Wait” is treated as a valid, correct next-state outcome when appropriate.

7. **Calculator gold proof is real**
   - `poc-calculator` proves blueprint→implementation-plan→concierge plan→governed action→build/test/run evidence.
   - At least one conflict/blocker scenario and one wait-state scenario are demonstrated.

8. **Validation and proof are strict**
   - `sprint107-validate`
   - `contract-test-docker`
   - `e2e-gate`
   all pass.
   - Missing required evidence is a closeout failure.

## Hard design locks

### 1. Concierge is a Plane **and** a bottom console
- Concierge is a first-class project plane for durable coordination truth.
- Concierge also has a shell-level bottom console for live supervised sessions.
- It is **not** just a drawer, and it is **not** just a shell toy.

### 2. Concierge is not a separate truth silo
- Concierge writes governed artifacts.
- It links to Work, Blueprints, Governance, Runs, Evidence, Operate, and other artifact families.
- It does not store authoritative project state only in ephemeral chat/session history.

### 3. Concierge operates only through gated PlaneStack operations
- Concierge never mutates project truth directly.
- It may propose, prepare, sequence, request, and execute **allowed** operations only.
- Every operational step leaves run/evidence lineage and respects approvals.

### 4. Multi-user concurrency is first-class
Every Concierge session must declare:
- project scope,
- scope refs,
- role context,
- autonomy level,
- allowed operations.

Claims/leases are mandatory for governed scope overlap:
- `informational`
- `soft`
- `exclusive`

### 5. Blocked-state guidance is correctness-first
Concierge must provide the **correct next-state guidance**, which may be:
- `resolve_now`
- `request_or_handoff`
- `wait`
- `prepare_in_parallel`
- `stop_or_defer`

Concierge must never route around a blocker just to stay “helpful.”

### 6. Role-shaped behavior is mandatory
Concierge must be filtered by:
- visibility,
- plane access,
- operation execution rights,
- approval/gate state,
- safe disclosure rules.

A reviewer must not be driven into requirement generation or privileged execution paths.

### 7. Blueprint-to-Build stays governed
Implementation plans are draft-first and governed.
Generated build/config/test/writeback changes are previewed before apply.
No silent mutation of active project truth.

### 8. Commands / processors / runs / evidence remain intact
S107 must reuse the existing model:
- command = authoritative mutation/request
- processor = async/slow orchestration or derivation
- run = execution lineage
- evidence = durable proof

### 9. Project truth vs bridge-local overlay remains strict
Concierge may guide local/runtime behavior, but it must not collapse bridge-local/user-local execution state into project truth.

### 10. No new remote deployment scope
S107 is still focused on governed **local** productivity and orchestration.
No upper-environment deployment expansion is introduced.

## Canonical governed files
Sprint 107 introduces these canonical project-root files:

### Design / implementation truth
- `.planestack/governance/design/implementation-plans.json`
- `.planestack/governance/design/implementation-mappings.json`

### Concierge truth
- `.planestack/governance/concierge/sessions.json`
- `.planestack/governance/concierge/plans.json`
- `.planestack/governance/concierge/claims.json`
- `.planestack/governance/concierge/blockers.json`
- `.planestack/governance/concierge/handoffs.json`
- `.planestack/governance/concierge/recommendations.json`

### Operate / build targets already in force
- `.planestack/governance/operate/resources.json`
- `.planestack/governance/operate/startup-profiles.json`
- `.planestack/governance/operate/actions.json`
- `.planestack/governance/operate/recommendations.json`

## Canonical routes

### Blueprint-to-Build / implementation plan
- `GET /api/v1/ou/:ouKey/p/:projectKey/design/implementation-plans`
- `GET /api/v1/ou/:ouKey/p/:projectKey/design/implementation-plans/:planKey`
- `POST /api/v1/ou/:ouKey/p/:projectKey/design/blueprints/:blueprintKey:derive-build`
- `POST /api/v1/ou/:ouKey/p/:projectKey/design/implementation-plans/:planKey:preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/design/implementation-plans/:planKey:apply`
- `POST /api/v1/ou/:ouKey/p/:projectKey/design/implementation-plans/:planKey:activate`
- `GET /api/v1/ou/:ouKey/p/:projectKey/design/work/:workItemKey/recommendations`

### Concierge
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions:create`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId:plan`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId:pause`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId:resume`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId:close`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId:claim`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId:handoff`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId:act`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/blockers`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/recommendations`

## Concierge v1 autonomy ladder
Lock:
- `navigator`
- `chauffeur`
- `autopilot_bounded`

Defaults:
- default autonomy = `chauffeur`
- `autopilot_bounded` is opt-in and task-scoped
- no free-form autonomous behavior outside allowed operations

## Concierge v1 artifact family
Minimum required artifact set:
- `concierge.session`
- `concierge.plan`
- `concierge.claim`
- `concierge.blocker`
- `concierge.handoff`
- `concierge.recommendation`

Minimum common fields:
- `project_ref`
- `scope_refs[]`
- `requested_by`
- `acting_user`
- `role_context`
- `autonomy_level`
- `status`
- `allowed_operations[]`
- `blocked_reason_code?`
- `created_from_context_refs[]`
- `evidence_refs[]`
- `integrity`

## Concierge v1 role behavior matrix

| Role context | May inspect | May plan | May request | May execute low-risk ops | May activate/apply governed truth |
|---|---|---|---|---|---|
| reviewer | yes | limited | yes | no | no |
| contributor/developer | yes | yes | yes | yes (within operator-safe set) | no |
| operator/devops | yes | yes | yes | yes | no |
| approver | yes | yes | yes | limited | yes for approval-gated domains |
| admin/pm | yes | yes | yes | yes | yes |

## Scope

### Epic 107.1 — Blueprint-to-Build implementation plan contract
Introduce implementation plans as governed build/config/test/writeback plans derived from Blueprint + work context.

#### Deliverables
- canonical implementation plan schema
- lifecycle: draft / active / archived
- preview/apply/activate routes
- work-item recommendation endpoint
- provenance to blueprint version and work item scope

#### Tasks
- add `operate-implementation-plan.schema.json` and supporting schemas in `ps-contracts`
- add route family in OpenAPI and registry
- add validation rules for file targets, component scope, patch groups, build/test obligations
- add lifecycle commands and evidence wiring
- add canonical file read/write support
- add deterministic plan hash + confirm token preview/apply binding

### Epic 107.2 — Concierge plane + bottom console shell
Add Concierge as a true plane and shell-level bottom console.

#### Deliverables
- top-level Concierge launcher / plane entry
- bottom console shell with active session timeline
- plane surfaces for plans, blockers, handoffs, recommendations, sessions
- console can persist while navigating Work / Blueprint / Operate / Governance

#### Tasks
- add Concierge plane shell chrome
- add bottom console open/close/persist behavior
- add current-session summary / state / activity feed
- add transitions between plane and console without losing context
- ensure right-side contextual AI drawer does not compete with the active Concierge session

### Epic 107.3 — Concierge artifact model and lifecycle
Make Concierge durable and auditable.

#### Deliverables
- artifact schemas for session/plan/claim/blocker/handoff/recommendation
- list/get/create/update lifecycle endpoints
- evidence wiring for every material transition

#### Tasks
- add schema files in `ps-contracts`
- add persistence/migrations in `ps-api`
- add lifecycle transitions and integrity fields
- add archive/close semantics for finished sessions
- add list/detail UI for plans/blockers/handoffs

### Epic 107.4 — Multi-user claim/collision model
Handle overlap/conflict intentionally.

#### Deliverables
- claim creation and scope resolution
- conflict detection on overlapping governed scopes
- creation of blockers/handoffs on collision
- safe disclosure based on role

#### Tasks
- define scope-ref overlap rules
- implement claim types: informational / soft / exclusive
- add server-side conflict classification
- add UI for “claimed by another user/session” states
- add evidence for conflict and handoff flows
- add deterministic multi-user overlap tests

### Epic 107.5 — Role-shaped, policy-correct Concierge behavior
Concierge must never suggest or initiate actions outside the user’s effective permissions.

#### Deliverables
- role-aware recommendation filtering
- blocked-state guidance model
- safe disclosure model for blockers

#### Tasks
- integrate `plane.can_use` and `operation.can_execute` into Concierge recommendation engine
- classify blocked outcomes as resolve_now / request_or_handoff / wait / prepare_in_parallel / stop_or_defer
- implement safe-detail disclosure tiers
- ensure reviewers/read-only users cannot reach requirement-generation or privileged execution flows
- add policy-blocked and wait-state evidence paths

### Epic 107.6 — Concierge operational action bridge
Let Concierge execute allowed PlaneStack operations through governed APIs.

#### Deliverables
- Concierge can request/sequence allowed operations
- approvals and gate tokens honored
- every act step yields run/evidence lineage

#### Tasks
- integrate plan steps with allowed operation catalog
- add operation request envelope including plan hash / approval refs / actor / idempotency
- add evidence trail for every action execution attempt
- ensure blocked operations stop the session rather than route around the blocker
- add idempotent retry handling

### Epic 107.7 — Calculator gold proof bundle
Prove the full flow using `poc-calculator`.

#### Required proof
1. select work item and active blueprint
2. derive implementation plan
3. create Concierge session and plan
4. execute at least one allowed governed action
5. hit one blocker/conflict state
6. show one wait-state outcome
7. continue after blocker/handoff resolves
8. preserve build/test/run/evidence lineage end to end

#### Tasks
- create calculator work item + blueprint linkage evidence
- derive plan evidence
- create concierge plan/session evidence
- create claim/conflict evidence
- create handoff/wait evidence
- create action run evidence
- create final proof summary

## S107 proof bundle
Minimum required end-to-end scenario:
- one implementation-plan derivation
- one Concierge session in `chauffeur` mode
- one allowed governed action execution
- one collision/blocker scenario
- one wait-state scenario
- one resumed flow after blocker resolution or handoff
- one final successful build/test/run proof chain

## Validation and regression locks
- `SPRINT_CODE=S107`
- `PS_WORK_PRODUCING=1`
- `make -C ps-dev governance-lock-check` first

Blocking gates:
- `sprint107-validate`
- `contract-test-docker`
- `e2e-gate`

Regression bar:
- S100–S106 remain hard-blocking
- prior regressions should be pulled through umbrella targets, not ad hoc best-effort scripts

## Non-goals
- MFA / signup / external review productization
- upper-environment deployment automation
- free-form shell/terminal AI
- public/global Concierge access
- cross-OU collaboration semantics beyond existing project/OU constraints
- replacing existing Work / Governance / Operate truth with Concierge-only state

## Repo-by-repo implementation tasks

### `ps-contracts`
- add implementation-plan schemas
- add concierge artifact schemas
- add route contracts and registry entries
- add reason-code / blocker-state enums
- add role behavior and safe disclosure fields

### `ps-api`
- add implementation-plan persistence and lifecycle
- add concierge persistence/migrations and routes
- add claim/collision detection
- add role-aware recommendation filtering
- add action sequencing over gated operations
- add evidence/provenance writers

### `ps-web`
- add Concierge plane and bottom console
- add plans/blockers/handoffs/session detail views
- add blueprint-to-build recommendation surfaces
- add blocked-state / wait-state UX
- add role-shaped messaging and safe disclosure presentation

### `ps-dev`
- add `sprint107-validate`
- add implementation-plan smoke
- add concierge session smoke
- add multi-user conflict smoke
- add wait-state / handoff smoke
- add calculator gold proof bundle writers
- add closeout evidence check

## Required data-testid minimum set
- `concierge-plane-root`
- `concierge-console-root`
- `concierge-session-row-<sessionId>`
- `concierge-plan-row-<planId>`
- `concierge-blocker-row-<blockerId>`
- `concierge-handoff-row-<handoffId>`
- `concierge-claim-state`
- `concierge-next-state-guidance`
- `concierge-wait-state`
- `concierge-request-handoff`
- `concierge-plan-act`
- `concierge-build-plan-row-<planKey>`
- `concierge-role-filter-banner`
- `concierge-safe-disclosure-note`

## Closeout tags
- `sprint107-pass-YYYY-MM-DD`
- `sprint107-evidence-YYYY-MM-DD`

created and pushed from `poc-calculator`.

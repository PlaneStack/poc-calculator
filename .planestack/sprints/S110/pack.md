# Sprint 110 Pack

**Sprint:** S110  
**Status:** Locked for implementation  
**Theme:** Concierge v4 — Project Control Tower + Persistent Orchestration  
**Primary project:** `poc-calculator`  
**Execution posture:** local-first, governed, deterministic, evidence-backed, multi-user by design

## Intent

Sprint 110 takes Concierge to the next level. It is no longer only a bounded executor or a coordination inbox. It becomes the project's **persistent control tower**: the place where a project's current orchestration state, waits, blockers, approvals, handoffs, resumable flows, and next-safe actions are kept visible and governed across time, users, and lanes.

This sprint is intentionally **deeper** than prior Concierge work. The goal is not more chat, and not more isolated coordination mechanics. The goal is a durable, role-shaped, artifact-backed project orchestration layer that can carry work forward safely through the full PlaneStack loop:
- Ideate
- Promote
- Execute
- Govern
- Write back
- Prove
- Report

## S110 thesis

If:
- S107 established Concierge as a plane + console with artifact-backed sessions/plans/claims/blockers/handoffs,
- S108 made it competent at delegation, approval binding, and multi-user coordination,
- S109 made it capable of bounded operational execution,

then S110 must make it capable of **persistent, resumable, project-scale orchestration**.

By the end of S110, Concierge should be able to answer, at any moment:
- What is the project trying to do right now?
- What is in progress?
- What is blocked?
- Who owns the next step?
- What can safely resume now?
- What changed since the last healthy project state?
- What is the correct next action for *this* user in *this* role?

## Non-negotiable locks

1. Concierge remains a **first-class plane** plus **bottom console**.
2. Concierge does not become a hidden truth silo; it writes governed artifacts.
3. Concierge may only act through allowed, gated PlaneStack operations.
4. Blocked, wait, request, and handoff remain valid first-class outcomes.
5. Multi-user overlap and collision handling remain mandatory.
6. Safe disclosure remains role-shaped; do not expose sensitive blocker details to unauthorized users.
7. Persistent orchestration must survive route changes, reloads, and user handoff.
8. No bypass of governance, approvals, or role boundaries in the name of progress.
9. All governed writes remain under `project_root/.planestack/**`; bridge runtime state remains outside project truth.
10. Missing required evidence remains a closeout failure.

## S110 capability goal

By the end of S110, a project team should be able to use Concierge as the durable coordination layer for the project:
- plans persist across time,
- blockers and waits are visible,
- approvals are bound and resumable,
- handoffs are explicit,
- stale claims are surfaced,
- the project has a coherent "what next" view,
- and Concierge can safely resume the right bounded actions when conditions change.

## Scope

### Epic 110.1 — Persistent orchestration model
Create the durable orchestration layer that turns Concierge into a project control tower.

Deliver:
- persistent `concierge.session` rehydrate across reloads and user return
- durable `concierge.plan` lifecycle across time, not just active console execution
- project-scoped orchestration summary state
- resumable coordination state tied to blockers, approvals, and handoffs

Tasks:
- extend contracts for persistent orchestration state
- persist resumable session pointers and last-active plan refs
- add project-level summary endpoints for current orchestration state
- add continuity semantics for resumed sessions after reload/login/route change
- add aging/heartbeat fields for claims, blockers, waits, and handoffs

### Epic 110.2 — Unified inbox / queues / waiting states
Turn the Concierge plane into a usable coordination destination.

Deliver:
- project inbox with normalized feed items
- sections/filters for:
  - waiting on me
  - waiting on others
  - blocked by governance
  - stale claims
  - handoffs assigned to me
  - resumable now
  - recently completed
- persistent filters and cursors

Tasks:
- add inbox contracts and API
- normalize item `kind`, `status`, `scope_refs`, `next_state_guidance`
- add sort/filter defaults and cursoring
- surface stale claims and aging blockers
- support role-shaped safe disclosure in inbox summaries

### Epic 110.3 — Resume engine for cleared blockers
Make blocked states operationally useful.

Deliver:
- explicit resume evaluation when a blocker changes state
- detection of cleared approvals / accepted handoffs / released claims
- `resume_now` eligibility calculation
- explicit resume actions and evidence

Tasks:
- add resume evaluator for blocked/waiting plans
- bind resume to approval/handoff/claim state changes
- add explicit `resume` API and UI actions
- prevent accidental double-resume with idempotency
- write evidence showing why a plan became resumable

### Epic 110.4 — Lane-spanning orchestration bundles
Turn lanes into usable project orchestration bundles.

Required bundles:
- Work / requirements
- Blueprint / design
- Build / writeback
- Operate / remediation
- Governance / approvals
- Project control / resume bundle (new in S110)

Tasks:
- extend lane bundle governance file(s)
- add bundle compatibility / conflict rules
- add next-step recommendations by lane and role
- add lane-aware summary cards and timeline labels
- ensure bundles can chain safely without exceeding allowed operations

### Epic 110.5 — Delegation and handoff workflow completion
Finish handoff as a real workflow, not just an artifact.

Deliver:
- assign / accept / decline / reassign / complete / cancel
- explicit ownership transfer semantics
- waiting-on-person vs waiting-on-role semantics
- handoff aging and escalation hints

Tasks:
- finalize handoff transition graph and permissions
- add handoff timeline entries
- add role-based handoff queues
- add reassignment reasoning and evidence
- ensure handoff completion can resume blocked plans when appropriate

### Epic 110.6 — Approval binding UX and state
Make governance-binding visible and understandable.

Deliver:
- clear approval-needed state in plane + console
- approval-bound action cards
- approval satisfied / expired / missing states
- one-click jump to approval detail when allowed
- wait guidance when action is blocked by someone else’s approval

Tasks:
- finalize approval token/hash lifecycle reuse from prior sprints
- add approval state summaries to inbox and console timeline
- add approval expiration handling and resume invalidation
- add safe disclosure summaries for non-authorized roles

### Epic 110.7 — Project progress synthesis
Make Concierge summarize the project’s current operational truth.

Deliver:
- project progress summary card(s)
- current active lane
- current blocked set
- active waits
- approvals gating progress
- current resumable set
- next correct action for the current user
- change-since-last-healthy summary

Tasks:
- define summary synthesis contract
- compute project-level next-step guidance from plan/blocker/handoff state
- add summary evidence output
- add role-shaped summarization (what this user may know / do)

### Epic 110.8 — Control tower UI
Make the plane feel exceptional, not just functional.

Deliver:
- Concierge plane as a real destination with:
  - inbox
  - plans
  - blockers
  - handoffs
  - resumes
  - timeline
  - project summary
- bottom console remains the live session shell
- no competing right-drawer operational agent when console is active

Tasks:
- add plane surfaces and testids
- add bottom console + plane synchronization
- support route change/reload continuity
- add cards/badges for blocked/waiting/resumable/stale/owned-by-me
- make empty states and no-data states explicit and actionable

### Epic 110.9 — `poc-calculator` gold proof bundle
Prove the control-tower model end to end.

Required proof story:
1. start from a scoped project task
2. Concierge creates persistent project plan(s)
3. one user claims scope
4. collision occurs with another overlapping actor/session
5. blocker is created/updated correctly
6. a handoff is issued and accepted
7. a governance approval blocks a step
8. correct next-state guidance is `wait`
9. approval clears
10. plan becomes resumable
11. Concierge resumes and completes bounded execution
12. progress summary updates and lineage is preserved

## Required API / contract additions

### Concierge plane
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/inbox`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/inbox/:section`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/summary`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/resumable`

### Plans / sessions
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId:resume`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId/timeline`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId/blockers`

### Handoffs
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/handoffs/:handoffId:accept`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/handoffs/:handoffId:decline`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/handoffs/:handoffId:reassign`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/handoffs/:handoffId:complete`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/handoffs/:handoffId:cancel`

### Claims / blockers
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/claims/:claimId:release`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/blockers/:blockerId`

### Governance-backed config
Canonical governed files to exist and be used:
- `.planestack/governance/concierge/allowed-operations.json`
- `.planestack/governance/concierge/lane-bundles.json`
- `.planestack/governance/concierge/disclosure-rules.json`
- `.planestack/governance/concierge/inbox-rules.json`

## Artifact model additions / extensions

Required Concierge artifacts in scope:
- `concierge.session`
- `concierge.plan`
- `concierge.claim`
- `concierge.blocker`
- `concierge.handoff`
- `concierge.recommendation`
- `concierge.timeline_entry`
- `concierge.summary_snapshot` (new in S110)

Required fields/extensions:
- `project_ref`
- `scope_refs[]`
- `requested_by`
- `acting_user`
- `role_context`
- `autonomy_level`
- `allowed_operations[]`
- `status`
- `next_state_guidance`
- `blocked_reason_code?`
- `resume_ref?`
- `stale_at?`
- `waiting_on_actor?`
- `waiting_on_role?`
- `evidence_refs[]`
- `integrity`

## Role behavior model

Concierge must remain role-shaped:
- recommendations may exceed current user permissions
- executable actions may **not**
- non-authorized users see blocker class and safe next-step guidance, not sensitive actor/approval detail
- reviewer/read-only roles may observe and request/handoff where allowed, but may not drive bounded execution across privileged lanes

## Acceptance criteria

S110 passes only when:
1. Concierge persists project-level orchestration state across reloads and time gaps.
2. The plane shows a usable unified inbox with waiting/blocker/handoff/resume semantics.
3. Blockers can become resumable through approval clear / handoff acceptance / claim release.
4. Handoffs are first-class workflows with ownership transitions and evidence.
5. Project summary correctly synthesizes active lane, blockers, waits, resumables, and next action.
6. `poc-calculator` gold proof demonstrates collision, handoff, governance wait, approval clear, resume, and completion.
7. `sprint110-validate`, `contract-test-docker`, and `e2e-gate` pass.
8. All required evidence artifacts in `S110-evidence.json` resolve.

## Explicit non-goals
- Unbounded autonomous AI behavior
- Cross-project orchestration
- MFA / signup / external-review headline work
- Remote deployment / upper-environment rollout
- Generic chat improvements not tied to project orchestration
- A separate hidden Concierge truth silo

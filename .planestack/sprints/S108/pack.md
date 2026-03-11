# PlaneStack — Sprint 108 Pack
**Sprint:** 108  
**Theme:** Concierge v2 — Delegation, Approval Binding, and Multi-User Coordination  
**Status:** Plan (locked for implementation)  
**Date:** 2026-03-10

## Intent
Sprint 108 makes Concierge a **competent multi-user project coordinator**, not merely a supervised single-user AI session.

By the end of this sprint, PlaneStack should be able to:
- coordinate **multiple overlapping Concierge sessions** inside the same project,
- support **delegation, handoff, acceptance, reassignment, and waiting states**,
- bind governed operations to **approval artifacts / approval tokens** with clear UX,
- maintain a **project-scoped coordination inbox** for “my plans”, “waiting on me”, “waiting on others”, and “blocked by policy”,
- preserve durable lineage across **Concierge session → plan → claim → blocker → handoff → action → run → evidence**,
- and prove the entire loop with `poc-calculator` using at least one conflict, one handoff, one governance-blocked path, one wait state, and one resume-after-approval path.

Sprint 108 is complete only if Concierge becomes genuinely useful for a **multi-user governed project**, without bypassing policy, approvals, or role boundaries.

## Why this sprint exists
Sprint 107 introduced Concierge v1 as:
- a first-class **Plane**,
- a **bottom console**,
- artifact-backed sessions / plans / claims / blockers / handoffs / recommendations,
- a role-aware, blocker-aware operational AI surface.

The next highest-value gap is not “more autonomy.” It is making Concierge competent at:
- **delegation**
- **handoff**
- **approval-bound progress**
- **coordination under overlap/conflict**
- **resume continuity**

PlaneStack is explicitly multi-tenant, OrgUnit-scoped, project-scoped, and role-constrained. The system already assumes overlapping user activity and gate/approval boundaries. Sprint 108 must therefore complete the **multi-user coordination layer** so Concierge does not collapse back into a single-user assistant model.

## Completion bar (deep, completion-oriented)
Sprint 108 is complete only if **all** of the following land end to end:

1. **Delegation and handoff are first-class workflows**
   - Handoffs can be created, accepted, declined, reassigned, completed, and canceled.
   - Scope ownership and claim lineage are preserved.
   - “Waiting on me” and “waiting on others” are clearly surfaced.

2. **Approval binding is real and explicit**
   - Governed actions can be blocked on approvals.
   - Approval tokens / approval artifact bindings are visible, explainable, and attached to the correct plan/action.
   - Concierge never steps around approval blockers.

3. **Multi-user coordination inbox exists**
   - Users can see:
     - my active Concierge sessions
     - my plans
     - my blockers
     - handoffs assigned to me
     - approvals I am waiting on
     - approvals waiting on others
     - collisions/conflicts on scope I care about

4. **Claims/collisions are mature**
   - Overlapping claims are detected consistently.
   - Soft/exclusive conflicts create blocker/handoff flows rather than silent overlap.
   - Safe disclosure is applied correctly by role.

5. **Resume continuity is durable**
   - A user can leave and re-open a Concierge session and understand:
     - what happened
     - what is blocked
     - who owns the next step
     - what evidence exists
     - whether the correct next state is act / handoff / wait / stop

6. **Calculator gold proof is real**
   - `poc-calculator` proves:
     - one multi-user scope collision
     - one accepted handoff
     - one governance approval blocker
     - one explicit wait state
     - one resumed path after approval clears
     - preserved run/evidence lineage throughout

7. **Validation and proof are strict**
   - `sprint108-validate`
   - `contract-test-docker`
   - `e2e-gate`
   all pass.
   - Missing required evidence is a closeout failure.

## Hard design locks

### 1. Concierge remains a Plane + bottom console
- Concierge is still a first-class Plane for durable coordination truth.
- The bottom console remains the live supervised shell for the active session.
- Sprint 108 does not demote Concierge back into a drawer.

### 2. Concierge remains artifact-backed
- Sessions, plans, claims, blockers, handoffs, recommendations, and approval-bound actions remain durable artifacts.
- No hidden AI memory/agenda becomes authoritative.

### 3. Approval-bound execution is explicit
- Any action that depends on governance approval must be bound to:
  - approval artifact ref
  - operation key
  - plan hash
  - scope
  - expiry / validity window
- Concierge must stop and surface the blocker if approval is absent or expired.

### 4. Multi-user coordination is first-class
Every Concierge artifact must remain project-scoped and actor-aware.
Overlap/conflict must be modeled through:
- claims
- blockers
- handoffs
- wait states
- ownership transitions

### 5. “Wait” is a valid first-class outcome
Concierge must optimize for **correct next-state guidance**, not constant motion.
Valid next-state outcomes remain:
- `resolve_now`
- `request_or_handoff`
- `wait`
- `prepare_in_parallel`
- `stop_or_defer`

### 6. Role-shaped behavior remains mandatory
Concierge behavior continues to be filtered by:
- visibility
- plane access
- operation execution rights
- approval/gate state
- safe disclosure rules

### 7. No free-form autonomy
Sprint 108 does **not** introduce unconstrained agent behavior.
Concierge continues to act only through governed PlaneStack operations, with run/evidence lineage.

### 8. No cross-project orchestration
Concierge remains **project-scoped** in S108.
No cross-project or cross-OU orchestration is introduced.

## Canonical governed files
Sprint 108 introduces these canonical project-root files:

### Concierge coordination truth
- `.planestack/governance/concierge/delegations.json`
- `.planestack/governance/concierge/approval-bindings.json`
- `.planestack/governance/concierge/inbox-rules.json`

### Existing Concierge truth (still authoritative)
- `.planestack/governance/concierge/sessions.json`
- `.planestack/governance/concierge/plans.json`
- `.planestack/governance/concierge/claims.json`
- `.planestack/governance/concierge/blockers.json`
- `.planestack/governance/concierge/handoffs.json`
- `.planestack/governance/concierge/recommendations.json`

## Canonical routes

### Concierge inbox / coordination
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/inbox`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/inbox/assigned`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/inbox/blockers`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/inbox/waiting`

### Handoff / delegation
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId:handoff`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/handoffs/:handoffId:accept`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/handoffs/:handoffId:decline`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/handoffs/:handoffId:reassign`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/handoffs/:handoffId:complete`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/handoffs/:handoffId:cancel`

### Approval binding
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId:bind-approval`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId/approval-binding`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId:request-approval`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId:resume`

### Claim / blocker enhancement
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId:claim`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId:release-claim`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/blockers`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/blockers/:blockerId`

## Concierge v2 object model additions
New first-class artifacts / records:
- `concierge.delegation`
- `concierge.approval_binding`

Minimum fields for `concierge.handoff` / `concierge.delegation`
- `project_ref`
- `scope_refs[]`
- `plan_ref`
- `from_actor`
- `to_actor`
- `role_context`
- `status`
- `reason`
- `accepted_at?`
- `completed_at?`
- `evidence_refs[]`

Minimum fields for `concierge.approval_binding`
- `project_ref`
- `plan_ref`
- `operation_key`
- `scope_refs[]`
- `approval_artifact_ref`
- `approval_token_hash`
- `plan_hash`
- `expires_at`
- `status`

## Status / enum locks

### Handoff status
- `pending`
- `accepted`
- `declined`
- `reassigned`
- `completed`
- `canceled`

### Approval binding status
- `unbound`
- `requested`
- `bound`
- `expired`
- `satisfied`
- `invalid`

### Wait-state remains first-class
`wait` remains a first-class status on:
- `concierge.session`
- `concierge.plan`

## Collision / blocker model
Claims retain precedence:
- `exclusive` > `soft` > `informational`

Collision detection remains keyed on:
- `(project_key, normalized_scope_ref)`

When collision or approval blockade occurs:
- upsert/update an existing open blocker keyed by:
  - `(plan_id, normalized_scope_ref, blocker_class)`
- append/update blocker history
- create handoff only when requested or policy/rules say ownership should move

## Safe disclosure / role behavior
Sprint 108 must preserve safe disclosure:
- all users may see blocker **class**
- only authorized users may see sensitive details such as assignee identity, approval internals, or policy specifics
- recommendations and actions remain filtered by:
  - `plane.can_use`
  - `operation.can_execute`
  - approval/gate state
  - visibility policy

## Required deliverables / task list

### EPIC 108.1 — Concierge inbox + waiting model
1. Add inbox contracts and response schemas.
2. Build inbox queries for:
   - assigned handoffs
   - active blockers
   - waiting on me
   - waiting on others
   - collided scopes
3. Add plane surface under `/plane/concierge/inbox`.
4. Add filters and empty-state behavior.
5. Add evidence writers for inbox proof artifacts.

### EPIC 108.2 — Handoff / delegation workflow
1. Add handoff lifecycle contracts and route handlers.
2. Add acceptance/decline/reassign/complete/cancel flows.
3. Preserve claim lineage across handoff.
4. Ensure only one active owner of an exclusive claim after accepted handoff.
5. Add UI affordances for take ownership / decline / explain why.
6. Write evidence for each handoff lifecycle state.

### EPIC 108.3 — Approval binding model
1. Add approval-binding contract/schema.
2. Add plan→approval binding routes.
3. Bind approval token to:
   - operation_key
   - plan_hash
   - scope
   - expiry
4. Detect expired/invalid approvals.
5. Surface approval-required state in Concierge plan + bottom console.
6. Add request-approval and resume flows.
7. Write evidence and runlog notes for approval-blocked scenarios.

### EPIC 108.4 — Multi-user collision proofing
1. Keep existing claim model.
2. Add collision inbox views and blocker grouping.
3. Add safe-disclosure rendering by role.
4. Add deterministic multi-user overlap test fixtures.
5. Ensure blocker upsert/history behavior is stable.
6. Add evidence proving one collision and one resolved conflict.

### EPIC 108.5 — Bottom console continuity
1. Rehydrate active Concierge session across route changes and reload.
2. Render:
   - current phase
   - active blocker
   - waiting status
   - evidence/results
   - approval state
3. Show “next correct state” rather than forced next action.
4. Support resume after approval and resume after handoff acceptance.

### EPIC 108.6 — Calculator gold proof bundle
Required deterministic proof bundle for `poc-calculator`:
1. Create Concierge session from existing work/blueprint context.
2. Create a plan with governed actions.
3. Introduce a conflicting claim from another actor.
4. Surface blocker + handoff.
5. Accept handoff or wait as appropriate.
6. Hit a governance approval blocker.
7. Bind approval and resume.
8. Complete one governed action and preserve lineage to run/evidence.

## Validation / regression requirements
Sprint 108 must add:
- `sprint108-validate`
- `s108-concierge-inbox-smoke`
- `s108-handoff-lifecycle-smoke`
- `s108-approval-binding-smoke`
- `s108-multi-user-collision-smoke`
- `s108-concierge-console-rehydrate-smoke`
- `s108-calculator-gold-proof-smoke`

Hard-blocking regressions must continue via umbrella targets for:
- S100
- S101
- S102
- S103
- S104
- S105
- S106
- S107

`contract-test-docker` and `e2e-gate` remain blocking closeout gates.

## Required evidence outputs
Required minimum evidence paths:

### Concierge / inbox / delegation
- `.planestack/governance/evidence/s108/concierge/inbox.json`
- `.planestack/governance/evidence/s108/concierge/handoff-lifecycle.json`
- `.planestack/governance/evidence/s108/concierge/multi-user-collision.json`
- `.planestack/governance/evidence/s108/concierge/wait-state.json`

### Approval binding
- `.planestack/governance/evidence/s108/concierge/approval-binding.json`
- `.planestack/governance/evidence/s108/concierge/approval-resume.json`

### Calculator gold
- `.planestack/governance/evidence/s108/calculator/concierge-gold-proof.json`

### Validation
- `.planestack/governance/evidence/s108/sprint108-validate.json`
- `.planestack/governance/evidence/s108/archive.json`
- `.planestack/governance/evidence/s108/closeout-summary.json`

## Governance preflight
Every work-producing sequence must start with:
- `SPRINT_CODE=S108`
- `PS_WORK_PRODUCING=1`
- `make -C ps-dev governance-lock-check`

Evidence must write under project root:
- `poc-calculator/.planestack/**`

Scratch/runtime-local material stays under bridge root only.

## Closeout bar
Sprint 108 may close only when:
- `sprint108-validate` passes
- `contract-test-docker` passes
- `e2e-gate` passes
- all required evidence paths in `S108-evidence.json` resolve
- archive/writeback succeeds
- mirror is synced
- tags are created from `poc-calculator`

## Tags
Create and push from `poc-calculator`:
- `sprint108-pass-YYYY-MM-DD`
- `sprint108-evidence-YYYY-MM-DD`

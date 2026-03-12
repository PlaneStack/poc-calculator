# Sprint 115 Pack — Concierge v1: Governed Orchestration Foundation

**Sprint Code:** S115  
**Status:** Locked for implementation  
**Theme:** Ship **Concierge v1** as the first governed orchestration layer on top of the established AI Management substrate by landing the Concierge Plane, bottom console, artifact-backed sessions/plans/claims/blockers/handoffs/recommendations, role-shaped orchestration, claim/collision truth, blocked/wait correctness, chauffeur-mode bounded execution on governed operations, and evidence-rich resumable session timelines.

---

## 1. Sprint intent

Sprint 115 is the **Concierge v1 foundation sprint**.

S112 established the AI Management control-plane backbone. S113 made that backbone authoritative and explainable for key adopters. S114 pushed AI Management into launch-grade operational territory. S115 now turns that governed AI operating layer into the first real **user-facing orchestration experience** for PlaneStack.

This sprint exists to prove all of the following:

1. Concierge is a real **Plane** and a real **bottom operational console**, not just a drawer or chat box
2. Concierge uses PlaneStack’s shared artifact-native truth model and does not create a separate authoritative session silo
3. Concierge is role-shaped, project-scoped, and multi-user by design
4. claims, collisions, blockers, handoffs, and safe-disclosure rules are first-class governed truth
5. Concierge returns the **correct next state** when blocked, including **wait** where that is the right answer
6. Concierge executes only through governed PlaneStack operations and existing AI Management routing/policy/tool governance
7. Concierge sessions are evidence-bearing, resumable, and explainable through the normal command → processor → run → evidence spine
8. one narrow real-project proof demonstrates plan → claim → execute → block/wait/handoff → resume lineage end to end

S115 is intentionally a productization sprint, but it must still ship as **complete bounded slices**, not thin demo UX.

---

## 2. Scope posture

### 2.1 Must-have core for S115
S115 must fully complete these v1 moves:

1. **Concierge Plane + bottom console**
2. **Concierge artifact-backed truth model**
3. **Role-shaped orchestration and safe disclosure**
4. **Claims / collisions / multi-user coordination truth**
5. **Blocked-state correctness including `wait`**
6. **Chauffeur-mode bounded execution on governed operations**
7. **Evidence-rich session timeline and resumability**
8. **One real bounded project proof in `poc-calculator`**

### 2.2 In-scope only as bounded slices
These may be included only as bounded, evidence-backed slices:

- simple recommendation cards where they feed directly into a session/plan flow
- lightweight lane/surface navigation affordances from Concierge into existing planes
- minimal request/handoff UX sufficient to prove first-class handoff truth
- one narrow, safe governed execution bundle where it materially proves Concierge execution posture
- minimal resume affordance when blockers clear or approvals resolve

### 2.3 Explicitly de-scoped or constrained
To keep S115 on the v1 roadmap and avoid premature expansion:

- no full project control tower / inbox / resume engine
- no broad lane-specialized operational bundles
- no unconstrained agents
- no UI click-bot execution model
- no direct truth mutation outside governed flows
- no bridge-mediated local execution productization
- no local-LLM default architecture
- no separate parallel AI execution/provider path outside AI Management
- no second competing operational agent in the right drawer

---

## 3. Non-negotiable invariants

### 3.1 Governance / filesystem
- Work-producing runs must set:
  - `SPRINT_CODE=S115`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence starts with:
  - `make -C ps-dev governance-lock-check`
- Governed project truth writes go under:
  - `project_root/.planestack/**`
- The canonical governed project write target remains:
  - `/Users/mklein/_Ventures/PlaneStack/repos/poc-calculator/.planestack/**`
- Pack folder copies are working copies only.

### 3.2 Concierge authority and scope
- Concierge is both:
  - a **Plane**
  - a **bottom live console**
- Concierge remains **project-scoped** and **role-shaped**
- Concierge must not create a separate truth silo whose authoritative state only exists in session/chat UI
- The **bottom console** is the operational source of truth for an active Concierge session
- The right drawer remains contextual help only and must not behave like a competing operational agent

### 3.3 AI Management reuse
- Concierge reasoning must run through PlaneStack’s centralized AI execution/provider layer
- Concierge must reuse existing AI Management routing, template/model binding, policy evaluation, quota/budget enforcement, tool governance, and release-control truth
- Concierge must not introduce a second provider-routing or tool-governance system

### 3.4 Execution / evidence model
All materially executed Concierge steps must continue to use the PlaneStack execution spine:

- `command`
- `processor`
- `run`
- `evidence`

Concierge must not directly mutate truth or execute through UI clicking as its primary substrate.

### 3.5 Safety model
- `chauffeur` is the default autonomy mode in S115
- Concierge may recommend beyond role, but may only enable or initiate actions within the user’s effective permissions
- `approval_required`, `stage_required`, and `hitl_required` must reuse the normal governance flow
- blocked-state guidance must return the correct next-state classification, not artificial activity
- safe-disclosure uses **more restrictive disclosure wins**

### 3.6 Closeout bar
S115 does **not** close unless all are green:

- `sprint115-validate`
- `contract-test-docker`
- `e2e-gate`
- all required artifacts in `S115-evidence.json`
- `lock-check.json`
- one real `poc-calculator` Concierge proof path
- no evidence of Concierge bypassing governed operations, role filters, or safe-disclosure rules

---

## 4. Canonical IA / routing for S115

### 4.1 Plane placement
S115 introduces the dedicated top-level plane:

- **Mode:** `plane`
- **Plane:** `concierge`

Canonical UI route family:
- `/ou/:ouKey/p/:projectKey/plane/concierge/:surface`

### 4.2 Surface posture
Required minimum surfaces for S115:

- `overview`
- `sessions`
- `plans`
- `blockers`
- `handoffs`

The bottom console is not a sibling plane. It is the live supervised operational shell for the current active Concierge session.

Required S115 experiences should land as:
- plane surfaces
- bottom console panels
- drawers
- detail pages
- contextual cards
- timeline/event panels

### 4.3 Canonical API family
All S115 APIs live under:
- `/api/v1/ou/:ouKey/p/:projectKey/concierge/...`

Required minimum canonical route family:

- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId:resume`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId:handoff`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId:request`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/plans`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/claims:preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/claims`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/blockers/:blockerId`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/handoffs/:handoffId`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/operations:preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/operations:execute`

Compatibility aliases are allowed only if required to avoid breaking an existing experimental caller, but:
- no UI links
- no new tests against aliases
- no evidence naming using aliases

---

## 5. Concierge artifact model and governed files

### 5.1 New artifact families introduced in S115
S115 must add and operationalize these minimum Concierge artifact families:

- `concierge.session`
- `concierge.plan`
- `concierge.claim`
- `concierge.blocker`
- `concierge.handoff`
- `concierge.recommendation`

### 5.2 Minimum common fields
All minimum Concierge artifact families should support, where applicable:

- `project_ref`
- `scope_refs[]`
- `requested_by`
- `acting_user`
- `role_context`
- `autonomy_level`
- `status`
- `allowed_operations[]`
- `blocked_reason_code`
- `created_from_context_refs[]`
- `evidence_refs[]`
- `integrity`

### 5.3 Governed files introduced or extended by S115
S115 should keep Concierge policy/config explicit with these governed project files:

- `.planestack/governance/concierge/autonomy-profiles.json`
- `.planestack/governance/concierge/claim-rules.json`
- `.planestack/governance/concierge/disclosure-rules.json`
- `.planestack/governance/concierge/session-policies.json`
- `.planestack/governance/concierge/subsystem-bindings.json`
- `.planestack/governance/concierge/handoff-rules.json`

Allowed if needed and materially clarifying:
- `.planestack/governance/concierge/plan-templates.json`
- `.planestack/governance/concierge/recommendation-rules.json`

### 5.4 Reuse of existing governance truth
Concierge must consume, not duplicate:
- AI Management routing / model / template / policy truth
- governed tool registry / allowlists / execution bundles
- approval / stage / HITL decisioning
- run/evidence lineage model

---

## 6. Contract locks for S115

### 6.1 Session lifecycle minimum
S115 must support, at minimum, the session lifecycle states:

- `draft`
- `active`
- `blocked`
- `waiting`
- `handoff_pending`
- `completed`
- `deferred`
- `cancelled`

Sessions must be resumable when blockers clear or an authorized user explicitly resumes.

### 6.2 Plan lifecycle minimum
Plans must support, at minimum:

- `draft`
- `proposed`
- `approved`
- `in_progress`
- `blocked`
- `completed`
- `abandoned`

Plans must retain references to the session, relevant scope, allowed operations, and produced evidence.

### 6.3 Claim and collision contract
S115 must support claim types:
- `informational`
- `soft`
- `exclusive`

Precedence remains:
- `exclusive` > `soft` > `informational`

Conflict policy:
- multiple informational claims may coexist
- soft claims may overlap with warning
- exclusive claims conflict on overlapping governed scope
- conflict must create or update `concierge.blocker` and/or `concierge.handoff`

### 6.4 Blocked-state and next-step classification
When blocked, Concierge must classify the correct next step as one of:

- `resolve_now`
- `request_or_handoff`
- `wait`
- `prepare_in_parallel`
- `stop_or_defer`

`wait` is a valid and testable outcome.

### 6.5 Safe-disclosure contract
Concierge should always disclose the **class** of blocker.
It may disclose actor / approval / policy detail only if allowed by role and disclosure rules.
If role would allow detail but disclosure policy forbids it, the **more restrictive rule wins**.

### 6.6 Autonomy contract
S115 locks:
- `navigator`
- `chauffeur`
- `autopilot_bounded`

`chauffeur` is the **default mode** for S115.  
S115 does **not** require full end-user productization of `autopilot_bounded`; it may exist only as registry/readiness truth where needed.

### 6.7 Governed execution contract
Concierge may:
- inspect context
- create/update Concierge artifacts
- propose plans
- request approvals
- preview operations
- execute allowed governed operations
- observe results
- wait / hand off / stop / resume

Concierge may **not**:
- bypass approvals
- silently activate governed truth
- perform arbitrary shell/terminal control
- act outside project scope
- directly write user-local overlay values into project truth outside governed flows

### 6.8 Preview → execute binding
All mutating S115 Concierge endpoints require:
- `Idempotency-Key`
- a 15-minute replay window

Any `operations:execute` flow must bind to a valid latest preview using:
- `plan_hash`
- `confirm_token`

---

## 7. Epic breakdown

## EPIC 115.1 — Concierge Plane + bottom console
### Goal
Make Concierge a real first-class workspace and live console instead of a chat sidecar.

### Deliverables
- dedicated Concierge plane
- bottom operational console for the active session
- anti-confusion behavior enforcing console supremacy for active sessions
- session timeline panels
- blocker / approval / evidence panes in the console

### Required tests
- route/render tests for Concierge plane
- bottom console activation tests
- anti-confusion rule tests
- UI smoke for one active session across plane + console

---

## EPIC 115.2 — Artifact-backed Concierge truth model
### Goal
Create the authoritative Concierge artifacts and lifecycle truth.

### Deliverables
- new artifact families in contracts/registry/rendering
- session CRUD/read flows
- plan CRUD/read flows
- blocker / handoff / recommendation detail flows
- registry / icon / facet wiring where required
- evidence linkage from Concierge artifacts to runs/evidence

### Required tests
- schema/contract tests for all minimum artifact families
- lifecycle transition tests for session/plan states
- artifact rendering smoke tests
- lineage linkage tests

---

## EPIC 115.3 — Role-shaped orchestration and safe disclosure
### Goal
Ensure Concierge recommendations and actions are filtered by role, permissions, approval state, and disclosure rules.

### Deliverables
- role-aware recommendation filtering
- allowed-operations filtering
- safe-disclosure enforcement
- blocker class explanation with conditional detail
- role-shaped request / handoff behavior

### Required tests
- role filter tests
- allowed-operations tests
- safe-disclosure tests
- hidden-detail / visible-class proofs

---

## EPIC 115.4 — Claims, collisions, and multi-user coordination truth
### Goal
Make overlapping work explicit and governed.

### Deliverables
- claim preview/create flows
- claim precedence handling
- overlap detection on governed scope
- blocker/handoff generation from conflicts
- multi-user overlap truth for the same project scope

### Required tests
- claim type tests
- precedence tests
- collision detection tests
- blocker/handoff generation tests
- exclusive-claim conflict proof

---

## EPIC 115.5 — Blocked-state correctness including wait
### Goal
Return the correct next-state outcome when Concierge cannot proceed.

### Deliverables
- next-step classification model
- `wait` support as a first-class status/outcome
- request / handoff / parallel-prep / stop-or-defer support
- blocked-state drill-downs in plane and console

### Required tests
- next-step classification tests
- `wait` outcome tests
- blocked-state drill-down tests
- resume-after-clear tests

---

## EPIC 115.6 — Chauffeur-mode bounded execution on governed operations
### Goal
Prove Concierge can supervise bounded operational work through governed PlaneStack operations.

### Deliverables
- `chauffeur` as default autonomy
- operation preview / execute flows via governed operations
- preview → execute binding with `plan_hash` + `confirm_token`
- reuse of AI Management routing/policy/tool governance
- one safe bounded execution proof path

### Required tests
- default-autonomy tests
- preview / execute binding tests
- governed-operation routing tests
- approval/stage/HITL interaction tests
- bounded execution proof tests

---

## EPIC 115.7 — Evidence-rich session timeline and resumability
### Goal
Make Concierge sessions inspectable, resumable, and non-ephemeral.

### Deliverables
- session timeline / event history
- evidence/result references per step
- resumable blocked/waiting sessions
- request/handoff linkage in timeline
- session summary and completion/defer/cancel transitions

### Required tests
- timeline history tests
- evidence linkage tests
- resumability tests
- completion/defer/cancel transition tests

---

## EPIC 115.8 — Real-project proof in `poc-calculator`
### Goal
Demonstrate one authentic bounded Concierge flow in a real project.

### Deliverables
- one real session in `poc-calculator`
- one plan with at least one governed operation
- one exclusive-claim collision
- one blocker with `wait`
- one request/handoff outcome
- one safe-disclosure proof
- one end-to-end evidence-rich timeline

### Required tests
- project proof validation tests
- UI smoke across plane + console for the proof session
- evidence completeness tests
- no-bypass proof for execution through governed operations

---

## 8. Repo-by-repo delta expectations

### `ps-contracts`
- OpenAPI for Concierge route family
- new Concierge schemas
- new artifact types / registry entries / facets / icons where required
- any policy / enum / lifecycle schema additions
- update contract tests accordingly

### `ps-api`
- Concierge route handlers
- session / plan / claim / blocker / handoff orchestration logic
- safe-disclosure enforcement
- role-shaped operation filtering
- governed operation preview / execute binding
- evidence / timeline / resumability state handling

### `ps-web`
- Concierge plane
- bottom console
- session / plan / blocker / handoff detail flows
- timeline / blocker / evidence surfaces
- anti-confusion rule behavior
- role-shaped UI messaging for blocked and disclosure-limited states

### `ps-dev`
- `sprint115-validate`
- proof setup / smoke scripts
- validate summary / closeout summary updates
- mirror / evidence / archive support

### `poc-calculator`
- S115 pack mirror under `.planestack/sprints/S115/*`
- required governed Concierge files/evidence for project proof
- only strictly necessary proof/support changes tied to S115

---

## 9. Required proof targets

S115 is not complete without all of these:

1. one active Concierge session visible in both the plane and bottom console
2. one bounded plan with at least one governed operation
3. one exclusive-claim collision
4. one blocker correctly classified as `wait`
5. one request or handoff artifact outcome
6. one safe-disclosure proof where detail is partially hidden
7. one resumable session timeline with evidence refs
8. one `poc-calculator` end-to-end proof path

---

## 10. Validation and closeout

### 10.1 Required validation gates
Run separately:

```bash
make -C ps-dev sprint115-validate
make -C ps-dev contract-test-docker
make -C ps-dev e2e-gate
```

### 10.2 Regression posture
S100–S114 regressions are hard-blocking through umbrella targets inside `sprint115-validate`.

### 10.3 Evidence and closeout posture
Closeout fails unless all required artifacts in `S115-evidence.json` are present and valid, including:
- lock check
- contract proof for Concierge artifact families
- plane + console UI smoke
- session lifecycle proof
- claim collision proof
- blocked/wait proof
- request/handoff proof
- safe-disclosure proof
- governed execution proof
- timeline/resumability proof
- validate summary
- archive and closeout summary

### 10.4 Implementation order
Proceed in this order:

1. `ps-contracts`
2. `ps-api`
3. `ps-web`
4. `ps-dev/tests`
5. `poc-calculator` proof wiring
6. evidence wiring / archive / closeout

---

## 11. Success bar in plain English

S115 succeeds only if Concierge stops feeling like “chat attached to PlaneStack” and starts feeling like **PlaneStack’s governed orchestration layer**:

- real plane
- real bottom console
- real artifact-backed truth
- real role/gate/sharing boundaries
- real blocker/wait correctness
- real bounded execution through governed operations
- real evidence-rich session lineage
- real multi-user coordination truth

That is the minimum credible Concierge v1.

# Sprint 116 Pack — Concierge Bounded Execution Proof + Truth Refresh

**Sprint Code:** S116  
**Status:** Locked for implementation  
**Theme:** Ship the first real bounded operational proof slice for Concierge by proving bridge-mediated local execution, governed action preview/execute, blocker-aware wait/handoff/resume behavior, and complete artifact/run/evidence lineage for one or two real `poc-calculator` operator flows — while refreshing the durable product-truth documents so they catch up to current sprint reality.

---

## 1. Sprint intent

Sprint 116 is **not** another Concierge foundation sprint.

Sprint 115 established the governed Concierge substrate: plane + console, artifact-backed session truth, role-shaped orchestration, claims/collisions, blocked-state semantics, and bounded governed execution posture.

Sprint 116 must now prove that Concierge can perform **real supervised operational work** without violating PlaneStack's enterprise guardrails.

This sprint exists to prove all of the following:

1. Concierge can drive a **real bounded session** from plan generation through governed action preview and execution.
2. Machine-local/runtime work is brokered through the **bridge boundary**, not by browser localhost control and not by a UI click-bot model.
3. The system correctly handles **block**, **wait**, **handoff**, and **resume** as first-class outcomes during an active session.
4. One or two **real `poc-calculator` operator tasks** can complete end-to-end with evidence-rich lineage.
5. Concierge remains **role-shaped**, **project-scoped**, and **policy-respecting** throughout execution.
6. The **current durable docs** are refreshed so implemented state does not lag behind sprint reality.

S116 is intentionally an execution sprint, but it still must land as **complete bounded slices**, not a UX demo and not a speculative backend architecture exercise.

---

## 2. Scope posture

### 2.1 Must-have core for S116
S116 must fully complete these moves:

1. **Bridge-mediated operational execution slice** for Concierge
2. **Interactive governed plan → preview → execute loop** in the bottom console
3. **Approval-aware wait / handoff / resume behavior** with evidence-rich timeline updates
4. **At least one real `poc-calculator` remediation flow**, with a second flow strongly preferred
5. **Resumable queue truth** in the canonical Concierge surfaces
6. **Truth refresh companion deliverables** across Product Knowledge / Work History / sprint mirror docs
7. **Deterministic validation harness** for the full bounded proof path

### 2.2 Strongly preferred momentum additions
These are intentionally included because the marginal cost is low once the sprint starts, and they increase adoption value without changing the architecture:

1. active session summary cards on `summary`
2. resumable queue with blocker class + next allowed action on `resumable`
3. timeline drilldown with evidence links on `timeline`
4. bridge health / job-state mini-panel in the bottom console
5. governed operation preview card that clearly shows scope, approvals, and expected evidence outputs
6. one additional safe remediation bundle for `poc-calculator`
7. truth-refresh diff summaries written as explicit sprint evidence
8. archive/closeout automation that writes a concise summary bundle for Chronicle ingestion

### 2.3 Explicitly de-scoped or constrained
To keep S116 focused on the bounded operational proof:

- no full project control-tower synthesis
- no broad remote environment execution expansion
- no unconstrained autonomous agent behavior
- no local LLM provider work as the default execution model
- no UI click-bot orchestration
- no direct truth mutation outside governed flows
- no broad lane-specific UI rework beyond what is required for the proof slice
- no attempt to deliver all of v4/v5 roadmap scope in a single sprint

---

## 3. Non-negotiable invariants

### 3.1 Governance / filesystem
- Work-producing runs must set:
  - `SPRINT_CODE=S116`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence starts with:
  - `make -C ps-dev governance-lock-check`
- Governed project truth writes go under:
  - `project_root/.planestack/**`
- The canonical governed project write target remains:
  - `/Users/mklein/_Ventures/PlaneStack/repos/poc-calculator/.planestack/**`
- Any execution scratch, local logs, temp state, runtime probes, and bridge workspaces belong under `bridge_root`, not `project_root`.
- Evidence intended for audit must go to `project_root`; execution scratch must go to `bridge_root`.

### 3.2 Concierge authority and scope
- Concierge remains both:
  - a **Plane**
  - a **bottom live console**
- Concierge remains **project-scoped** and **role-shaped**.
- The bottom console is the operational source of truth for an active Concierge session.
- The right drawer remains contextual help and must not become a second competing operational agent.
- Concierge must not create a separate truth silo whose authoritative state exists only in session/chat UI.

### 3.3 Execution posture
- Concierge reasoning runs through PlaneStack's centralized AI management/provider layer.
- Governed PlaneStack operations remain the execution substrate.
- Machine-local/runtime work is brokered through the bridge boundary (`ps-locald` or successor) and reported back as structured job/evidence state.
- S116 may use a test-double bridge adapter if the full bridge repo is not available, but the service contract must match the intended real bridge shape.

### 3.4 Safety model
- `chauffeur` remains the default autonomy mode.
- `autopilot_bounded` may be exercised only inside a strict allowlisted proof path with explicit evidence.
- Concierge may recommend beyond role, but may only enable or initiate actions within the user's effective permissions.
- `approval_required`, `stage_required`, and `hitl_required` must reuse the normal governance flow.
- blocked-state guidance must return the correct next-state classification, including **wait** where that is the correct answer.
- safe disclosure uses **more restrictive disclosure wins**.

### 3.5 Closeout bar
S116 does **not** close unless all are green:

- `sprint116-validate`
- `contract-test-docker`
- `e2e-gate`
- all required artifacts in `S116-evidence.json`
- `lock-check.json`
- one real `poc-calculator` bounded execution proof path
- one real blocker-driven wait/resume proof
- one real request/handoff proof
- no evidence of Concierge bypassing governed operations, role filters, disclosure rules, or bridge mediation boundaries

---

## 4. Canonical IA / routing for S116

### 4.1 Plane placement
Concierge remains the dedicated plane:

- **Plane:** `concierge`
- canonical route family:
  - `/ou/:ouKey/p/:projectKey/plane/concierge/:surface`

### 4.2 Required canonical surfaces
S116 must align to the current navigation truth and make these surfaces real enough to support the proof slice:

- `inbox`
- `plans`
- `blockers`
- `handoffs`
- `resumable`
- `timeline`
- `summary`

The bottom console is not a sibling plane and not a drawer substitute. It is the live supervised operational shell for the active Concierge session.

### 4.3 Console minimum experiences
The bottom console must support, at minimum:

- active session header
- current plan + step status
- governed action preview
- execution status / bridge-job state
- blockers + next-state guidance
- approvals / waits / handoffs
- evidence/results links
- resume affordance when allowed

---

## 5. S116 execution architecture slice

### 5.1 What this sprint proves
S116 proves the first bounded slice across Concierge's **v3 → v5** roadmap boundary:

- bounded multi-step execution across governed lanes
- approval-aware wait / resume
- evidence-rich session timeline
- centralized AI reasoning through PlaneStack
- bridge-mediated local execution adapter
- interactive user-over-AI bounded execution loop
- real operator tasks for `poc-calculator`

### 5.2 Service responsibilities
The PlaneStack service owns:

- session state
- context assembly
- artifact retrieval
- plan generation
- role/gate filtering
- action preview generation
- operation sequencing
- blocker evaluation
- handoff/wait logic
- approval binding
- evidence assembly

### 5.3 Bridge responsibilities
The bridge layer owns, for S116's proof slice:

- machine discovery / environment readiness
- executable/path discovery where relevant
- local process start / stop / restart
- local health polling
- bounded local logs
- safe remediation apply hooks
- structured job-state updates back to PlaneStack

### 5.4 Control-layer rule
Concierge does not directly mutate truth or click through the UI.
It inspects context, proposes or builds a plan, previews governed operations, executes allowed operations, observes results, and then continues / waits / hands off / resumes / stops.

---

## 6. Contract locks for S116

### 6.1 Session lifecycle minimum
Required session states:

- `draft`
- `planned`
- `active`
- `executing`
- `blocked`
- `waiting`
- `handoff_pending`
- `resumable`
- `completed`
- `deferred`
- `cancelled`

### 6.2 Plan-step lifecycle minimum
Required step states:

- `proposed`
- `previewed`
- `ready`
- `executing`
- `blocked`
- `waiting`
- `handoff_pending`
- `succeeded`
- `failed`
- `skipped`

### 6.3 Next-step classification contract
When blocked, Concierge must classify the next step into exactly one of:

- `resolve_now`
- `request_or_handoff`
- `wait`
- `prepare_in_parallel`
- `stop_or_defer`

### 6.4 Claim / conflict contract
Claim types remain:

- `informational`
- `soft`
- `exclusive`

Precedence remains:

- `exclusive` > `soft` > `informational`

Conflicts on overlapping governed scope must create or update `concierge.blocker` and/or `concierge.handoff` truth.

### 6.5 Bridge-job lifecycle minimum
Required bridge job states:

- `queued`
- `accepted`
- `running`
- `polling`
- `waiting`
- `succeeded`
- `failed`
- `cancelled`
- `timed_out`

Required bridge job metadata:

- `job_id`
- `session_id`
- `step_id`
- `operation_key`
- `scope_ref`
- `bridge_target`
- `status`
- `started_at`
- `updated_at`
- `summary`
- `evidence_refs[]`
- `raw_log_ref?`
- `integrity`

### 6.6 Canonical API family
All S116 APIs live under:
- `/api/v1/ou/:ouKey/p/:projectKey/concierge/...`

Required minimum route family:

- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/inbox`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/resumable`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/timeline`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/summary`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId:plan`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId:preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId:execute`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId:resume`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId:handoff`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/sessions/:sessionId:request`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/blockers/:blockerId`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/handoffs/:handoffId`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/plans/:planId`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/operations:preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/concierge/operations:execute`
- `GET /api/v1/ou/:ouKey/p/:projectKey/concierge/bridge/jobs/:jobId`

Compatibility aliases are allowed only to protect an in-flight caller, but no UI links, tests, or evidence names may use aliases.

---

## 7. Governed files introduced or extended by S116

### 7.1 Required governed project files
S116 should keep operational policy/config explicit with these governed project files:

- `.planestack/governance/concierge/autonomy-profiles.json`
- `.planestack/governance/concierge/claim-rules.json`
- `.planestack/governance/concierge/disclosure-rules.json`
- `.planestack/governance/concierge/session-policies.json`
- `.planestack/governance/concierge/handoff-rules.json`
- `.planestack/governance/concierge/bridge-bindings.json`
- `.planestack/governance/concierge/operation-bundles.json`
- `.planestack/governance/concierge/resume-policies.json`
- `.planestack/governance/concierge/remediation-playbooks.json`

### 7.2 Optional but recommended low-cost additions
If these are cheap once the core is in place, include them in S116:

- `.planestack/governance/concierge/summary-cards.json`
- `.planestack/governance/concierge/timeline-display-rules.json`
- `.planestack/governance/concierge/bridge-health-panels.json`

### 7.3 Truth refresh targets
The sprint must update, at minimum, these durable truth artifacts if sprint reality changes them:

- `PlaneStack-Product-Knowledge.v4.md` or its successor revision
- `WORK-HISTORY.v5.md` or its successor revision
- `PlaneStack-Truth-Index.md` if read-order/process changed
- `PlaneStack-App-Navigation-Map.md` if implemented surfaces/routes changed
- `poc-calculator/.planestack/sprints/S116/*`

---

## 8. Repo-by-repo delta expectations

### 8.1 `ps-contracts`
Must deliver:

1. session / plan / blocker / handoff / bridge-job schema deltas
2. operation preview / execute request-response schemas
3. resumable / summary / timeline payload contracts
4. bridge job lifecycle enum contracts
5. evidence schema additions for bounded execution and truth refresh outputs
6. registry updates for any new Concierge operation keys

### 8.2 `ps-api`
Must deliver:

1. canonical S116 Concierge route family
2. session planning / preview / execute / resume / handoff / request handlers
3. bridge adapter interface and bounded polling path
4. blocker evaluation + next-step classification logic
5. evidence assembly and timeline event writing
6. resumable / summary / timeline query endpoints
7. truth-refresh closeout helpers if stored server-side

### 8.3 `ps-web`
Must deliver:

1. Concierge plane surfaces aligned to canonical nav truth
2. bottom console execution shell
3. governed action preview + execute affordances
4. blocker / wait / handoff / resume UX
5. bridge job status mini-panel
6. summary / resumable / timeline surfaces sufficient for proof and screenshots
7. role-shaped disclosure behavior in UI copy and detail affordances

### 8.4 `ps-dev`
Must deliver:

1. `sprint116-validate` orchestration target
2. bridge test-double or fixture driver if needed
3. contract tests for new route and schema family
4. deterministic scenario seed / setup targets for `poc-calculator`
5. Playwright smokes for plane + console proof path
6. archive / evidence / closeout helpers
7. truth-refresh validation target that checks required docs/mirror outputs exist

### 8.5 `poc-calculator`
Must deliver proof wiring for at least one, preferably two, real bounded operator flows:

1. **local session diagnosis → blocker → wait/resume → successful recovery**
2. **safe remediation apply → verify health → complete session**

These flows may use controlled fixtures if needed, but they must look and behave like real project operations with governed scope, evidence, and resumability.

---

## 9. Gold proof bar for S116

### 9.1 Required proof path A — diagnosis / wait / resume / recovery
A user must be able to:

1. open Concierge
2. start a session for a bounded `poc-calculator` operator task
3. receive a bounded plan
4. preview a governed action
5. execute an allowed action
6. encounter a real blocker or required wait condition
7. receive the correct next-state guidance
8. enter `waiting` or `handoff_pending` legitimately
9. resume when allowed
10. complete with artifact / run / evidence lineage

### 9.2 Strongly preferred proof path B — safe remediation apply
A user should also be able to:

1. start a second bounded session
2. preview a remediation bundle
3. execute through the bridge path
4. observe bridge job state and bounded logs
5. verify improved health / readiness
6. complete with evidence-rich timeline and closeout summary

### 9.3 What counts as success
Success means:

- users understand what Concierge is doing
- no silent multi-user collisions occur
- blockers are surfaced safely and correctly
- role boundaries are always honored
- the system can correctly say `wait`, `handoff`, or `stop`
- local/runtime actions are brokered through the bridge
- all materially executed steps leave artifact / run / evidence lineage
- durable truth docs are refreshed so current product state is not stale

---

## 10. Validation and closeout

### 10.1 Required commands
Run separately:

```bash
make -C ps-dev sprint116-validate
make -C ps-dev contract-test-docker
make -C ps-dev e2e-gate
```

### 10.2 Required evidence categories
S116 closeout must include evidence for:

1. governance preflight
2. artifact / contract registry deltas
3. route-family contract compliance
4. plane + bottom console UI smoke
5. blocker / wait / handoff correctness
6. bridge job lifecycle
7. resumable queue and timeline truth
8. `poc-calculator` proof path(s)
9. truth-refresh outputs
10. archive / mirror sync / closeout summary

### 10.3 Regression posture
S100–S115 regressions are hard-blocking via umbrella targets inside `sprint116-validate`.

### 10.4 Tags and mirror expectations
Closeout should produce:

- `sprint116-pass-YYYY-MM-DD`
- `sprint116-evidence-YYYY-MM-DD`

Mirror targets:

- `.planestack/sprints/S116/pack.md`
- `.planestack/sprints/S116/runlog.md`
- `.planestack/sprints/S116/evidence.json`
- `.planestack/sprints/S116/manifest.json`

---

## 11. Low-marginal-cost momentum policy

Once the sprint is started, the following tasks should be treated as favorable additions rather than punted, provided they do not break the bounded-execution focus:

1. add the second `poc-calculator` remediation proof path
2. add summary cards for active / blocked / resumable / completed session counts
3. add console timeline filter chips for `plan`, `execution`, `blocker`, and `evidence`
4. add a concise bridge-health status card in the console
5. add explicit truth-refresh diff summaries as closeout artifacts
6. add screenshot baselines for all canonical Concierge surfaces used in the sprint
7. add a closeout archive bundle that is Chronicle-friendly by default

These are deliberately included because the setup cost for S116 is the expensive part; once the slice is live, these additions materially improve product momentum and adoption.

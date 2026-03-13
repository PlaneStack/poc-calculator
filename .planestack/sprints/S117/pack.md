# Sprint 117 Pack — Concierge Control Tower + Approval-Bound Delegation

**Sprint Code:** S117  
**Status:** Locked for implementation  
**Theme:** Extend the proven S116 bounded execution slice into a durable, multi-user Concierge control tower by shipping approval-bound delegation, persistent orchestration state, resumable readiness, progress synthesis, and daily-driver Concierge surfaces that move the focused plane toward the **Exceptional** scoring range.

---

## 1. Sprint intent

Sprint 117 starts from a stronger place than earlier Concierge planning:

- S116 already proved the session-scoped preview/execute path.
- S116 already proved bridge-mediated local execution and blocker-aware wait/resume behavior.
- S116 already closed with full gates, closeout artifacts, and mirror continuity.

S117 therefore must **not** spend its energy rediscovering bounded execution.  
Instead, it must convert that proof into the next durable product layer:

1. **project-level orchestration state** that survives beyond a single active console moment,
2. **approval-bound delegation** that correctly binds waiting work to the approvals/dependencies that can clear it,
3. **resume-ready control-tower surfaces** that tell users what matters now,
4. **multi-user ownership and collision handling** that prevent silent overlap,
5. and **surface quality upgrades** that make Concierge feel operationally trustworthy, not merely implemented.

This is the sprint where Concierge must start feeling like a real control tower for a live project rather than a promising orchestration demo.

---

## 2. Scope posture

### 2.1 Must-have core for S117
S117 must fully complete these moves:

1. **Persistent control-tower state** for active, blocked, waiting, handoff, resumable, and completed Concierge work.
2. **Approval-bound delegation** with explicit binding between blocked work and the approval/dependency that can clear it.
3. **Resume engine** that projects when a session becomes resume-ready and enables deterministic resume when allowed.
4. **Multi-user handoff lifecycle** with accept / decline / complete semantics and visible ownership.
5. **Claim / collision hardening** that surfaces overlapping ownership and creates correct blocker/handoff truth.
6. **Project summary / inbox / blockers / handoffs / resumable / timeline surfaces** that are clearly useful every day.
7. **A substantial quality push** on these focused Concierge surfaces so they trend toward the Exceptional range.
8. **Two real `poc-calculator` proofs** and one surface-trust proof.
9. **Truth refresh companion deliverables** to keep durable canon in sync.
10. **Deterministic validation harness** that proves the above without relying on non-deterministic operator behavior.

### 2.2 Strongly preferred momentum additions
These are intentionally included because the marginal cost is low once the sprint is underway:

1. inbox grouping chips (`approvals`, `handoffs`, `resumable`, `stale_blocked`)
2. “why is this resumable now?” explainer panel
3. handoff age / SLA / owner chips
4. one-click deep-links from summary cards into queue views
5. actor-labeled timeline transitions
6. claim overlap drilldown
7. summary confidence indicators (“fresh as of …”, event lag, evidence completeness)
8. chronicle-friendly orchestration digest output
9. bridge health rollup card on `summary`
10. screenshot-stable layouts for the six focused Concierge surfaces

### 2.3 Explicitly de-scoped or constrained
To keep S117 substantial but coherent:

- no full autopilot execution
- no local LLM provider work as the default model
- no UI click-bot execution model
- no generalized multi-project portfolio orchestration
- no broad remote-environment expansion beyond what is required for existing bounded flows
- no major shell redesign
- no attempt to absorb all future “control tower” ambitions in one sprint
- no canonical IA drift away from the locked Manage → Concierge surface family

---

## 3. Non-negotiable invariants

### 3.1 Governance / filesystem
- Work-producing runs must set:
  - `SPRINT_CODE=S117`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence starts with:
  - `make -C ps-dev governance-lock-check`
- Governed project truth writes go under:
  - `project_root/.planestack/**`
- The canonical governed project write target remains:
  - `/Users/mklein/_Ventures/PlaneStack/repos/poc-calculator/.planestack/**`
- Execution scratch, temp state, local probes, and bridge workspaces belong under `bridge_root`, not `project_root`.
- Evidence intended for audit must go to `project_root`; execution scratch must go to `bridge_root`.

### 3.2 Concierge authority and scope
- Concierge remains both:
  - a **Plane**
  - a **bottom live console**
- Concierge remains **project-scoped**, **role-shaped**, and **artifact-backed**.
- The bottom console remains the operational source of truth for an active session.
- The right drawer remains contextual help and must not become a second operational agent.
- Concierge must not create a separate truth silo whose authoritative state lives only inside the session UI.

### 3.3 Execution posture
- Centralized AI reasoning remains the reasoning layer.
- Governed PlaneStack operations remain the execution substrate.
- Machine-local/runtime work remains brokered through the bridge boundary (`ps-locald` or successor) and reported back as structured state/evidence.
- S117 extends the statefulness around execution; it does not bypass the S116 execution posture.
- Deterministic test-double bridge remains the default validate posture unless a real bridge smoke is explicitly invoked.

### 3.4 Safety / delegation model
- `chauffeur` remains the default autonomy mode.
- `autopilot_bounded` may only be used inside strict allowlisted proof paths with evidence.
- Concierge may recommend beyond role, but may only enable or initiate actions within the user’s effective permissions.
- `approval_required`, `stage_required`, and `hitl_required` reuse the normal governance path.
- blocked-state guidance must return the correct next-state classification, including **wait** where that is the right answer.
- approval-bound resume must not be possible without the required approval or cleared dependency.
- more restrictive disclosure always wins.

### 3.5 Closeout bar
S117 does **not** close unless all are green:

- `sprint117-validate`
- `contract-test-docker`
- `e2e-gate`
- all required artifacts in `S117-evidence.json`
- `lock-check.json`
- one real approval-bound wait / clear / resume proof
- one real multi-actor handoff / delegation proof
- one real claim / collision / remediation proof
- one summary/inbox/timeline trust proof
- no evidence of Concierge bypassing approvals, role filters, disclosure rules, or bridge mediation boundaries

---

## 4. Canonical IA / routing for S117

### 4.1 Plane placement
Concierge remains the dedicated plane:

- **Plane:** `concierge`
- canonical route family:
  - `/ou/:ouKey/p/:projectKey/plane/concierge/:surface`

### 4.2 Required canonical surfaces
S117 must align to current navigation truth and make these surfaces meaningfully operational:

- `inbox`
- `plans`
- `blockers`
- `handoffs`
- `resumable`
- `timeline`
- `summary`

S117 may **group approval-requiring items inside these surfaces**, but it does not introduce a new canonical `approvals` surface in the left nav.

### 4.3 Focused surfaces targeted for Exceptional range movement
S117’s quality emphasis is on the following Concierge surfaces plus the bottom console:

- `summary`
- `inbox`
- `blockers`
- `handoffs`
- `resumable`
- `timeline`
- bottom console active-session shell

“Exceptional range” in this sprint means the surface is:
- immediately understandable,
- obviously actionable,
- trustworthy about ownership and state,
- evidence-linked,
- role-safe,
- and free of dead-end interactions for the proof-path users.

See `Sprint117-Exceptional-Range-Targets.md` for explicit quality targets.

---

## 5. S117 architecture slice

### 5.1 What this sprint proves
S117 proves the first durable control-tower slice across Concierge’s **v2 + v4** roadmap layers while preserving the execution slice already proven in S116:

- richer delegation
- approval token binding UX and behavior
- persistent orchestration state
- unified inbox / blocked / handoffs / resumables model
- resume engine for cleared blockers
- project-level progress synthesis
- quality uplift on the focused control-tower surfaces

### 5.2 Service responsibilities
The PlaneStack service owns:

- persistent session state and summary projections
- context assembly
- artifact retrieval
- plan generation
- role/gate filtering
- approval binding evaluation
- handoff lifecycle evaluation
- claim/collision evaluation
- blocker classification
- resume eligibility projection
- progress synthesis
- evidence assembly

### 5.3 Bridge responsibilities
The bridge layer continues to own:

- machine discovery / environment readiness
- executable/path discovery where relevant
- local process start / stop / restart
- local health polling
- bounded local logs
- safe remediation apply hooks
- structured job-state updates back to PlaneStack

### 5.4 Control-layer rule
Concierge does not directly mutate truth or click through the UI.
It inspects context, proposes or builds a plan, previews governed operations, executes allowed operations, observes results, and then continues / waits / requests / hands off / resumes / completes.

---

## 6. Contract locks for S117

### 6.1 Session lifecycle minimum
Required session states:

- `draft`
- `planned`
- `active`
- `executing`
- `blocked`
- `waiting`
- `handoff_pending`
- `handoff_accepted`
- `resumable`
- `completed`
- `deferred`
- `cancelled`

### 6.2 Plan-step lifecycle minimum
Required step states:

- `draft`
- `ready`
- `previewed`
- `executing`
- `waiting`
- `handoff_pending`
- `blocked`
- `resumable`
- `succeeded`
- `failed`
- `skipped`

### 6.3 Approval binding minimum
When a blocked or waiting session depends on approval or dependency clearance, the persisted state must capture:

- `binding_type` (`approval`, `dependency`, `handoff_acceptance`, `claim_clearance`)
- `binding_ref`
- `binding_status`
- `binding_summary`
- `clears_resume`
- `cleared_at?`

### 6.4 Handoff lifecycle minimum
S117 must support:

- create handoff
- accept handoff
- decline handoff
- complete handoff
- resume originating session after accepted/completed handoff when allowed

### 6.5 Summary / queue projection minimum
S117 summary projections must include at least:

- active sessions count
- blocked sessions count
- awaiting approval count
- awaiting handoff acceptance count
- resumable sessions count
- recently completed count
- hottest blocker
- oldest pending handoff
- latest resumable item
- progress synthesis snippet

### 6.6 Quality floor for focused surfaces
Each focused surface must show:
- a meaningful empty state when empty,
- at least one obvious next action when populated,
- state chips or equivalent clarity markers,
- age / freshness information where relevant,
- evidence or detail deep-link where relevant,
- no dead-end affordance in the proof paths.

---

## 7. Required deliverables by repo

### 7.1 `ps-contracts`
- approval-binding contract shapes
- handoff lifecycle enums + payloads
- control-tower summary projection schemas
- inbox / blocker / handoff / resumable queue item schemas
- claim overlap / collision response schemas
- exceptional surface scorecard schema for validation output

### 7.2 `ps-api`
- control-tower read endpoints
- approval-binding persistence and evaluation
- resume engine for cleared blockers
- handoff accept / decline / complete endpoints
- claim/collision evaluation and projection
- summary/inbox projection logic
- progress synthesis helper
- no-silent-collision logic
- deterministic queue freshness markers

### 7.3 `ps-web`
- substantial wiring and UX uplift for the focused Concierge surfaces
- summary cards with drilldowns
- inbox grouping and actionable triage
- blockers list with safe disclosure and next step
- handoffs queue with ownership lifecycle
- resumable queue with “why now” explanation
- timeline with actor/state/evidence clarity
- bottom console tied cleanly to control-tower state
- stable test ids and screenshot-worthy layouts

### 7.4 `ps-dev`
- `sprint117-validate`
- deterministic fixtures for approval-clear, handoff acceptance, claim conflict, resume-ready transitions
- contract and API tests
- Playwright smokes for each focused surface
- exceptional-range scorecard generation
- truth refresh scripts
- closeout evidence checks and archive summary helpers

### 7.5 `poc-calculator`
- proof A: approval-bound wait → clear → resume → complete
- proof B: multi-actor handoff accept → complete → originating session resume/finish
- proof C: claim collision → correct blocker/handoff/remediation outcome
- proof D: summary/inbox/timeline reflect the above transitions correctly
- mirror and closeout artifacts under `.planestack/**`

---

## 8. Substantial sprint shape

This sprint should deliberately carry a **larger than minimum** deliverable set.

The reason is simple:
starting a sprint has more fixed cost than adding another adjacent control-tower enhancement once the implementation slice is moving.

That means S117 should absorb the low-marginal-cost work that meaningfully increases daily utility:

- grouped inbox lanes
- summary drilldowns
- handoff status chips
- resumable explanation panel
- timeline actor labels
- progress synthesis text
- bridge freshness indicators
- screenshot-stable layouts
- exceptional-range quality scorecard

If a deliverable materially improves comprehension, trust, or operator throughput on the already-targeted Concierge surfaces, it should be favored in S117 rather than deferred.

---

## 9. Exceptional-range target posture

S117 is not just a capability sprint; it is also a **quality-positioning sprint** for the Concierge plane.

The plane should exit the sprint with the following practical improvements:

1. **Summary** feels like a true project control panel rather than a card dump.
2. **Inbox** feels triage-ready rather than like a passive feed.
3. **Blockers** show correct next-state guidance without leaking unauthorized details.
4. **Handoffs** feel owned, explicit, and auditable.
5. **Resumable** answers “what can move now?” with confidence.
6. **Timeline** tells a coherent narrative with evidence links.
7. **Bottom console** remains the live operational shell without conflicting with the plane surfaces.

These quality moves are not optional polish. They are necessary to move the focused plane toward the Exceptional range.

---

## 10. Non-goals and anti-patterns

Fail the sprint if implementation trends toward any of these:

- a second competing “AI assistant” surface that conflicts with the bottom console
- approvals treated as hidden magic rather than explicit blockers / bindings
- handoffs that lack ownership lifecycle
- claim conflicts that do not visibly surface
- resumable items without explanation of why they are resumable
- summary projections that are too stale or too vague to trust
- queue surfaces that require tribal knowledge to interpret
- UI-only optimistic state with no backing artifact/run/evidence truth
- route/IA drift into deprecated aliases or extra standalone planes

---

## 11. Definition of done

S117 is done when a project user can:

1. open Concierge `summary` and immediately understand the current orchestration state,
2. triage the `inbox` into approvals, handoffs, resumables, or blocked work,
3. inspect a blocked session and understand the safe next-state guidance,
4. accept or decline a handoff with explicit ownership change,
5. see when a formerly waiting item becomes resumable and why,
6. resume the item through the bottom console when allowed,
7. inspect the timeline for a coherent evidence-backed narrative,
8. complete at least two real multi-step `poc-calculator` orchestration flows,
9. and trust that the durable docs and mirror reflect the sprint truth.

If those things are true, S117 will have materially advanced Concierge from a proven execution slice into a credible operational control tower.

# Sprint 125 Pack — Operate Excellence: Review-to-Operation Continuity + Local Mission Control Trust

**Sprint Code:** S125  
**Status:** Locked for implementation  
**Theme:** Move PlaneStack's **Operate** experience into the **Exceptional** range by turning the handoff from **Review / Governance** into a coherent, trustworthy, operator-grade continuation of approved work — deepening **environment readiness**, **session continuity**, **execution trust**, **incident/runbook usefulness**, **template-assisted local operations**, and the explicit separation between **governed approval**, **local execution**, **outputs**, and **evidence**.

---

## 1. Sprint intent

Sprint 125 is the direct follow-on to Sprint 124.

Where S124 made **Review / Governance** feel like a serious continuation of Jobs — approvals, blocked-flow clarity, decision trust, and policy visibility — S125 makes **Operate** feel like the place where an approved project can be brought up, inspected, exercised, stabilized, and operated locally with confidence.

The user should be able to:

1. move from an approved / review-cleared context directly into the relevant Operate experience,
2. understand whether the local environment is ready before attempting operation,
3. see environments, sessions, execution, incidents, runbooks, and templates as one coherent mission-control flow,
4. launch or resume a local operating session with clear scope and status,
5. understand what executed, what changed locally, and what evidence was written,
6. use incidents and runbooks as real operator tools instead of static pages,
7. distinguish local operating state from governance state,
8. and trust objective/health/readiness signals without introducing a second metrics truth.

Sprint 125 therefore delivers:

- strong **Review → Operate** continuity,
- excellent **setup**, **environments**, **sessions**, and **execution** surfaces,
- trustworthy **incidents** and **runbooks**,
- useful **templates** for local operation and recovery,
- server-backed **operate overview** and readiness projections,
- and deterministic validation harnesses that prove local-operate workflows rather than only rendering pages.

S125 is the sprint where PlaneStack should start to feel like a real local mission-control surface for the project-application, not just a planning/execution/governance system.

---

## 2. Strategic alignment posture

S125 is locked to the existing PlaneStack strategy. It must remain aligned with:

- the artifact-native system-of-record posture,
- the Ideate → Promote → Execute → Govern → Write back → Prove → Report loop,
- deterministic local-first validation,
- the canonical user-facing mode labels (`Center`, `Plan`, `Jobs`, `Review`, `Observe`, `Operate`, `Manage`),
- the strict root-separation contract (`project_root/.planestack/**` for audit truth, `bridge_root` for ephemeral runtime work),
- and the rule that local operation is bridge-mediated and auditable rather than UI-click-bot driven.

S125 may deepen Operate structure and usability, but it must **not**:

- collapse governance approval truth into local runtime truth,
- treat bridge scratch/logs as canonical evidence,
- bypass approval / blocked-state boundaries established in Review,
- create a second metrics source of truth in Operate,
- or turn Operate into remote deployment management.

---

## 3. Scope posture

### 3.1 Must-have core for S125

1. **Review → Operate continuity**
   - real handoff from review-cleared state into Operate
   - source approval / decision context preserved where appropriate
   - deep links from Review into Operate setup / session / execution state

2. **Operate overview exceptional uplift**
   - excellent `operate/overview`
   - server-backed readiness and operator summary
   - visible environment/session/incident/objective posture
   - next required action clearly shown

3. **Setup + environments trust**
   - excellent `operate/setup`
   - excellent `operate/environments`
   - readiness checks that explain why local operation is or is not runnable
   - no silent local-state assumptions

4. **Session + execution continuity**
   - excellent `operate/sessions`
   - excellent `operate/execution`
   - create / resume / inspect an operate session with clear lineage
   - execution detail that preserves source refs and evidence links

5. **Incident + runbook usefulness**
   - excellent `operate/incidents`
   - excellent `operate/runbooks`
   - incident creation / append / resolution continuity
   - runbook detail and launch behavior that feels like an actual operator aid

6. **Operate templates**
   - useful `operate/templates`
   - starter templates for local setup, health checks, recovery, and runbook-driven actions
   - clear provenance and apply behavior

7. **Deterministic validation harness**
   - `sprint125-validate`
   - review-cleared operate handoff proof
   - environment/session/execution proof
   - incident/runbook proof
   - Operate Exceptional-range scorecard

8. **Truth refresh companion deliverables**
   - current sprint evidence + mirror
   - Product Knowledge / Work History review/update/no-change summary
   - navigation truth updated if Operate semantics materially change

### 3.2 Strongly preferred momentum additions

1. environment-scoped filters/chips on overview, sessions, execution, incidents
2. resume-latest-session CTA from overview
3. runbook launch from incident detail
4. objective / health badges visible on overview and environments
5. bridge-root vs project-root disclosure hints where helpful
6. screenshots for overview, setup, environments, sessions, execution, incidents, runbooks
7. optional Concierge explanation of next operate step without owning the flow
8. compare latest success vs latest failure on execution detail
9. export / evidence convenience links where already canonical
10. settings polish only where needed for mission-control continuity

### 3.3 Explicitly de-scoped or constrained

- no broad remote deployment management
- no major Observe analytics expansion beyond operate continuity needed for trust
- no deep Concierge backend program in S125
- no shell/nav redesign beyond preserving Review / Operate continuity
- no local LLM default execution model
- no collapse of runtime logs and canonical evidence into a mixed bucket

---

## 4. Non-negotiable invariants

### 4.1 Governance / filesystem
- Work-producing sequences must set:
  - `SPRINT_CODE=S125`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence starts with:
  - `make -C ps-dev governance-lock-check`
- Governed project truth writes go under:
  - `project_root/.planestack/**`
- The canonical governed project write target remains:
  - `/Users/mklein/_Ventures/PlaneStack/repos/poc-calculator/.planestack/**`
- Ephemeral local runtime work belongs under bridge-root, not project-root.

### 4.2 Operate truth posture
- Environments, sessions, execution runs, incidents, runbooks, templates, and objectives must remain canonical server/artifact truth; they cannot exist only as transient UI state.
- Operate overview is a projection surface over canonical operate truth, not an independent source of truth.
- Incident and runbook relationships must remain inspectable and deterministic.
- Objective / health visibility must point to canonical governed truth, not client-only summaries.

### 4.3 Execution / outputs / evidence posture
- A local execution is **not** the same thing as its outputs.
- Outputs are **not** the same thing as evidence.
- Operate surfaces must make clear:
  - what executed,
  - what outputs / changes resulted,
  - and what evidence / receipts were written.
- S125 must not blur these concepts in route design, copy, or UI rendering.

### 4.4 Review / approval continuity
- Review approval and local operation remain distinct.
- S125 may hand off from review-cleared state into operate-ready state, but it must not imply approval and operation are the same action.
- If operation is still blocked by readiness, the blocker must be explicit.

### 4.5 Closeout bar
S125 does **not** close unless all are green:

- `sprint125-validate`
- `contract-test-docker`
- `e2e-gate`
- all required artifacts in `S125-evidence.json`
- `lock-check.json`
- Review → Operate continuity proof
- environments / sessions / execution proof
- incidents / runbooks proof
- Operate Exceptional-range thresholds met
- no evidence of runtime/evidence truth collapse
- no evidence of bridge-root / project-root drift

---

## 5. Canonical IA / routing focus for S125

### 5.1 Header continuity
Canonical header modes remain:

- `Center`
- `Plan`
- `Jobs`
- `Review`
- `Observe`
- `Operate`
- `Manage`

### 5.2 Focused surfaces targeted for Exceptional-range movement
Primary uplift targets:
- `operate/overview`
- `operate/setup`
- `operate/environments`
- `operate/sessions`
- `operate/execution`
- `operate/incidents`
- `operate/runbooks`

Secondary uplift / important continuity targets:
- `operate/templates`
- `operate/settings`
- `review/governance/approvals` (handoff continuity only)
- `jobs/runs` (handoff continuity only)

### 5.3 Canonical route families to deepen in S125
Representative canonical route families / API areas to support:
- `GET /operate/overview`
- `GET /operate/setup`
- `GET /operate/environments`
- `POST /operate/sessions`
- `GET /operate/sessions/:sessionId`
- `POST /operate/sessions/:sessionId:resume`
- `GET /operate/execution`
- `GET /operate/execution/:executionId`
- `GET /operate/incidents`
- `GET /operate/incidents/:incidentId`
- `GET /operate/runbooks`
- `GET /operate/runbooks/:runbookKey`
- `POST /operate/runbooks/:runbookKey:launch`
- `GET /operate/templates`
- `GET /operate/templates/:templateKey`
- `POST /operate/templates/:templateKey:apply`

---

## 6. Required proof paths

### Proof A — Review-cleared handoff into Operate
Required bar:
1. start from a review-cleared / approved state,
2. deep-link or transition into Operate,
3. Operate overview shows correct readiness / next action,
4. user reaches the correct environment/session context,
5. source review context remains inspectable.

### Proof B — Environment readiness + session/execution
Required bar:
1. inspect a local environment readiness state,
2. create or resume an operate session,
3. execute a deterministic local operation,
4. execution detail shows status, source context, outputs, and evidence links separately,
5. at least one readiness blocker class is explainable when operation is not ready.

### Proof C — Incident / runbook operator flow
Required bar:
1. deterministic operate failure or degraded state creates/appends an incident,
2. incident detail links to a relevant runbook,
3. runbook launch is visible and usable,
4. resulting execution or guidance is visible with correct lineage.

### Proof D — Operate continuity / objective trust
Required bar:
1. Operate uses canonical labels in UI/tests/evidence/screenshots,
2. overview and environments show objective/health posture from canonical truth,
3. at least one real transition from Jobs or Review into Operate works end-to-end,
4. no new S125 UI/tests/evidence/screenshots use deprecated labels canonically.

---

## 7. Success bar

S125 succeeds only if PlaneStack feels like a trustworthy local mission-control surface:

- the user knows if the project is ready to operate,
- knows where to go next when it is not,
- can create/resume a local operating session without ambiguity,
- can distinguish execution, outputs, and evidence,
- can use incidents/runbooks/templates as real operator tools,
- and can move from approval-cleared work into local operation without losing context.

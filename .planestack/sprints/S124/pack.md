# Sprint 124 Pack — Review/Governance Excellence: Jobs-to-Approval Continuity + Policy Trust

**Sprint Code:** S124  
**Status:** Locked for implementation  
**Theme:** Move PlaneStack's **Review / Governance** experience into the **Exceptional** range by turning the handoff from **Jobs** into a coherent, trustworthy, policy-aware continuation of execution — deepening **approval clarity**, **blocked-flow guidance**, **decision trust**, **policy visibility**, **review queue continuity**, and the strict separation between **execution outputs** and **evidence/proof**.

---

## 1. Sprint intent

Sprint 124 is the direct follow-on to Sprint 123.

Where S123 made **Jobs** feel like a serious execution system — plan-to-execution continuity, trustworthy run detail, retry lineage, workflow depth, and explicit output/evidence handoff — S124 makes **Review / Governance** feel like the place where execution is evaluated, gated, approved, blocked, decided, and handed forward with confidence.

The user should be able to:

1. move from a Job/run directly into the relevant review/governance state,
2. understand whether execution is complete but governance is still blocking onward progress,
3. inspect blocked reasons and approval requirements with correct next-step guidance,
4. see decisions as auditable governance outcomes rather than vague status text,
5. distinguish approval from activation,
6. trust policy visibility without turning policy into a disconnected admin silo,
7. understand how review queue / shared review / release-candidate surfaces relate to execution,
8. and preserve the strict split between **what ran**, **what changed**, and **what proves it**.

Sprint 124 therefore delivers:

- strong **Jobs → Review / Governance** continuity,
- excellent **approvals** and **blocked** surfaces,
- first-class **decisions** and **policy trust**,
- clearer **release-candidate / queue / shared** review continuity,
- reason-coded governance status and next-action clarity,
- and deterministic validation harnesses that prove review/gating behavior rather than leaving it implicit.

S124 is the sprint where PlaneStack should start to feel like a serious governance system rather than only a planning/execution system.

---

## 2. Strategic alignment posture

S124 is locked to the existing PlaneStack strategy. It must remain aligned with:

- the artifact-native system-of-record posture,
- the Ideate → Promote → Execute → Govern → Write back → Prove → Report loop,
- deterministic local-first validation,
- the canonical user-facing mode labels (`Center`, `Plan`, `Jobs`, `Review`, `Observe`, `Operate`, `Manage`),
- the distinct treatment of **executions**, **outputs**, and **evidence**,
- and explicit governance gates rather than silent continuation past policy boundaries.

S124 may deepen review/governance structure and usability, but it must **not**:

- collapse execution truth into evidence truth,
- make Review a second execution plane,
- re-open the `Run → Jobs` rename,
- bypass approvals or activation boundaries,
- turn policy into client-only copy with no canonical backing,
- or let blocked states become ambiguous, silent, or frustratingly opaque.

---

## 3. Scope posture

### 3.1 Must-have core for S124

1. **Jobs → Review continuity**
   - real handoff from Job/run detail into governance state
   - launch/entry into approvals, blocked, decisions, queue, or release-candidate contexts as appropriate
   - source run context preserved in Review/Governance detail surfaces

2. **Approvals exceptional uplift**
   - excellent `review/governance/approvals`
   - clear approval owner/role visibility where allowed
   - status, reason code, source run/workflow, requested action, and next required action
   - distinction between approval granted and subsequent activation still required

3. **Blocked-flow trust**
   - excellent `review/governance/blocked`
   - blocked class / reason code / source object / next action visible
   - deterministic next-step guidance:
     - wait
     - request_or_handoff
     - complete_approval
     - stop_or_defer
   - no silent dead-end states

4. **Decisions and policy trust**
   - excellent `review/governance/decisions`
   - auditable decision detail
   - visible relation to policy and approval truth
   - policy summary visibility sufficient to explain why review is required

5. **Review queue continuity**
   - `review/reviews/queue`
   - `review/reviews/shared`
   - `review/reviews/release-candidate`
   - queue and release-candidate surfaces must feel connected to Jobs and Governance rather than peripheral

6. **Execution outputs vs evidence continuity**
   - Review surfaces must preserve the distinction between:
     - execution outputs,
     - resulting changes/artifacts under review,
     - and evidence/proof artifacts
   - no mixed "attachments" bucket that blurs these concerns

7. **Deterministic validation harness**
   - `sprint124-validate`
   - Jobs → approval-required proof
   - blocked-flow / decision / policy trust proof
   - outputs-vs-evidence review proof
   - Review/Governance Exceptional-range scorecard

8. **Truth refresh companion deliverables**
   - current sprint evidence + mirror
   - Product Knowledge / Work History review/update/no-change summary
   - navigation truth updated if Review/Governance semantics materially change

### 3.2 Strongly preferred momentum additions

1. deep links from run detail into approvals / blocked / decisions
2. richer review filters (status, source run, source workflow, component, sprint, actor)
3. release-candidate detail that summarizes pending approvals and blockers
4. review queue chips for "needs approval", "blocked", "decision recorded", "activation pending"
5. policy summary cards on blocked / approval detail
6. decision comparison or chronology in detail
7. shared-review context for multi-actor visibility
8. screenshots for queue, blocked, approvals, decisions, release-candidate
9. optional Concierge explanation of next governance step without owning the flow
10. explicit "return to Jobs" and "advance to Observe" CTAs where appropriate

### 3.3 Explicitly de-scoped or constrained

- no broad Operate/runbook expansion as the sprint center of gravity
- no deep Observe/analytics expansion beyond governance continuity needed for trust
- no major Concierge backend program in S124
- no shell/nav redesign beyond preserving Jobs / Review continuity
- no policy authoring redesign beyond visibility/trust required for governance
- no collapsing of approval and activation into one action

---

## 4. Non-negotiable invariants

### 4.1 Governance / filesystem
- Work-producing sequences must set:
  - `SPRINT_CODE=S124`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence starts with:
  - `make -C ps-dev governance-lock-check`
- Governed project truth writes go under:
  - `project_root/.planestack/**`
- The canonical governed project write target remains:
  - `/Users/mklein/_Ventures/PlaneStack/repos/poc-calculator/.planestack/**`

### 4.2 Review / Governance truth posture
- Approvals, blocked states, decisions, and policy references must remain canonical server/artifact truth; they cannot exist only as transient UI state.
- Review surfaces are projection surfaces over canonical governance truth, not an independent source of truth.
- Decision history must remain inspectable and deterministic.
- Policy visibility must point to canonical governed truth, not client-only summaries.

### 4.3 Execution / outputs / evidence posture
- A run is **not** the same thing as its outputs.
- Outputs are **not** the same thing as evidence.
- Review surfaces must make clear:
  - what executed,
  - what outputs / changes are under review,
  - and what evidence/proof artifacts exist.
- S124 must not blur these concepts in route design, copy, or UI rendering.

### 4.4 Approval / activation posture
- Approval and activation remain distinct.
- Approval may authorize onward progress while activation remains an explicit, auditable step where applicable.
- S124 must not represent approval as equivalent to activation.

### 4.5 Closeout bar
S124 does **not** close unless all are green:

- `sprint124-validate`
- `contract-test-docker`
- `e2e-gate`
- all required artifacts in `S124-evidence.json`
- `lock-check.json`
- Jobs → Review continuity proof
- approvals / blocked / decisions / policy trust proof
- outputs-vs-evidence review proof
- Review/Governance Exceptional-range thresholds met
- no evidence of execution/evidence truth collapse
- no evidence of approval=activation collapse

---

## 5. Canonical IA / routing focus for S124

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
- `review/governance/approvals`
- `review/governance/blocked`
- `review/governance/decisions`
- `review/governance/policy`
- `review/reviews/queue`

Secondary uplift / important continuity targets:
- `review/reviews/release-candidate`
- `review/reviews/shared`
- `jobs/runs` (handoff continuity only)
- `jobs/workflows` (handoff continuity only)

### 5.3 Canonical route families to deepen in S124
Representative canonical route families / API areas to support:
- `GET /review/governance/approvals`
- `GET /review/governance/approvals/:approvalId`
- `POST /review/governance/approvals/:approvalId:respond`
- `GET /review/governance/blocked`
- `GET /review/governance/blocked/:blockedId`
- `GET /review/governance/decisions`
- `GET /review/governance/decisions/:decisionId`
- `GET /review/governance/policy`
- `GET /review/reviews/queue`
- `GET /review/reviews/release-candidate`
- deep-link continuity from Jobs run/workflow detail into the above surfaces

# Sprint 118 Pack — Concierge Operational Backend + Exceptional Interactive Execution

**Sprint Code:** S118  
**Status:** Locked for implementation  
**Theme:** Convert Concierge from a trustworthy control tower into a governed operator by shipping the operational backend, reusable lane-specialized execution bundles, bottom-console execution maturity, and focused surface improvements that move the most important Concierge surfaces toward the **Exceptional** scoring range.

---

## 1. Sprint intent

Sprint 118 starts from a stronger product position than any earlier Concierge sprint:

- S116 already proved the session-scoped preview/execute slice, bridge-mediated bounded execution, and blocker-aware wait/resume.
- S117 already proved persistent control-tower state, approval-bound delegation, resumable readiness, multi-user handoffs, and daily-driver queue surfaces.
- The next locked step is therefore **not another statefulness sprint**. It is the first real **operational backend** sprint.

S118 must convert the existing Concierge plane into a governed operator by delivering:

1. **reusable lane-specialized execution bundles** instead of one-off proof logic,
2. **a durable operational backend model** for active step state, bridge jobs, evidence/results, stop/pause/resume, and bounded autonomy,
3. **an exceptional bottom-console execution experience** that makes active work understandable and trustworthy,
4. **a truly operational plans surface** with execution readiness, prerequisites, step evidence, and console continuity,
5. **a narrow allowlisted `autopilot_bounded` proof** that proves bounded autonomy without violating governance,
6. and **companion truth refresh work** so the durable canon keeps up with the sprint reality.

This is the sprint where Concierge should begin to feel like a real governed operator rather than a control-tower dashboard with execution attached.

---

## 2. Scope posture

### 2.1 Must-have core for S118
S118 must fully complete these moves:

1. **Operational backend model** for session jobs, active step state, bridge job state, results, evidence, pause/wait/resume/stop, and bounded autonomy posture.
2. **Lane-specialized execution bundles** for at least three bounded paths:
   - approval-cleared resume bundle,
   - bridge-mediated diagnose/remediate/retry bundle,
   - governed writeback dry-run/review/apply bundle.
3. **Exceptional-range bottom console uplift** so the active session shell is obviously trustworthy and execution-oriented.
4. **Operational plans surface** with lane grouping, execution readiness, prerequisites, blocker/approval context, and step/evidence continuity into the console.
5. **Tighter timeline and summary trust** for active execution, bundle progress, step results, and next-action clarity.
6. **One allowlisted `autopilot_bounded` proof** for a strictly bounded multi-step execution path.
7. **Four real `poc-calculator` proofs** that prove operational capability rather than just surface correctness.
8. **Deterministic validation harness** that proves bundle behavior, bridge mediation, and evidence completeness.
9. **Truth refresh companion deliverables** for the canonical product/truth/navigation docs.

### 2.2 Strongly preferred momentum additions
Because sprint startup cost dominates, include these if the core is already in motion:

1. bundle library view or inline bundle chooser in `plans`
2. “why can Concierge do this automatically?” explainers for the bounded autonomy path
3. bottom-console live step chips (`running`, `waiting`, `ready_to_resume`, `needs_approval`, `stopped`)
4. inline evidence/result preview in console and plan steps
5. timeline diff grouping by bundle and actor
6. summary freshness and confidence indicators
7. bridge health / readiness rollup card
8. stop/retry guardrails with explicit “what will happen” preview
9. screenshot-stable layouts for `summary`, `plans`, `timeline`, and the bottom console
10. one extra bundle-specific proof if the marginal cost is low

### 2.3 Explicitly de-scoped or constrained
To keep S118 substantial but coherent:

- no local LLM provider work as the default runtime model
- no UI click-bot execution model
- no generalized multi-project portfolio orchestration
- no broad remote-environment expansion beyond existing bounded needs
- no large shell redesign
- no alias-heavy compatibility expansion
- no unconstrained autopilot
- no erosion of bridge mediation, role shaping, safe disclosure, or approval gates

---

## 3. Non-negotiable invariants

### 3.1 Governance / filesystem
- Work-producing runs must set:
  - `SPRINT_CODE=S118`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence starts with:
  - `make -C ps-dev governance-lock-check`
- Governed project truth writes go under:
  - `project_root/.planestack/**`
- The canonical governed project write target remains:
  - `/Users/mklein/_Ventures/PlaneStack/repos/poc-calculator/.planestack/**`
- Execution scratch, temporary local state, bundle workspaces, and bridge runtime artifacts belong under `bridge_root`, not `project_root`.
- Audit evidence belongs in `project_root`; scratch/runtime material belongs in `bridge_root`.

### 3.2 Concierge authority and shell model
- Concierge remains both:
  - a **Plane**
  - a **bottom live console**
- Concierge remains **project-scoped**, **role-shaped**, **artifact-backed**, and **governance-shaped**.
- The bottom console remains the operational source of truth for an active session.
- The right drawer remains contextual help; it must not become an independent second operator.
- Execution bundle truth must not live only in transient UI state.

### 3.3 Execution posture
- Centralized AI reasoning remains the reasoning layer.
- Governed PlaneStack operations remain the execution substrate.
- Machine-local/runtime work remains brokered through the bridge boundary (`ps-locald` or successor) and reported back as structured state/evidence.
- S118 extends the operational backend around execution; it does not bypass S116/S117 execution posture.
- Deterministic test-double bridge remains the default validate posture unless a real bridge smoke is explicitly invoked.

### 3.4 Autonomy / safety model
- `chauffeur` remains the default autonomy mode.
- `autopilot_bounded` is allowed only inside explicit allowlisted proof paths with preview, boundary explanation, and evidence.
- Concierge may recommend beyond role, but may only enable or initiate actions within the user’s effective permissions.
- `approval_required`, `stage_required`, and `hitl_required` continue to reuse normal governance paths.
- waiting, stop, or handoff remain valid successful outcomes.
- more restrictive disclosure always wins.

### 3.5 Closeout bar
S118 does **not** close unless all are green:

- `sprint118-validate`
- `contract-test-docker`
- `e2e-gate`
- all required artifacts in `S118-evidence.json`
- `lock-check.json`
- one real approval-cleared resume bundle proof
- one real bridge diagnose/remediate/retry bundle proof
- one real allowlisted `autopilot_bounded` proof
- one real multi-actor execution handoff proof
- bottom-console and plans surfaces meet the S118 Exceptional-range threshold
- no evidence of Concierge bypassing approvals, role filters, disclosure rules, or bridge mediation boundaries

---

## 4. Canonical IA / routing for S118

### 4.1 Plane placement
Concierge remains the dedicated plane:

- **Plane:** `concierge`
- canonical route family:
  - `/ou/:ouKey/p/:projectKey/plane/concierge/:surface`

### 4.2 Required canonical surfaces
S118 must align to current navigation truth and make these surfaces meaningfully operational:

- `summary`
- `plans`
- `inbox`
- `blockers`
- `handoffs`
- `resumable`
- `timeline`

The bottom console remains a required operational shell coupled to the active session.

### 4.3 Focused surfaces targeted for Exceptional-range movement
S118’s quality emphasis is on the following already-started surfaces:

- bottom console active-session shell
- `plans`
- `summary`
- `timeline`

Secondary uplift targets:
- `inbox`
- `blockers`
- `handoffs`
- `resumable`

“Exceptional range” in this sprint means the surface is:
- immediately understandable,
- obviously actionable,
- trustworthy about state and ownership,
- precise about what just happened / what happens next,
- evidence-linked,
- role-safe,
- and free of dead-end interactions for the proof-path users.

See `Sprint118-Exceptional-Range-Targets.md` for explicit quality targets.

---

## 5. S118 architecture slice

### 5.1 What this sprint proves
S118 proves the first durable operational-backend slice across Concierge’s **v5** direction while preserving the control-tower and execution foundations already proven:

- reusable bounded execution bundles
- durable job/step/result/evidence state
- bridge job mediation and status projection
- execution continuity from `plans` into the bottom console
- bundle-aware timeline and summary synthesis
- bounded autonomy for one allowlisted path
- quality uplift on the most important operational surfaces

### 5.2 Service responsibilities
The PlaneStack service owns:

- session orchestration state
- plan generation and bundle selection
- role/gate filtering
- approval binding and readiness evaluation
- active step sequencing
- stop/pause/wait/resume state transitions
- bridge job tracking and projection
- evidence/result attachment and summarization
- bundle progress synthesis
- timeline and summary projection
- truth-refresh evidence assembly

### 5.3 Bridge responsibilities
The bridge layer continues to own:

- machine discovery / environment readiness
- executable/path discovery where relevant
- local process start / stop / restart
- local health polling
- bounded local logs
- safe remediation apply hooks
- local writeback helper invocation where permitted
- structured job-state updates back to PlaneStack

### 5.4 Control-layer rule
Concierge does not directly mutate truth or click through the UI.
It inspects context, selects or shapes a bounded bundle, previews governed operations, executes allowed operations, observes results, and then continues / waits / requests / hands off / resumes / stops / completes.

---

## 6. Artifact model and governed files

### 6.1 Required artifact families in scope
S118 must preserve and use:

- `concierge.session`
- `concierge.plan`
- `concierge.claim`
- `concierge.blocker`
- `concierge.handoff`
- `concierge.recommendation`
- `concierge.bridge_job`

S118 adds explicit backend truth around execution by introducing or hardening:

- `concierge.bundle`
- `concierge.bundle_run`
- `concierge.step_result`

These may be represented as first-class artifact types, typed subfamilies, or equivalent contract-backed truth, but the behavior must be explicit and evidence-backed.

### 6.2 Governed project files
S118 closeout evidence must write under:

- `.planestack/governance/evidence/s118/**`
- `.planestack/sprints/S118/{pack.md,runlog.md,evidence.json,manifest.json}`

Bundle and backend evidence should include:
- bundle definitions or bundle proof summaries
- bundle-run traces
- bridge job summaries
- console state proofs
- plan/readiness proofs
- bounded autonomy proof
- truth-refresh summaries
- archive and closeout summaries

---

## 7. Contract and routing posture

### 7.1 Canonical API direction
S118 should keep the session-scoped execution posture from S116/S117 and extend it with explicit operational-backend routes and projection endpoints.

The canonical control pattern is:

- session-scoped preview / execute / resume / stop
- plan- and bundle-aware read models
- bridge job projections
- summary / timeline / queue projections
- no new canonical alias families

### 7.2 Preview and execution safety
For all proof-path execution:
- preview and execute remain explicitly bound,
- stop/retry/resume actions require state-appropriate tokens where relevant,
- mutating routes remain idempotent where they create or transition truth,
- wait / stop / handoff remain first-class safe outcomes, not error fallbacks.

---

## 8. Required proof posture

S118 must prove four real `poc-calculator` paths:

1. **Proof A — Approval-cleared resume bundle**
   - wait on approval,
   - approval clears,
   - bundle resumes,
   - recovery completes with evidence.

2. **Proof B — Bridge diagnose/remediate/retry bundle**
   - detect degraded local/runtime condition,
   - run bridge-mediated diagnosis,
   - apply safe remediation,
   - retry and recover.

3. **Proof C — Allowlisted `autopilot_bounded` bundle**
   - one narrow multi-step bundle executes with minimal interruption,
   - stays within explicit scope,
   - shows why the bounded autonomy path is allowed,
   - leaves complete evidence.

4. **Proof D — Multi-actor handoff during execution**
   - execution begins,
   - ownership shifts via handoff at the correct moment,
   - second actor completes or resumes the bounded flow,
   - timeline and summary reflect the transition clearly.

The sprint is incomplete if these are simulated only at the surface level and not backed by real backend truth/evidence.

---

## 9. Truth refresh companion deliverables

S118 must again review and update or explicitly no-change:

- `PlaneStack-Product-Knowledge.v4.md` or successor
- `WORK-HISTORY.v5.md` or successor
- `PlaneStack-Truth-Index.md` if read order/process changed
- `PlaneStack-App-Navigation-Map.md` if Concierge behavior or routing changed
- `navigation-menu-ia-current.md` review or no-change summary
- any S118 mirror/readme pieces needed so implemented-vs-planned stays explicit

If a reviewed truth file does not change, produce a corresponding no-change summary artifact.

---

## 10. Success bar

S118 is successful when:

- a user can open `plans`, understand which bounded bundles exist, see readiness and prerequisites, and enter the active execution shell with confidence;
- the bottom console makes the active step, current state, evidence, and next action obvious;
- one allowlisted bounded-autonomy path works without violating governance;
- bridge-mediated remediation is real and evidence-backed;
- timeline and summary projections are trustworthy enough for an operator to use as the current project execution picture;
- and the focused operational surfaces move clearly toward the Exceptional range rather than remaining merely functional.

# Sprint 119 Pack — Concierge Governed Bundle Lifecycle + Execution Observability

**Sprint Code:** S119  
**Status:** Locked for implementation  
**Theme:** Turn the new Concierge operational backend into a governed, explainable, repeatable system by shipping governed bundle lifecycle, execution observability/forensics, one approval-bound apply checkpoint, and focused quality improvements that move the most important operational Concierge surfaces into the **Exceptional** range.

---

## 1. Sprint intent

Sprint 119 assumes the S118 vector closes substantially as designed:

- governed bundle registry and schema exist,
- session-selected bundles and bundle-run attempts are real,
- the bottom console is session-addressable and execution-aware,
- bridge jobs, step results, and execution projections exist,
- one bounded `autopilot_bounded` path has already been proven.

That means S119 is **not** another backend-foundation sprint and **not** a broad autonomy sprint.

Instead, S119 should make the new backend **governable, explainable, and safe to live with every day** by delivering:

1. **Governed bundle lifecycle** — draft, review, approve, activate, archive, history, diff, and “why this bundle” selection evidence.
2. **Execution observability and forensics** — bundle-run detail, attempt lineage, bridge-job detail, structured reason codes, result/evidence continuity, and operator-readable history.
3. **One approval-bound apply checkpoint** — a real path that crosses from dry-run/preview into an explicit governed apply checkpoint without bypassing approval or writeback rules.
4. **Exceptional-range uplift on the core operational surfaces** — especially `plans`, bottom console, `timeline`, and `summary`.
5. **Chronicle-safe execution history hooks** — additive visibility into waits, retries, remediation outcomes, and approvals without creating a second truth system.
6. **Companion truth refresh work** so the durable canon keeps up with the post-S118 operational model.

S119 is the sprint where Concierge should start to feel less like “an execution system that works” and more like “a governed operational fabric that an operator can trust, inspect, and explain.”

---

## 2. Scope posture

### 2.1 Must-have core for S119
S119 must fully complete these moves:

1. **Governed bundle lifecycle**
   - draft / review / approve / activate / archive
   - bundle version/hash visibility
   - diff/history view and API
   - explicit lifecycle state on bundle truth
   - one activation path proven in `poc-calculator`

2. **Execution observability / forensics**
   - bundle-run detail projection
   - attempt lineage and retry comparison
   - bridge-job detail projection
   - structured stop / wait / retry / failure reason codes
   - evidence/result continuity across attempts and handoffs

3. **Approval-bound apply checkpoint**
   - preview / dry-run
   - bounded execution toward apply readiness
   - explicit approval wait
   - approved apply
   - evidence-backed completion
   - no bypass of governance or writeback boundaries

4. **Focused Exceptional-range surface movement**
   - `plans`
   - bottom console
   - `timeline`
   - `summary`

5. **Chronicle-safe execution history hooks**
   - additive execution event summaries
   - wait reasons
   - retry lineage
   - bridge remediation outcomes
   - approval-bound pause/resume history

6. **Four real `poc-calculator` proofs**
   - bundle activation path
   - bridge remediation forensic path
   - approval-bound apply path
   - mid-execution handoff with observability continuity

7. **Deterministic validation harness**
   - `sprint119-validate`
   - updated contract/e2e/proof checks
   - evidence completeness and scorecard gates

8. **Truth refresh companion deliverables**
   - current sprint evidence + mirror
   - product truth docs reviewed/updated/no-change summarized
   - Concierge roadmap/spec refreshed if operational model materially advances

### 2.2 Strongly preferred momentum additions
Because startup cost dominates, include these if core work is already moving:

1. bundle lifecycle badges and visibility directly in `plans`
2. “why was this bundle selected?” explanation surface
3. console-side attempt compare links
4. timeline event grouping by lifecycle phase (`drafted`, `approved`, `activated`, `executed`, `retried`, `applied`)
5. bundle-run forensic panel with reason-code chips
6. summary rollup by lifecycle status and execution health
7. history freshness stamps and evidence confidence markers
8. archive-ready screenshot set for `plans`, bottom console, `timeline`, `summary`
9. one narrow bulk-read endpoint for recent execution events if marginal cost is low
10. one extra proof showing archive or supersede semantics for a bundle version

### 2.3 Explicitly de-scoped or constrained
To keep S119 substantial but coherent:

- no broad new autonomy tier beyond the single bounded path already established
- no local LLM provider work as default runtime model
- no UI click-bot execution model
- no generalized multi-project portfolio orchestration
- no large shell redesign
- no broad remote environment expansion
- no alias-heavy compatibility expansion
- no erosion of bridge mediation, approval gating, role shaping, or safe disclosure
- no separate parallel observability stack that duplicates canonical execution truth

---

## 3. Non-negotiable invariants

### 3.1 Governance / filesystem
- Work-producing runs must set:
  - `SPRINT_CODE=S119`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence starts with:
  - `make -C ps-dev governance-lock-check`
- Governed project truth writes go under:
  - `project_root/.planestack/**`
- The canonical governed project write target remains:
  - `/Users/mklein/_Ventures/PlaneStack/repos/poc-calculator/.planestack/**`
- Scratch/runtime material belongs in `bridge_root`, not `project_root`.
- Audit evidence belongs in `project_root`; ephemeral runtime material belongs in `bridge_root`.

### 3.2 Concierge authority and shell model
- Concierge remains both:
  - a **Plane**
  - a **bottom live console**
- Concierge remains project-scoped, role-shaped, artifact-backed, and governance-shaped.
- The bottom console remains the operational source of truth for an active session.
- The right drawer remains contextual help; it must not become an independent second operator.
- Lifecycle and observability truth must not live only in transient UI state.

### 3.3 Execution posture
- Centralized AI reasoning remains the reasoning layer.
- Governed PlaneStack operations remain the execution substrate.
- Machine-local/runtime work remains brokered through the bridge boundary and reported back as structured state/evidence.
- S119 strengthens lifecycle governance and observability; it does not bypass the S116–S118 execution posture.
- Deterministic bridge test doubles remain default for validate unless a real-bridge smoke is explicitly invoked.

### 3.4 Safety / autonomy model
- `chauffeur` remains the default autonomy mode.
- `autopilot_bounded` remains tightly allowlisted and evidence-bound.
- Concierge may recommend beyond role, but may only enable or initiate actions within the user’s effective permissions.
- `approval_required`, `stage_required`, and `hitl_required` continue to reuse normal governance paths.
- waiting, stop, handoff, or archive remain valid successful outcomes where appropriate.
- more restrictive disclosure always wins.

### 3.5 Lifecycle governance rule
- Bundles are not active merely because they exist in a registry.
- Only **approved + activated** bundle versions may be selected for production proof paths.
- Draft or superseded bundle versions may be inspected, diffed, or compared, but must not become the active execution target for proof-path sessions.

### 3.6 Closeout bar
S119 does **not** close unless all are green:

- `sprint119-validate`
- `contract-test-docker`
- `e2e-gate`
- all required artifacts in `S119-evidence.json`
- `lock-check.json`
- bundle lifecycle proof (draft/review/approve/activate path)
- approval-bound apply checkpoint proof
- bridge remediation forensic proof
- multi-actor execution handoff proof
- `plans`, bottom console, `timeline`, and `summary` meet the S119 Exceptional-range thresholds
- no evidence of Concierge bypassing approvals, role filters, disclosure rules, bridge boundaries, or lifecycle gating

---

## 4. Canonical IA / routing for S119

### 4.1 Plane placement
Concierge remains the dedicated plane:

- **Plane:** `concierge`
- canonical route family:
  - `/ou/:ouKey/p/:projectKey/plane/concierge/:surface`

### 4.2 Required canonical surfaces
S119 must keep these surfaces real and operational:

- `summary`
- `plans`
- `inbox`
- `blockers`
- `handoffs`
- `resumable`
- `timeline`

The bottom console remains a required operational shell coupled to the active session.

### 4.3 Focused surfaces targeted for Exceptional-range movement
Primary uplift targets:
- bottom console active-session shell
- `plans`
- `summary`
- `timeline`

Secondary uplift targets:
- `inbox`
- `blockers`
- `handoffs`
- `resumable`

“Exceptional range” for S119 means the surface is:
- immediately understandable,
- obviously actionable,
- trustworthy about lifecycle state, execution state, and ownership,
- precise about what just happened / what happens next / why it changed,
- evidence-linked,
- role-safe,
- and free of dead-end interactions for the proof-path users.

See `Sprint119-Exceptional-Range-Targets.md`.

---

## 5. S119 architecture slice

### 5.1 What this sprint proves
S119 proves the first durable **governed lifecycle + observability** slice on top of the S118 operational backend:

- governed bundle lifecycle state
- version/hash visibility and diff/history
- session-bound selection of approved/activated bundle versions
- attempt lineage and forensic comparison
- bridge-job detail and remediation reasoning
- one approval-bound apply checkpoint
- execution history hooks that remain additive to canonical truth
- operator-trustworthy `plans`, console, `timeline`, and `summary`

### 5.2 Service responsibilities
The PlaneStack service owns:
- bundle lifecycle truth and lifecycle transitions
- bundle selection explanation
- session orchestration state
- approval/gate filtering
- active step sequencing and readiness evaluation
- bundle-run attempt lineage
- bridge-job tracking and projection
- reason-code normalization
- evidence/result attachment and summarization
- timeline and summary projection
- truth-refresh evidence assembly

### 5.3 Bridge responsibilities
The bridge layer continues to own:
- machine discovery / environment readiness
- executable/path discovery
- local process start / stop / restart
- local health polling
- bounded local logs
- safe remediation apply hooks
- structured job-state updates back to PlaneStack

### 5.4 Control-layer rule
Concierge still does not directly mutate truth or click through the UI.
It inspects context, selects an approved/activated bundle version, previews governed operations, executes allowed operations, observes results, and then continues / waits / requests / hands off / resumes / stops / retries / completes / archives with evidence.

---

## 6. Artifact model and governed files

### 6.1 Required artifact families in scope
S119 must preserve and use:

- `concierge.session`
- `concierge.plan`
- `concierge.claim`
- `concierge.blocker`
- `concierge.handoff`
- `concierge.recommendation`
- `concierge.bridge_job`
- `concierge.bundle`
- `concierge.bundle_run`
- `concierge.step_result`

S119 adds or hardens explicit lifecycle and observability truth around those families, whether via first-class artifact types, typed subfamilies, or equivalent contract-backed truth. Behavior must be explicit and evidence-backed.

### 6.2 Governed project files
S119 closeout evidence must write under:

- `.planestack/governance/evidence/s119/**`
- `.planestack/sprints/S119/{pack.md,runlog.md,evidence.json,manifest.json}`

Lifecycle and observability evidence should include:
- bundle registry and lifecycle proof summaries
- lifecycle diff/history proofs
- bundle-run traces
- attempt lineage summaries
- bridge-job summaries
- console state proofs
- apply checkpoint proof
- truth-refresh summaries
- archive and closeout summaries

---

## 7. Contract and routing posture

### 7.1 Canonical API direction
S119 should keep session-scoped execution posture and extend it with:
- bundle lifecycle read/write routes
- bundle-run and attempt observability read models
- bridge-job detail read models
- console/session continuity routes
- summary / timeline / queue projections
- no new canonical alias families

### 7.2 Preview / execute / apply safety
For all proof-path execution:
- preview and execute remain explicitly bound,
- apply checkpoints are explicit and approval-bound,
- retry creates a new attempt lineage,
- mutating routes remain idempotent where they create or transition truth,
- wait / stop / handoff / archive remain first-class safe outcomes, not error fallbacks.

---

## 8. Required proof posture

S119 must prove four real `poc-calculator` paths:

1. **Proof A — Governed bundle lifecycle activation**
   - bundle version exists in draft,
   - review/approval occurs,
   - bundle becomes activated,
   - session selection shows why that version is active,
   - evidence proves lifecycle truth.

2. **Proof B — Bridge remediation forensic path**
   - degraded bridge/runtime condition is detected,
   - bridge job diagnosis and remediation run,
   - retry creates a new attempt,
   - forensic projection shows the difference between attempts,
   - recovery completes with evidence.

3. **Proof C — Approval-bound apply checkpoint**
   - preview / dry-run path starts,
   - apply checkpoint is reached,
   - approval wait occurs,
   - approval clears,
   - governed apply completes,
   - timeline and summary reflect the approval boundary clearly.

4. **Proof D — Mid-execution handoff with observability continuity**
   - execution begins,
   - at least one successful step result exists,
   - handoff occurs mid-flow,
   - second actor resumes or completes,
   - console, timeline, and summary preserve ownership and attempt continuity.

The sprint is incomplete if these are simulated only at the surface level and not backed by real backend truth and evidence.

---

## 9. Truth refresh companion deliverables

S119 must again review and update or explicitly no-change:

- `PlaneStack-Product-Knowledge.v4.md` or successor
- `WORK-HISTORY.v5.md` or successor
- `PlaneStack-Truth-Index.md` if read order/process changed
- `PlaneStack-App-Navigation-Map.md` if Concierge behavior or routing changed
- `navigation-menu-ia-current.md` review or no-change summary
- `PlaneStack-Concierge-Roadmap-v2-2026-03-11.md` or successor if S119 materially advances the governed bundle lifecycle or observability model
- any S119 mirror/readme pieces needed so implemented-vs-planned stays explicit

If a reviewed truth file does not change, produce a corresponding no-change summary artifact.

---

## 10. Success bar

S119 is successful when:

- an operator can tell which bundle version is draft, approved, active, superseded, or archived without ambiguity;
- `plans` makes bundle choice, lifecycle status, readiness, and next action obvious;
- the bottom console makes current attempt, active step, reason codes, evidence, and next action obvious;
- an approval-bound apply checkpoint works without bypassing governance;
- timeline and summary projections are trustworthy enough for an operator to reconstruct what happened and why;
- and the focused surfaces move clearly into the Exceptional range rather than remaining merely correct.

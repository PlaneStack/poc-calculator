
# Sprint 120 Pack — Concierge Readiness-Driven Execution + Governed Bundle Adoption

**Sprint Code:** S120  
**Status:** Locked for implementation  
**Theme:** Turn Concierge from a governable operational backend into a **readiness-driven, repeatable daily-driver system** by shipping bundle readiness evaluation, explainable bundle selection, operator-facing adoption inside `plans` and the bottom console, recovery playbooks, and focused quality improvements that move the most important Concierge surfaces into the **Exceptional** range **without changing the existing PlaneStack truth, IA, governance, or AI-control spine**.

---

## 1. Sprint intent

Sprint 120 assumes the S119 vector closes substantially as designed:

- governed bundle lifecycle exists,
- bundle versions/hashes/history/diff are real,
- approval-bound apply checkpoints are real,
- execution forensics and attempt lineage are inspectable,
- the bottom console is already an execution-aware operational shell,
- additive Chronicle-safe lifecycle/execution hooks exist.

That means S120 is **not** another execution-foundation sprint, **not** a broad new autonomy sprint, and **not** a navigation / IA re-think sprint.

Instead, S120 should make Concierge **choose the right governed bundle, explain why, refuse unsafe or unready options, and help operators trust and adopt the governed bundle model in real work**.

S120 therefore delivers:

1. **Readiness-driven bundle selection** — compute runnable vs blocked vs not-eligible vs waiting states from canonical governed truth.
2. **Explainable bundle adoption inside `plans`** — show why a bundle is selected, why others are not, and what must change to become runnable.
3. **Execution readiness scorecards** — deterministic readiness bars for `plans`, `summary`, and the bottom console.
4. **Recovery playbooks as first-class bundle outcomes** — standardize the most common recoveries instead of re-deriving them ad hoc.
5. **Exceptional-range uplift on the four core operator surfaces** — `plans`, bottom console, `timeline`, and `summary`.
6. **Chronicle-safe execution-history extensions** — additive projection of readiness and adoption truth without creating a second state system.
7. **Companion truth refresh work** so the durable canon reflects the post-S119 / post-S120 Concierge operational model.

S120 is the sprint where Concierge should start to feel like **an operator can trust it to pick, explain, and safely run the right governed bundle under real readiness conditions**.

---

## 2. Strategic alignment posture

S120 is locked to the existing PlaneStack strategy. It must remain aligned with:

- the artifact-native system-of-record posture,
- the Execute → Govern → Write back → Prove → Report power loop,
- deterministic local-first validation,
- bridge-mediated local execution,
- canonical Manage-plane Concierge placement,
- AI Management remaining the only AI control plane,
- additive observability rather than a second truth stack,
- explicit approval/apply boundaries,
- and bounded autonomy with `chauffeur` as the default mode.

S120 may improve operational maturity, but it must **not**:

- turn Concierge into a new top-level mode,
- turn Concierge into a second AI control plane,
- move bundle truth or selection truth into DB-only shadow state,
- normalize non-canonical aliases back into product truth,
- broaden `autopilot_bounded` beyond tightly governed proof paths,
- introduce click-bot behavior,
- or weaken the distinction between approval, activation, execution, evidence, and writeback.

See `Sprint120-Strategic-Alignment-Guardrails.md`.

---

## 3. Scope posture

### 3.1 Must-have core for S120
S120 must fully complete these moves:

1. **Readiness-driven bundle selection and refusal**
   - compute bundle readiness from canonical lifecycle, role, approval, lane, and runtime/bridge posture
   - distinguish `ready`, `blocked`, `waiting_on_approval`, `waiting_on_runtime`, `not_eligible`, `superseded`, `archived`
   - refuse non-runnable bundle selection for proof-path execution
   - surface “why selected / why not selected” explanations

2. **Execution readiness scorecards**
   - deterministic readiness projection per session-selected bundle
   - score dimensions for lifecycle, governance, runtime, evidence continuity, autonomy allowance, and selected-bundle validity
   - scorecards visible in `plans`, `summary`, and bottom console
   - score inputs derived from canonical truth only

3. **Governed bundle adoption inside `plans`**
   - bundle chooser with recommended / eligible / blocked / not-eligible distinctions
   - direct continuity to bundle detail/history/diff
   - “why this bundle” explanation panel
   - explicit activation and selection visibility without leaving operational context

4. **Recovery playbooks as first-class outcomes**
   - diagnose → remediate → retry
   - wait → approval cleared → checkpoint continue
   - collision / ownership conflict → request_or_handoff → resumed continuation
   - each playbook linked to evidence/timeline continuity

5. **Focused Exceptional-range uplift**
   - `plans`
   - bottom console
   - `timeline`
   - `summary`

6. **Four real `poc-calculator` proofs**
   - readiness-driven selection refusal + correct selection
   - runtime readiness remediation path
   - approval-bound apply checkpoint with real writeback evidence
   - execution continuity through handoff/collision remediation

7. **Deterministic validation harness**
   - `sprint120-validate`
   - updated contract/e2e/proof checks
   - evidence completeness, readiness scorecard, and Exceptional-range gates

8. **Truth refresh companion deliverables**
   - current sprint evidence + mirror
   - product truth docs reviewed/updated/no-change summarized
   - Concierge roadmap/spec refreshed if the readiness/adoption model materially advances

### 3.2 Strongly preferred momentum additions
Because startup cost dominates, include these if core work is already moving:

1. direct plan-row visibility of readiness blockers and next step
2. bundle detail “adoption confidence” panel
3. summary rollup for active-ready vs blocked-ready vs unready bundles
4. bottom-console reason-code chips for readiness transitions
5. timeline grouping by readiness phase transitions
6. one narrow server endpoint for recommended bundle candidates and rationale
7. one archive-ready screenshot set for `plans`, bottom console, `timeline`, and `summary`
8. one extra proof showing superseded bundle refusal with guided adoption to active version
9. one low-cost “why not this bundle?” compare panel
10. one deterministic no-change truth summary artifact if roadmap wording remains valid

### 3.3 Explicitly de-scoped or constrained
To keep S120 substantial but coherent:

- no broad new autonomy tier beyond the one tightly bounded proof path
- no local LLM provider work as default runtime model
- no UI click-bot execution model
- no generalized multi-project portfolio orchestration
- no large shell redesign
- no broad remote environment expansion
- no alias-heavy compatibility expansion
- no erosion of bridge mediation, approval gating, role shaping, or safe disclosure
- no second readiness or observability truth stack that duplicates canonical execution truth

---

## 4. Non-negotiable invariants

### 4.1 Governance / filesystem
- Work-producing runs must set:
  - `SPRINT_CODE=S120`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence starts with:
  - `make -C ps-dev governance-lock-check`
- Governed project truth writes go under:
  - `project_root/.planestack/**`
- The canonical governed project write target remains:
  - `/Users/mklein/_Ventures/PlaneStack/repos/poc-calculator/.planestack/**`
- Scratch/runtime material belongs in `bridge_root`, not `project_root`.
- Audit evidence belongs in `project_root`; ephemeral runtime material belongs in `bridge_root`.

### 4.2 Concierge authority and shell model
- Concierge remains both:
  - a **Plane**
  - a **bottom live console**
- Concierge remains project-scoped, role-shaped, artifact-backed, and governance-shaped.
- The bottom console remains the operational source of truth for an active session.
- The right drawer remains contextual help; it must not become an independent second operator.
- Readiness truth and selection truth must not live only in transient UI state.

### 4.3 Execution posture
- Centralized AI reasoning remains the reasoning layer.
- Governed PlaneStack operations remain the execution substrate.
- Machine-local/runtime work remains brokered through the bridge boundary and reported back as structured state/evidence.
- S120 strengthens readiness/adoption and recovery playbooks; it does not bypass the S116–S119 execution posture.
- Deterministic bridge test doubles remain default for validate unless a real-bridge smoke is explicitly invoked.

### 4.4 Safety / autonomy model
- `chauffeur` remains the default autonomy mode.
- `autopilot_bounded` remains tightly allowlisted and evidence-bound.
- Concierge may recommend beyond role, but may only enable or initiate actions within the user’s effective permissions.
- `approval_required`, `stage_required`, and `hitl_required` continue to reuse normal governance paths.
- waiting, stop, handoff, or archive remain valid successful outcomes where appropriate.
- more restrictive disclosure always wins.

### 4.5 Readiness and selection rule
- Bundles are not runnable merely because they exist in a registry.
- Only **approved + activated** bundle versions that also satisfy role, runtime, and checkpoint posture may be selected for production proof paths.
- Non-active, superseded, archived, or not-eligible bundles may be inspected, diffed, or compared, but must not become the active execution target for proof-path sessions.
- “Why selected / why not selected” must be explainable from canonical truth.

### 4.6 Closeout bar
S120 does **not** close unless all are green:

- `sprint120-validate`
- `contract-test-docker`
- `e2e-gate`
- all required artifacts in `S120-evidence.json`
- `lock-check.json`
- readiness-driven selection proof
- runtime readiness remediation proof
- approval-bound apply proof with governed writeback evidence
- handoff/collision continuity proof
- `plans`, bottom console, `timeline`, and `summary` meet the S120 Exceptional-range thresholds
- no evidence of Concierge bypassing approvals, role filters, disclosure rules, bridge boundaries, lifecycle gating, or readiness refusal rules

---

## 5. Canonical IA / routing for S120

### 5.1 Plane placement
Concierge remains the dedicated plane:

- **Plane:** `concierge`
- canonical route family:
  - `/ou/:ouKey/p/:projectKey/plane/concierge/:surface`

### 5.2 Required canonical surfaces
S120 must keep these surfaces real and operational:

- `summary`
- `plans`
- `inbox`
- `blockers`
- `handoffs`
- `resumable`
- `timeline`

The bottom console remains a required operational shell coupled to the active session.

### 5.3 Focused surfaces targeted for Exceptional-range movement
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

“Exceptional range” for S120 means the surface is:
- immediately understandable,
- obviously actionable,
- trustworthy about readiness state, lifecycle state, and ownership,
- precise about what just changed / why it changed / what happens next,
- evidence-linked,
- role-safe,
- and free of dead-end interactions for the proof-path users.

See `Sprint120-Exceptional-Range-Targets.md`.

---

## 6. S120 architecture slice

### 6.1 What this sprint proves
S120 proves the first durable **readiness-driven adoption** slice on top of the S119 governed backend:

- canonical readiness evaluation for governed bundles
- explainable bundle recommendation and refusal
- operational plans that help the operator adopt the correct active bundle version
- readiness scorecards derived from canonical truth
- recovery playbooks as first-class governed outcomes
- additive readiness/adoption observability without second truth
- one bounded operator path that selects, executes, waits, resumes, and completes with explainability preserved

### 6.2 What this sprint explicitly does not prove
- no generalized multi-project execution portfolio
- no broad new autonomy tier
- no click-bot primary execution model
- no provider-local AI orchestration split
- no second policy or approval system
- no redefinition of Concierge as a mode

---

## 7. Repo-by-repo delta expectations

### 7.1 `ps-contracts`
Required:
- readiness fields and enums in Concierge contract truth
- bundle adoption and rationale response shapes
- readiness scorecard schema
- recovery playbook / rationale schema additions
- additive Chronicle event type extensions for readiness/adoption transitions
- canonical route/schema coverage for S120 readiness surfaces and filters

Expected output examples:
- readiness state enums
- recommendation/rationale payloads
- scorecard payloads
- timeline/history event payloads for readiness transitions

### 7.2 `ps-api`
Required:
- canonical readiness evaluator using governed lifecycle + runtime/role/gate state
- bundle recommendation / refusal logic
- readiness scorecard projection
- recovery playbook projection and state transitions
- summary/timeline projection updates for readiness and adoption
- no DB-only shadow readiness authority

Expected output examples:
- `GET /concierge/bundles` with readiness and rationale
- `GET /concierge/plans` / session projections with recommendation panels
- selection refusal when non-runnable bundle is requested
- readiness-aware summary/timeline/console projection

### 7.3 `ps-web`
Required:
- `plans` bundle chooser / recommendation rendering
- “why selected / why not selected” rendering
- readiness badges and next-step guidance
- bottom console readiness continuity
- summary/timeline clarity improvements
- no dead-end interactions on proof paths

Expected output examples:
- recommendation cards
- readiness chips / banners
- refusal explanations
- playbook continuity links
- evidence-linked timeline transitions

### 7.4 `ps-dev`
Required:
- `sprint120-validate`
- readiness/refusal smoke
- apply/writeback proof smoke
- handoff/collision continuity smoke
- truth-refresh checks
- scorecard computation and threshold enforcement

### 7.5 `poc-calculator`
Required:
- governed bundle proof fixtures
- readiness and refusal scenarios
- remediation path fixtures
- apply/writeback evidence path
- handoff/collision continuity evidence
- canonical `.planestack/sprints/S120/*` mirror outputs

---

## 8. Success bar

S120 succeeds when an operator can:

1. open Concierge,
2. see which governed bundle is recommended,
3. understand why it was selected,
4. see why alternatives are blocked or not eligible,
5. run the recommended bundle through the bottom console,
6. hit a real runtime or approval barrier,
7. get the correct deterministic recovery or resume path,
8. complete with governed writeback evidence,
9. and later reconstruct the full story from summary, timeline, console, and forensic artifacts.

S120 fails if it merely adds more lifecycle fields or UI badges without materially improving **operator trust in bundle selection and readiness**.

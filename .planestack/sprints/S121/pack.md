# Sprint 121 Pack — First-Run Excellence: Center → Project Bootstrap → Goals / Ideas / Work-Items Golden Path

**Sprint Code:** S121  
**Status:** Locked for implementation  
**Theme:** Move PlaneStack's **first-contact and early planning journey** into the **Exceptional** range by making the initial project experience clear, guided, artifact-backed, and fast — starting at **Center**, flowing through **project bootstrap**, **goals**, **ideas**, **work-items**, and **templates**, while also canonically renaming the mode **Run** to **Jobs**.

---

## 1. Sprint intent

Sprint 121 is the first top-down buildout sprint after the Concierge-heavy execution/governance arc. It is **not** a reversal of the strategic direction; it is a deliberate shift in **user-journey emphasis**.

The purpose of S121 is to make a user's **first meaningful hour** in PlaneStack feel exceptional:

1. land in a project and immediately understand what it is,
2. bootstrap missing project basics without hunting through the UI,
3. create and refine goals,
4. capture ideas and turn them into work-items with lineage,
5. use templates to accelerate startup,
6. see the project artifact spine from day one,
7. leave the project in a state where later planning, execution, governance, and operation feel like a natural continuation.

S121 therefore delivers:

- a stronger **Center → Project** experience,
- guided **project bootstrap** flows,
- first-class **goals** and **goal lineage** visibility,
- a polished **ideas → work-items** golden path,
- useful **templates** as accelerators,
- artifact explorer continuity from day one,
- and the canonical mode rename **Run → Jobs**.

S121 is the sprint where PlaneStack should start to feel like a user can enter the product cold and still understand how to begin meaningful work quickly.

---

## 2. Strategic alignment posture

S121 is locked to the existing PlaneStack strategy. It must remain aligned with:

- the artifact-native system-of-record posture,
- the Ideate → Promote → Execute → Govern → Write back → Prove → Report loop,
- deterministic local-first validation,
- Project HQ / Center as the user's project home,
- goals as first-class artifacts,
- ideas promoted into work-items with lineage,
- canonical-only IA and routing,
- and later continuity into Jobs, Review, Observe, Operate, and Manage.

S121 may improve onboarding, bootstrap, and planning flow, but it must **not**:

- turn bootstrap into transient wizard-only truth,
- create a second project summary truth outside artifact-backed records,
- weaken artifact lineage between ideas and work-items,
- collapse goals into embedded text blobs only,
- add a new top-level mode for onboarding,
- or make the mode rename create long-term alias ambiguity.

---

## 3. Scope posture

### 3.1 Must-have core for S121

1. **Center → Project exceptional uplift**
   - clear project summary / charter / scope presentation
   - goals visibility from the project home
   - empty-state / sparse-state next-best-actions
   - direct create flows for missing project bootstrap artifacts

2. **Guided project bootstrap**
   - bootstrap project scope / charter
   - bootstrap initial goals
   - bootstrap initial ideas / requirements seeds
   - bootstrap starter work-items
   - bootstrap starter people / stakeholders
   - bootstrap from template where available

3. **Goals as first-class, usable project truth**
   - goals list/detail flow
   - goal create/edit/apply flow
   - goal linkage to ideas and work-items
   - clear “why this work exists” traceability

4. **Ideas → Work-Items golden path**
   - capture ideas quickly
   - promote idea to work-item with preserved lineage
   - expose acceptance-criteria / rationale continuity
   - support feedback + people linkage where relevant

5. **Templates as startup accelerators**
   - project/bootstrap templates
   - work-item starter templates
   - clear template provenance / source visibility
   - “start from template” entry from Center and Plan

6. **Artifact explorer continuity from day one**
   - Center → Artifacts presets for bootstrap artifacts, goals, ideas, work-items
   - deep-link continuity between Center and Plan

7. **Canonical mode rename: Run → Jobs**
   - Header mode label becomes **Jobs**
   - canonical docs, pack routing language, screenshots, evidence, and tests use **Jobs**
   - legacy `run` compatibility may remain runtime-only where needed, but **no new UI/tests/evidence** may use `Run` as canonical product language

8. **Deterministic validation harness**
   - `sprint121-validate`
   - first-run journey proof(s)
   - mode-rename checks
   - exceptional-range scorecard for targeted early surfaces

9. **Truth refresh companion deliverables**
   - current sprint evidence + mirror
   - Product Knowledge / Work History review/update/no-change summary
   - IA / navigation truth updated for **Jobs** rename

### 3.2 Strongly preferred momentum additions

1. project-home checklist / readiness bar for first-run setup
2. “why start here?” helper on Center
3. suggested templates based on project type
4. first-run artifact explorer smart presets
5. bulk-promote ideas into initial work-item skeletons
6. lightweight goal grouping / priority visualization
7. screenshot pack for Center / Plan / Jobs rename proof
8. one narrow Concierge assist flow for bootstrap suggestions (without making Concierge the front door)
9. feedback-to-idea conversion shortcut
10. people/stakeholder quick-link chips from goal and idea detail

### 3.3 Explicitly de-scoped or constrained

- no major new Concierge backend program in S121
- no Operate deepening as the sprint center of gravity
- no broad governance redesign
- no new top-level onboarding mode
- no shadow truth for project summary/charter/goals
- no nav sprawl beyond the **Run → Jobs** rename
- no erosion of artifact lineage or first-class goal truth

---

## 4. Non-negotiable invariants

### 4.1 Governance / filesystem
- Work-producing runs must set:
  - `SPRINT_CODE=S121`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence starts with:
  - `make -C ps-dev governance-lock-check`
- Governed project truth writes go under:
  - `project_root/.planestack/**`
- The canonical governed project write target remains:
  - `/Users/mklein/_Ventures/PlaneStack/repos/poc-calculator/.planestack/**`

### 4.2 Center / bootstrap truth
- Center remains the canonical **Project HQ** surface.
- Project summary / charter / scope truth must be artifact-backed or sourced from canonical governed records.
- Goals remain first-class truth, not just embedded prose.
- Bootstrap may guide creation, but it must write canonical records, not only transient UI state.

### 4.3 Ideas / work-item lineage
- Idea promotion to work-item must preserve lineage.
- Work-items created from templates or ideas must still retain source/provenance.
- Acceptance criteria, rationale, and linked goals must remain inspectable.

### 4.4 Mode rename posture
- **Jobs** is the new canonical mode label.
- `Run` becomes non-canonical product language.
- Existing runtime compatibility for older routes/aliases may remain temporarily where necessary, but:
  - no new UI copy,
  - no new tests,
  - no new evidence,
  - no new screenshots,
  - and no new docs for S121 may use `Run` as the canonical label.

### 4.5 Closeout bar
S121 does **not** close unless all are green:

- `sprint121-validate`
- `contract-test-docker`
- `e2e-gate`
- all required artifacts in `S121-evidence.json`
- `lock-check.json`
- first-run bootstrap proof
- goals / ideas / work-item lineage proof
- Jobs rename proof
- targeted early surfaces meet the S121 Exceptional-range thresholds
- no evidence of shadow truth or bootstrap-only transient state replacing canonical records

---

## 5. Canonical IA / routing for S121

### 5.1 Header mode rename
Canonical header modes now include:

- `Center`
- `Plan`
- `Jobs`  ← **renamed from Run**
- `Review`
- `Observe`
- `Operate`
- `Manage`

### 5.2 Rename rule
For S121 planning, development, test, evidence, and truth-refresh work:

- canonical user-facing label = **Jobs**
- canonical documentation language = **Jobs**
- historical `Run` references may be preserved only where needed for compatibility or historical evidence, and should be called out as legacy/non-canonical where surfaced at all.

### 5.3 Focused surfaces targeted for Exceptional-range movement
Primary uplift targets:
- `center/project`
- `center/artifacts`
- `plan/work/overview`
- `plan/work/templates`
- `plan/work/ideas`
- `plan/work/work-items`

Secondary uplift targets:
- `plan/work/people`
- `plan/work/feedback`
- header-mode continuity around **Jobs** rename

---

## 6. Delivery model by repo

### 6.1 ps-contracts
Deliver:
- contract shapes for project bootstrap flows where needed
- goal / idea / work-item lineage response consistency
- IA / route label truth for **Jobs** rename where contract-owned
- any schema support needed for bootstrap scorecards/checklists / exceptional scoring evidence

### 6.2 ps-api
Deliver:
- project bootstrap orchestration endpoints/projections
- Center → Project summary / goals / next-action projections
- ideas → work-item promotion hardening
- template listing / starter flow support
- artifact explorer bootstrap presets / query helpers
- server-side support for **Jobs** rename where route metadata or mode descriptors are projected

### 6.3 ps-web
Deliver:
- exceptional Center → Project experience
- bootstrap flow and empty-state CTAs
- goals UX improvements
- ideas/work-items golden path UX
- templates-as-accelerator UX
- artifact continuity UX
- **Run → Jobs** canonical rename in shell/navigation and affected surfaces

### 6.4 ps-dev
Deliver:
- `sprint121-validate`
- first-run bootstrap smoke
- goals / ideas / work-item lineage smoke
- mode rename smoke/UI checks
- truth-refresh scripts
- closeout evidence checks

### 6.5 poc-calculator
Deliver:
- S121 proof fixtures / mirror outputs
- bootstrap proof artifacts
- idea → work-item lineage proof artifacts
- Jobs rename closeout evidence where project mirror/view artifacts are affected

---

## 7. Gold proof paths

### Proof A — First-run bootstrap value in one sitting
A user lands in a sparse/new project and can:
1. understand project purpose from Center,
2. create or refine scope/charter,
3. create goals,
4. seed starter ideas,
5. create or promote initial work-items,
6. end with a project state that clearly suggests the next planning step.

### Proof B — Goal → idea → work-item lineage
A user can:
1. create or edit a goal,
2. create an idea linked to that goal,
3. promote the idea to a work-item,
4. inspect the resulting lineage and rationale continuity,
5. verify no lineage is lost.

### Proof C — Template-accelerated startup
A user can:
1. choose a template from Center or Plan,
2. seed starter project/work artifacts,
3. inspect template provenance,
4. continue normal planning flows from those seeded records.

### Proof D — Jobs rename continuity
A user sees **Jobs** as the canonical mode label in shell and relevant UX. No new S121-facing proof, screenshot, or acceptance artifact uses `Run` as canonical product language.

---

## 8. Exceptional-range targets

### 8.1 Targeted surfaces
Scored surfaces:
- `center/project`
- `center/artifacts`
- `plan/work/overview`
- `plan/work/templates`
- `plan/work/ideas`
- `plan/work/work-items`

### 8.2 Score dimensions
Each focused surface must be scored across:
- `clarity`
- `actionability`
- `state_trust`
- `lineage_visibility`
- `navigation_continuity`
- `no_dead_end_behavior`
- `first_run_value`
- `operator_confidence`

### 8.3 Thresholds
Use 1.0–5.0 scale.

Required thresholds:
- `center/project`, `plan/work/ideas`, and `plan/work/work-items` must each score **>= 4.0** overall
- `center/artifacts`, `plan/work/overview`, and `plan/work/templates` must each score **>= 3.8** overall
- no focused surface may have any dimension **< 3.0**
- overall focused-surface aggregate must be **>= 3.9**

---

## 9. Validation matrix

Required gates:
- `sprint121-validate`
- `contract-test-docker`
- `e2e-gate`

Required proof artifacts:
- bootstrap proof evidence
- goal → idea → work-item lineage proof evidence
- template startup proof evidence
- Jobs rename proof evidence
- `exceptional-range-scorecard.json`
- `truth-refresh-summary.json`
- `closeout-summary.json`

Regression intent:
- prior sprint umbrellas remain hard-blocking by intent
- if wrapper targets are needed, wrapper names may be introduced without changing the regression bar
- `Run` references in historical evidence may remain historical; S121 only forbids **new canonical usage**

---

## 10. Truth refresh requirements

Required review/update/no-change summary set:
- `PlaneStack-Product-Knowledge.v4.md` or successor
- `WORK-HISTORY.v5.md` or successor
- `PlaneStack-Truth-Index.md` if read order or canonical source posture changes
- `PlaneStack-App-Navigation-Map.md` and/or successor IA docs to reflect **Jobs** rename
- Concierge roadmap/spec only if S121’s bootstrap assist meaningfully changes it
- S121 mirror under `.planestack/sprints/S121/{pack,runlog,evidence,manifest}`

The **Jobs** rename must be reflected in canonical navigation truth if implemented in S121.

---

## 11. Tranche order

Implement in this order:
1. **ps-contracts**
2. **ps-api**
3. **ps-web**
4. **ps-dev/tests**
5. **poc-calculator proof wiring**
6. **truth refresh / mirror / closeout**

First real milestone:
- one end-to-end first-run journey where a user lands in Center, bootstraps project basics, creates a goal, captures an idea, promotes it to a work-item, and sees **Jobs** as the canonical execution mode label.

---

## 12. Success bar

S121 succeeds when:
- a new or sparse project feels guided rather than empty,
- the project home clearly explains what the project is and what to do next,
- goals / ideas / work-items feel like one coherent planning spine,
- templates materially accelerate startup,
- artifact continuity is visible from day one,
- **Jobs** is the canonical mode label without confusing route/UI drift,
- and the front door of PlaneStack moves materially closer to an **Exceptional** first-run experience.

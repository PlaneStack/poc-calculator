# Sprint 122 Pack — Plan Excellence: Requirements → Work-Items → Tasks / Sprints → Component-Aware Planning

**Sprint Code:** S122  
**Status:** Locked for implementation  
**Theme:** Move PlaneStack's **Plan** experience into the **Exceptional** range by turning early project shaping into a coherent, trustworthy, artifact-backed planning loop — deepening **requirements**, **work-items**, **tasks**, **sprints**, **templates**, and **component-aware planning** while preserving continuity from **Center** and forward continuity into **Jobs**, Review, Governance, and Operate.

---

## 1. Sprint intent

Sprint 122 is the direct follow-on to Sprint 121.

Where S121 made the **first-contact and bootstrap journey** strong — Center, project scope, goals, ideas, starter work-items, and the canonical **Jobs** rename — S122 makes **Plan** feel like the place where real project shaping happens.

The user should be able to:

1. start from goals and ideas already created in S121,
2. refine ideas into requirement-grade work-items,
3. break work-items into tasks,
4. assign work into sprints,
5. understand which components of the system are affected,
6. use templates to accelerate repeated planning patterns,
7. see lineage and rationale preserved throughout,
8. and leave Plan in a state where execution in **Jobs** feels like a natural next step rather than a disconnected phase.

Sprint 122 therefore delivers:

- requirement-grade **work-item** depth,
- first-class **tasks** and **sprints** planning,
- **component-aware** planning linkage,
- improved **Plan → Work → Overview** as the planning cockpit,
- planning templates that act as accelerators rather than examples,
- stronger lineage from goal → idea → work-item → task → sprint,
- and continued artifact explorer continuity between Center and Plan.

S122 is the sprint where PlaneStack should start to feel like a serious planning system rather than just a place to capture work.

---

## 2. Strategic alignment posture

S122 is locked to the existing PlaneStack strategy. It must remain aligned with:

- the artifact-native system-of-record posture,
- the Ideate → Promote → Execute → Govern → Write back → Prove → Report loop,
- deterministic local-first validation,
- Center as Project HQ,
- goals as first-class artifacts,
- idea promotion into work-items with preserved lineage,
- shared artifact explorer truth with Plan using presets/deep-links,
- the canonical header mode label **Jobs**,
- and forward continuity into Jobs, Review, Observe, Operate, and Manage.

S122 may deepen planning structure and usability, but it must **not**:

- create shadow planning truth outside canonical artifacts,
- treat tasks or sprints as disposable UI-only state,
- detach component planning from canonical component truth,
- weaken lineage from ideas/goals into work-items,
- or re-open the **Run → Jobs** rename as a new taxonomy debate.

---

## 3. Scope posture

### 3.1 Must-have core for S122

1. **Plan → Work → Overview exceptional uplift**
   - overview acts as a planning cockpit, not a generic dashboard
   - answers: what are we trying to ship, what is ready to plan, what is in the current sprint, what components are affected, what is blocked
   - exposes direct deep-links to work-items, tasks, sprints, templates, people, and feedback

2. **Requirement-grade work-item depth**
   - stronger work-item detail structure
   - acceptance criteria editing / visibility
   - rationale and goal linkage visible in detail and list projections
   - stakeholder / people linkage visible
   - requirement completeness posture visible

3. **Tasks as first-class planning artifacts**
   - create tasks from work-items
   - show parent work-item linkage and inherited rationale where relevant
   - support task status/planning posture distinct from execution status
   - allow task ownership and component linkage

4. **Sprints as first-class planning containers**
   - create/edit sprint truth
   - assign work-items and tasks into sprints
   - show sprint scope / capacity posture (lightweight in S122)
   - make sprint membership visible from work-item and task detail

5. **Component-aware planning**
   - link work-items and tasks to canonical components
   - allow component-based filtering / grouping in Plan
   - make “what part of the system is affected?” obvious from overview, work-item, task, and sprint views

6. **Templates as planning accelerators**
   - templates for work-item structures, task breakdown starters, and sprint setup starters
   - template provenance visible
   - direct “start from template” entry inside Plan

7. **Artifact explorer continuity**
   - Plan continues to rely on shared explorer truth via presets/deep-links
   - planning artifacts are discoverable from both Center and Plan

8. **Deterministic validation harness**
   - `sprint122-validate`
   - requirement/work-item/task/sprint lineage proof(s)
   - component-aware planning proof
   - plan-surface Exceptional-range scorecard
   - Jobs continuity regression checks

9. **Truth refresh companion deliverables**
   - current sprint evidence + mirror
   - Product Knowledge / Work History review/update/no-change summary
   - planning / navigation truth updated if Plan surface semantics materially change

### 3.2 Strongly preferred momentum additions

1. bulk task seeding from work-item template patterns
2. quick “plan next sprint” path from overview
3. requirement completeness/readiness chips on work-items
4. stronger cross-links between people/feedback and work-item refinement
5. component heat-map or grouped planning overview
6. task-to-sprint drag/drop or lightweight reassignment UX
7. template recommendation hints based on work-item type
8. screenshot pack for overview/work-items/tasks/sprints/component proof
9. a lightweight “planning readiness” bar on overview
10. one optional Concierge assist that suggests next planning actions without owning the workflow

### 3.3 Explicitly de-scoped or constrained

- no large new Concierge backend program in S122
- no Jobs backend expansion as the sprint center of gravity
- no broad governance redesign
- no component-management redesign in Admin beyond reuse needed for planning linkage
- no major explorer rewrite
- no shell/nav redesign beyond preserving **Jobs** continuity
- no duplication of canonical planning truth in client-only state

---

## 4. Non-negotiable invariants

### 4.1 Governance / filesystem
- Work-producing runs must set:
  - `SPRINT_CODE=S122`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence starts with:
  - `make -C ps-dev governance-lock-check`
- Governed project truth writes go under:
  - `project_root/.planestack/**`
- The canonical governed project write target remains:
  - `/Users/mklein/_Ventures/PlaneStack/repos/poc-calculator/.planestack/**`

### 4.2 Planning truth posture
- Work-items, tasks, and sprints must remain artifact-backed or canonical server truth; they cannot exist only as transient UI constructs.
- Component linkage in planning must reference canonical component truth; no planning-only component shadow model is allowed.
- Overview is a projection surface, not an independent source of truth.
- Templates may accelerate planning, but applied outputs must become canonical planning records.

### 4.3 Lineage / traceability posture
- Goal → idea → work-item → task → sprint lineage must remain inspectable.
- Requirement rationale and acceptance criteria must survive refinement into downstream planning artifacts where relevant.
- Template provenance must remain inspectable.
- Component linkage must remain visible from the planning artifacts that reference it.

### 4.4 Jobs continuity posture
- **Jobs** remains the canonical user-facing mode label.
- S122 must not reintroduce **Run** in new UI/tests/evidence/screenshots/docs as canonical product language.
- Internal compatibility routes/keys may remain `run` where already present, but no new S122-facing surface may present **Run** as the official label.

### 4.5 Closeout bar
S122 does **not** close unless all are green:

- `sprint122-validate`
- `contract-test-docker`
- `e2e-gate`
- all required artifacts in `S122-evidence.json`
- `lock-check.json`
- requirement/work-item/task/sprint planning proof
- component-aware planning proof
- template-driven planning proof
- plan-surface Exceptional-range thresholds met
- no evidence of shadow planning truth replacing canonical records

---

## 5. Canonical IA / routing focus for S122

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
- `plan/work/overview`
- `plan/work/work-items`
- `plan/work/tasks`
- `plan/work/sprints`
- `plan/work/templates`

Secondary uplift / important continuity targets:
- `plan/work/ideas`
- `plan/work/people`
- `plan/work/feedback`
- `center/artifacts` (deep-link continuity only)
- `jobs/*` continuity checks only (regression, not core sprint center)

### 5.3 Canonical route families to deepen in S122
Representative canonical route families / API areas to support:
- `GET /plan/work/overview`
- `GET /plan/work/work-items`
- `GET /plan/work/work-items/:workItemId`
- `POST /plan/work/work-items`
- `POST /plan/work/work-items/:workItemId:break_down`
- `GET /plan/work/tasks`
- `POST /plan/work/tasks`
- `GET /plan/work/sprints`
- `POST /plan/work/sprints`
- `POST /plan/work/sprints/:sprintId:assign`
- `GET /plan/work/templates`
- `POST /plan/work/templates/:templateKey:apply`
- component filter/query support where needed for planning views

Exact final route/posture may use existing PlaneStack conventions, but new S122 work must preserve the Plan-first, artifact-backed, canonical-only posture.

---

## 6. Planned product behavior

### 6.1 Overview as planning cockpit
`plan/work/overview` should answer, at a glance:
- what are the top goals and linked work-items?
- which ideas are ready to promote/refine?
- which work-items are ready to break down?
- which tasks exist and where do they belong?
- what is in the active/next sprint?
- what components are affected?
- what is blocked or missing for planning readiness?

### 6.2 Work-items as requirement-grade planning truth
Work-item detail should support:
- title / summary / rationale
- linked goals / linked idea source
- acceptance criteria
- stakeholder / people links
- component links
- breakdown into tasks
- sprint assignment visibility
- provenance / template source if created from template

### 6.3 Tasks as actionable planning units
Tasks should be lighter than work-items, but still canonical planning truth:
- parent linkage to work-item
- optional component linkage
- assignee / owner
- sprint membership
- visible inherited context from the parent work-item

### 6.4 Sprints as planning containers
Sprints should support:
- scope / name / timeframe
- assigned work-items and tasks
- lightweight planning status / readiness
- component-aware view of sprint contents

### 6.5 Templates as force multipliers
Templates should help the user create:
- work-item structures
- common task breakdown patterns
- sprint setup scaffolds

Template selection can be simple in S122, but apply must create canonical planning truth directly.

### 6.6 Component-aware planning
Component-aware planning must:
- reference canonical component truth
- make component impact visible in lists/details/overview
- avoid introducing a new planning-only component taxonomy

---

## 7. Required proof paths

### Proof A — Work-item refinement to task/sprint planning
Required path:
1. start from a goal-linked work-item
2. refine acceptance criteria / rationale
3. break the work-item into at least two tasks
4. assign at least one task and/or the parent work-item into a sprint
5. verify linkage remains visible across work-item, task, sprint, and overview

### Proof B — Component-aware planning
Required path:
1. link a work-item and one derived task to a canonical component
2. verify the component is visible from detail views
3. verify overview / list filtering or grouping can show the affected component path
4. verify no planning-only component shadow truth was introduced

### Proof C — Template-driven planning acceleration
Required path:
1. select a planning template from Plan
2. apply it to create canonical planning records
3. verify provenance/template source visibility on resulting artifacts
4. verify Center/Plan artifact continuity reflects the materialized records

### Proof D — Jobs continuity regression proof
Required path:
1. confirm header still shows **Jobs**
2. confirm S122 planning work did not reintroduce **Run** as canonical product language in new UI/tests/evidence/screenshots
3. confirm planning-to-Jobs handoff language uses **Jobs** canonically

---

## 8. Exceptional-range scoring bar

Hard-bar scored surfaces:
- `plan/work/overview`
- `plan/work/work-items`
- `plan/work/tasks`
- `plan/work/sprints`
- `plan/work/templates`

Scored dimensions:
- clarity
- actionability
- lineage_trust
- planning_continuity
- component_visibility
- navigation_continuity
- no_dead_end_behavior

Thresholds:
- `plan/work/overview`, `plan/work/work-items`, `plan/work/tasks`, `plan/work/sprints` must each score **>= 4.0 overall**
- `plan/work/templates` must score **>= 3.8 overall**
- no scored surface may have any dimension **< 3.0**
- aggregate across hard-bar scored surfaces must be **>= 3.95**

---

## 9. Repo-shaped deliverables

### ps-contracts
- route/schema updates for planning detail, tasks, sprints, template apply, and component-aware planning fields
- any lineage/provenance schema additions required for work-item/task/sprint relationships
- preserve Jobs canonical product language in user-facing docs/examples where surfaced

### ps-api
- planning projections for overview
- work-item/task/sprint CRUD/refinement logic as needed
- work-item breakdown helpers
- template application handlers
- component-aware planning filters/projections
- preserve canonical artifact lineage and avoid planning shadow truth

### ps-web
- exceptional-level uplift for overview/work-items/tasks/sprints/templates surfaces
- richer detail views and planning actions
- component-aware list/detail/group/filter views
- Jobs continuity regression protection

### ps-dev
- `sprint122-validate`
- Proof A/B/C/D harnesses
- scorecard generation
- truth-refresh scripts
- closeout evidence checks

### poc-calculator
- proof fixtures and resulting planning artifacts
- S122 sprint mirror / evidence outputs
- canonical component-linked planning examples

---

## 10. Validation and closeout sequence

Minimum closeout sequence:
1. `make -C ps-dev governance-lock-check`
2. `make -C ps-dev sprint122-validate`
3. `make -C ps-dev contract-test-docker`
4. `make -C ps-dev e2e-gate`
5. verify `S122-evidence.json` completeness
6. write mirror under `.planestack/sprints/S122/*`
7. archive pack/runlog/evidence/manifest
8. close out only after plan-surface score thresholds are met

---

## 11. Success bar

S122 is successful if:
- a user can move from goals/ideas into requirement-grade work-items,
- break work into tasks,
- place work into sprints,
- understand which components are affected,
- use templates to accelerate planning,
- trust overview as a planning cockpit,
- and carry that plan forward into **Jobs** without confusion or broken lineage.

S122 should make PlaneStack feel exceptional not just at project entry, but in the next real step: turning intent into a credible, structured plan.

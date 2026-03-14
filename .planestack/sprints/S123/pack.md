# Sprint 123 Pack — Jobs Excellence: Plan-to-Execution Continuity + Run Detail + Workflow Trust

**Sprint Code:** S123  
**Status:** Locked for implementation  
**Theme:** Move PlaneStack's **Jobs** experience into the **Exceptional** range by turning execution into a coherent, trustworthy, artifact-backed continuation of planning — deepening **plan → Jobs launch continuity**, **run detail**, **workflow trust**, **retry lineage**, **reason-code clarity**, and **output/evidence handoff** while preserving the user-facing **Jobs** label as canonical.

---

## 1. Sprint intent

Sprint 123 is the direct follow-on to Sprint 122.

Where S122 made **Plan** feel like the place where real project shaping happens — requirement-grade work-items, first-class tasks, first-class sprints, templates, and component-aware planning — S123 makes **Jobs** feel like the place where real execution happens.

The user should be able to:

1. launch or create a Job from planning truth,
2. carry forward work-item / task / sprint / component context into execution,
3. understand why a run exists and what it is doing,
4. inspect a run with clear inputs, outputs, reason codes, actor, timestamps, and lineage,
5. distinguish execution truth from evidence/proof truth,
6. trust workflow state and retry behavior,
7. move from Plan into Jobs without terminology or context loss,
8. and leave Jobs ready for Review/Governance rather than feeling like execution is a disconnected silo.

Sprint 123 therefore delivers:

- strong **Plan → Jobs** continuity,
- an excellent **Jobs → runs** surface,
- run detail as an execution cockpit,
- meaningful **Jobs → workflows** depth,
- retry and run-lineage trust,
- component-aware execution continuity,
- explicit output/evidence handoff,
- and full preservation of the canonical **Jobs** label in user-facing surfaces.

S123 is the sprint where PlaneStack should start to feel like a serious execution system rather than only a planning system.

---

## 2. Strategic alignment posture

S123 is locked to the existing PlaneStack strategy. It must remain aligned with:

- the artifact-native system-of-record posture,
- the Ideate → Promote → Execute → Govern → Write back → Prove → Report loop,
- deterministic local-first validation,
- the canonical user-facing mode label **Jobs**,
- distinct treatment of **executions** and **evidence**,
- shared truth continuity from Center and Plan into Jobs,
- and forward continuity into Review, Observe, Operate, and Manage.

S123 may deepen execution structure and usability, but it must **not**:

- collapse execution truth into evidence truth,
- treat Jobs as a second governance plane,
- re-open the **Run → Jobs** rename as a taxonomy debate,
- create client-only execution state that displaces canonical server/artifact truth,
- or skip reason-code / retry / workflow explainability in favor of a prettier shell.

---

## 3. Scope posture

### 3.1 Must-have core for S123

1. **Plan → Jobs launch continuity**
   - launch/create a Job from work-item, task, or sprint context
   - preserve source refs, goal/work-item/task/sprint lineage, component refs, and rationale context
   - show “why this ran” clearly in Job detail

2. **Jobs → runs exceptional uplift**
   - excellent run index for daily-driver use
   - filtering/sorting by status, reason code, source artifact, sprint, component, actor
   - clear empty states and next actions
   - visible retry posture and output/evidence handoff

3. **Run detail as execution cockpit**
   - structured run detail with inputs, outputs, status, actor, timestamps, reason codes, and lineage
   - retry lineage visible and understandable
   - explicit links to resulting artifacts/evidence
   - visual clarity around “what ran” vs “what it proves”

4. **Workflow trust**
   - workflow list/detail becomes meaningful
   - workflow-to-run relationship visible
   - launch/resume/retry state visible and deterministic
   - workflow status explanation not left to inference

5. **Component-aware execution continuity**
   - jobs/runs can be filtered/grouped by component
   - run detail shows linked components carried from Plan
   - path from component-affected planning work into execution is visible

6. **Jobs label continuity and transition trust**
   - no new user-facing `Run` labels in UI/tests/evidence/docs
   - at least one real deep link / transition from Plan into Jobs
   - Jobs copy consistent in navigation, page headers, actions, and state copy

7. **Deterministic validation harness**
   - `sprint123-validate`
   - Plan → Jobs execution proof(s)
   - run detail / retry / workflow trust proof(s)
   - Jobs-surface Exceptional-range scorecard
   - evidence handoff / reason-code continuity proof(s)

8. **Truth refresh companion deliverables**
   - current sprint evidence + mirror
   - Product Knowledge / Work History review/update/no-change summary
   - navigation truth updated if Jobs execution semantics materially change

### 3.2 Strongly preferred momentum additions

1. launch-run CTA directly from sprint detail and work-item detail
2. richer run filters (source artifact, component, actor, retry status)
3. clearer “latest retry / previous attempt” chips in run index
4. workflow detail timeline or structured state history
5. output bundle summary on run detail
6. lightweight run comparison (last attempt vs current)
7. component-grouped Jobs list view
8. screenshot pack for Jobs/runs/workflows/retry/evidence handoff
9. optional Concierge assist that explains next execution actions without owning the flow
10. explicit “review next” CTA from successful run detail

### 3.3 Explicitly de-scoped or constrained

- no broad governance redesign in S123
- no major Operate/runbook expansion as the sprint center of gravity
- no deep Concierge backend program in S123
- no broad analytics/reporting expansion beyond execution continuity needed for Jobs trust
- no shell/nav redesign beyond preserving **Jobs** continuity
- no collapsing of evidence/proof into run detail as if they are the same object

---

## 4. Non-negotiable invariants

### 4.1 Governance / filesystem
- Work-producing runs must set:
  - `SPRINT_CODE=S123`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence starts with:
  - `make -C ps-dev governance-lock-check`
- Governed project truth writes go under:
  - `project_root/.planestack/**`
- The canonical governed project write target remains:
  - `/Users/mklein/_Ventures/PlaneStack/repos/poc-calculator/.planestack/**`

### 4.2 Execution truth posture
- Jobs/runs/workflows must remain canonical server/artifact truth; they cannot exist only as transient UI state.
- Run detail is a projection surface over canonical execution truth, not an independent source of truth.
- Retry lineage must remain inspectable and deterministic.
- Output/evidence links must point to canonical resulting truth, not UI-local placeholders.

### 4.3 Execution vs evidence posture
- A run is **not** the same thing as its evidence.
- Jobs surfaces must make clear:
  - what executed,
  - what outputs were produced,
  - and what evidence/proof artifacts exist.
- S123 must not blur these concepts in route design, copy, or UI rendering.

### 4.4 Jobs continuity posture
- **Jobs** remains the canonical user-facing mode label.
- S123 must not reintroduce **Run** in new UI/tests/evidence/screenshots/docs as canonical product language.
- Internal compatibility routes/keys may remain `run` where already present, but no new S123-facing surface may present **Run** as the official label.

### 4.5 Closeout bar
S123 does **not** close unless all are green:

- `sprint123-validate`
- `contract-test-docker`
- `e2e-gate`
- all required artifacts in `S123-evidence.json`
- `lock-check.json`
- Plan → Jobs continuity proof
- run detail / retry / workflow trust proof
- output/evidence handoff proof
- Jobs-surface Exceptional-range thresholds met
- no evidence of execution/evidence truth collapse

---

## 5. Canonical IA / routing focus for S123

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
- `jobs/runs`
- `jobs/workflows`
- run detail
- workflow detail

Secondary uplift / important continuity targets:
- `plan/work/overview` (handoff continuity only)
- `plan/work/work-items` (launch continuity only)
- `plan/work/tasks` (launch continuity only)
- `plan/work/sprints` (launch continuity only)
- `review/*` continuity only (next-step handoff, not core sprint center)

### 5.3 Canonical route families to deepen in S123
Representative canonical route families / API areas to support:
- `GET /jobs/runs`
- `GET /jobs/runs/:runId`
- `POST /jobs/runs`
- `POST /jobs/runs/:runId:retry`
- `GET /jobs/workflows`
- `GET /jobs/workflows/:workflowId`
- Plan-origin launch routes or canonical Plan-backed launch entry points as needed
- output / evidence link projection support where needed for run detail
- component/source-artifact filters where needed for Jobs views

Exact final route/posture may use existing PlaneStack conventions, but new S123 work must preserve Jobs-first user language and canonical-only posture.

---

## 6. Planned product behavior

### 6.1 Plan → Jobs continuity
A user should be able to launch or create a Job from planning truth and retain context:
- source work-item/task/sprint refs
- goal lineage where relevant
- component refs
- rationale/acceptance context where relevant
- visible explanation on the resulting run detail about why this run exists

### 6.2 Runs as execution index
`jobs/runs` should answer, at a glance:
- what is currently running?
- what recently completed or failed?
- what was retried and why?
- what source planning item caused this job?
- what components are affected?
- what outputs exist?
- what evidence exists?

### 6.3 Run detail as execution cockpit
Run detail should support:
- status / actor / timing
- source planning context
- inputs / outputs
- reason codes
- retry lineage / previous attempt visibility
- linked components
- links to evidence and resulting artifacts
- next-step CTA toward Review when relevant

### 6.4 Workflow trust
Workflow detail should support:
- current workflow state
- relationship to produced runs
- last/active attempt visibility
- deterministic launch/resume/retry explanation
- explicit state copy that avoids ambiguity

### 6.5 Output / evidence handoff
Run detail should distinguish:
- produced outputs
- generated artifacts
- proof/evidence links
- review next steps

This handoff should feel intentional and trustworthy, not incidental.

---

## 7. Repo-by-repo delta expectations

### 7.1 `ps-contracts`
- add/confirm Jobs/runs/workflows route coverage
- strengthen run detail / retry / output/evidence response shapes
- preserve Jobs user-language posture in contract notes where relevant
- add filters for source artifact / sprint / component / actor / retry lineage if needed

### 7.2 `ps-api`
- implement canonical Jobs list/detail/retry/workflow handlers or strengthen them where already present
- add/strengthen Plan-origin execution launch continuity
- expose run detail projection with reason codes, source refs, components, outputs, and evidence links
- expose workflow detail projection with state explanation and linked runs
- keep execution and evidence truth distinct in projections

### 7.3 `ps-web`
- lift Jobs → runs UI into daily-driver quality
- render run detail as execution cockpit
- lift Jobs → workflows UI into trustworthy detail/list surfaces
- add Plan → Jobs transitions / deep links
- preserve canonical Jobs terminology throughout

### 7.4 `ps-dev`
- add S123 proof harnesses and validation targets
- add regression protection for Jobs continuity
- add output/evidence handoff validation
- update closeout checks for S123-specific proof paths and scorecard

### 7.5 `poc-calculator`
- add S123 fixtures for Plan-origin execution flows
- emit Jobs/runs/workflow proof evidence and screenshots
- write S123 mirror artifacts and closeout evidence

---

## 8. Required proof targets

### Proof A — Plan → Jobs continuity
Required:
- launch or create a Job from a planning artifact (task or sprint preferred)
- resulting run captures source planning context
- Jobs detail clearly explains why this run exists
- at least one deep link/transition from Plan into Jobs works

### Proof B — Run detail / retry trust
Required:
- run exists with visible inputs/outputs/reason codes/source refs
- retry creates visible lineage
- run detail clearly differentiates latest attempt vs prior attempt
- run list and detail remain coherent after retry

### Proof C — Workflow trust + output/evidence handoff
Required:
- workflow detail is inspectable
- linked produced run(s) visible
- output and evidence links visible from run/workflow context
- distinction between execution truth and evidence truth is obvious

### Proof D — Jobs continuity regression
Required:
- header shows **Jobs**
- Jobs labels remain canonical in UI/tests/evidence/screenshots/docs
- no new S123-facing canonical label uses **Run**
- at least one Plan-to-Jobs transition remains visible and trustworthy

---

## 9. Validation and closeout

Required validation/gates:
- `make -C ps-dev governance-lock-check`
- `make -C ps-dev sprint123-validate`
- `make -C ps-dev contract-test-docker`
- `make -C ps-dev e2e-gate`

Required evidence outputs:
- `lock-check.json`
- `S123-evidence.json`
- `S123-runlog.md`
- `manifest.json`
- Jobs Exceptional-range scorecard
- screenshots demonstrating runs/workflows/detail/retry/evidence handoff
- Plan → Jobs continuity proof evidence

Closeout may not claim completion if Jobs copy is inconsistent or if execution/evidence truth are blurred in proof surfaces.

---

## 10. Success bar

Sprint 123 is successful when:

1. a user can move naturally from Plan into Jobs without losing context,
2. `jobs/runs` feels trustworthy enough for daily use,
3. run detail explains execution clearly,
4. workflow state feels deterministic rather than mysterious,
5. retry lineage is obvious and useful,
6. output/evidence handoff is explicit,
7. the **Jobs** rename feels complete in execution-facing product language,
8. and the product is ready for the next logical step: **Review/Governance excellence**.

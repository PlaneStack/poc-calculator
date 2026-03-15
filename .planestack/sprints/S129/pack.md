# Sprint 129 Pack

**Sprint:** S129  
**Theme:** Jobs Excellence II: Runs + Workflows Trust and Structural Readiness  
**Status:** Planned / Development Pack  
**Date:** 2026-03-14

## 1. Sprint intent

Sprint 129 is a **direct Jobs-focused follow-on**. It exists because Jobs remains one of the last major user-journey areas that is still strong in concept but uneven in product maturity.

Where prior work made Plan stronger, then deepened Jobs execution continuity, then strengthened Review/Governance and Operate, S129 returns to the **Jobs mode** to finish the job at the **plane/surface level**:
- make `jobs > runs` feel exceptional for daily execution work
- make `jobs > workflows` feel like a real operational surface rather than a secondary detail page
- strengthen retry / attempt lineage and workflow state trust
- improve Jobs-to-Review and Jobs-to-Operate continuity without turning S129 into another governance or operate sprint
- improve structural readiness for Jobs to behave like a richer mode, even if taxonomy stays stable in S129

This sprint is **not** a taxonomy churn sprint. It does not require a new top-level mode or a canonical plane split. Instead, it pushes the existing Jobs experience to a quality level where:
- users can trust runs and workflows as first-class execution truth
- retry / relaunch / resume behavior is legible and auditable
- workflow-to-run relationships are obvious
- outputs, runtime artifacts, and evidence stay clearly separated
- Jobs is no longer one of the weakest parts of the end-to-end journey

## 2. Why S129 now

The recent sequence has improved the product journey in order:
- first contact / bootstrap
- planning depth
- initial Jobs depth
- governance / review trust
- operate mission control
- observe trust
- manage reliability
- review-plane excellence

The remaining user-journey gap is that **Jobs still needs more direct excellence work**, especially around:
- workflow usability and trust
- retry lineage clarity
- queue/launch posture
- cross-linking from Plan into Jobs and from Jobs into Review/Operate
- clearer execution-object model inside the Jobs experience itself

S129 therefore improves Jobs directly instead of treating it as a side effect of another sprint.

## 3. Canonical IA scope

### Mode
- `jobs`

### Plane
- `runs`

### In-scope surfaces
- `runs`
- `workflows`

### Secondary continuity surfaces
- `plan/work/work-items`
- `plan/work/tasks`
- `plan/work/sprints`
- `review/reviews/release-candidate`
- `review/governance/approvals`
- `operate/overview`
- `operate/sessions`

### Hard continuity rules
1. `Jobs` remains the canonical user-facing label; do not reintroduce `Run` as product copy.
2. `runs` and `workflows` remain execution truth, not evidence truth.
3. retries create new execution attempts; they do not silently mutate history in place.
4. workflow detail must project from canonical server truth, not UI-assembled shadow state.
5. output/result truth stays separate from evidence/proof truth.
6. Jobs may link strongly into Review and Operate, but S129 does not move governance or operate authority into Jobs.

## 4. Sprint goals

1. Make **runs** feel exceptional:
   - trustworthy run index
   - better queue/running/waiting/failed/completed visibility
   - strong retry lineage
   - clear source context from Plan
   - clear next-step CTA toward Review or Operate where relevant

2. Make **workflows** feel real:
   - meaningful workflow list/detail
   - visible workflow state model
   - clear relationship to produced runs
   - readable workflow launch/resume/retry posture

3. Improve execution trust:
   - reason-code clarity
   - attempt comparison
   - explicit separation of outputs, runtime artifacts, and evidence links
   - deterministic empty/no-data handling

4. Improve Jobs continuity:
   - Plan -> Jobs launch continuity
   - Jobs -> Review continuity
   - Jobs -> Operate continuity where execution transitions into local operational context

## 5. In-scope deliverables

### A. Runs excellence
- stronger `jobs/runs` list projection
- filter/sort/group improvements
- clearer run summary chips for:
  - source type
  - component
  - sprint
  - status
  - retry posture
  - latest attempt
- explicit queue/running/waiting/failed/completed treatment
- no dead-end empty state behavior

### B. Run detail excellence
- run detail as execution cockpit
- required sections:
  - launch/source context
  - execution status and reason codes
  - attempt lineage
  - workflow relationship
  - outputs
  - runtime artifacts
  - evidence links
  - review / operate next actions
- output/evidence separation must be visually explicit
- one-click navigation back to originating Plan truth where available

### C. Workflow trust
- workflow list/detail projections
- workflow state explanation
- workflow-to-run relationship list or embedded recent runs
- workflow retry/resume trust
- deterministic empty/no-data behavior for workflows with no produced runs yet

### D. Retry / attempt lineage trust
- every retry creates a new execution attempt
- previous/current/latest attempt clarity
- attempt comparison view or structured comparison payload
- retry reason codes visible in both list and detail where relevant

### E. Continuity tranche
- Plan -> Jobs deep link continuity
- Jobs -> Review CTA continuity
- Jobs -> Operate CTA continuity when local operation is the valid next stage
- preserve component, sprint, and source refs through all continuity hops

### F. Exceptional-range uplift targets
Primary hard-bar surfaces:
- `jobs/runs`
- run detail
- `jobs/workflows`
- workflow detail

Secondary continuity surfaces:
- `plan/work/tasks`
- `plan/work/work-items`
- `review/reviews/release-candidate`
- `operate/overview`

## 6. Non-goals

- no new top-level mode or mode rename
- no required canonical plane split in S129
- no broad governance redesign
- no Observe redesign
- no Operate architecture rewrite
- no collapse of outputs, runtime artifacts, and evidence into one mixed payload
- no multi-user conversation/comments system in Jobs

## 7. Repo-by-repo deltas

### ps-contracts
- additive OpenAPI/routes for:
  - runs list/detail/query refinement
  - workflow list/detail/query refinement
  - retry lineage detail/compare route support
  - explicit output/runtime_artifact/evidence payload separation
  - next-action CTA fields
- schema updates for:
  - run status / workflow status
  - attempt lineage fields
  - workflow-to-run projection shape
  - no-data state handling

### ps-api
- server-backed projections for:
  - runs list/detail
  - workflow list/detail
  - attempt lineage detail/compare
- stronger source-context carry-forward from Plan
- clearer retry creation + lineage maintenance
- workflow state/relationship projection support
- explicit review_next / operate_next projection fields
- deterministic no-data behavior

### ps-web
- better Jobs list/detail rendering
- workflow trust UI
- attempt comparison / lineage chips
- output vs runtime artifacts vs evidence sectioning
- strong CTA treatment into Review / Operate
- preserved back-navigation into Plan source truth
- no new `Run` labels in user-facing copy

### ps-dev
- `sprint129-validate`
- `s129-jobs-smoke.sh`
- `s129-workflows-ui-smoke.sh`
- `s129-retry-lineage-smoke.sh`
- `s129-truth-refresh.sh`
- `s129-write-validate-summary.sh`
- `s129-closeout-evidence-check.sh`
- deterministic fixtures for:
  - plan task launch into Jobs
  - workflow producing at least one run
  - failed run -> retry -> success lineage
  - Jobs -> Review CTA path
  - Jobs -> Operate CTA path

### poc-calculator
- S129 proof fixtures and S129 evidence outputs only
- no unrelated historical drift folded into closeout

## 8. Canonical proof paths

### Proof A — Plan task to Jobs run trust
1. Start from a planned task
2. Launch a Job from task context
3. Confirm run detail shows source task, work-item, sprint, component, and rationale context
4. Confirm Jobs label continuity and Plan return path

### Proof B — Workflow trust
1. Open a workflow with produced runs
2. Confirm workflow detail shows status, recent runs, and state explanation
3. Confirm at least one produced run is drill-through accessible
4. Confirm empty/no-data behavior is explicit when filtered to no produced runs

### Proof C — Retry lineage trust
1. Create or use a deterministic failed run
2. Retry it
3. Confirm new attempt record is created
4. Confirm previous/current/latest attempt clarity
5. Confirm retry reason code and compare payload are visible

### Proof D — Jobs continuity
1. Start from a run detail with valid next-stage links
2. Confirm review CTA deep-links into Review truth
3. Confirm operate CTA deep-links into Operate truth when appropriate
4. Confirm Jobs remains canonical in all user-facing labels/tests/evidence/screenshots

## 9. Validation and gates

Required green gates:
- `sprint129-validate`
- `contract-test-docker`
- `e2e-gate`

Required proof artifacts:
- Proof A through D in `S129-evidence.json`
- Jobs-surface exceptional-range scorecard
- lock-check evidence
- no-data-state proof coverage
- output/runtime_artifact/evidence separation proof

## 10. Exceptional-range score targets

Focused surfaces and thresholds:
- `jobs/runs` >= **4.2** overall
- run detail >= **4.3** overall
- `jobs/workflows` >= **4.0** overall
- workflow detail >= **4.1** overall
- no focused surface may have any dimension below **3.2**
- aggregate focused-surface score >= **4.15**

Scored dimensions:
- clarity
- actionability
- state_trust
- lineage_continuity
- navigation_continuity
- no_dead_end_behavior
- evidence_separation
- retry_or_resume_trust

## 11. Truth refresh requirements

Mandatory review/update targets if S129 lands materially as designed:
- `PlaneStack-App-Navigation-Map.md`
- `PlaneStack-Navigation-IA-v2-Developer-Instructions.md`
- `navigation-menu-ia-current.md`
- `PlaneStack-Truth-Index.md` if taxonomy/route posture wording changes
- `PlaneStack-Product-Knowledge.v4.md` or successor
- `WORK-HISTORY.v5.md` or successor
- S129 mirror under `.planestack/sprints/S129/{pack,runlog,evidence,manifest}`

## 12. Success bar

S129 succeeds when:
- Jobs no longer feels like a thin execution page attached to the side of the product
- workflows are understandable and trustworthy
- retry lineage is explicit and auditable
- outputs, runtime artifacts, and evidence are never conflated
- Plan, Review, and Operate continuity through Jobs is real
- the `runs` plane moves materially closer to Exceptional

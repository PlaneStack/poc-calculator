# Sprint 128 Pack

**Sprint:** S128  
**Theme:** Reviews Excellence: Release-Candidate + Shared Review Trust  
**Status:** Planned / Development Pack  
**Date:** 2026-03-14

## 1. Sprint intent

Sprint 128 targets the next remaining lower-scored plane after the recent journey hardening and the Observe/Manage follow-on packs:
- `review > reviews`

This sprint is **not** another governance-foundation sprint. Governance already has strong semantic depth from the Jobs-to-Approval continuity work. S128 is the **productization sprint for the `reviews` plane** so that release-candidate, queue, and shared review flows feel like trustworthy, daily-driver destinations rather than thin supporting surfaces.

## 2. Why S128 now

The PlaneStack journey has already deepened in sequence:
- first-run / bootstrap
- planning
- jobs / execution
- governance / approvals / blocked / decisions
- operate
- observe
- manage

At the **plane** level, the next remaining underbuilt area is `review > reviews`, especially:
- `release-candidate`
- `queue`
- `shared`

S124 strengthened **governance**. S128 now makes **reviews** feel exceptional by improving:
- release-candidate trust
- queue clarity and prioritization
- shared review collaboration continuity
- explicit separation of outputs, evidence, decisions, and activation posture
- drill-through back to Jobs, Governance, Observe, and Operate source truth

## 3. Canonical IA scope

### Mode
- `review`

### Plane
- `reviews`

### In-scope surfaces
- `release-candidate`
- `queue`
- `shared`

### Hard continuity rules
1. `review > governance` remains the authority for approvals, blocked states, decisions, roles, and policy.
2. `review > reviews` must **project from canonical Jobs / Governance / Observe truth**; no shadow review state.
3. Approval remains distinct from activation.
4. Outputs remain distinct from evidence.
5. Canonical user-facing taxonomy stays `Jobs` and `Review`; no reintroduction of `Run` labels.
6. Review queue and release-candidate detail must preserve source refs and return paths.

## 4. Sprint goals

1. Make **release-candidate** a trustworthy decision surface:
   - clear source jobs / outputs / evidence / approvals / activation state
   - clear next step toward activation, observe, or operate

2. Make **queue** operationally useful:
   - meaningful queue states and prioritization
   - blocked / approval / activation posture visible at a glance
   - deterministic no-data and filtered-empty behavior

3. Make **shared** feel like a real collaboration surface:
   - review bundles of related items
   - preserved source context
   - clear ownership / audience / share posture where allowed

4. Improve cross-plane continuity:
   - Jobs -> release-candidate / queue
   - Governance -> reviews
   - Observe -> reviews for forensic drill-through
   - Reviews -> Operate for activation/operational readiness handoff

## 5. In-scope deliverables

### A. Release-candidate excellence
- release-candidate list/detail projections
- clear source linkage:
  - source run refs
  - output refs
  - evidence refs
  - approval refs
  - blocked refs
  - decision refs
- explicit activation posture:
  - not required / pending / ready / activated / failed
- obvious next-action CTA
- preserved output vs evidence separation in detail views

### B. Queue excellence
- queue list/detail with:
  - queue status
  - urgency/priority posture
  - blocked reason class
  - approval-needed visibility
  - activation-needed visibility
  - source deep links
- deterministic empty / filtered-empty states
- filter and grouping support for:
  - status
  - source plane
  - component
  - sprint
  - policy / approval context

### C. Shared review excellence
- shared review bundles / panels that:
  - group related release-candidates or queue entries
  - preserve source refs and lineage
  - allow read-capable users to inspect context without mutating authority
  - make “who needs to look at this” obvious

### D. Exceptional-range uplift targets
Hard focus surfaces:
- `review/reviews/release-candidate`
- `review/reviews/queue`
- `review/reviews/shared`

Secondary continuity surfaces:
- `review/governance/approvals`
- `review/governance/blocked`
- Jobs run detail review CTA linkage
- Operate overview activation/readiness handoff linkage

## 6. Non-goals

- no new top-level modes or planes
- no second approval or decision system outside governance
- no broad Observe analytics redesign
- no Operate architecture expansion
- no shadow review DB replacing canonical projections
- no multi-user comment system or full discussion threads in S128
- no taxonomy churn beyond current canonical labels

## 7. Repo-by-repo deltas

### ps-contracts
- additive OpenAPI/routes for:
  - release-candidate list/detail
  - queue list/detail
  - shared review list/detail
  - filter/group/sort params
  - review CTA / linkage fields
- schema updates for:
  - release-candidate status/activation posture
  - queue status / blocked class / priority posture
  - shared review bundle shape
  - output refs vs evidence refs separation

### ps-api
- server-backed projections for:
  - release-candidate detail
  - queue list/detail
  - shared review list/detail
- consistent linkage to:
  - Jobs runs/workflows
  - governance approvals/blocked/decisions
  - Observe source truth
  - Operate activation/readiness targets
- deterministic no-data behavior
- stable deep-link and return-path context support

### ps-web
- strong reviews plane rendering for:
  - release-candidate
  - queue
  - shared
- visible next actions and statuses
- zero dead-end empty states on focus surfaces
- explicit output/evidence separation in detail panels
- deep-link continuity in and out of Reviews

### ps-dev
- `sprint128-validate`
- `s128-release-candidate-smoke.sh`
- `s128-reviews-ui-smoke.sh`
- `s128-truth-refresh.sh`
- `s128-write-validate-summary.sh`
- `s128-closeout-evidence-check.sh`
- deterministic fixtures for:
  - approval granted but activation pending
  - blocked-by-policy queue entry
  - release-candidate with outputs and evidence
  - shared review bundle with preserved source refs

### poc-calculator
- S128 proof fixtures and S128 evidence outputs only
- no unrelated historical drift folded into closeout

## 8. Canonical proof paths

### Proof A — Jobs to release-candidate continuity
1. Start from a completed Job/run with review linkage
2. Open linked release-candidate detail
3. Confirm visible source job context, outputs, evidence, approvals, and decisions
4. Confirm output refs and evidence refs are shown separately
5. Confirm a clear next review/activation action exists

### Proof B — Queue trust and blocked clarity
1. Open `review > reviews > queue`
2. Inspect one blocked queue entry
3. See blocked class, queue status, approval context, and next action
4. Drill into the relevant governance detail
5. Return to queue with context preserved

### Proof C — Shared review continuity
1. Open `review > reviews > shared`
2. Inspect one shared review bundle
3. Confirm grouped related items preserve source refs and lineage
4. Open a linked release-candidate or queue entry
5. Confirm return path back to shared context remains clear

### Proof D — Review to Operate / Observe continuity
1. Start from release-candidate or queue detail
2. Follow one Observe-oriented drill-through for evidence/forensics **or** one Operate-oriented deep link for activation/readiness follow-on
3. Confirm context preservation
4. Confirm no duplicate shadow state is introduced in Reviews

## 9. Validation / closeout bar

Required:
- `sprint128-validate`: PASS
- `contract-test-docker`: PASS
- `e2e-gate`: PASS
- all required proof paths A-D green
- S128 truth refresh complete
- mirror written under `.planestack/sprints/S128/*`

Required evidence artifacts:
- `S128-runlog.md`
- `S128-evidence.json`
- `manifest.json`
- `s128-closeout-summary.json`
- screenshots README
- exceptional-range scorecard

## 10. Exceptional-range score target

Focused hard-bar surfaces:
- `review/reviews/release-candidate`
- `review/reviews/queue`
- `review/reviews/shared`

Thresholds:
- each focused surface overall score **>= 4.0**
- no focused-surface dimension **< 3.2**
- aggregate across focused surfaces **>= 4.1**

Scored dimensions:
- clarity
- actionability
- policy trust
- source continuity
- output/evidence separation
- no-dead-end behavior
- navigation continuity

## 11. Truth refresh requirements

Required review/update targets:
- `PlaneStack-App-Navigation-Map.md`
- `PlaneStack-Navigation-IA-v2-Developer-Instructions.md`
- `navigation-menu-ia-current.md`
- `PlaneStack-Truth-Index.md` if taxonomy/route posture wording changes
- `PlaneStack-Product-Knowledge.v4.md` or successor
- `WORK-HISTORY.v5.md` or successor
- S128 mirror under `.planestack/sprints/S128/{pack,runlog,evidence,manifest}`

Roadmap/spec refresh is **mandatory** if S128 materially deepens the operational meaning of `review > reviews`.

## 12. Tranche plan

1. **ps-contracts**
   - routes, enums, linkage schemas, release-candidate/queue/shared projections
2. **ps-api**
   - projection routes, deep-link context, no-data handling, source truth reconciliation
3. **ps-web**
   - release-candidate / queue / shared UI, drill-throughs, next actions
4. **ps-dev/tests**
   - deterministic proof fixtures, smoke/UI scripts, validate wrapper
5. **poc-calculator**
   - S128 proof wiring and evidence only
6. **truth refresh / mirror / closeout**

## 13. Risks to manage

- accidental duplication of governance truth inside reviews projections
- confusing output and evidence in the same detail panel
- weak queue semantics that feel cosmetic instead of actionable
- shallow shared-review UI without preserved lineage
- context loss on drill-throughs between Jobs, Reviews, Observe, and Operate
- historical drift contamination in `poc-calculator` closeout

## 14. Success bar

S128 succeeds if:
- the `reviews` plane no longer feels like a thin companion to governance
- release-candidate and queue become trustworthy daily-driver review destinations
- shared review becomes useful without inventing a second decision system
- Jobs -> Review and Review -> Observe/Operate continuity are explicit and reliable
- outputs, evidence, approvals, decisions, and activation state are understandable at a glance

# Sprint 126 Pack — Observe Excellence: Analytics & Reporting + Library Trust with Chronicle Continuity

**Sprint Code:** S126  
**Status:** Locked for implementation  
**Theme:** Move PlaneStack's **Observe** plane family materially toward the **Exceptional** range by deepening the weakest remaining observe planes — **analytics_reporting** and **library** — while using **chronicle** as the strong continuity anchor for trustworthy, cross-artifact reporting.

---

## 1. Why Sprint 126 now

Sprint 126 is selected from the **plane-level scorecard**, not from a broad mode-level intuition.

After the current arc:
- `center` was materially lifted in S121,
- `work` was materially lifted in S122,
- `runs` is the execution-depth target of S123,
- `governance` / `reviews` are the review-depth targets of S124,
- `operate` is the most likely plane to cross into **Exceptional** in S125,

…the next largest remaining product gap is the **Observe** family, especially:
- `analytics_reporting` (largest remaining plane-level gap),
- `library` (useful but not yet buyer/operator-grade),
- with `chronicle` already relatively strong and therefore best used as the trusted continuity anchor.

S126 therefore focuses on the final stage of the PlaneStack power loop:
**Report**.

The goal is not to create a second truth system. The goal is to make Observe feel like the trusted place where a user can answer:
- what happened across this project,
- what trends matter,
- which outputs/proofs/reviews/runs/sprints matter most,
- what is incomplete or risky,
- and where to navigate next.

---

## 2. Strategic alignment posture

S126 is locked to the existing PlaneStack spine:
- artifact-native system of record,
- server-backed cross-artifact reporting,
- no duplication of artifact-level truth,
- no UI-computed “analytics truth” as the canonical source,
- no collapse of runs / outputs / evidence / approvals into one undifferentiated feed,
- canonical Observe plane family: `analytics_reporting`, `chronicle`, `library`.

S126 must remain aligned with these rules:
1. **Analytics & Reporting** remains the cross-artifact reporting destination.
2. **Chronicle** remains the project-memory / timeline / trust-history destination.
3. **Library** remains the durable browse/search/archive destination.
4. Any overlapping metric must share one server-side source-of-truth endpoint.
5. Observe may summarize and link, but it must not invent shadow truth that competes with Center, Work, Jobs, Review, or Operate.

---

## 3. Scope posture

### 3.1 Must-have core for S126

1. **Analytics & Reporting uplift**
   - excellent `observe/analytics_reporting/overview`
   - cross-artifact rollups that matter to a project operator / buyer / internal lead
   - trustworthy filters and drill-down links
   - exportable summary snapshot shape where appropriate

2. **Library trust uplift**
   - excellent `observe/library/overview`
   - excellent `observe/library/browse`
   - stronger sprint/conversation/library continuity
   - obvious route from artifact families into the right detail pages or sprint records

3. **Chronicle continuity (selective uplift, not a full Chronicle sprint)**
   - improve Observe-wide continuity using Chronicle as a trust anchor
   - no second event model
   - no duplicate timeline truth

4. **Execution → Review → Operate → Observe continuity**
   - runs / governance / operate artifacts and summaries can be seen in Observe coherently
   - outputs remain distinct from evidence
   - approval/decision timing, run failure trends, and operate incident/runbook posture can be summarized without flattening their local semantics

5. **Plane-level Exceptional push**
   - `analytics_reporting` must move materially closer to Exceptional
   - `library` must move from “useful” toward “daily-driver trustworthy”
   - `chronicle` should gain targeted continuity/value without becoming the only observe experience

### 3.2 Strongly preferred additions

- saved filters / saved report presets
- project/sprint/component drill-down presets
- “no data” UX that never renders blank charts/cards
- drill-through from analytics cards into library browse / chronicle query / run detail / approval detail / operate incident detail

### 3.3 Explicit non-goals

S126 does **not**:
- redesign the global shell,
- create a new top-level Observe taxonomy,
- make Chronicle the universal analytics plane,
- add a second metrics/event truth source,
- expand Concierge architecture,
- deepen Operate runtime semantics,
- or broaden AI-management scope.

---

## 4. Primary plane targets and score intent

### 4.1 analytics_reporting
Current score basis: materially below the strongest planes.

S126 target outcomes:
- cross-artifact insight becomes trustworthy and useful,
- charts/cards are server-backed and explainable,
- filters are genuinely useful,
- navigation from insight → source truth is obvious,
- and the plane no longer feels like a V1 shell.

### 4.2 library
S126 target outcomes:
- browse and overview become meaningfully useful,
- sprint/conversation/archive material becomes easier to navigate,
- artifact families relevant to the recent sprint arc are obvious,
- drill-through from analytics/chronicle into library is coherent.

### 4.3 chronicle
S126 target outcomes:
- selective continuity improvements only,
- stronger handoff between chronicle, analytics, and library,
- retained trust posture as the project-memory plane.

---

## 5. Core deliverables

### 5.1 Analytics & Reporting overview becomes a real destination
Required surfaces:
- key summary cards
- trend charts
- breakdowns by sprint / component / artifact family / status / reason class
- explicit “view source truth” drill-down paths

At minimum, S126 should support trustworthy rollups for:
- run success/failure and retry posture,
- approval latency / governance throughput,
- blocked reason distribution,
- operate readiness / incidents / runbook usage,
- artifact activity by family,
- recent sprint completeness / evidence posture.

### 5.2 Library overview + browse become operationally useful
Required surfaces:
- library overview summary
- browse with filters/sorts/grouping
- obvious access to sprints and conversations
- continuity with canonical artifact families produced by the recent sprint arc

### 5.3 Chronicle continuity uplift
Required surfaces:
- chronicle overview / timeline / query continuity improved where necessary for Observe-wide navigation
- drill-through from chronicle events into analytics and library
- no duplicate metric ownership

### 5.4 Cross-plane drill-through
The following drill-throughs should be treated as required:
- Analytics → source run / workflow / governance / operate / sprint / artifact browse
- Chronicle → analytics filter state and/or library browse
- Library → source artifact detail / sprint artifact / conversation artifact / related truth page

---

## 6. Data model / contract posture

S126 should treat Observe as **projection-heavy but server-backed**.

The authoritative truth remains in the source domains:
- `work.*`
- `run.*`
- `gov.*`
- `operate.*`
- `evidence.*`
- Chronicle event/history truth

Observe endpoints should expose:
- summary projections,
- rollups,
- filtered lists,
- drill-through references,
- chart/series payloads,
- and export-safe summary shapes.

Observe should not create a competing shadow object model for runs, approvals, incidents, or evidence.

---

## 7. Gold proof paths

### Proof A — analytics trust
A user opens Analytics & Reporting overview and can see at least one server-backed rollup for:
- recent run outcomes,
- recent governance approvals/blocked reasons,
- and recent operate readiness/incidents,
with drill-through to the correct underlying source truth.

### Proof B — library trust
A user opens Library overview/browse, filters to the recent sprint / artifact family, finds relevant records, and can navigate to the correct underlying sprint/artifact/conversation truth without broken lineage.

### Proof C — chronicle continuity
A user starts from Chronicle timeline/query, follows a trustworthy path into analytics or library, and the source/ref continuity is preserved.

### Proof D — no-duplication / no-data trust
Observe surfaces show explicit “no data” states where appropriate, do not render blank/ambiguous shells, and do not conflict with the same metric shown elsewhere under a different server source.

---

## 8. Validation posture

S126 closes only if all of the following are true:
- `sprint126-validate` PASS
- `contract-test-docker` PASS
- `e2e-gate` PASS
- proof A–D PASS
- truth refresh artifacts written
- Observe scorecard written
- no stray historical sprint drift pulled into S126 provenance

---

## 9. Repo-by-repo expected deltas

### ps-contracts
- Observe analytics/reporting endpoint coverage
- Library browse/overview endpoint coverage if new
- Chronicle/Observe projection contract updates
- schema additions for rollups, charts, drill-through links, and export payloads

### ps-api
- analytics reporting rollup endpoints
- library overview/browse projection endpoints
- chronicle cross-link projection helpers
- server-backed filter/group/sort support
- stable no-data payloads

### ps-web
- analytics overview rendering
- charts/cards/filtering/drill-through
- library overview/browse UX
- chronicle continuity UX
- Observe-specific test ids and empty states

### ps-dev
- S126 smoke + UI smoke + truth refresh + validate-summary + closeout scripts
- deterministic seed expectations for Observe surfaces
- chart/no-data proof harnesses

### poc-calculator
- S126 proof artifacts
- Observe-facing truth refresh artifacts
- clean sprint mirror + evidence outputs

---

## 10. Success bar

S126 is successful if:
- `analytics_reporting` no longer feels like a thin shell,
- `library` becomes a trustworthy browsing/reporting companion rather than a passive archive corner,
- `chronicle` remains strong while integrating more cleanly with the other Observe planes,
- and Observe as a plane family materially closes the gap toward the strongest planes in PlaneStack.

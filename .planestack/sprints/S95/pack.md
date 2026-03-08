# PlaneStack — Sprint 95 Pack
**Sprint:** 95  
**Theme:** Operate v2 — Objectives/SLO‑lite + Escalation Policy + Chronicle Event Hooks + Shared Metrics SOT + Compare/Export (Strong)  
**Status:** Plan (locked for implementation)  
**Date:** 2026-03-07

## Intent
Sprint 95 advances PlaneStack toward an **enterprise‑grade operational posture** without touching deployments/pipelines:

1) **Operate Objectives (SLO‑lite):** explicit, governed objectives per environment/service/check with evaluated status and reason codes  
2) **Escalation Policy:** deterministic, policy-driven escalation from Operate failures into Incidents (beyond “3 strikes”)  
3) **Chronicle event hooks:** Operate runs and escalations become first-class chronicle events  
4) **Shared Metrics SOT:** one canonical server-side metrics layer powers Chronicle/Observe charts and any overlapping Center/Operate cards  
5) **Compare + Export:** evidence-grade compare of latest PASS vs FAIL and JSON export of run/objective state

You requested **all of the above as REQUIRED**, plus an additional REQUIRED tranche. This pack includes **Tranche 5: Canon + AI Brief**, ensuring the new operational substrate is discoverable and usable for future AI sessions.

**Pre-deployment posture:** local-first; no CI/CD pipelines, no deployments. Monitoring/alerting remain link + summarized evidence only.

---

## Navigation placement (locked)
Operate remains a top-level mode.
Add Operate surfaces (v2):
- overview
- execution
- history
- objectives
- monitoring
- alerting
- incidents
- runbooks
- settings

Route family:
- `/ou/:ouKey/p/:projectKey/plane/operate/:surface`

Chronicle remains under Observe. Do not duplicate Chronicle UI—link into it.

---

## Locked decisions (Sprint 95)
1) **All scope items in this pack are MUST** (no optional carve-outs).
2) **No duplicate aggregation paths.** Any metric shown in multiple places must come from one canonical server-side metrics provider.
3) **Objectives and escalation are governed artifacts.** No hardcoded thresholds.
4) **Escalation is deterministic and evidence-backed.** No silent incident creation.
5) **Compare selection rule:** latest PASS vs latest FAIL for same (env_key, check_key); insufficient_data is not an error.
6) **Export is evidence-grade:** JSON-first; includes dataset hash, filters, generated_at, and references to source evidence artifacts.
7) **Operate remains Strong** (all 7 rubric capabilities) and must pass sprint95-validate.
8) **External boundary remains strict:** no `.planestack/**` leakage; Operate is internal-only by default.

---

## Canonical governed artifacts (v2)
These are authoritative and versioned under `.planestack/governance/operate/**`:

1) **Objectives**
- `.planestack/governance/operate/objectives.json`
Schema-lite keys:
- env_key, check_key, objective_key
- window (e.g., last_n_runs or duration)
- thresholds (pass_rate_min, max_consecutive_failures)
- severity mapping
- owner
- runbook_ids[]
- enabled (bool)

2) **Escalation policy**
- `.planestack/governance/operate/escalation-policy.json`
Schema-lite keys:
- env_key, check_key
- trigger rules (consecutive_failures, duration_fail_minutes optional)
- incident category/subtype/severity/surface
- append vs create rule
- acknowledgement requirements (if any)

3) **Metrics ownership registry**
- `.planestack/governance/metrics/ownership.json`
Defines which subsystem owns which metric families (operate, chronicle, parity, rc, incidents).
This prevents “parallel aggregation” drift.

---

## Metrics SOT (server-side, locked)
Implement a single canonical metrics endpoint for project-scoped metrics used in Chronicle/Operate UI:

- `GET /api/v1/ou/:ouKey/p/:projectKey/metrics`
Query params (v1):
- `family=operate|chronicle|rc|parity|incidents`
- `range=Sxx-Syy` or `date_from/date_to` (optional)
- `env_key` (optional)
- `check_key` (optional)

Output: JSON with:
- `generated_at`
- `family`
- `series[]` (named time series) and `totals`
- `source_refs` (artifact IDs/paths used)

Lock: Chronicle charts and Operate objective panels must use this endpoint (no client-side aggregation).

---

## Evidence outputs (Sprint 95 — locked)
All under:
- `.planestack/governance/evidence/s95/**`

Required:
- `operate/objectives-eval.json` (objective evaluation results + reason codes)
- `operate/escalation-evidence.json` (what triggered, what incident created/appended, evidence refs)
- `operate/run-compare.json` (latest PASS vs FAIL diff; or insufficient_data)
- `operate/export.json` (export bundle metadata + dataset hash + refs)
- `metrics/metrics-sot.json` (proof that UI/Chronicle uses shared metrics endpoint)
- `chronicle/operate-events.json` (operate_run_completed, objective_breached, incident_opened/closed)
- `canon/refs.json` (new canon references for objectives/escalation/metrics)
- `ai-brief-operate.md` + `ai-brief-operate.json` (deterministic brief; see Tranche 5)
- `ui-smoke.json`
- `archive.json`

---

## Tranche plan (ALL required)

### Tranche 1 — ps-contracts + ps-api: Objectives, Escalation, Metrics SOT, Chronicle hooks
**Deliverables**
1) OpenAPI:
- metrics endpoint
- any new operate endpoints needed for objective status display and export invocation (if not already present)

2) ps-api:
- objective evaluation engine (deterministic)
- escalation engine (deterministic, evidence-backed)
- chronicle event emission for operate runs + escalation outcomes
- metrics provider that reads only authoritative sources (operate runs index + incident records + chronicle events)

**Acceptance**
- Contract tests validate metrics endpoint schema and objective evaluation output schema.

---

### Tranche 2 — ps-dev: Seeds + validate harness + evidence writing
**Deliverables**
- Seed objectives.json and escalation-policy.json (governed artifacts)
- Seed metrics ownership registry
- Add `make -C ps-dev sprint95-validate` (locked order):
  1) contract tests
  2) operate-seed
  3) operate-run (local, CHECK=all)
  4) objectives-eval
  5) escalation test scenario (controlled failure)
  6) metrics SOT contract
  7) operate compare + export
  8) UI smoke
  9) governance-grade-domains (operate Strong)

**Acceptance**
- sprint95-validate PASS end-to-end, writes required evidence under s95.

---

### Tranche 3 — ps-web: Operate UI v2 (Objectives, History compare, Export)
**Deliverables**
- New Operate/ Objectives surface:
  - list objectives, status (met/at-risk/breached), reason codes, links to evidence
- History surface enhanced:
  - compare button for a check (opens compare view)
- Export button:
  - exports JSON with dataset hash and refs; stores evidence artifact

**Lock**
- All charts/cards must source numbers from metrics endpoint.

**Acceptance**
- Playwright UI smoke proves objectives render + compare view renders + export writes evidence.

---

### Tranche 4 — Chronicle/Observe integration (no duplication)
**Deliverables**
- Chronicle ingestion of operate events
- Chronicle/Observe charts and Operate/Overview cards must both use shared metrics endpoint
- Add a metrics ownership lint target (fails if duplicate aggregation detected in known chart code paths)

**Acceptance**
- charts smoke uses shared metrics and passes.

---

### Tranche 5 — Canon + AI Brief (required)
This tranche ensures the new operational knowledge is “fishable” by future AI sessions and humans.

**Deliverables**
1) Update Canon Index refs (S83 spine):
- add refs to objectives.json, escalation-policy.json, metrics ownership registry
- add retrieval drill question(s) about Operate objectives/escalation and where to find them

2) `chronicle:generate_brief` for topic=operate
- deterministic stub provider for gate
- outputs:
  - `.planestack/governance/evidence/s95/ai-brief-operate.md`
  - `.planestack/governance/evidence/s95/ai-brief-operate.json`
- includes citations to artifacts and run evidence

**Acceptance**
- Brief generation works deterministically and is archived.

---

## Validation commands (Sprint 95)
Required:
- `make -C ps-dev contract-test-docker`
- `make -C ps-dev e2e-gate`
- `make -C ps-dev sprint95-validate`
- `make -C ps-dev governance-grade-domains`

---

## Definition of Done (Sprint 95)
1) Objectives + escalation + metrics SOT + chronicle hooks implemented and used by UI.
2) Compare and export exist and produce evidence-grade outputs.
3) Canon updated and AI brief generation works for Operate topic.
4) Operate domain remains Strong and sprint95-validate passes.
5) Sprint 95 archived with screenshots and tags.

---

## Closeout checklist (Sprint 95)
1) Archive: `library:archive_pack`
2) Screenshots:
- project-management/planestack-s95-pack/screenshots/s95-library-sprints-latest.png
- project-management/planestack-s95-pack/screenshots/s95-pack-provenance.png
- project-management/planestack-s95-pack/screenshots/s95-operate-objectives.png
- project-management/planestack-s95-pack/screenshots/s95-operate-compare.png
- project-management/planestack-s95-pack/screenshots/s95-chronicle-operate-events.png
3) Tags:
- sprint95-pass-YYYY-MM-DD
- sprint95-evidence-YYYY-MM-DD

# Sprint 113 Pack — AI Management v2: Adoption, Explainability, and Release Control

**Sprint Code:** S113  
**Status:** Implementation complete, closeout in progress  
**Theme:** Make **AI Management** authoritative across existing AI consumers by completing mandatory adoption, effective configuration explainability, provider operations, unified run/policy/cost explainability, eval-gated promotion/rollback, and systemic no-bypass enforcement.

---

## 1. Sprint intent

Sprint 113 is explicitly an **AI Management maturation** sprint.

S112 established the AI Management control-plane backbone. S113 must now make that backbone **authoritative, understandable, and operationally excellent** across real product surfaces.

This sprint exists to move AI Management from "implemented" toward **Exceptional** by proving five things:

1. real AI consumers are routed through AI Management instead of bypassing it
2. operators can see **what configuration won** and **why**
3. provider connections are managed as live operational integrations, not just catalog entries
4. releases of templates/models/config can be **evaluated, promoted, and rolled back** safely
5. run, policy, cache, approval, and cost behavior can be explained from one operator view

S113 is therefore **not** another broad foundation sprint, and it is **not** a Concierge expansion sprint.

---

## 2. Scope tightening (must-have vs intentionally narrowed)

### 2.1 Must-have core for S113
S113 must fully complete these maturity moves:
1. **Authoritative adoption of Codegen**
2. **Authoritative adoption of AI Assistance / Assistant Drawer**
3. **Systemic no-bypass enforcement for all known AI callers**
4. **Effective configuration / inheritance explainability**
5. **Provider operations / health / validation visibility**
6. **Unified run + policy + cost explainability**
7. **Eval-gated promotion and rollback**
8. **Minimum operational incident protections**

### 2.2 Still in-scope, but minimum complete slices
These remain in scope only as complete minimum slices:
- one **optional** third adopter **only if** the mandatory deliverables above are already complete and stable
- lightweight exports **only if** naturally produced by the new explainability/accounting views
- `agents` remains config/policy/read-only unless required to support deny-reason explainability for tool allowlists

### 2.3 Explicitly de-scoped or constrained
To keep S113 focused on adoption and excellence rather than scope expansion:
- no broader Concierge productization
- no semantic caching
- no unconstrained agents or multi-step agent execution
- no full chargeback/reporting program
- no local-LLM architecture expansion as a headline scope
- no new AI plane sprawl outside `ai-management`

---

## 3. Non-negotiable invariants

### 3.1 Governance / filesystem
- Work-producing runs must set:
  - `SPRINT_CODE=S113`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence starts with:
  - `make -C ps-dev governance-lock-check`
- Governed/project truth writes go under:
  - `project_root/.planestack/**`
- OU defaults remain **outside** the project repo mirror and must stay in the control plane’s OU-scoped governed artifact model.
- The canonical governed project write target remains:
  - `/Users/mklein/_Ventures/PlaneStack/repos/poc-calculator/.planestack/**`
- Pack folder copies are working copies only.

### 3.2 AI Management authority
- AI Management remains the **single canonical AI control plane**.
- No parallel AI control surfaces under Admin.
- Existing AI consumers may not bypass governed routing, template selection, policy evaluation, or ledger attribution.
- AI Assistance, Codegen, and any migrated adopter must resolve through AI Management for provider/model/template/policy/budget/quota decisions.

### 3.3 Execution / evidence model
All materially executed AI actions must continue to use the PlaneStack execution spine:
- `command`
- `processor`
- `run`
- `evidence`

### 3.4 Safety model
- `approve` remains distinct from `activate`
- policy outcomes that require `approval_required`, `stage_required`, or `hitl_required` must reuse the normal governance queue / approval flow
- no AI-only side-channel approval path
- redaction and disclosure remain **most restrictive wins**

### 3.5 Validation / closeout bar
S113 does **not** close unless all are green:
- `sprint113-validate`
- `contract-test-docker`
- `e2e-gate`
- all required artifacts in `S113-evidence.json`
- `lock-check.json`

---

## 4. Canonical IA / routing for S113

### 4.1 Plane placement
S113 continues to use the dedicated top-level plane:
- **Mode:** `manage`
- **Plane:** `ai-management`

Canonical UI route family:
- `/ou/:ouKey/p/:projectKey/plane/ai-management/:surface`

### 4.2 Surface posture
S113 should **prefer strengthening the existing surfaces** rather than proliferating new top-level surfaces.

Required minimum surfaces remain:
- `overview`
- `providers`
- `models`
- `templates`
- `policies`
- `quotas`
- `budgets`
- `ledger`
- `runs`
- `cache`
- `evals`
- `incidents`
- `codegen`
- `agents`

Additional operator views such as **effective configuration**, **adoption inventory**, **release control**, and **deny/explainability drill-downs** should land as:
- existing-surface tabs
- drawers
- detail pages
- or contextual cards

Do **not** introduce broad new IA unless a single `adoption` surface is absolutely necessary.

### 4.3 Canonical API family
All S113 APIs live under:
- `/api/v1/ou/:ouKey/p/:projectKey/ai/...`

Use canonical S112 route names and do not expose compatibility aliases in the UI.

---

## 5. Governed files introduced or extended by S113

S113 should prefer **extending S112 governed files** instead of creating unnecessary new registries.

### 5.1 Existing governed files S113 must extend or operationalize
- `.planestack/governance/ai/provider-connections.json`
- `.planestack/governance/ai/subsystem-routing.json`
- `.planestack/governance/ai/templates.json`
- `.planestack/governance/ai/policies.json`
- `.planestack/governance/ai/quotas.json`
- `.planestack/governance/ai/budgets.json`
- `.planestack/governance/ai/cache-policies.json`
- `.planestack/governance/ai/eval-suites.json`
- `.planestack/governance/ai/redaction-policies.json`
- `.planestack/governance/ai/incident-rules.json`
- `.planestack/governance/ai/adoption-inventory.json`
- `.planestack/governance/ai/tool-allowlist.json` *(read-only / deny-reason support only unless tiny scope forces more)*

### 5.2 New governed files allowed in S113
Only add these if needed to keep S113 explicit and auditable:
- `.planestack/governance/ai/release-controls.json`
- `.planestack/governance/ai/adoption-enforcement.json`

### 5.3 OU-scoped governed truth
OU defaults do **not** live in the project repo mirror. S113 must expose and explain them through the control plane, but must not flatten them into project-scoped files.

### 5.4 Notes
- `adoption-inventory.json` remains the catalog of known AI consumers and migration state.
- `adoption-enforcement.json` (if used) defines which consumers are **mandatory governed consumers** and what checks must fail closeout if they bypass.
- `release-controls.json` (if used) governs eval thresholds, promotion rules, rollback eligibility, and required evidence references.

---

## 6. Required adoption / inheritance posture

### 6.1 Mandatory adopters in S113
S113 is not complete unless **both** are fully governed through AI Management:
1. `codegen`
2. `ai_assistance`

Optional third adopter:
- only if mandatory adopters and no-bypass checks are already complete and stable
- must be narrow, concrete, and evidence-backed

### 6.2 No-bypass rule
All known AI callers must be classified as one of:
- `governed`
- `migrating`
- `blocked`
- `not_in_scope_with_explicit_reason`

Unclassified or hidden callers are not allowed.

### 6.3 Effective resolution precedence
Resolution remains:
- subsystem override > project override > OU default > server default

For allow/deny, redaction, quotas, and budgets:
- **most restrictive applicable rule wins**

### 6.4 Explainability requirement
Every resolved provider/model/template/policy/config decision shown in S113 must be explainable with:
- resolved value
- source scope
- source artifact
- source version / revision
- resolution trace
- restrictive rule wins explanation where applicable

---

## 7. Contract locks for S113

### 7.1 Effective configuration explainability
S113 must expose resolved configuration for at least:
- provider selection
- model selection
- template binding
- policy decision basis
- quota/budget source
- redaction source
- cache policy source
- fail-open / fail-closed mode
- retry posture
- maintenance / disabled provider posture

### 7.2 Provider operations fields
`provider-connections.json` and related APIs/UI must expose, at minimum:
- `provider_key`
- `connection_key`
- `secret_ref`
- `base_url`
- `region`
- `residency`
- `disabled`
- `maintenance_mode`
- `fallback_rank`
- `last_validated_at`
- `last_validation_status`
- `last_validation_reason`
- `retry_policy_key`
- `failure_mode` (`fail_closed` or `fail_open` where permitted by policy)

### 7.3 Release control minimum
Promotion / rollback must be governed and evidence-backed.

Support, at minimum:
- `compare`
- `evaluate`
- `promote_preview`
- `promote_execute`
- `rollback_preview`
- `rollback_execute`

Promotion to active must not occur without:
- an eval scorecard or explicit bypass reason
- policy + role authorization
- required approval/stage gates where applicable
- evidence written to sprint closeout artifacts

### 7.4 Incident minimum operational protections
S113 incidents must be operationally useful at minimum through:
- retry policy visibility
- maintenance / disabled posture visibility
- fail-open / fail-closed visibility
- budget/quota denial drill-down
- provider validation failure drill-down

### 7.5 AI Assistance adoption lock
For the migrated AI Assistance slice, S113 must prove:
- provider/model/template routing resolves through AI Management
- `Apply` remains role/policy gated
- provenance/lineage is retained
- runs are ledgered
- blocked-path behavior is explainable

### 7.6 Cache posture
S113 keeps the S112 cache contract:
- exact rendered-prompt cache only
- no semantic cache

### 7.7 Idempotency
All mutating S113 AI endpoints require `Idempotency-Key` with a 15-minute replay window.

---

## 8. Epic breakdown

## EPIC 113.1 — Mandatory governed adoption
### Goal
Make AI Management the actual operating layer for existing AI consumers, not just the intended one.

### Deliverables
- `codegen` fully governed through AI Management
- `ai_assistance` fully governed through AI Management
- adoption inventory refreshed with current state
- no-bypass classification for all known AI callers
- explicit migration status and evidence for each mandatory adopter
- optional third adopter only if mandatory work is already complete and green

### Required tests
- codegen governed-path proof
- AI Assistance governed-path proof
- no-bypass checks for all known callers
- regression tests ensuring old direct paths do not silently succeed

---

## EPIC 113.2 — Effective configuration / inheritance explainability
### Goal
Make operators able to answer "what won and why" without reading raw files or source.

### Deliverables
- effective config resolver endpoint(s)
- UI resolution trace for provider/model/template/policy/budget/quota/redaction/cache
- scope/source/version cards or detail views
- diff before activate where config changes affect live behavior
- restrictive-rule-wins explanation text

### Required tests
- effective resolution correctness tests
- inheritance precedence tests
- explainability payload tests
- UI smoke for effective config views

---

## EPIC 113.3 — Provider operations and health
### Goal
Operate real provider integrations with enterprise visibility.

### Deliverables
- provider validation history
- connection health/status history
- last validated / last failed detail
- maintenance / disabled / fallback posture views
- residency/region visibility
- retry policy and failure-mode visibility

### Required tests
- validation history tests
- provider health rollup tests
- maintenance-mode visibility tests
- fail-open / fail-closed explainability tests

---

## EPIC 113.4 — Unified run / policy / cost explainability
### Goal
Give operators one place to understand what happened, why, and what it cost.

### Deliverables
- unified run detail view
- routing decision detail
- policy decision detail
- rendered prompt/version detail
- cache hit/miss detail
- token/cost breakdown
- approval/stage linkage when blocked
- replay/compare entry points from the same operator flow

### Required tests
- run explainability payload tests
- policy/cost attribution tests
- blocked-path drill-down tests
- replay/compare entry smoke tests

---

## EPIC 113.5 — Eval-gated promotion and rollback
### Goal
Turn AI Management into a safe release-control plane rather than a static registry.

### Deliverables
- governed eval scorecards for at least `codegen` and `ai_assistance`
- compare view across template/model/provider candidates
- promotion preview / execute flow
- rollback preview / execute flow
- promotion evidence bundle
- rollback evidence bundle

### Required tests
- eval scorecard generation tests
- promotion gating tests
- rollback tests
- approval/stage interaction tests where applicable

---

## EPIC 113.6 — Systemic no-bypass enforcement and incident drill-down
### Goal
Make governance and operations hard to evade and easy to inspect.

### Deliverables
- no-bypass CI/closeout checks
- governed-vs-ungoverned caller report
- visible adoption inventory UI/report
- incident drill-down for:
  - budget/quota denial
  - provider validation failure
  - disabled/maintenance provider
  - retry / failure mode context

### Required tests
- no-bypass failure tests
- adoption inventory/report tests
- incident drill-down tests
- validation summary coverage tests

---

## 9. APIs to implement or normalize

### 9.1 Adoption / effective config
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/adoption`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/effective-config`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/effective-config:preview`

### 9.2 Provider operations
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/provider-connections`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/provider-connections/:connectionKey/history`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/provider-connections/:connectionKey:validate`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/providers/health`

### 9.3 Run / policy / cost explainability
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/runs`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/runs/:runId`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/runs/:runId/explain`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/policy-decisions:preview`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/ledger`

### 9.4 Release control
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/evals`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/evals/scorecards`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/evals/:suiteKey:run`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/templates/:templateKey:promote-preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/templates/:templateKey:promote-execute`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/templates/:templateKey:rollback-preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/templates/:templateKey:rollback-execute`

### 9.5 Incidents / no-bypass
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/incidents`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/incidents/:incidentId`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/no-bypass-report`

All mutating endpoints require `Idempotency-Key` with a 15-minute replay window.

---

## 10. UI test contract

Required `data-testid` minimum set:
- `ai-mgmt-surface-overview`
- `ai-mgmt-surface-providers`
- `ai-mgmt-surface-models`
- `ai-mgmt-surface-templates`
- `ai-mgmt-surface-policies`
- `ai-mgmt-surface-quotas`
- `ai-mgmt-surface-budgets`
- `ai-mgmt-surface-ledger`
- `ai-mgmt-surface-runs`
- `ai-mgmt-surface-cache`
- `ai-mgmt-surface-evals`
- `ai-mgmt-surface-incidents`
- `ai-mgmt-surface-codegen`
- `ai-mgmt-surface-agents`
- `ai-mgmt-adoption-row-<consumerKey>`
- `ai-mgmt-effective-config-view`
- `ai-mgmt-resolution-trace`
- `ai-mgmt-provider-health-row-<providerKey>`
- `ai-mgmt-provider-history-<connectionKey>`
- `ai-mgmt-run-explain-<runId>`
- `ai-mgmt-policy-cost-panel-<runId>`
- `ai-mgmt-promotion-preview-<templateKey>`
- `ai-mgmt-rollback-preview-<templateKey>`
- `ai-mgmt-no-bypass-report`
- `ai-mgmt-incident-drilldown-<incidentId>`

---

## 11. Gold proof bundle

S113 must prove AI Management is the mandatory operating layer for real existing AI surfaces.

Minimum required proof:
1. `codegen` resolves provider/model/template/policy/budget/quota through governed AI Management config
2. `ai_assistance` resolves provider/model/template/policy/budget/quota through governed AI Management config
3. one blocked path is provable with operator drill-down
4. effective config explains **why** the chosen path won
5. provider validation / health history is provable
6. run + policy + cost explainability is provable from one operator flow
7. eval scorecard is provable for the promoted candidate
8. promotion preview/execute is provable
9. rollback preview/execute is provable
10. no-bypass report is provable and green for mandatory adopters

Preferred proof project target:
- `poc-calculator`

Mandatory governed consumers:
- `codegen`
- `ai_assistance`

---

## 12. Required evidence artifacts

### Adoption / no-bypass
- `.planestack/governance/evidence/s113/ai/adoption-inventory.json`
- `.planestack/governance/evidence/s113/ai/no-bypass-report.json`
- `.planestack/governance/evidence/s113/ai/codegen-adoption-proof.json`
- `.planestack/governance/evidence/s113/ai/ai-assistance-adoption-proof.json`

### Explainability / provider ops
- `.planestack/governance/evidence/s113/ai/effective-config-resolution.json`
- `.planestack/governance/evidence/s113/ai/effective-config-diff.json`
- `.planestack/governance/evidence/s113/ai/provider-health-report.json`
- `.planestack/governance/evidence/s113/ai/provider-validation-history.json`

### Run / policy / cost / incidents
- `.planestack/governance/evidence/s113/ai/run-explainability.json`
- `.planestack/governance/evidence/s113/ai/policy-cost-explainability.json`
- `.planestack/governance/evidence/s113/ai/blocked-flow-drilldown.json`
- `.planestack/governance/evidence/s113/ai/incidents-ops-proof.json`

### Release control
- `.planestack/governance/evidence/s113/ai/eval-scorecard.json`
- `.planestack/governance/evidence/s113/ai/promotion-proof.json`
- `.planestack/governance/evidence/s113/ai/rollback-proof.json`
- `.planestack/governance/evidence/s113/ai/release-controls.json`

### UI / sprint control
- `.planestack/governance/evidence/s113/ai/ui-smoke.json`
- `.planestack/governance/evidence/s113/lock-check.json`
- `.planestack/governance/evidence/s113/sprint113-validate.json`
- `.planestack/governance/evidence/s113/archive.json`
- `.planestack/governance/evidence/s113/closeout-summary.json`

Blocked-flow schema remains the standard split:
- `validation_400`
- `authz_403_404`
- `policy_blocked`

---

## 13. Validation composition

### Required commands
- `make -C ps-dev sprint113-validate`
- `make -C ps-dev contract-test-docker`
- `make -C ps-dev e2e-gate`

### Pattern
Keep `sprint113-validate` sprint-scoped and deterministic. Do **not** embed `contract-test-docker` or `e2e-gate` inside it.

### Regression scope
S100–S112 regressions remain **hard-blocking**, wired through umbrella targets:
- `s100-validate-regressions`
- `s101-validate-regressions`
- `s102-validate-regressions`
- `s103-validate-regressions`
- `s104-validate-regressions`
- `s105-validate-regressions`
- `s106-validate-regressions`
- `s107-validate-regressions`
- `s108-validate-regressions`
- `s109-validate-regressions`
- `s110-validate-regressions`
- `s111-validate-regressions`
- `s112-validate-regressions`

---

## 14. Implementation order

S113 should proceed in this tranche order:
1. `ps-contracts`
2. `ps-api`
3. `ps-web`
4. `ps-dev/tests`
5. evidence wiring / closeout

### Repo intent
- `ps-contracts`: explainability contracts, promotion/rollback contracts, provider operations fields, adoption/no-bypass contracts
- `ps-api`: effective config resolver, provider ops endpoints, unified explainability payloads, release-control endpoints, adoption/no-bypass enforcement
- `ps-web`: authoritative operator views and mandatory adopter integration
- `ps-dev/tests`: sprint validation, no-bypass checks, proof capture, regression umbrellas
- evidence wiring / closeout: required JSON artifacts, archive, tags, mirror sync

---

## 15. Non-goals for S113

- broader Concierge productization
- semantic caching
- full agent/tool execution orchestration
- full chargeback/reporting richness
- local-LLM architecture expansion
- autonomous multi-step execution
- new top-level AI surfaces beyond what is necessary to make AI Management authoritative

---

## 16. Closeout

S113 closes only when:
- all required artifacts exist
- all required gates are green
- no-bypass report is green for mandatory adopters
- `codegen` and `ai_assistance` proofs are both present and valid
- archive IDs are written/backfilled
- mirror is synced to project-root truth
- tags are created from `poc-calculator`:
  - `sprint113-pass-YYYY-MM-DD`
  - `sprint113-evidence-YYYY-MM-DD`

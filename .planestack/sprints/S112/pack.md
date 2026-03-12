# Sprint 112 Pack — AI Management v1.2: Exceptional Control Plane (Tightened)

**Sprint Code:** S112  
**Status:** Locked for implementation  
**Theme:** Complete the **AI Management** plane as PlaneStack’s authoritative AI control plane by finishing the governable, auditable, budgetable, replayable substrate behind all current/future AI-enabled subsystems.

---

## 1. Sprint intent

Sprint 112 is explicitly an **AI Management** sprint. It is **not** a Concierge sprint, though it must provide the substrate that future Concierge work depends on.

This sprint exists to move AI Management from "Strong" toward **Exceptional** by completing the highest-value control-plane capabilities rather than spreading effort thinly across every possible AI feature.

S112 must make PlaneStack able to answer, authoritatively and durably:
- which **user** triggered an AI-backed action
- in which **project / subsystem / plane** it occurred
- through which **provider / model / version**
- using which **prompt template / version**
- under which **policy / quota / budget / HITL / must-stage** decision
- with what **token/cost/latency/cache** behavior
- and with what **run / evidence / replay / compare** lineage

---

## 2. Scope tightening (must-have vs intentionally narrowed)

### 2.1 Must-have core for S112
S112 must fully complete these foundations:
1. **Provider / model registry + connection binding management**
2. **Prompt/template governance**
3. **Policy / quota / budget / HITL / must-stage enforcement**
4. **AI ledgering and attribution**
5. **AI run audit / replay / compare**
6. **Deterministic exact rendered-prompt cache governance**
7. **One real governed subsystem proof** (`poc-calculator`)
8. **Migration/adoption inventory + no-bypass enforcement**

### 2.2 Narrowed but still real in S112
These stay in-scope, but as minimum complete slices:
- **evals**: minimum governed eval suite + one subsystem regression proof
- **incidents**: minimum viable AI incident classification/detail on shared incident model
- **codegen**: one real AI-managed subsystem proof surface

### 2.3 Explicitly de-scoped or constrained
To avoid thin stubs, S112 does **not** attempt full operational agent/tool execution governance.
- `agents` may exist as an **AI Management surface/config view**
- but full agent/tool invocation governance is **not** a must-have deliverable unless implemented through a minimal allowlist model in this sprint
- semantic caching is out
- provider failover orchestration is out
- chargeback exports are out

---

## 3. Non-negotiable invariants

### 3.1 Governance / filesystem
- Work-producing runs must set:
  - `SPRINT_CODE=S112`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence starts with:
  - `make -C ps-dev governance-lock-check`
- Governed/project truth writes go under:
  - `project_root/.planestack/**`
- The canonical governed write target is:
  - `/Users/mklein/_Ventures/PlaneStack/repos/poc-calculator/.planestack/**`
- Pack folder copies are working copies only.

### 3.2 AI Management authority
- AI Management is the **single canonical AI control plane**.
- No parallel AI control surfaces under Admin.
- No hidden subsystem routing fallback once governed routing files exist.
- No AI-driven mutation of project truth without policy + role + HITL / must-stage controls.

### 3.3 Execution / evidence model
All materially executed AI actions must continue to use the PlaneStack execution spine:
- `command`
- `processor`
- `run`
- `evidence`

### 3.4 Validation / closeout bar
S112 does **not** close unless all are green:
- `sprint112-validate`
- `contract-test-docker`
- `e2e-gate`
- all required artifacts in `S112-evidence.json`
- `lock-check.json`

---

## 4. Canonical IA / routing for S112

### 4.1 Plane placement
S112 uses a dedicated top-level plane:
- **Mode:** `manage`
- **Plane:** `ai-management`

Canonical UI route family:
- `/ou/:ouKey/p/:projectKey/plane/ai-management/:surface`

### 4.2 Canonical surfaces
Required minimum surfaces:
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
- `agents` *(configuration/catalog only unless minimal allowlist is implemented)*

### 4.3 Canonical API family
All S112 APIs live under:
- `/api/v1/ou/:ouKey/p/:projectKey/ai/...`

No aliases in S112 unless explicitly needed for legacy route normalization.

---

## 5. Canonical governed files introduced/owned by S112

All are project-scoped governed files unless otherwise noted.

### 5.1 Registries / control-plane truth
- `.planestack/governance/ai/providers.json`
- `.planestack/governance/ai/models.json`
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

### 5.2 Notes
- `subsystem-routing.json` is the **single source of truth** for subsystem → provider/model routing.
- `provider-connections.json` governs real upstream bindings: secret refs, endpoint/base URL, region/residency, validation state, disabled/fallback status.
- Template activation is single-active-per (`subsystem`, `operation_key`).
- `adoption-inventory.json` records existing AI consumers and migration/backfill state; it is required to enforce no-bypass adoption.

---

## 6. Scope inheritance / precedence

S112 must not assume AI settings are project-only.

### 6.1 Required precedence model
Support at minimum:
1. **OU defaults**
2. **Project overrides**
3. **Subsystem-specific overrides** where applicable

### 6.2 Resolution rule
- **Most restrictive applicable rule wins** for allow/deny, quotas, budgets, and redaction.
- If multiple routing rules match, the most specific valid rule wins:
  - subsystem override > project override > OU default

### 6.3 Areas explicitly subject to inheritance
- allowed providers/models
- budgets
n- quotas
- redaction policies
- subsystem routing
- provider connection defaults where safe

---

## 7. Contract locks for S112

### 7.1 Lifecycle enums
#### `ai.provider`, `ai.model`, `ai.prompt_template`
- `draft`
- `approved`
- `active`
- `archived`

### 7.2 Transition model
Use explicit transition endpoints for:
- `:approve`
- `:activate`
- `:archive`

Do **not** hide lifecycle only inside `:upsert`.

### 7.3 Policy decision enum
- `allow`
- `deny`
- `stage_required`
- `approval_required`
- `hitl_required`

### 7.4 Policy reason-code enum
- `role_denied`
- `provider_not_allowed`
- `model_not_allowed`
- `operation_not_allowed`
- `template_inactive`
- `provider_inactive`
- `model_inactive`
- `quota_exceeded`
- `budget_exceeded`
- `must_stage_required`
- `hitl_required`
- `data_class_not_allowed`
- `policy_blocked`
- `connection_not_validated`
- `connection_disabled`
- `routing_not_resolved`

### 7.5 HITL / must-stage scope
S112 must-stage/HITL scope includes **all AI flows that can mutate project truth or initiate governed apply/activate behavior**, including:
- AI apply / patch-apply
- AI-driven writeback
- activation of templates/configs/profiles via AI
- bounded execution that crosses from suggestion/draft into mutation

Pure suggest/draft/explain/evaluate/summarize/classify/compare remain outside must-stage unless separately blocked by policy.

### 7.6 Budget/quota units
Support all three:
- `requests`
- `tokens`
- `cost_usd_micros`

Scopes:
- per-user
- per-project
- per-subsystem

Precedence:
- **most restrictive applicable limit wins**
- breach of any applicable limit denies execution

### 7.7 Cache lock
- exact rendered-prompt cache only
- no semantic cache in S112
- default TTL = `24h`
- deterministic invalidation on:
  - template version change
  - rendered input hash change
  - provider/model change
  - policy version change
  - connection binding change

### 7.8 Redaction precedence
- **most restrictive wins**
- if role would allow detail but disclosure/redaction policy suppresses it, it stays redacted

### 7.9 Replay / compare
- replay is keyed by `run_id`
- compare uses explicit `base_run_id` and `candidate_run_id`
- replay that triggers a fresh provider call must use preview binding:
  - `replay:preview -> { plan_hash, confirm_token }`
  - `replay:execute` requires both

### 7.10 Incidents model
Use the shared incident model with AI-specific classification:
- `incident_domain = ai_management`
- `surface = ai/*`
No separate AI-only incident silo.

### 7.11 Tool / agent governance
S112 minimum rule:
- any tool-capable/agent-capable provider or template must resolve against a minimal governed allowlist
- canonical file:
  - `.planestack/governance/ai/tool-allowlist.json`
- if minimal allowlist is not implemented, `agents` remains read/config-only and may not execute tools in S112

---

## 8. Epic breakdown

## EPIC 112.1 — Provider & connection registry
### Goal
Make provider/model control a first-class governed capability, including live connection wiring.

### Deliverables
- schemas for `ai.provider`, `ai.model`, and provider connection records
- lifecycle APIs + explicit transition endpoints
- provider capability matrix fields
- provider connection fields:
  - `provider_key`
  - `connection_key`
  - `secret_ref`
  - `base_url`
  - `region`
  - `residency`
  - `disabled`
  - `fallback_rank`
  - `last_validated_at`
  - `last_validation_status`
- connection test / validate flow
- provider/model allowlist enforcement
- seeded deterministic providers/models/connections for validation

### Required tests
- provider lifecycle contract tests
- model lifecycle contract tests
- connection validation tests
- disallow inactive/unvalidated provider paths
- UI smoke for providers + models + connection state

---

## EPIC 112.2 — Prompt/template governance
### Goal
Turn templates into governed, testable, reviewable AI assets.

### Deliverables
- template schema + lifecycle
- single-active-per (`subsystem`, `operation_key`) enforcement
- variable schema + validation
- render preview
- rendered prompt hash generation
- golden render fixture support
- template diff/review UI
- lineage from template version to AI run

### Required tests
- template lifecycle tests
- active-binding uniqueness tests
- render preview tests
- golden render regression tests

---

## EPIC 112.3 — Policy / quota / budget / HITL / must-stage control plane
### Goal
Make AI policy decisions deterministic, explainable, and enforceable.

### Deliverables
- policy registry + evaluation engine
- quotas and budgets as first-class governed files/endpoints
- per-user / per-project / per-subsystem evaluation
- OU-default + project-override precedence
- reason-coded denials
- blocked-flow evidence
- explicit handoff to existing governance approval/stage queue for `approval_required`, `hitl_required`, and `stage_required` states
- no ad hoc human approval path

### Required tests
- policy allow/deny tests
- quota exceeded tests
- budget exceeded tests
- must-stage/HITL routing to governance queue tests
- inheritance precedence tests

---

## EPIC 112.4 — AI ledgering and attribution
### Goal
Make AI cost/usage attribution one of PlaneStack’s strongest subsystems.

### Deliverables
- one ledger row per AI run
- dimensions:
  - tenant / OU / project
  - user / role context
  - plane / subsystem / operation
  - provider / model / version
  - template / version
  - tokens / cost / latency
  - cache hit/miss
  - decision refs
- overview + ledger UI
- basic burn summary + anomaly flags

### Required tests
- ledger write per run tests
- attribution correctness tests
- cost/token math tests
- subsystem rollup tests

---

## EPIC 112.5 — AI run audit / replay / compare
### Goal
Make AI runs inspectable, replayable, and comparable with deterministic evidence.

### Deliverables
- run detail viewer
- rendered prompt + vars + params + redaction map
- replay + compare flows
- preview binding for replay-execute
- record/replay provider mode for validation
- provider correlation IDs and phase logging

### Required tests
- run detail tests
- replay preview/execute tests
- compare tests
- record/replay deterministic tests

---

## EPIC 112.6 — Cache governance
### Goal
Ship a deterministic, governed cache rather than a magical one.

### Deliverables
- exact rendered-prompt cache
- cache policy file + TTL + invalidation
- hit/miss accounting
- cost avoided metric
- cache UI surface

### Required tests
- exact-key hit/miss tests
- invalidation tests
- cache-denied-by-policy tests

---

## EPIC 112.7 — Evals, incidents, and adoption/no-bypass enforcement
### Goal
Complete the minimum quality and operations layer needed for an exceptional AI control plane.

### Deliverables
- one governed eval suite structure
- one subsystem proof eval (Codegen or Center Assistant)
- AI incident detail + list + classification under shared incident model
- `adoption-inventory.json` documenting all current AI consumers
- compliance/no-bypass check proving AI consumers route through governed AI Management configuration rather than hidden direct provider calls

### Required tests
- eval suite registration/run tests
- incident detail/list tests
- adoption inventory compliance check
- no-bypass regression for at least one legacy consumer

---

## 9. APIs to implement or normalize

### 9.1 Registry / lifecycle
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/providers`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/providers/:providerKey`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/providers:upsert`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/providers/:providerKey:approve`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/providers/:providerKey:activate`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/providers/:providerKey:archive`
- same pattern for `models`
- same pattern for `templates`

### 9.2 Connections / routing
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/provider-connections`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/provider-connections:upsert`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/provider-connections/:connectionKey:validate`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/routing`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/routing:preview`

### 9.3 Policy / quota / budget
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/policies`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/policies:upsert`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/quotas`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/quotas:upsert`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/budgets`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/budgets:upsert`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/policy-decisions:preview`

### 9.4 Runs / replay / compare
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/runs`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/runs/:runId`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/runs/:runId:replay-preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/runs/:runId:replay-execute`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/runs:compare`

### 9.5 Ledger / cache / evals / incidents
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/ledger`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/cache`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/evals`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/evals/:suiteKey:run`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/incidents`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/incidents/:incidentId`

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
- `ai-mgmt-provider-row-<providerKey>`
- `ai-mgmt-model-row-<modelKey>`
- `ai-mgmt-template-row-<templateKey>`
- `ai-mgmt-policy-decision`
- `ai-mgmt-ledger-row-<runId>`
- `ai-mgmt-run-detail-<runId>`
- `ai-mgmt-replay-action-<runId>`
- `ai-mgmt-compare-action-<runId>`
- `ai-mgmt-cache-entry-<cacheKey>`
- `ai-mgmt-eval-suite-row-<suiteKey>`
- `ai-mgmt-incident-row-<incidentId>`
- `ai-mgmt-budget-summary`

---

## 11. `poc-calculator` gold proof bundle

S112 must prove AI Management governs a real subsystem, not just its own admin pages.

Minimum required proof:
1. approved provider/model exists
2. validated provider connection exists
3. active template exists for chosen subsystem
4. routing resolves through `subsystem-routing.json`
5. AI run executes through governed path
6. ledger row is written with user + subsystem + provider/model attribution
7. replay/compare works deterministically through record/replay provider mode
8. cache hit/miss behavior is provable
9. one policy denial is provable
10. one incident path is provable

Preferred subsystem proof target:
- `codegen`

---

## 12. Required evidence artifacts

### Registry / control plane
- `.planestack/governance/evidence/s112/ai/providers-registry.json`
- `.planestack/governance/evidence/s112/ai/models-registry.json`
- `.planestack/governance/evidence/s112/ai/provider-connections.json`
- `.planestack/governance/evidence/s112/ai/subsystem-routing.json`
- `.planestack/governance/evidence/s112/ai/templates-registry.json`
- `.planestack/governance/evidence/s112/ai/policies-registry.json`
- `.planestack/governance/evidence/s112/ai/quotas-registry.json`
- `.planestack/governance/evidence/s112/ai/budgets-registry.json`
- `.planestack/governance/evidence/s112/ai/cache-policies.json`
- `.planestack/governance/evidence/s112/ai/eval-suites.json`
- `.planestack/governance/evidence/s112/ai/redaction-policies.json`
- `.planestack/governance/evidence/s112/ai/adoption-inventory.json`
- `.planestack/governance/evidence/s112/ai/no-bypass-check.json`

### Execution / ledger / replay
- `.planestack/governance/evidence/s112/ai/policy-decision-preview.json`
- `.planestack/governance/evidence/s112/ai/ledger-proof.json`
- `.planestack/governance/evidence/s112/ai/run-detail.json`
- `.planestack/governance/evidence/s112/ai/replay-proof.json`
- `.planestack/governance/evidence/s112/ai/compare-proof.json`
- `.planestack/governance/evidence/s112/ai/cache-proof.json`
- `.planestack/governance/evidence/s112/ai/codegen-proof.json`
- `.planestack/governance/evidence/s112/ai/incidents-proof.json`
- `.planestack/governance/evidence/s112/ai/blocked-flows.json`
- `.planestack/governance/evidence/s112/ai/ui-smoke.json`

### Sprint control
- `.planestack/governance/evidence/s112/lock-check.json`
- `.planestack/governance/evidence/s112/sprint112-validate.json`
- `.planestack/governance/evidence/s112/archive.json`
- `.planestack/governance/evidence/s112/closeout-summary.json`

Blocked-flow schema remains the standard split:
- `validation_400`
- `authz_403_404`
- `policy_blocked`

---

## 13. Validation composition

### Required commands
- `make -C ps-dev sprint112-validate`
- `make -C ps-dev contract-test-docker`
- `make -C ps-dev e2e-gate`

### Pattern
Keep `sprint112-validate` sprint-scoped and deterministic. Do **not** embed `contract-test-docker` or `e2e-gate` inside it.

### Regression scope
S100–S111 regressions remain **hard-blocking**, wired through umbrella targets:
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

---

## 14. Adoption checklist (required S112 deliverable)

S112 is not complete unless it produces an explicit adoption/migration inventory covering at least:
- Center Assistant
- Concierge
- Codegen
- DocGen
- Writeback helper
- Operate remediation assist
- any legacy `admin/ai/*` usage

For each consumer, record:
- current routing path
- governed template usage? (`yes/no`)
- governed provider/model routing? (`yes/no`)
- policy enforcement path? (`yes/no`)
- ledger attribution path? (`yes/no`)
- bypass risk? (`yes/no`)
- migration state

---

## 15. Non-goals for S112

- full agent/tool operational autonomy beyond minimal allowlist governance
- semantic caching
- provider failover orchestration
- chargeback exports
- full long-horizon Concierge execution
- external review / MFA as a headline scope

---

## 16. Closeout

S112 closes only when:
- all required artifacts exist
- all required gates are green
- archive IDs are written/backfilled
- mirror is synced to project-root truth
- tags are created from `poc-calculator`:
  - `sprint112-pass-YYYY-MM-DD`
  - `sprint112-evidence-YYYY-MM-DD`

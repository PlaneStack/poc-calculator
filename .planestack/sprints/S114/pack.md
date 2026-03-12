# Sprint 114 Pack — AI Management v3: Launch Readiness, Execution Governance, and Estate-Wide Adoption

**Sprint Code:** S114  
**Status:** Locked for implementation  
**Theme:** Finish **AI Management** as the launch-grade enterprise operating layer for first-party AI behavior by completing estate-wide adoption, full effective configuration and release control, provider resilience, unified run/policy/cost explainability, bounded execution governance, launch-grade incident operations, showback/chargeback intelligence, and systemic no-bypass enforcement.

---

## 1. Sprint intent

Sprint 114 is the **AI Management launch-readiness sprint**.

S112 established the AI control-plane backbone. S113 made that backbone authoritative for mandatory adopters and introduced operator-grade explainability and release-control foundations. S114 must now widen scope back out and convert AI Management from a strong control plane into a **launch-grade enterprise operating layer**.

This sprint exists to prove all of the following:

1. all meaningful first-party AI consumers route through AI Management instead of shadow paths
2. operators can see not only **what won and why**, but also **what is active, what is inherited, what changed, and how to roll back**
3. provider integrations are resilient, validated, and operationally trustworthy
4. releases of templates, routing, policy bundles, and live behavior controls are governed end to end
5. run, policy, cache, approval, incident, and cost behavior can be understood from one operator path
6. bounded tool execution governance exists as the runway for later Concierge execution
7. budgets, usage, and showback/chargeback are real management capabilities rather than raw ledger rows
8. no-bypass enforcement is systemic and closeout-blocking across the estate

S114 is therefore intentionally larger than S112 and S113, but it must still ship as **complete slices**, not a collection of thin admin surfaces.

---

## 2. Scope posture

### 2.1 Must-have core for S114
S114 must fully complete these maturity moves:

1. **Estate-wide adoption of all known first-party AI consumers**
2. **Launch-grade effective configuration and release control**
3. **Provider operations and resilience**
4. **Flagship run / policy / cost explainability**
5. **Eval-gated release management across live behavior**
6. **Bounded execution governance for tools / execution bundles**
7. **Launch-grade incident operations and runtime safeguards**
8. **Showback / chargeback / budget intelligence**
9. **Systemic no-bypass enforcement that fails closeout**

### 2.2 In-scope only as bounded slices
These may be included only as bounded, evidence-backed slices:

- deny-reason explainability and preview flows for governed tool execution
- exportable finance/ops reports if naturally produced by showback work
- limited adoption of one additional narrow AI helper flow if it already exists and is required to make “estate-wide” honest
- execution-bundle definitions for bounded multi-step operations only where they stay inside the governed PlaneStack execution model

### 2.3 Explicitly de-scoped or constrained
To keep S114 launch-grade without turning into a second product buildout:

- no full Concierge Plane or bottom-console productization
- no unconstrained agents
- no semantic cache
- no UI click-bot orchestration
- no bridge-root local execution productization
- no provider-specific bespoke AI planes outside `manage > ai-management`
- no parallel Admin-side AI control surfaces

---

## 3. Non-negotiable invariants

### 3.1 Governance / filesystem
- Work-producing runs must set:
  - `SPRINT_CODE=S114`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence starts with:
  - `make -C ps-dev governance-lock-check`
- Governed project truth writes go under:
  - `project_root/.planestack/**`
- OU defaults remain outside the project repo mirror in OU-scoped governed control-plane artifacts.
- The canonical governed project write target remains:
  - `/Users/mklein/_Ventures/PlaneStack/repos/poc-calculator/.planestack/**`
- Pack folder copies are working copies only.

### 3.2 AI Management authority
- AI Management remains the single canonical AI control plane.
- No first-party AI consumer may bypass governed routing, template/model binding, policy evaluation, ledger attribution, or release-control state.
- Compatibility aliases may remain temporarily for API stability, but UI and new tests must use canonical names only.
- No new top-level AI plane sprawl; all S114 work remains under `manage > ai-management`.

### 3.3 Execution / evidence model
All materially executed AI actions must continue to use the PlaneStack execution spine:

- `command`
- `processor`
- `run`
- `evidence`

Tool execution and execution bundles introduced in S114 must also resolve through this same governed spine.

### 3.4 Safety model
- `approve` remains distinct from `activate`
- `approval_required`, `stage_required`, and `hitl_required` outcomes must reuse the normal governance queue / approval flow
- no AI-only side-channel approval path
- redaction / disclosure / quota / budget enforcement uses **most restrictive applicable rule wins**
- fail-open behavior is allowed only where explicitly permitted by governed policy

### 3.5 Launch readiness / closeout bar
S114 does **not** close unless all are green:

- `sprint114-validate`
- `contract-test-docker`
- `e2e-gate`
- all required artifacts in `S114-evidence.json`
- `lock-check.json`
- `no-bypass-report.json` green for all mandatory adopters
- launch-readiness report present and green except explicitly documented risk waivers

---

## 4. Canonical IA / routing for S114

### 4.1 Plane placement
S114 continues to use the dedicated top-level plane:

- **Mode:** `manage`
- **Plane:** `ai-management`

Canonical UI route family:
- `/ou/:ouKey/p/:projectKey/plane/ai-management/:surface`

### 4.2 Surface posture
S114 should strengthen and operationalize the existing surfaces rather than create new sibling planes.

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

Required S114 operator experiences should land as:
- existing-surface tabs
- drawers
- detail pages
- contextual cards
- operator drill-down panels

S114 may add **one** explicit `release-control` or `adoption` surface only if the existing-surface pattern becomes too fragmented. Do not add both unless implementation proves it unavoidable.

### 4.3 Canonical API family
All S114 APIs live under:
- `/api/v1/ou/:ouKey/p/:projectKey/ai/...`

Compatibility aliases from earlier sprints may remain alias-only with no UI links. S114 implementation, tests, and evidence must use canonical names.

---

## 5. Governed files introduced or extended by S114

S114 should extend prior AI governance files first and add new registries only where they make launch-readiness materially clearer.

### 5.1 Existing governed files S114 must extend or operationalize
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
- `.planestack/governance/ai/tool-allowlist.json`
- `.planestack/governance/ai/release-controls.json`
- `.planestack/governance/ai/adoption-enforcement.json`

### 5.2 New governed files allowed and preferred in S114
Add these where needed to keep S114 explicit, auditable, and launch-grade:
- `.planestack/governance/ai/execution-bundles.json`
- `.planestack/governance/ai/provider-resilience.json`
- `.planestack/governance/ai/pricing-catalog.json`
- `.planestack/governance/ai/showback-profiles.json`

### 5.3 OU-scoped governed truth
OU defaults do not live in the project repo mirror. S114 must expose, resolve, and explain them through the control plane, but must not flatten them into project-scoped files.

### 5.4 Notes
- `adoption-inventory.json` remains the catalog of known AI consumers and their migration state.
- `adoption-enforcement.json` defines mandatory governed consumers and the checks that fail closeout when they bypass.
- `release-controls.json` governs evaluation thresholds, promotion rules, rollback eligibility, required evidence references, and active-release metadata.
- `execution-bundles.json` defines bounded, governed tool execution packages and their allowed operation sets.
- `provider-resilience.json` defines fallback order, maintenance posture, failure mode, retry/backoff, and circuit-breaker posture.
- `pricing-catalog.json` is the governed source of truth for provider/model cost math used by showback/chargeback.
- `showback-profiles.json` defines aggregation/grouping profiles for finance and operational reporting.

---

## 6. Required adoption and launch-readiness posture

### 6.1 Mandatory adopters in S114
S114 is not complete unless **all known first-party in-product AI consumers** are classified and all meaningful launch-path consumers are governed through AI Management.

At minimum, S114 must prove governed adoption for:

1. `codegen`
2. `ai_assistance`
3. `center_apply`
4. `center_ask`
5. `pr_description`

If any of these canonical keys differ in live code, normalize internally as needed, but all new contracts, evidence, and tests must use these canonical keys.

### 6.2 Estate-wide adoption rule
All known AI callers must be classified as one of:
- `governed`
- `migrating_with_explicit_deadline`
- `blocked`
- `not_in_scope_with_explicit_reason`

Unclassified, hidden, or ad hoc callers are not allowed at closeout.

### 6.3 Effective resolution precedence
Resolution remains:
- subsystem override > project override > OU default > server default

For allow/deny, redaction, quotas, budgets, release gates, and failure posture:
- **most restrictive applicable rule wins**

### 6.4 Explainability requirement
Every resolved provider/model/template/policy/config/release decision shown in S114 must be explainable with:
- resolved value
- source scope
- source artifact
- source version / revision
- resolution trace
- active-release metadata
- restrictive-rule-wins explanation where applicable

---

## 7. Contract locks for S114

### 7.1 Effective configuration and release explainability
S114 must expose resolved configuration and active release state for at least:
- provider selection
- model selection
- template binding
- routing selection
- policy decision basis
- quota/budget source
- redaction source
- cache policy source
- fail-open / fail-closed mode
- retry posture
- maintenance / disabled / degraded provider posture
- release-control state
- rollback target

### 7.2 Provider operations and resilience fields
`provider-connections.json`, `provider-resilience.json`, and related APIs/UI must expose, at minimum:
- `provider_key`
- `connection_key`
- `secret_ref`
- `base_url`
- `region`
- `residency`
- `disabled`
- `maintenance_mode`
- `degraded_mode`
- `fallback_rank`
- `last_validated_at`
- `last_validation_status`
- `last_validation_reason`
- `retry_policy_key`
- `retry_backoff_key`
- `failure_mode` (`fail_closed` or `fail_open`)
- `circuit_breaker_state`
- `last_known_good_at`

Provider history should be append-only event-log style as the source of truth. Computed rollups are allowed for UI convenience but are not sufficient on their own for evidence.

### 7.3 Release control minimum
Promotion / rollback must be governed and evidence-backed for:
- templates
- routing config
- policy bundles affecting live execution
- model bindings affecting live execution

Support, at minimum:
- `compare`
- `evaluate`
- `promote_preview`
- `promote_execute`
- `rollback_preview`
- `rollback_execute`

Promotion to active must not occur without:
- an eval scorecard or explicit governed waiver
- policy + role authorization
- required approval/stage gates where applicable
- evidence written to sprint closeout artifacts

### 7.4 Incident and safeguard minimum
S114 incidents and safeguards must be operationally useful through:
- retry policy visibility
- maintenance / disabled / degraded posture visibility
- fail-open / fail-closed visibility
- provider outage / fallback drill-down
- budget/quota denial drill-down
- validation failure drill-down
- incident create/append proof on deterministic trigger classes

### 7.5 Showback / chargeback minimum
S114 must provide:
- governed price lookup source
- usage/cost aggregation by OU / project / subsystem / provider / model / user
- budget burn and forecast
- anomaly summary for spend / latency / error rate
- exportable showback report format (JSON and/or CSV)

### 7.6 Bounded execution governance
S114 keeps agents bounded and governance-first:
- governed tool registry / allowlist remains authoritative
- execution bundles must declare allowed operations, required approvals, and deny reasons
- tool plans may preview and explain, but unconstrained multi-step execution is out
- all executed steps must remain on the normal command/processor/run/evidence spine

### 7.7 Cache posture
S114 keeps the prior cache contract:
- exact rendered-prompt cache only
- no semantic cache

### 7.8 Idempotency
All mutating S114 AI endpoints require `Idempotency-Key` with a 15-minute replay window.

---

## 8. Epic breakdown

## EPIC 114.1 — Estate-wide governed adoption
### Goal
Make AI Management the actual operating layer for all meaningful first-party AI consumers.

### Deliverables
- governed adoption for `codegen`
- governed adoption for `ai_assistance`
- governed adoption for `center_apply`
- governed adoption for `center_ask`
- governed adoption for `pr_description`
- refreshed adoption inventory with canonical classifications
- no-bypass enforcement across all known AI callers
- removal of UI-visible references to compatibility aliases

### Required tests
- governed-path proofs for each mandatory adopter
- no-bypass checks for all known callers
- regression tests ensuring legacy direct paths do not silently succeed
- classification completeness tests for adoption inventory

---

## EPIC 114.2 — Launch-grade effective configuration and release control
### Goal
Make operators able to answer “what is active, what won, why, what changed, and how do we roll back” without reading raw files or source.

### Deliverables
- effective config resolver endpoint(s)
- active release state resolver endpoint(s)
- UI resolution trace for provider/model/template/routing/policy/budget/quota/redaction/cache/release
- diff before activate where config changes affect live behavior
- compare, promotion, and rollback operator flows
- restrictive-rule-wins explanation text
- approval vs activation history where applicable

### Required tests
- effective resolution correctness tests
- inheritance precedence tests
- release-state explainability tests
- compare / promotion / rollback tests
- UI smoke for effective config and release-control views

---

## EPIC 114.3 — Provider operations and resilience
### Goal
Operate real provider integrations with launch-grade visibility and resilience.

### Deliverables
- provider validation history
- provider event-log history
- connection health/status rollups
- maintenance / degraded / disabled / fallback posture views
- residency/region visibility
- retry/backoff/circuit-breaker visibility
- provider outage and fallback explainability

### Required tests
- validation history tests
- provider health rollup tests
- maintenance/degraded mode visibility tests
- fail-open / fail-closed explainability tests
- fallback transition tests
- last-known-good tests

---

## EPIC 114.4 — Unified run / policy / cost explainability
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
- incident linkage
- replay/compare entry points from the same operator flow

### Required tests
- run explainability payload tests
- policy/cost attribution tests
- blocked-path drill-down tests
- replay/compare entry smoke tests
- operator-view payload completeness tests

---

## EPIC 114.5 — Eval-gated release management
### Goal
Turn AI Management into a safe release-control plane rather than a static registry.

### Deliverables
- governed eval scorecards for all mandatory adopters
- compare view across template/model/routing candidates
- promotion preview / execute flow
- rollback preview / execute flow
- release evidence bundle
- waiver path only if explicit governed release-controls policy allows it

### Required tests
- eval scorecard generation tests
- promotion gating tests
- rollback tests
- approval/stage interaction tests
- release waiver-path tests where supported

---

## EPIC 114.6 — Bounded tool execution governance
### Goal
Build the execution-governance runway needed for later Concierge work without productizing Concierge itself.

### Deliverables
- governed tool registry with capability metadata
- execution-bundles registry and APIs
- tool-plan preview / deny-reason explainability
- required-approval linkage for execution bundles
- evidence model for tool-plan generation and execution outcome
- bounded execution proof for at least one safe execution bundle

### Required tests
- tool allowlist policy tests
- execution bundle schema tests
- deny-reason explainability tests
- bounded execution proof tests
- approval/stage linkage tests for bundle execution

---

## EPIC 114.7 — Incident operations and runtime safeguards
### Goal
Make incidents and runtime protection operationally meaningful at launch.

### Deliverables
- incident create/append on deterministic trigger classes
- blocked/unauthorized/budget/provider-failed rollups
- retry / failure mode visibility
- maintenance posture surfaced in provider detail and run detail
- drill-downs for validation failure, fallback, quota/budget denial, and policy block
- launch-readiness report summarizing incident posture and risk

### Required tests
- incident create/append tests
- deterministic trigger tests
- rollup tests
- drill-down tests
- launch-readiness report generation tests

---

## EPIC 114.8 — Showback / chargeback / budget intelligence
### Goal
Make AI Management operationally useful for finance and service-launch decision making.

### Deliverables
- governed pricing catalog
- showback aggregation views
- budget burn and forecast views
- anomaly summary for spend/latency/error rate
- exportable showback report(s)
- clear linkage from showback to ledger and runs

### Required tests
- pricing-catalog resolution tests
- showback aggregation tests
- budget forecast tests
- anomaly summary tests
- export smoke tests

---

## EPIC 114.9 — Launch-grade no-bypass enforcement
### Goal
Make bypass impossible to miss and closeout-blocking.

### Deliverables
- CI fails for unregistered or bypassing AI callers
- governed-vs-ungoverned caller report
- generated adoption inventory / enforcement summary
- closeout fails if any mandatory adopter bypasses AI Management
- estate report for launch readiness

### Required tests
- no-bypass failure tests
- generated inventory tests
- enforcement summary tests
- launch-readiness closeout tests

---

## 9. APIs to implement or normalize

### 9.1 Adoption / effective config / release control
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/adoption`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/effective-config`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/effective-config:preview`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/release-state`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/release-state:preview`

### 9.2 Provider operations / resilience
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/provider-connections`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/provider-connections/:connectionKey/history`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/provider-connections/:connectionKey:validate`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/providers/health`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/providers/resilience`

### 9.3 Run / policy / cost explainability
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/runs`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/runs/:runId`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/runs/:runId/explain`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/policy-decisions:preview`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/ledger`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/showback`

### 9.4 Release control
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/evals`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/evals/scorecards`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/evals/:suiteKey:run`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/templates/:templateKey:promote-preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/templates/:templateKey:promote-execute`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/templates/:templateKey:rollback-preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/templates/:templateKey:rollback-execute`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/routing:promote-preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/routing:promote-execute`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/routing:rollback-preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/routing:rollback-execute`

### 9.5 Tool execution governance
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/tools`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/execution-bundles`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/execution-bundles/:bundleKey`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/execution-bundles/:bundleKey:plan-preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/ai/execution-bundles/:bundleKey:execute`

### 9.6 Incidents / no-bypass / launch readiness
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/incidents`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/incidents/:incidentId`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/no-bypass-report`
- `GET /api/v1/ou/:ouKey/p/:projectKey/ai/launch-readiness`

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
- `ai-mgmt-release-state-view`
- `ai-mgmt-provider-health-row-<providerKey>`
- `ai-mgmt-provider-history-<connectionKey>`
- `ai-mgmt-provider-resilience-<providerKey>`
- `ai-mgmt-run-explain-<runId>`
- `ai-mgmt-policy-cost-panel-<runId>`
- `ai-mgmt-showback-view`
- `ai-mgmt-promotion-preview-<artifactKey>`
- `ai-mgmt-rollback-preview-<artifactKey>`
- `ai-mgmt-no-bypass-report`
- `ai-mgmt-incident-drilldown-<incidentId>`
- `ai-mgmt-execution-bundle-<bundleKey>`
- `ai-mgmt-launch-readiness`

---

## 11. Gold proof bundle

S114 must prove AI Management is the launch-grade operating layer for first-party AI behavior and the safe execution-governance substrate for future Concierge work.

Minimum required proof:
1. `codegen` resolves provider/model/template/policy/budget/quota through governed AI Management config
2. `ai_assistance` resolves provider/model/template/policy/budget/quota through governed AI Management config
3. `center_apply` resolves provider/model/template/policy/budget/quota through governed AI Management config
4. `center_ask` resolves provider/model/template/policy/budget/quota through governed AI Management config
5. `pr_description` resolves provider/model/template/policy/budget/quota through governed AI Management config
6. effective config explains **what won, why, and what is active**
7. provider validation / resilience history is provable
8. run + policy + cost explainability is provable from one operator flow
9. showback / budget intelligence is provable and tied to ledger truth
10. eval scorecards are provable for promoted candidates
11. promotion preview/execute is provable for templates and routing
12. rollback preview/execute is provable for templates and routing
13. bounded execution governance is provable for at least one safe execution bundle
14. incident create/append and drill-down are provable
15. no-bypass report is provable and green for all mandatory adopters
16. launch-readiness report is present and green except explicitly documented waivers

Preferred proof project target:
- `poc-calculator`

Mandatory governed consumers:
- `codegen`
- `ai_assistance`
- `center_apply`
- `center_ask`
- `pr_description`

---

## 12. Required evidence artifacts

### Adoption / no-bypass / launch readiness
- `.planestack/governance/evidence/s114/ai/adoption-inventory.json`
- `.planestack/governance/evidence/s114/ai/no-bypass-report.json`
- `.planestack/governance/evidence/s114/ai/launch-readiness-report.json`
- `.planestack/governance/evidence/s114/ai/codegen-adoption-proof.json`
- `.planestack/governance/evidence/s114/ai/ai-assistance-adoption-proof.json`
- `.planestack/governance/evidence/s114/ai/center-apply-adoption-proof.json`
- `.planestack/governance/evidence/s114/ai/center-ask-adoption-proof.json`
- `.planestack/governance/evidence/s114/ai/pr-description-adoption-proof.json`

### Explainability / provider ops / showback
- `.planestack/governance/evidence/s114/ai/effective-config-resolution.json`
- `.planestack/governance/evidence/s114/ai/effective-config-diff.json`
- `.planestack/governance/evidence/s114/ai/release-state-resolution.json`
- `.planestack/governance/evidence/s114/ai/provider-health-report.json`
- `.planestack/governance/evidence/s114/ai/provider-validation-history.json`
- `.planestack/governance/evidence/s114/ai/provider-resilience-history.json`
- `.planestack/governance/evidence/s114/ai/run-explainability.json`
- `.planestack/governance/evidence/s114/ai/policy-cost-explainability.json`
- `.planestack/governance/evidence/s114/ai/showback-report.json`
- `.planestack/governance/evidence/s114/ai/budget-forecast.json`

### Release control / evals
- `.planestack/governance/evidence/s114/ai/eval-scorecard.json`
- `.planestack/governance/evidence/s114/ai/promotion-proof-templates.json`
- `.planestack/governance/evidence/s114/ai/rollback-proof-templates.json`
- `.planestack/governance/evidence/s114/ai/promotion-proof-routing.json`
- `.planestack/governance/evidence/s114/ai/rollback-proof-routing.json`
- `.planestack/governance/evidence/s114/ai/release-controls.json`

### Execution governance / incidents
- `.planestack/governance/evidence/s114/ai/execution-bundle-proof.json`
- `.planestack/governance/evidence/s114/ai/tool-governance-proof.json`
- `.planestack/governance/evidence/s114/ai/blocked-flow-drilldown.json`
- `.planestack/governance/evidence/s114/ai/incidents-ops-proof.json`

### UI / validate / archive
- `.planestack/governance/evidence/s114/ai/ui-smoke.json`
- `.planestack/governance/evidence/s114/sprint114-validate.json`
- `.planestack/governance/evidence/s114/archive.json`
- `.planestack/governance/evidence/s114/closeout-summary.json`

---

## 13. Repo-by-repo delta expectations

### 13.1 `ps-contracts`
Must carry the contract spine for:
- new/extended governed artifact schemas
- adoption inventory / enforcement schemas
- effective config / release-state payloads
- provider resilience payloads
- showback / pricing catalog payloads
- execution bundle and tool governance payloads
- launch-readiness report schema
- idempotent mutating API contracts

### 13.2 `ps-api`
Must carry:
- canonical S114 API implementation
- governed resolution / release-state logic
- provider history / resilience logic
- no-bypass enforcement logic
- showback aggregation and budget forecast logic
- incident create/append and drill-down
- execution-bundle plan/execute logic bound to governed operations
- evidence emission for S114 validate and closeout

### 13.3 `ps-web`
Must carry:
- strengthened AI Management surfaces for adoption, provider ops, showback, release control, incidents, and execution governance
- unified operator drill-downs
- adoption / no-bypass / launch-readiness views
- release-control compare / promote / rollback UI
- bounded execution preview UI
- required `data-testid` coverage

### 13.4 `ps-dev`
Must carry:
- `sprint114-validate`
- closeout / evidence wiring
- no-bypass CI/summary checks
- launch-readiness report generation
- contract/e2e gate coverage
- archive_pack compatibility for S114 evidence

### 13.5 `poc-calculator`
Must provide the governed proof project target and evidence-hosting mirror updates needed by the S114 proof bundle.

---

## 14. Validation commands

Run separately:

```bash
make -C ps-dev sprint114-validate
make -C ps-dev contract-test-docker
make -C ps-dev e2e-gate
```

Regression policy:
- S100–S113 umbrella regressions are hard-blocking inside `sprint114-validate`.

---

## 15. Closeout expectations

S114 is not done until all of the following are true:

- all required evidence artifacts are present
- mandatory adopters are green in `no-bypass-report.json`
- launch-readiness report is present and green except explicit waivers
- archive flow is completed
- mirror is synced
- all participating repos are clean and synchronized with origin
- tags are created from `poc-calculator`

Suggested closeout tags:
- `sprint114-pass-YYYY-MM-DD`
- `sprint114-evidence-YYYY-MM-DD`

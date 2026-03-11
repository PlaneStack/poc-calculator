# Sprint 111 Pack

**Sprint:** S111  
**Status:** Locked for implementation  
**Theme:** AI Management v1 — Provider / Prompt / Run / Ledger Foundations  
**Primary project:** `poc-calculator`  
**Execution posture:** governed, deterministic where possible, provider-aware, evidence-backed, actor-attributed, subsystem-attributed

## Intent

Sprint 111 turns AI Management into a first-class PlaneStack capability domain.

The objective is not to add one more AI feature. The objective is to make PlaneStack exceptionally competent at **managing AI usage itself**:
- which user invoked it
- from which plane/subsystem
- using which provider/model/version
- with which prompt template/version
- under which policy/quota/budget
- at what token/cost/latency
- with what run/evidence lineage
- and with what replay / compare / redaction / auditability guarantees

This sprint is explicitly about **management, governance, accounting, replayability, and quality control** of AI usage across PlaneStack.

## S111 thesis

If PlaneStack is fundamentally an AI-leveraged service, then AI usage cannot remain a scattered implementation detail inside Center, Concierge, CodeGen, DocGen, or Operate assistance.

By the end of S111, PlaneStack should have a governed AI management substrate that can answer:
- Which provider/model/version handled this AI-assisted action?
- Which user and role context triggered it?
- Which plane/subsystem consumed it?
- Which prompt template/version and context refs were used?
- Which policy / quota / HITL / must-stage rule applied?
- What tokens, latency, cost, cache behavior, and quality outcomes resulted?
- Can the run be replayed / compared / audited safely?

## Non-negotiable locks

1. AI execution remains governed by PlaneStack policy and evidence rules.
2. Provider/model use must resolve through a canonical registry; no hidden hardcoded model picks in product surfaces.
3. Prompts/instruction bundles are governed, versioned assets — not ad hoc strings.
4. AI runs are first-class execution records with replay / compare / redaction-aware auditability.
5. Ledgering must attribute every AI request to:
   - user
   - role context
   - project
   - plane
   - subsystem
   - provider/model/version
   - prompt template/version
6. Policy / quota / HITL / must-stage controls are mandatory, not advisory.
7. Caching must be deterministic and policy-controlled.
8. Provider/data-class restrictions and redaction policy must be enforced at the management layer, not only by subsystem code.
9. Missing required evidence remains a closeout failure.
10. All governed writes remain under `project_root/.planestack/**`; no user-local overlay may become AI management truth.

## S111 capability goal

By the end of S111, PlaneStack should have a coherent AI management control layer spanning:
- provider registry
- model registry
- prompt template governance
- AI run audit/replay/compare
- per-user and per-subsystem ledgering
- budgets / quotas / HITL / must-stage policy
- cache governance
- eval suite scaffolding and first dashboards
- redaction / provider-safety policy

This sprint must feel like **the beginning of a serious enterprise AI control plane**, not a usage report.

## Scope

### Epic 111.1 — Provider & model registry
Create the governed registry for AI providers and models.

Deliver:
- canonical governed files:
  - `.planestack/governance/ai/providers.json`
  - `.planestack/governance/ai/models.json`
  - `.planestack/governance/ai/subsystem-routing.json`
- provider registry APIs
- model registry APIs
- provider/model validation
- provider capability matrix
- approved-provider/model lifecycle

Tasks:
- add `ai.provider` and `ai.model` contracts/schemas
- add provider fields for capability/support matrix, retention mode, allowed data classes, and cost model refs
- add model fields for exact version pinning, capability compatibility, lifecycle state
- implement provider/model list/get/upsert/validate routes
- add routing resolution by subsystem and operation class
- support provider/model allowlists by OU/project/subsystem where required by policy
- write validation evidence for at least two providers and multiple model entries

### Epic 111.2 — Prompt & instruction governance
Turn prompts/instruction bundles into governed assets.

Deliver:
- canonical governed file:
  - `.planestack/governance/ai/templates.json`
- prompt template lifecycle (`draft`, `approved`, `active`, `archived`)
- preview / render endpoint
- variable schema validation
- template diff / lineage / compatibility metadata
- golden render fixture support

Tasks:
- add `ai.prompt_template` schema and APIs
- define template fields:
  - `template_key`, `template_version`, `subsystem`, `operation_key`, `input_schema_ref`, `render_policy_ref`, `redaction_policy_ref`, `compatible_models[]`, `owner_ref`, `lifecycle_state`, `body`
- implement template preview endpoint with safe variable rendering
- add activate/archive lifecycle semantics
- create at least one real governed template per subsystem:
  - `center-assistant`
  - `concierge`
  - `docgen`
  - `codegen`
- add prompt linting and golden render tests

### Epic 111.3 — AI policy / quota / HITL / must-stage enforcement
Complete the governance layer for AI use.

Deliver:
- canonical governed files:
  - `.planestack/governance/ai/policies.json`
  - `.planestack/governance/ai/budgets.json`
- AI policy registry APIs
- budget and quota APIs
- policy evaluation reasons
- HITL and must-stage controls integrated into AI invocation paths

Tasks:
- define `ai.policy` and `ai.budget` schemas
- support allow/deny by:
  - project
  - subsystem
  - capability
  - provider/model
  - role context
- implement quotas by user/project/subsystem
- implement budget soft caps / hard caps
- implement reason-coded policy denials
- wire must-stage enforcement for writeback-capable and apply-capable AI flows
- wire HITL requirements for higher-risk subsystems/actions
- write policy-blocked and budget-blocked proof artifacts

### Epic 111.4 — AI run audit, replay, compare, and observability
Make every AI run inspectable and trustworthy.

Deliver:
- AI run explorer APIs
- rendered prompt viewer
- replay endpoint
- compare endpoint
- structured run phases
- failure taxonomy
- provider correlation IDs and latency recording

Tasks:
- define / extend `ai.run` contract
- record run phases:
  - context assembly
  - prompt resolution
  - render
  - policy evaluation
  - cache check
  - provider call
  - parse/validate
  - post-processing
  - evidence write
- store provider/model/version, prompt template/version, context refs, subsystem key, role context
- add replay safeguards and compare outputs flow
- add failure classes such as:
  - `policy_blocked`
  - `quota_exceeded`
  - `budget_exceeded`
  - `provider_unavailable`
  - `provider_timeout`
  - `invalid_prompt`
  - `schema_parse_failed`
  - `redaction_failed`
  - `cache_ineligible`
  - `cache_stale`
  - `contract_violation`
- write replay and compare proof artifacts

### Epic 111.5 — Ledgering, budgets, and showback
Build the AI usage ledger to enterprise depth.

Deliver:
- ledger APIs
- by-user / by-subsystem / by-provider views
- cost and token accounting
- budget burn-down / alerts
- exportable showback records

Tasks:
- define `ai.usage_ledger` schema or equivalent ledger entry contract
- record dimensions:
  - `tenant_ref`, `ou_ref`, `project_ref`, `user_ref`, `role_context`, `plane_key`, `subsystem_key`, `operation_key`, `provider_key`, `model_key`, `model_version`, `template_key`, `template_version`, `input_token_count`, `output_token_count`, `reasoning_token_count?`, `cache_hit`, `latency_ms`, `cost_amount`, `cost_currency`, `budget_key`, `policy_refs[]`, `approval_refs[]`, `run_ref`, `evidence_refs[]`, `timestamp`
- add summary endpoints:
  - by user
  - by project
  - by plane/subsystem
  - by provider/model
- add budget burn-down summary and alert thresholds
- support export/report artifact for showback
- ensure subsystem attribution includes at minimum:
  - `center-assistant`
  - `concierge`
  - `docgen`
  - `codegen`
  - `writeback-helper`
  - `ui-evidence-assist`
  - `work-refinement`
  - `blueprint-assist`
  - `operate-remediation-assist`

### Epic 111.6 — Deterministic caching and optimization controls
Add safe caching as a managed capability.

Deliver:
- canonical governed file:
  - `.planestack/governance/ai/cache-rules.json`
- exact rendered prompt cache eligibility rules
- TTL and invalidation rules
- cache accounting and cost-avoidance metrics

Tasks:
- define `ai.cache_record` and cache-rules schema
- implement exact-match cache only (no fuzzy semantic cache in S111)
- invalidate on:
  - prompt version change
  - context artifact change
  - policy change
  - provider/model change
- support cache scope control (`user`, `project`, `ou`)
- record hit/miss/cost-avoided evidence
- add deterministic replay mode for nightly/test flows

### Epic 111.7 — Evaluation / regression / quality management
Start the quality loop for AI outputs.

Deliver:
- canonical governed file:
  - `.planestack/governance/ai/evals.json`
- eval suite definitions
- eval run APIs
- provider/model/prompt comparison support
- first quality dashboards/evidence artifacts

Tasks:
- define `ai.eval_suite` and `ai.eval_run` schemas
- create eval suites for:
  - Concierge planning quality
  - CodeGen patch quality
  - DocGen structure/completeness
  - Center scope/summary/goals quality
  - Blueprint suggestion quality
  - Operate remediation guidance quality
- add golden prompt render tests
- add provider/model comparison outputs
- add regression classification and unsafe-output flags
- write eval run evidence artifacts for at least two subsystems

### Epic 111.8 — Security, privacy, redaction, provider-safety
Make AI handling as governed as the rest of PlaneStack.

Deliver:
- provider/data-class allowlists
- redaction policy enforcement
- safe summary vs raw payload access model
- provider retention metadata
- blocked-provider evidence

Tasks:
- define redaction policy semantics and provider safety rules
- ensure secrets/tokens are always redacted
- redact machine-local absolute paths where policy requires
- gate raw payload views behind stronger permissions than safe summaries
- add provider/data-class policy checks
- emit evidence when a provider/path is blocked for policy reasons
- add redaction provenance to AI run viewer data

### Epic 111.9 — AI Management UI / destination
Productize AI Management as a first-class PlaneStack destination.

Deliver:
- AI Management destination (top-level plane or strong admin/integrations destination, per current product shell choice)
- surfaces:
  - Overview
  - Providers
  - Models
  - Templates
  - Policies
  - Budgets / Ledger
  - Runs / Replay
  - Cache
  - Evals
  - Incidents
- role-shaped visibility
- no blank-state ambiguity

Tasks:
- add surface routes and testids
- add provider/model/template/policy/ledger views
- add overview health cards and anomaly summaries
- add evidence links from runs to prompts, policies, budgets, providers, and evals
- ensure UI uses server-computed flags rather than client inference for risk / blocked / budget states

### Epic 111.10 — `poc-calculator` gold proof bundle
Prove the AI management substrate with real subsystem use.

Minimum proof bundle must include:
1. one `center-assistant` AI run
2. one `concierge` AI run
3. one `docgen` or `codegen` AI run
4. per-user + per-subsystem ledger attribution
5. at least one policy-blocked example
6. at least one budget/quota interaction
7. at least one replay
8. at least one compare
9. at least one cache hit or deterministic cache proof
10. at least one eval run
11. full evidence lineage across all of the above

## Required governed file paths

S111 introduces/uses these canonical governed files:
- `.planestack/governance/ai/providers.json`
- `.planestack/governance/ai/models.json`
- `.planestack/governance/ai/templates.json`
- `.planestack/governance/ai/policies.json`
- `.planestack/governance/ai/budgets.json`
- `.planestack/governance/ai/cache-rules.json`
- `.planestack/governance/ai/evals.json`
- `.planestack/governance/ai/subsystem-routing.json`

## Required API families

At minimum, S111 should complete:
- `/api/v1/.../ai/providers*`
- `/api/v1/.../ai/models*`
- `/api/v1/.../ai/templates*`
- `/api/v1/.../ai/policies*`
- `/api/v1/.../ai/budgets*`
- `/api/v1/.../ai/runs*`
- `/api/v1/.../ai/ledger*`
- `/api/v1/.../ai/cache*`
- `/api/v1/.../ai/evals*`
- `/api/v1/.../ai/incidents*`

## Required validation and gates

Blocking gates:
- `make -C ps-dev sprint111-validate`
- `make -C ps-dev contract-test-docker`
- `make -C ps-dev e2e-gate`

`Sprint111-validate` must include, at minimum:
- provider registry smoke
- model registry smoke
- template preview / lifecycle smoke
- policy / quota / budget enforcement smoke
- run audit / replay / compare smoke
- ledger attribution smoke
- cache governance smoke
- eval run smoke
- redaction / provider safety smoke
- UI smoke for AI Management surfaces
- regressions from prior AI-integrated surfaces that S111 touches

## Required regression posture

S100–S110 remain hard-blocking via umbrella targets in `sprint111-validate`.

## Required implementation order
1. `ps-contracts`
2. `ps-api`
3. `ps-web`
4. `ps-dev/tests`
5. evidence wiring

## Non-goals

Do not turn S111 into:
- MFA/signup work
- remote deployment work
- unrestricted autonomous agent behavior
- cross-tenant public AI sharing
- fuzzy semantic cache platform
- generic chat improvements with no management value

## Closeout standard

S111 is not complete until:
- required artifact paths in `S111-evidence.json` resolve
- archive IDs are backfilled
- mirror files are synchronized
- `lock-check.json` is present as required evidence
- tags are created from `poc-calculator`

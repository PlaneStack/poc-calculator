# PlaneStack — Sprint 106 Pack
**Sprint:** 106  
**Theme:** Design-to-Operate Blueprints  
**Status:** Complete  
**Date:** 2026-03-09

## Intent
Sprint 106 is the sprint that must close the gap between **design intent** and **operating truth**.

By the end of this sprint, PlaneStack should be able to represent a governed **Blueprint** for a project’s runtime topology and use that Blueprint to derive, validate, and reconcile the Operate model for local execution:

- services/components,
- dependencies,
- ports,
- health/readiness hooks,
- required resources,
- startup profiles,
- governed local actions,
- runbook applicability,
- and remediation hints.

Sprint 106 is complete only if `poc-calculator` proves an end-to-end loop where:
1. a scoped work/design intent is captured as a Blueprint,
2. the Blueprint derives or validates the Operate model,
3. drift between declared design and active operate artifacts is explainable,
4. the user can operate the resulting local system through governed Operate flows,
5. evidence proves the whole chain.

## Why this sprint exists
PlaneStack now has strong foundations in:
- artifact-native system-of-record
- work / scope / promotion
- commands / processors / runs / evidence
- governed runbooks and local actions
- user-defined environments
- bridge-supervised sessions
- effective execution resolution and guided remediation

The remaining product gap is that these runtime artifacts can still drift away from the project’s intended topology and operating design.

Sprint 106 introduces a first-class **Blueprint** layer so PlaneStack can connect:
- **Work / Scope / Design**
to
- **Resources / Profiles / Actions / Runbooks**
to
- **Operate / Runs / Sessions / Evidence**

without forcing users to hand-maintain all of those pieces independently.

## Completion bar (deep, completion-oriented)
Sprint 106 is complete only if **all** of the following land end to end:

1. **Blueprints are first-class governed artifacts**
   - A project can define one or more runtime/design Blueprints as governed project truth.
   - Blueprints are versioned, previewable, activatable, and evidence-backed.

2. **Blueprints derive and/or validate Operate artifacts**
   - Blueprint processing can derive or reconcile:
     - resources
     - startup profiles
     - governed actions
     - runbook applicability
     - recommendation rules
   - Derivation is deterministic and explainable.
   - Resulting artifacts remain governed project truth, not bridge-local state.

3. **Drift detection is real**
   - PlaneStack can compare the active Blueprint against:
     - active resources
     - active startup profiles
     - bound runbooks/actions
     - effective operate topology
   - Drift is categorized, evidenced, and explained.

4. **Work / Scope can drive Blueprint suggestions**
   - Work items / scope context can recommend or propose Blueprint changes.
   - Users can see why a Blueprint is suggested or considered incomplete.

5. **Blueprints improve Operate usability**
   - Operate can show services/dependencies/readiness from the active Blueprint.
   - Users can see which runtime artifacts came from blueprint derivation vs explicit manual governance.

6. **Calculator gold Blueprint proof is real**
   - `poc-calculator` has a Blueprint that successfully derives or validates the project’s resources, startup profile(s), actions, and runbook applicability.
   - At least one intentional drift case is detected, surfaced, and resolved back to green.

7. **Validation and proof are strict**
   - `sprint106-validate`
   - `contract-test-docker`
   - `e2e-gate`
   all pass.
   - Missing required evidence is a closeout failure.

## Hard design locks

### 1. Blueprint is project truth
Blueprints live in project-root governed artifacts only.
They are not generated or mutated by bridge-local runtime state.

### 2. Blueprints do not replace Operate artifacts magically
Blueprints may:
- derive draft operate artifacts,
- validate active operate artifacts,
- detect drift,
- explain reconciliation suggestions.

Blueprints do **not** silently mutate active project truth without explicit governed activation.

### 3. Commands / processors / runs / evidence remain intact
S106 must reuse the existing model:
- command = authoritative mutation/request
- processor = async/slow derivation/validation work
- run/session = execution lineage
- evidence = proof trail

### 4. Project truth vs bridge-local overlay remains strict
Blueprints, resources, profiles, actions, runbooks, recommendation rules, and reconciliation state are project truth.
Bridge-local overlays remain local-only and may not back-write Blueprint truth.

### 5. Derivation and reconciliation must be explainable
Every generated/reconciled artifact must be able to answer:
- which Blueprint version it came from,
- what mapping rules were used,
- what defaults were applied,
- what remained unresolved,
- and what drift still exists.

### 6. No deployment / upper-environment expansion
Sprint 106 remains focused on local design-to-operate alignment.
No remote deployment pipeline scope is introduced.

## Canonical governed files
Sprint 106 introduces these canonical project-root files:

- `.planestack/governance/design/blueprints.json`
- `.planestack/governance/design/blueprint-mappings.json`
- `.planestack/governance/design/blueprint-drift-rules.json`

Derived/validated Operate targets remain:

- `.planestack/governance/operate/resources.json`
- `.planestack/governance/operate/startup-profiles.json`
- `.planestack/governance/operate/actions.json`
- `.planestack/governance/operate/recommendations.json`

## Scope

### Epic 106.1 — Blueprint contract and storage
Introduce Blueprints as governed design/runtime topology artifacts.

#### Deliverables
- Canonical Blueprint schema
- Canonical Blueprint mappings schema
- Blueprint lifecycle: draft / active / archived
- API routes for list/get/upsert/activate/archive/preview/derive/validate
- UI surfaces for library/detail/preview/drift state

#### Blueprint minimum fields
- `blueprint_key`
- `version`
- `title`
- `description`
- `scope_tags[]`
- `services[]`
- `dependencies[]`
- `ports[]`
- `readiness_checks[]`
- `resource_refs[]`
- `recommended_profiles[]`
- `recommended_actions[]`
- `runbook_bindings[]`
- `environment_applicability[]`
- `lifecycle_state`
- `derived_artifact_refs[]`
- `integrity`

#### Tasks
- Add `operate-blueprint.schema.json` and supporting schemas in `ps-contracts`
- Add OpenAPI route family for Blueprint operations
- Add validation rules for service graph, required refs, and key uniqueness
- Add lifecycle commands and evidence wiring
- Add canonical file write/read support

### Epic 106.2 — Blueprint → Operate derivation
Allow Blueprint processing to produce governed Operate drafts or validated reconciliations.

#### Deliverables
- Derivation engine that can produce:
  - resource drafts
  - startup profile drafts
  - action applicability bindings
  - runbook applicability bindings
  - recommendation draft mappings
- Derivation preview with explicit provenance
- Activation flow for accepted derived outputs

#### Tasks
- Define deterministic mapping rules from Blueprint service graph to:
  - resources
  - startup profiles
  - actions
  - runbook applicability
- Implement derivation preview endpoint and evidence artifact
- Implement derivation apply path that writes draft artifacts only
- Add UI preview showing generated outputs and unresolved gaps
- Add contract tests for stable derivation outputs
- Add regression tests ensuring derivation never bypasses activation

### Epic 106.3 — Drift detection and reconciliation
Detect and explain drift between design intent and active Operate truth.

#### Drift classes
- missing_resource
- extra_resource
- profile_mismatch
- action_binding_mismatch
- runbook_binding_mismatch
- readiness_mismatch
- service_graph_mismatch
- unresolved_mapping
- contract_violation

#### Deliverables
- Drift scan endpoint and evidence
- Drift summary UI
- Reconciliation preview
- Reconciliation apply path (draft-only or explicit governed mutation)

#### Tasks
- Define drift taxonomy contract
- Implement drift scan against active governed operate files
- Add drift severity + operator message + next actions
- Add reconciliation suggestions for safe cases
- Keep unsafe or ambiguous cases manual-review only
- Persist drift evidence and reconciliation evidence

### Epic 106.4 — Work / Scope → Blueprint linkage
Connect work context to Blueprint generation/selection.

#### Deliverables
- Recommendation rules from work/scope/goals to Blueprint
- Blueprint status surfaced in Work/Center context
- Suggested Blueprint creation/upgrade from active work context

#### Tasks
- Extend recommendation rules to include blueprint targets
- Add work-context API for blueprint recommendation
- Surface "recommended blueprint" in relevant UI
- Add evidence for why a blueprint was suggested
- Add deterministic tie-break rules

### Epic 106.5 — Operate UX from Blueprint truth
Make Operate aware of blueprint-derived runtime intent.

#### Deliverables
- Operate surfaces show active Blueprint summary:
  - services
  - dependencies
  - profile coverage
  - action coverage
  - drift state
- UI labels indicating:
  - blueprint-derived
  - manually governed
  - drifted
  - unresolved

#### Tasks
- Add Blueprint panel to Operate overview/detail
- Add service graph summary view
- Add profile/action/runbook applicability summary
- Add drift badges and explanation panels
- Add empty-state and unresolved-state UX
- Ensure no blank-canvas failure modes

### Epic 106.6 — Calculator gold Blueprint proof
Prove the full design-to-operate flow for `poc-calculator`.

#### Required proof bundle
- Blueprint exists and activates successfully
- Resource derivation/validation passes
- Startup profile derivation/validation passes
- Action catalog applicability is correct
- Runbook applicability is correct
- At least one intentional drift case is detected
- Reconciliation returns the system to green
- Operate can start and run from the reconciled model

#### Tasks
- Create Calculator Blueprint
- Bind Blueprint to current resources/profiles/actions/runbooks
- Create one intentional drift scenario
- Record drift detection evidence
- Reconcile and rerun successful session
- Capture screenshots / summaries / evidence refs

## API / contract surface
Canonical S106 route family:

### Blueprints
- `GET /api/v1/ou/:ouKey/p/:projectKey/design/blueprints`
- `GET /api/v1/ou/:ouKey/p/:projectKey/design/blueprints/:blueprintKey`
- `POST /api/v1/ou/:ouKey/p/:projectKey/design/blueprints:upsert`
- `POST /api/v1/ou/:ouKey/p/:projectKey/design/blueprints/:blueprintKey:activate`
- `POST /api/v1/ou/:ouKey/p/:projectKey/design/blueprints/:blueprintKey:archive`
- `POST /api/v1/ou/:ouKey/p/:projectKey/design/blueprints/:blueprintKey:preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/design/blueprints/:blueprintKey:derive`
- `POST /api/v1/ou/:ouKey/p/:projectKey/design/blueprints/:blueprintKey:drift-scan`
- `POST /api/v1/ou/:ouKey/p/:projectKey/design/blueprints/:blueprintKey:reconcile-preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/design/blueprints/:blueprintKey:reconcile-apply`

### Work linkage
- `GET /api/v1/ou/:ouKey/p/:projectKey/design/blueprints:recommend?work_item_key=...`

## Role / permission posture
- list/get/preview/drift-scan/recommend: authenticated read-capable roles
- derive/reconcile-preview: operator-capable roles
- upsert/activate/archive/reconcile-apply: `org_admin | project_admin`

## Idempotency and preview binding
- `Idempotency-Key` required on:
  - upsert
  - activate
  - archive
  - derive
  - reconcile-apply
- preview/derive/reconcile-preview must return:
  - `plan_hash`
  - `confirm_token`
- apply operations must require both when applicable

Replay window: **15 minutes**

## Evidence model
Required evidence roots include:

- `.planestack/governance/evidence/s106/blueprints/library.json`
- `.planestack/governance/evidence/s106/blueprints/preview.json`
- `.planestack/governance/evidence/s106/blueprints/derive.json`
- `.planestack/governance/evidence/s106/blueprints/drift-scan.json`
- `.planestack/governance/evidence/s106/blueprints/reconcile-preview.json`
- `.planestack/governance/evidence/s106/blueprints/reconcile-apply.json`
- `.planestack/governance/evidence/s106/blueprints/work-recommendation.json`
- `.planestack/governance/evidence/s106/blueprints/calculator-gold-proof.json`
- `.planestack/governance/evidence/s106/blueprints/blocked-flows.json`
- `.planestack/governance/evidence/s106/closeout-evidence-check.json`

Blocked-flow evidence schema sections:
- `validation_400`
- `authz_403_404`
- `policy_blocked`

## Validation
S106 must add:

- `s106-blueprint-library-smoke`
- `s106-blueprint-derive-smoke`
- `s106-blueprint-drift-smoke`
- `s106-blueprint-reconcile-smoke`
- `s106-work-blueprint-recommendation-smoke`
- `s106-operate-blueprint-ui-smoke`
- `s106-calculator-gold-proof`
- `s106-closeout-evidence-check`
- `sprint106-validate`

### Regression policy
S100–S105 regressions are **hard-blocking** in `sprint106-validate`.

### e2e-gate policy
Keep S106-specific UI tests in `sprint106-validate` unless one happy-path Blueprint flow proves extremely stable; then promote at most one in a later sprint.

## Calculator gold proof bar
Minimum deterministic proof set:
- 1 baseline blueprint activation success
- 1 blueprint derivation success
- 1 intentional drift detection proof
- 1 reconciliation success
- 1 operate session success from reconciled model
- 1 work→blueprint recommendation proof

## Non-goals
Sprint 106 explicitly excludes:
- MFA / signup / external reviewer expansion
- remote deployment / upper environment rollout
- public/global blueprint sharing
- cross-OU sharing
- arbitrary shell execution
- replacing governed operate artifacts with purely generated runtime state

## Implementation order
Proceed in locked tranche order:

1. `ps-contracts`
2. `ps-api`
3. `ps-web`
4. `ps-dev/tests`
5. evidence wiring

## Closeout requirements
Sprint 106 closes only when:
- `sprint106-validate` PASS
- `contract-test-docker` PASS
- `e2e-gate` PASS
- all required artifact paths in `S106-evidence.json` resolve
- archive + closeout evidence written
- archive IDs backfilled
- tags created from `poc-calculator`:
  - `sprint106-pass-YYYY-MM-DD`
  - `sprint106-evidence-YYYY-MM-DD`

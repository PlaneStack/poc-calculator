# Sprint 130 Pack
## Theme
**Manage Excellence II — Admin + Integrations + Configuration Spine**

## Why this sprint exists
Sprint 130 is intentionally **much larger** than the earlier narrow recommendation. The goal is not just to make one Manage surface better; it is to push **two under-strength planes** (`manage > admin` and `manage > integrations`) upward together, while also improving the configuration and trust continuity that flows into **work**, **jobs**, **governance**, and **operate**.

This sprint is the "configuration and trust spine" sprint:
- Admin becomes the trusted source for system, environment, component, preference, and demo posture.
- Integrations becomes the trusted source for credentials, writeback policy, and writeback center.
- Downstream planes consume that truth cleanly instead of inventing shadow state.

## Primary plane targets
### `manage > admin`
Surfaces:
- demo
- system
- environments
- components
- preferences

### `manage > integrations`
Surfaces:
- credentials
- writeback-policy
- writeback-center

## Secondary continuity targets
- `work` — component truth and planning trust
- `runs` — execution prerequisites / credential visibility / writeback readiness
- `governance` — policy and activation clarity
- `operate` — environment trust and local operator configuration readiness

## Strategic intent
This sprint should materially increase the likelihood that both `admin` and `integrations` can move from "useful" to "strong / near-exceptional" by:
1. making canonical configuration truth inspectable and actionable
2. removing configuration ambiguity before downstream actions fail
3. surfacing next-required-action clearly
4. preserving no-shadow-truth discipline
5. strengthening cross-plane drill-through between configuration and usage

## Non-negotiable invariants
- Canonical product taxonomy remains **Center / Plan / Jobs / Review / Observe / Operate / Manage**.
- `ai-management` remains the only AI control plane.
- Admin and Integrations must **not** create duplicate shadow truth for planes that already own canonical operational state.
- Components remain canonical shared truth, reusable by Plan, Jobs, Governance, and Operate.
- Writeback policy remains governed and explicit; approval remains distinct from activation.
- Evidence remains canonical only when written into governed `.planestack/**` paths.
- Internal compatibility may persist where necessary, but no new user-facing canonical labels should regress to older wording.

## S130 must-have outcomes
### A. Admin becomes a trusted configuration home
Users should be able to answer:
- what system/demo posture is active?
- which environments exist and what is their readiness?
- which components exist and where are they used?
- what preferences/configuration matter for this project or operator?
- what is missing or risky right now?

### B. Integrations becomes a trusted writeback/credential home
Users should be able to answer:
- which credentials exist and are usable?
- what writeback policies are in effect?
- what is the current writeback center posture?
- what is blocked because of integration/config state?
- what is the next safe action?

### C. Cross-plane drill-through works
Users should be able to move cleanly from:
- work item / task / sprint -> component
- run / workflow -> integration / writeback policy context
- approval / blocked review -> activation / writeback policy context
- operate environment / session -> admin environment + integration readiness context

## Success bar
S130 is successful only if:
1. **admin** surfaces feel like canonical configuration truth, not scattered settings pages
2. **integrations** surfaces feel trustworthy enough to explain writeback readiness and block reasons
3. downstream planes can drill into admin/integration truth without lineage loss
4. no major shadow-state loopholes are introduced
5. at least two Manage-plane surfaces reach "strong-to-near-exceptional" quality in both UX and canonical truth

## Scope posture
This sprint is intentionally broad. It should include enough parallel work to justify the startup cost of a sprint:
- admin system/environment/component/preferences improvements
- integrations credentials/writeback-policy/writeback-center improvements
- cross-plane read-model and drill-through support
- proof and validation for configuration trust
- truth refresh updates

## Primary deliverables

### 1. Admin system truth
Deliver:
- `GET /manage/admin/system`
- trusted system posture projection
- active/incomplete/risky sections
- next-required-action guidance
- explicit environment + integration dependencies where applicable

### 2. Admin environments trust
Deliver:
- `GET /manage/admin/environments`
- `GET /manage/admin/environments/:environmentId`
- environment readiness projection
- readiness reasons and next actions
- drill-through to operate environment context
- drill-through to integrations / credentials / writeback readiness where relevant

### 3. Admin components trust
Deliver:
- `GET /manage/admin/components`
- `GET /manage/admin/components/:componentId`
- component usage/trust overview
- cross-plane linkage into work, jobs, and operate
- no planning-only component shadow state

### 4. Admin preferences + demo posture
Deliver:
- `GET /manage/admin/preferences`
- `GET /manage/admin/demo`
- visible current posture
- explicit "active vs available" distinction
- no hidden configuration ambiguity

### 5. Integrations credentials trust
Deliver:
- `GET /manage/integrations/credentials`
- `GET /manage/integrations/credentials/:credentialId`
- credential posture summaries:
  - configured
  - incomplete
  - blocked
  - usable
- downstream usage visibility (where used / what it enables)

### 6. Integrations writeback-policy trust
Deliver:
- `GET /manage/integrations/writeback-policy`
- policy summary + detail + gating explanation
- activation and readiness posture shown clearly
- drill-through from blocked review / operate / writeback surfaces

### 7. Integrations writeback-center trust
Deliver:
- `GET /manage/integrations/writeback-center`
- trusted operational summary:
  - readiness
  - policy posture
  - recent activity
  - next required action

### 8. Cross-plane configuration drill-through
Required drill-through paths:
- work item/task -> admin component detail
- run/workflow -> writeback-policy or credential context
- governance blocked/approval -> writeback-policy context
- operate environment/session -> admin environment + integration readiness context

### 9. Exceptional-range targets
Primary hard-bar surfaces:
- `manage/admin/system`
- `manage/admin/environments`
- `manage/admin/components`
- `manage/integrations/credentials`
- `manage/integrations/writeback-policy`
- `manage/integrations/writeback-center`

Secondary uplift:
- `manage/admin/preferences`
- `manage/admin/demo`

## API / contract lock summary
Canonical read routes:
- `GET /manage/admin/system`
- `GET /manage/admin/demo`
- `GET /manage/admin/environments`
- `GET /manage/admin/environments/:environmentId`
- `GET /manage/admin/components`
- `GET /manage/admin/components/:componentId`
- `GET /manage/admin/preferences`
- `GET /manage/integrations/credentials`
- `GET /manage/integrations/credentials/:credentialId`
- `GET /manage/integrations/writeback-policy`
- `GET /manage/integrations/writeback-center`

Mutating routes may be added where already consistent with existing patterns, but S130 should prioritize trusted read-model quality and safe explicit actions over broad mutation expansion.

## Data-model expectations
Admin / Integrations must expose:
- canonical identity refs
- readiness / posture status
- reason codes
- next required action
- source truth refs
- downstream usage refs
- drill-through refs

No surface may hide whether a state is:
- configured but inactive
- active but degraded
- blocked by missing dependency
- blocked by policy
- blocked by missing credential
- blocked by environment/system readiness

## Proof paths

### Proof A — Admin environment trust
- user opens Admin Environments
- sees at least one environment in non-ideal state
- sees readiness state + reason code + next required action
- drills through from environment detail into matching Operate context without lineage loss

### Proof B — Component trust continuity
- user opens Admin Components
- selects one component
- sees linked usage from Work and Jobs (or Operate where available)
- component linkage remains consistent across drill-through

### Proof C — Integration / writeback policy trust
- user lands in Integrations Writeback Policy
- sees current writeback policy posture and activation/gating context
- drills from blocked or readiness context into this policy view
- understands why action is allowed, blocked, or pending

### Proof D — Credential / writeback center trust
- user opens Credentials and Writeback Center
- sees which credential posture is blocking or enabling action
- sees next required action
- transitions to the relevant downstream context without losing source linkage

## Non-goals
- broad AI-management expansion
- deep new Concierge capability
- new top-level navigation
- major Observe or Jobs redesign
- shadow admin/config state that duplicates downstream truth
- heavy mutation tooling beyond what is needed to make trust and readiness visible

## Tranche order
1. `ps-contracts`
2. `ps-api`
3. `ps-web`
4. `ps-dev/tests`
5. proof-fixture wiring in `poc-calculator`
6. truth refresh / mirror / closeout

## Validation requirements
Required:
- `sprint130-validate`
- `contract-test-docker`
- `e2e-gate`

Required sprint-specific proofs:
- `s130-admin-environments-smoke`
- `s130-admin-components-smoke`
- `s130-integrations-policy-smoke`
- `s130-manage-ui-smoke`
- `s130-truth-refresh`
- `s130-write-validate-summary`
- `s130-closeout-evidence-check`

## Truth refresh requirements
Must update/review:
- `PlaneStack-App-Navigation-Map.md`
- `PlaneStack-Navigation-IA-v2-Developer-Instructions.md`
- `navigation-menu-ia-current.md`
- `PlaneStack-Truth-Index.md` if taxonomy or route-posture wording changes
- `PlaneStack-Product-Knowledge.v4.md` or successor
- `WORK-HISTORY.v5.md` or successor
- `.planestack/sprints/S130/{pack,runlog,evidence,manifest}` mirror

## Repo-by-repo expected deltas

### ps-contracts
- manage/admin read-model contract additions
- integrations read-model contract additions
- reason-code / readiness enums
- drill-through ref model
- OpenAPI coverage for S130 routes

### ps-api
- trusted admin projections
- trusted integration projections
- cross-plane usage/drill-through assembly
- no-shadow-truth guardrails
- deterministic readiness / next-action logic

### ps-web
- admin system/environments/components/preferences/demo UX
- integrations credentials/writeback-policy/writeback-center UX
- cross-plane drill-through UX
- exceptional-range empty states and no-data states
- trustworthy labels and state copy

### ps-dev
- S130 harness
- smoke paths
- UI smoke
- truth refresh / closeout checks
- validation wrappers

### poc-calculator
- proof fixtures that demonstrate component/environment/credential/writeback continuity
- S130 evidence and mirror outputs

## Exit criteria
S130 may close only if:
- the six hard-bar surfaces are materially implemented and validated
- cross-plane drill-through works without lineage loss
- no unexpected historical drift is folded into S130 provenance
- truth refresh is complete
- all required gates pass

## Notes
This sprint is intentionally **larger and broader** than the earlier lighter recommendation. It is meant to spend the startup cost of a sprint on two under-strength planes at once and to raise the product’s configuration-trust backbone, not just one page cluster.

# Sprint 127 Pack

**Sprint:** S127  
**Theme:** Manage Excellence: Integrations + Admin Reliability with AI Management Continuity  
**Status:** Planned / Development Pack  
**Date:** 2026-03-14

## 1. Sprint intent

Sprint 127 targets the next remaining lower-scored planes after the recent Center → Work → Runs → Governance/Reviews → Operate → Observe buildout:
- `manage > integrations`
- `manage > admin`

This sprint is **not** a new architecture sprint. It is a **product-hardening and operator-trust sprint** for the Manage plane, with explicit continuity to:
- `ai-management` as the only AI control plane
- governed writeback policy truth
- environment/system/admin trust
- cross-plane operational continuity from Review / Operate / Observe into Manage

## 2. Why S127 now

The PlaneStack journey has already deepened:
- first-run / bootstrap
- planning
- jobs / execution
- review / governance
- operate
- observe

The remaining meaningful plane-level gaps are the lower-scored Manage subplanes:
- `integrations` (credentials, writeback-policy, writeback-center)
- `admin` (system, environments, components, preferences, demo)

S127 is intended to raise those from "useful" to "strong / near-exceptional" by making:
- credentials and validation trustworthy
- writeback policy posture explicit and auditable
- admin system/environment/component truth easier to inspect and act on
- deep-link continuity into the right admin/integration context from execution, governance, and operate surfaces

## 3. Canonical IA scope

### Mode
- `manage`

### Planes
- `integrations`
- `admin`

### In-scope surfaces

#### `manage > integrations`
- `credentials`
- `writeback-policy`
- `writeback-center`

#### `manage > admin`
- `demo`
- `system`
- `environments`
- `components`
- `preferences`

### Hard continuity rules
1. `ai-management` remains the only AI control plane.
2. `integrations` and `admin` must reuse canonical truth; no shadow configuration state.
3. user-facing taxonomy remains canonical-only.
4. writeback policy editing must preserve `approve != activate`.
5. system/environment readiness shown in Manage must agree with Operate / Review / Jobs linked contexts.

## 4. Sprint goals

1. Make **Integrations** feel trustworthy:
   - credentials are understandable, validated, and safely error-reported
   - writeback policy state is visible and auditable
   - writeback center feels like the authoritative integration-action surface

2. Make **Admin** feel operator-useful:
   - system health/config posture is readable
   - environments and components are useful for planning/operate continuity
   - preferences/demo surfaces stop feeling secondary or placeholder

3. Create strong cross-plane continuity:
   - Run/Jobs → Integrations when provider/credential/policy context matters
   - Review/Governance → Integrations for policy/activation context
   - Operate → Admin for environment/component/system context

## 5. In-scope deliverables

### A. Integrations excellence
- credential list/detail with validation posture and last validation result
- explicit provider status / health / configuration visibility
- writeback policy list/detail/history activation posture
- writeback center showing:
  - pending writeback-related actions
  - relevant policy refs
  - validation failures / next actions
- deterministic safe error/redaction behavior for provider/credential failures

### B. Admin excellence
- system summary / health projection
- environment list/detail with authoritative admin posture
- component list/detail continuity from planning and operations
- preferences that actually reflect canonical current user/project settings
- demo surface upgraded into a valid "guided environment" / showcase support surface instead of dead weight

### C. Cross-plane deep links
- Jobs / Review / Operate surfaces can deep-link to the exact relevant:
  - credential
  - writeback policy
  - writeback center context
  - admin environment
  - admin component
- all deep links must preserve source context and return path

### D. Exceptional-range uplift targets
Hard focus surfaces:
- `manage/integrations/credentials`
- `manage/integrations/writeback-policy`
- `manage/integrations/writeback-center`
- `manage/admin/system`
- `manage/admin/environments`
- `manage/admin/components`

Secondary:
- `manage/admin/preferences`
- `manage/admin/demo`

## 6. Non-goals

- no new top-level modes or planes
- no second AI control plane outside `ai-management`
- no broad provider expansion beyond what current truth already supports
- no generalized multi-tenant admin redesign
- no secret-bearing raw error disclosure in UI
- no shadow config DB replacing artifact / canonical truth
- no writeback autopilot expansion

## 7. Repo-by-repo deltas

### ps-contracts
- additive OpenAPI/routes for:
  - credential detail/validate/history if missing
  - writeback policy detail/history/activation projections
  - writeback center projections
  - admin system/environment/component detail/list projections
  - cross-plane linkage fields where required
- schema updates for:
  - credential validation status
  - provider health / readiness
  - policy activation posture
  - admin environment / component summary
- keep artifact-native refs canonical where applicable

### ps-api
- server-backed projections for:
  - integrations credentials
  - provider health
  - writeback policy posture and activation distinction
  - writeback center action feed
  - admin system/environment/component state
- safe redaction/error normalization
- deep-link context support
- ensure linked contexts agree with Run / Review / Operate truth

### ps-web
- stronger integrations/admin surfaces
- detail panels with clear next actions
- cross-plane continuity links
- zero dead-end empty states on focus surfaces
- clear "why blocked / what next" affordances where policy/credential/environment issues apply

### ps-dev
- `sprint127-validate`
- `s127-integrations-smoke.sh`
- `s127-admin-ui-smoke.sh`
- `s127-truth-refresh.sh`
- `s127-write-validate-summary.sh`
- `s127-closeout-evidence-check.sh`
- deterministic fixtures for:
  - invalid credential / validation failure
  - policy approved but not active
  - environment/admin mismatch resolved through admin truth
  - component continuity from planning/operate into admin

### poc-calculator
- proof fixtures and S127 evidence outputs only
- no unrelated historical drift folded into closeout

## 8. Canonical proof paths

### Proof A — Credential trust + validation visibility
1. Open `manage > integrations > credentials`
2. Inspect one credential with deterministic validation posture
3. Run/refresh validation
4. See safe result state and next action
5. Confirm no sensitive raw credential data is disclosed

### Proof B — Policy trust: approval != activation
1. Open `manage > integrations > writeback-policy`
2. See policy approved
3. Activation still pending / ready
4. Activate explicitly
5. Confirm activation state changes and previous active policy posture is visible

### Proof C — Cross-plane continuity to Manage
1. Start from a run/review/operate context with policy/credential/environment relevance
2. Deep-link into exact Manage target
3. See preserved source context
4. Resolve/inspect issue in Manage
5. Return path remains clear

### Proof D — Admin environment/component trust
1. Open `manage > admin > environments`
2. Inspect environment readiness / configuration
3. Open linked component detail
4. Confirm component linkage agrees with planning/operate truth
5. See at least one derived next action on the relevant admin surface

## 9. Validation / closeout bar

Required green:
- `s127-integrations-smoke`
- `s127-admin-ui-smoke`
- `s127-truth-refresh`
- `s127-write-validate-summary`
- `sprint127-validate`
- `contract-test-docker`
- `e2e-gate`

### Exceptional-range scorecard (required)
Score these surfaces:
- integrations/credentials
- integrations/writeback-policy
- integrations/writeback-center
- admin/system
- admin/environments
- admin/components

Thresholds:
- `integrations/writeback-policy`, `admin/environments`, `admin/components` >= 4.0 overall
- remaining focused surfaces >= 3.8 overall
- no focused surface may have any scored dimension < 3.0
- overall aggregate across focused surfaces >= 3.9

## 10. Truth refresh (mandatory)

Required review/update targets:
- `PlaneStack-App-Navigation-Map.md`
- `PlaneStack-Navigation-IA-v2-Developer-Instructions.md`
- `navigation-menu-ia-current.md`
- `PlaneStack-Truth-Index.md` if taxonomy/route posture changes
- `PlaneStack-Product-Knowledge.v4.md` or successor
- `WORK-HISTORY.v5.md` or successor
- S127 mirror under `.planestack/sprints/S127/{pack,runlog,evidence,manifest}`

If S127 materially deepens Manage plane semantics, roadmap/spec refresh is mandatory.

## 11. Success bar

S127 is successful when:
- users trust Integrations enough to diagnose and resolve credential/policy issues without shell access or guesswork
- users trust Admin enough to understand environment/component/system posture as canonical truth
- Manage no longer feels like a collection of utility pages; it feels like an operator-grade control plane
- cross-plane continuity into Manage is obvious and preserved
- closeout proves this with deterministic evidence, not subjective screenshots alone

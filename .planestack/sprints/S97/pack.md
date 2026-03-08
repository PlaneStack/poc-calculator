# PlaneStack — Sprint 97 Pack
**Sprint:** 97  
**Theme:** Operate v3 — Managed Environments, Remote Readiness, and Enterprise Operator UX (Strong target)  
**Status:** Plan (locked for implementation)  
**Date:** 2026-03-08

## Intent
Sprint 97 is the **management / production-readiness sprint** for PlaneStack’s local-first operating model.

Sprint 93 established Operate as a local-first mission-control surface. Sprint 94 added history, runbooks, and monitoring/alerting scaffolds. Sprint 95 added governed objectives, escalation policy, Chronicle hooks, and shared metrics SOT. Sprint 96 converged reporting on that substrate. Sprint 97 now turns that foundation into an **enterprise-grade operator and management surface** by introducing managed environments, read-only remote readiness, stronger operator UX, and admin-grade access/MFA visibility.

This sprint remains **vendor-neutral, deterministic, authenticated, and pre-deployment**:
- no deployments
- no pipeline/CD tooling
- no remote writeback
- no anonymous access
- no UI-local truth for readiness/reporting

## Governance preflight
All Sprint 97 work-producing runs must honor the current governance and filesystem invariants.

- `project_root` and `bridge_root` remain distinct filesystem roots.
- Governed outputs and versioned evidence are written only under `project_root` (for example `poc-calculator/.planestack/**`).
- Scratch workspaces, caches, temp files, and ephemeral logs remain under `bridge_root`.
- Work-producing runs must set:
  - `SPRINT_CODE=S97`
  - `PS_WORK_PRODUCING=1`
- Validation and any work-producing sequence must begin with:
  - `make -C ps-dev governance-lock-check`
- Lock-check evidence must be written under:
  - `.planestack/governance/evidence/s97/lock-check.json`

Any run that violates the sprint env contract, writes governed outputs outside `project_root`, or writes scratch into `project_root` is invalid for closeout.

---

## Why Sprint 97 now
Sprint 95 made Operate measurable, explainable, enforceable, and reportable. Sprint 96 converged the reporting layer so Chronicle / Insights / Operate / Center do not aggregate overlapping metrics independently. The remaining management branch is therefore to make Operate suitable for **real production-adjacent management** without crossing into deployment orchestration.

This sequencing is enterprise-correct because it:
- advances the deferred **Operate remote readiness** branch after Sprint 96 reporting convergence
- strengthens client-side/operator surfaces rather than building more analytics first
- preserves the local-first, vendor-neutral posture
- improves management and review surfaces without introducing mutable production actions

---

## Governing posture (Sprint 97 locks)
These locks are non-negotiable.

### 1) Managed environments are governed config
Sprint 97 introduces the canonical managed-environment file:

- `.planestack/governance/operate/environments.json`

This file is the authoritative source for managed Operate environments and must be schema-versioned.

Minimum per-environment fields:
- `env_key`
- `label`
- `mode` = `local | remote_readonly`
- `status_policy_ref`
- `objective_refs`
- `auth_profile_ref` (optional for local; required for authenticated remote capture/probes)
- `runbook_refs`
- `owner_refs`
- `allowed_probe_refs`
- `draft_state` = `draft | active | archived`

No second environment registry may be created.

### 2) Auth profiles are governed, vaulted, and separate
Sprint 97 introduces the canonical auth-profile file:

- `.planestack/governance/operate/auth-profiles.json`

This file contains only governed metadata and vaulted reference ids, never raw secrets.

Minimum per-profile fields:
- `auth_profile_key`
- `method` = `cookie | bearer | basic | none`
- `vault_ref`
- `allowlist_ref`
- `scopes`
- `draft_state` = `draft | active | archived`

### 3) Remote readiness is read-only only
Managed remote environments are **read-only** in Sprint 97.

Allowed:
- readiness/status checks
- safe metadata collection
- objective evaluation from remote_readonly checks
- authenticated UI capture against allowlisted targets
- evidence capture and Chronicle event emission

Forbidden:
- deployments
- remote writeback
- mutable administrative actions
- remote approval/application flows
- general-purpose shell execution

### 4) Draft vs active remains explicit
Approval is not activation. Any managed environment or auth-profile config must preserve:
- `draft`
- explicit `activate`
- archive previous active when superseded

No silent in-place activation.

### 5) Operate remains cockpit; Chronicle remains reporting substrate
Operate may render shared metrics and managed-environment trend surfaces, but it must not create a separate reporting engine.
- reporting rollups remain Chronicle / shared SOT derived
- readiness and objective UIs render shared SOT data plus current run outcomes
- no duplicate aggregation logic for overlapping families

### 6) Enterprise client-side states must be explicit
For managed environment and operator surfaces, blank or ambiguous UI states are forbidden.

Required explicit states:
- `healthy`
- `at_risk`
- `breached`
- `insufficient_data`
- `blocked`
- `auth_failed`
- `unreachable`
- `disabled`

All of these must render with deterministic test ids and no-data/blocked UX.

### 7) Authenticated capture must remain tightly allowlisted
Authenticated UI capture is in scope only for allowlisted targets.
- strict domain/path allowlists
- SSRF blocking for private IPs / non-allowlisted targets
- vaulted auth-profile references only
- raw console/network evidence stored safely; safe summaries shown by default
- no open-ended browsing or public URL capture behavior

### 8) No anonymous access; MFA posture must surface in management UI
Sprint 97 strengthens enterprise management by surfacing:
- MFA enrollment state for privileged + external users
- access explainability on management actions
- invite-only / explicit-share posture for external reviewers

It does not introduce public links or anonymous review.

### 9) Validation remains three-track
Sprint 97 requires all three:
- `sprint97-validate`
- `contract-test-docker`
- `e2e-gate`

They remain independent and all are blocking for closeout.

### 10) Reuse the existing integrity discipline
All new S97 evidence artifacts must use the existing integrity rule:
- `sha256` of canonical JSON excluding `generated_at` and `integrity`

Do not introduce a new S97-specific hash scheme.

---

## Strong-score targets
Sprint 97 is successful when the following move to **Strong**:

| Capability | Current posture entering S97 | Strong in S97 means… |
| --- | --- | --- |
| Managed environments | New | Governed `draft/active/archive` model, schema versioning, runbook/owner/auth bindings, deterministic validation |
| Remote readiness | Emerging | Read-only checks with explicit blocked/auth_failed/unreachable states, evidence-backed outcomes, Chronicle hooks |
| Operator cockpit UX | Medium | Environment switcher, explicit state cards, timeline/reason codes, no blank states, deterministic test ids |
| MFA / access management surfaces | Medium | Status visible for privileged/external users, explainable gating, invite-only posture visible in UI |
| Authenticated UI capture V2 | Emerging | Allowlisted authenticated capture with vaulted auth refs, safe summaries, SSRF protection, evidence linkage |
| Managed-environment reporting | Medium | Chronicle / shared SOT rollups render in Operate without duplicate aggregation |

---

## Scope included
Sprint 97 is intentionally large. The scope is split into six epics.

### EPIC 97.1 — Managed environment governance
Objective: create the governed model for production-adjacent environments.

#### S97-101 Canonical environment registry
- Create `.planestack/governance/operate/environments.json`
- Add JSON schema + OpenAPI/registry entries
- Support `draft`, `active`, and `archived` environment records
- Bind environment profiles to:
  - objective refs
  - runbooks
  - owners
  - allowed probes
  - auth profiles
- Add archive-on-activate semantics

Acceptance:
- Environment profiles are schema-versioned governed config.
- Activation archives the previous active profile.
- Evidence records environment profile lifecycle.

#### S97-102 Auth profile governance
- Create `.planestack/governance/operate/auth-profiles.json`
- Add schema + API contracts + validation
- Store only metadata + vaulted refs
- Support allowlist refs and scope restrictions

Acceptance:
- No raw credential material is written into governed config.
- Invalid/missing auth-profile refs fail validation deterministically.

#### S97-103 Managed-environment admin surfaces
- Add managed-environment list/detail UI
- Show mode, owner, runbook, status policy, objective bindings, draft/active state
- Add explicit activate/archive affordances with explainability

Acceptance:
- Admin/operator can distinguish draft vs active immediately.
- Activation path is auditable and explainable.

---

### EPIC 97.2 — Remote-readonly readiness and objective execution
Objective: let Operate manage remote environments safely, without deployments.

#### S97-201 Remote-readonly probe execution
- Add remote-readonly probe execution path for allowlisted targets
- Support:
  - readiness URL checks
  - health endpoint checks
  - status metadata fetches
  - auth-required checks via vaulted auth profile
- Enforce explicit blocked/auth_failed/unreachable semantics

Acceptance:
- Remote probes are read-only and deterministic.
- Probe outcomes always produce explicit status semantics.

#### S97-202 Objective evaluation across managed environments
- Reuse S95 objective model for managed environments
- Bind objectives to environment profiles
- Evaluate readiness windows for `local` and `remote_readonly`
- Emit Chronicle events for:
  - readiness_check_completed
  - readiness_check_blocked
  - readiness_auth_failed
  - managed_environment_breached
  - managed_environment_recovered

Acceptance:
- Objective status is visible and evidence-backed per environment.
- Chronicle receives authoritative managed-environment events.

#### S97-203 Blocked and denial semantics
- Standardize blocked outcomes for:
  - allowlist deny
  - missing auth profile
  - auth failure
  - unreachable target
  - invalid probe definition
- Capture structured reason codes and safe summaries

Acceptance:
- No generic “failed” bucket is used when a more precise blocked/denied state exists.
- Blocked flows are testable and evidence-backed.

---

### EPIC 97.3 — Enterprise operator cockpit UX
Objective: make Operate genuinely trustworthy for daily management.

#### S97-301 Environment switcher and status model
- Add explicit environment switcher with:
  - `local`
  - `remote_readonly`
- Show badges, owner, runbook, and current objective state
- Show last successful check time and latest evidence hash

Acceptance:
- Operators can distinguish environment class and status at a glance.
- No environment surface relies on hidden/internal assumptions.

#### S97-302 Objective / escalation / incident timeline
- Add timeline surface for:
  - objective changes
  - escalation steps
  - incident open/append/recovery
- Show reason codes and linked evidence/runbooks

Acceptance:
- “Why is this red?” is answerable from the UI.
- Timeline renders explicit, linked state transitions.

#### S97-303 Explicit empty / blocked / auth-failed UX
- Add deterministic cards/components for:
  - no data
  - blocked
  - auth failed
  - unreachable
  - disabled
- Add test ids and Playwright proof

Acceptance:
- No blank canvas / empty chart / generic spinner states remain on covered surfaces.

---

### EPIC 97.4 — Management, access, and MFA surfaces
Objective: progress the enterprise management/admin side.

#### S97-401 MFA status surface
- Add MFA enrollment/sync view for:
  - privileged internal users
  - external users
- Show enrolled methods/status summary
- Surface “MFA required for this action” explainability where needed

Acceptance:
- MFA status is visible and testable in management UI.
- Privileged/external gaps are explicit, not hidden.

#### S97-402 External reviewer management posture
- Add or strengthen invite-only external management surface:
  - classification `external`
  - role template visibility
  - explicit share/revoke summary
  - review-only surface constraints
- Keep no-anonymous boundary intact

Acceptance:
- External access remains invite-only and explicitly governed.
- Review UX is simplified without exposing internal admin plumbing.

#### S97-403 Access explainability on management actions
- For protected Operate/admin actions, show:
  - actor role requirement
  - MFA requirement
  - allowlist or auth-profile prerequisite
  - reason when blocked

Acceptance:
- Denied actions are explainable from UI and evidence.

---

### EPIC 97.5 — Authenticated UI capture V2 for managed environments
Objective: harden client-side evidence capture to enterprise grade.

#### S97-501 Authenticated capture with allowlists
- Extend UI capture to support `auth_profile_id` for managed environments
- Enforce domain/path allowlists
- Block SSRF/non-allowlisted/private-IP targets
- Support environment-bound capture refs

Acceptance:
- Authenticated capture works only on allowlisted managed targets.
- Denied targets produce structured blocked evidence.

#### S97-502 Safe summaries and evidence linkage
- Capture:
  - snapshot artifact
  - safe console summary
  - safe network summary
- Link outputs into:
  - run evidence
  - managed environment history
  - Chronicle events where relevant

Acceptance:
- Safe summaries render by default.
- Raw sensitive blobs are referenced safely, not dumped into UI.

#### S97-503 Thin UI evidence placement
- Add/extend existing UI surfaces only:
  - Work Item UI Evidence section
  - Evidence facet
  - Operate / managed environment evidence view
- No new top-level nav required

Acceptance:
- Operators and reviewers can locate authenticated capture evidence without new IA sprawl.

---

### EPIC 97.6 — Validation, evidence, and closeout hardening
Objective: prove S97 is enterprise-grade, not just feature-complete.

#### S97-601 Sprint validation harness
Add `sprint97-validate` with:
- governance preflight
- managed-environment schema validation
- auth-profile validation
- remote-readonly readiness smoke
- blocked/auth_failed/unreachable smoke
- Chronicle event smoke for managed environments
- MFA/admin status smoke
- authenticated capture smoke
- operator UI smoke
- no-data/blocked UI smoke
- evidence summary writer

Acceptance:
- `sprint97-validate` passes end-to-end and writes governed evidence.

#### S97-602 Contract and E2E blocking gates
- `contract-test-docker` remains blocking
- `e2e-gate` remains separate and blocking
- protect `contract-test-docker` with single-flight/mutex and targeted infra cleanup
- repeated infra failure becomes an infrastructure incident artifact

Acceptance:
- Closeout requires all three gates to pass or an explicitly amended pack.

#### S97-603 Archive, tags, and evidence discipline
- Archive S97 via `library:archive_pack`
- Create/push tags from `poc-calculator`:
  - `sprint97-pass-YYYY-MM-DD`
  - `sprint97-evidence-YYYY-MM-DD`
- Capture final archive ids and closeout summary

Acceptance:
- Pack, runlog, evidence, manifest, archive receipts, and mirror files are in sync.

---

## Repo-by-repo work plan
### ps-contracts
- OpenAPI additions for:
  - managed environment operations
  - auth-profile metadata operations
  - readiness status / probe results
  - authenticated capture metadata
  - MFA/admin status surfaces
- JSON schemas:
  - `operate-environments.schema.json`
  - `operate-auth-profiles.schema.json`
  - `operate-readiness-result.schema.json`
  - `operate-managed-env-rollup.schema.json`
  - `ui-capture-authenticated.schema.json`
  - `mfa-status-summary.schema.json`
- Registry updates for new ops and governed files

### ps-api
- Managed-environment routes + validation
- Read-only readiness/probe execution
- Auth-profile lookup + allowlist enforcement
- Objective binding / Chronicle event emission
- MFA/admin status summary endpoints
- Safe summary generation for authenticated capture
- No duplicate metrics logic; Operate reporting remains shared-SOT based

### ps-web
- Managed environment list/detail
- Operate cockpit enhancements
- Explicit blocked/auth_failed/unreachable states
- MFA/admin status surfaces
- Thin authenticated capture UI additions
- No new top-level nav

### ps-dev
- Governance-preflight-aware S97 harness
- `sprint97-validate`
- new smoke scripts for:
  - managed environments
  - remote readiness
  - blocked/auth_failed
  - MFA status sync
  - authenticated capture
  - operator UI
  - Chronicle managed-environment rollups
- `contract-test-docker` + `e2e-gate` remain blocking

---

## Non-goals
Sprint 97 explicitly excludes:
- deployments / CD / pipelines
- remote writeback or mutable production actions
- vendor-specific observability integrations as the sprint headline
- new public/anonymous access modes
- SMS OTP as a primary MFA baseline
- full V3 before/after diff + HAR-heavy visual evidence if it crowds out managed-environment readiness
- broad IA redesign or new top-level navigation

---

## Risks and mitigations
### Risk 1 — remote readiness drifts into deployment tooling
Mitigation:
- lock remote mode to `remote_readonly`
- block mutable actions at contract and UI levels

### Risk 2 — client-side UX becomes ambiguous under blocked/auth failures
Mitigation:
- explicit state taxonomy + deterministic test ids + UI smoke coverage

### Risk 3 — auth-profile handling leaks sensitive material
Mitigation:
- vaulted refs only
- safe summaries by default
- raw blobs secured and referenced, not rendered directly

### Risk 4 — admin/MFA scope balloons into a full IAM sprint
Mitigation:
- surface status and explainability only; keep deep IdP/productization limited

### Risk 5 — duplicate reporting logic sneaks back into Operate
Mitigation:
- retain shared metrics SOT and Chronicle reporting ownership
- Operate renders, it does not aggregate

---

## Exit criteria
Sprint 97 is ready to close only when:
- managed environments and auth profiles are governed and schema-versioned
- remote-readonly readiness checks pass with deterministic evidence
- objective/escalation/incident behavior works across managed environments
- operator cockpit surfaces explicit status states and no blank states
- MFA/admin surfaces render useful status and explainability
- authenticated capture works for allowlisted managed environments
- `sprint97-validate`, `contract-test-docker`, and `e2e-gate` all pass
- S97 evidence, archive, and tags are fully recorded and mirrored into `.planestack/sprints/S97/*`

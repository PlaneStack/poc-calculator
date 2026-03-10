# PlaneStack — S104 Runlog
**Sprint:** 104  
**Theme:** Operate v11 — Bridge Session Orchestration + Startup Profiles  
**Status:** Plan (locked for implementation)  
**Date:** 2026-03-09

## Preflight
```bash
export SPRINT_CODE=S104
export PS_WORK_PRODUCING=1
make -C ps-dev governance-lock-check
```

Expected evidence:
- `poc-calculator/.planestack/governance/evidence/s104/lock-check.json`

## Suggested implementation / validation flow

### 1) Contracts
```bash
make -C ps-contracts check
```

Target outputs:
- startup profile schemas
- session schemas
- polling/supervision contracts
- OpenAPI routes for startup profiles/sessions/logs/polling

### 2) API
```bash
make -C ps-api test
```

Target outputs:
- startup profile CRUD-lite + preview/start routes
- sessions routes
- log retrieval
- polling state routes
- bridge job payload contracts
- evidence writers

### 3) Web
```bash
make -C ps-web test
```

Target outputs:
- Operate sessions surface
- startup profile cards/list
- active session panel
- service cards
- poll controls
- compare + remediation panels

### 4) Deterministic harness / sprint validation
```bash
make -C ps-dev sprint104-validate
```

Minimum required validation components:
- `s104-startup-profile-smoke.sh`
- `s104-session-start-stop-smoke.sh`
- `s104-service-restart-smoke.sh`
- `s104-polling-smoke.sh`
- `s104-session-logs-smoke.sh`
- `s104-session-remediation-smoke.sh`
- `s104-calculator-gold-session-smoke.sh`
- `s104-write-validate-summary.sh`

### 5) Contract / dockerized gate
```bash
make -C ps-dev contract-test-docker
```

Must pass:
- all contract tests including startup profile/session/polling/log routes
- no tolerated failures

### 6) Browser gate
```bash
make -C ps-dev e2e-gate
```

Must pass:
- current canonical gate suite
- S104-specific Operate smoke where applicable

## Required evidence shape
Sprint 104 must write, at minimum:

- `operate/startup-profiles/list.json`
- `operate/startup-profiles/calculator-dev-minimal.json`
- `operate/startup-profiles/calculator-dev-full.json`
- `operate/startup-profiles/profile-preview-minimal.json`
- `operate/startup-profiles/profile-preview-full.json`
- `operate/startup-profiles/profile-activation.json`
- `operate/sessions/session-start-minimal.json`
- `operate/sessions/session-start-full.json`
- `operate/sessions/session-stop.json`
- `operate/sessions/session-restart.json`
- `operate/sessions/service-restart.json`
- `operate/sessions/session-state-summary.json`
- `operate/sessions/service-state-summary.json`
- `operate/sessions/compare-last-success.json`
- `operate/sessions/poll-enable.json`
- `operate/sessions/poll-disable.json`
- `operate/sessions/poll-status.json`
- `operate/sessions/log-summary.json`
- `operate/sessions/degraded-detection.json`
- `operate/sessions/partial-failure-recovery.json`
- `operate/sessions/final-success-after-recovery.json`
- `bridge/session-supervisor-proof.json`
- `bridge/session-supervisor-stale-lock-proof.json`
- `bridge/poller-proof.json`
- `bridge/runtime-redaction-proof.json`
- `diagnostics/service-start-failed.json`
- `diagnostics/service-healthcheck-failed.json`
- `diagnostics/service-port-not-listening.json`
- `diagnostics/session-partial-failure.json`
- `remediation/service-restart-preview.json`
- `remediation/service-restart-apply.json`
- `remediation/session-restart-preview.json`
- `remediation/session-restart-apply.json`
- `remediation/port-fix-preview.json`
- `remediation/port-fix-apply.json`
- `remediation/dependency-fix-preview.json`
- `remediation/dependency-fix-apply.json`
- `ui/startup-profiles-smoke.json`
- `ui/active-session-smoke.json`
- `ui/service-cards-smoke.json`
- `ui/polling-controls-smoke.json`
- `ui/log-panel-smoke.json`
- `ui/session-remediation-smoke.json`
- `ui/session-compare-smoke.json`
- `ui/center-auth-context-regression.json`
- `sprint104-validate.json`

Notes:
- raw bridge-local runtime files/logs stay in `bridge_root`
- project-root evidence must summarize and prove, not mirror raw local runtime internals
- missing required artifacts is a closeout failure even if tests pass

## Closeout
Before tags:
- backfill `S104-evidence.json`
- backfill `manifest.json`
- sync `.planestack/sprints/S104/*`
- archive pack and capture archive ids

Tags from `poc-calculator`:
- `sprint104-pass-YYYY-MM-DD`
- `sprint104-evidence-YYYY-MM-DD`

## Regression hardening
- Added canonicalization guard coverage for Center auth/session/environment resolution via `s104-center-auth-context-smoke.sh`.
- Evidence: `.planestack/governance/evidence/s104/ui/center-auth-context-regression.json`.


## Completion (Final)
- governance-lock-check: PASS
- sprint104-validate: PASS
- contract-test-docker: PASS
- e2e-gate: PASS
- archive_pack: PASS
- archive ids: pack_id=a7033422-2bc2-4c26-b633-6e60b5122755, runlog_id=eb6c8d91-c5e5-48a4-a0dc-98a0943e949b, evidence_id=d8a1e5f7-8c03-4a5b-9b7c-0c23bd561226, manifest_id=7d437637-a1a3-431e-8b78-cb69e105b155, writeback_id=39bd4d81-aff1-4fdd-b7fb-247e054680e6, writeback_artifact_id=ee73dd94-64e2-42fe-80d6-7a621b0ab414

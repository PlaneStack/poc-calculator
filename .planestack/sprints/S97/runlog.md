# Sprint 97 Runlog
Date: 2026-03-08

## Environment
- Local dev stack via `ps-dev`
- Pre-deployment only; deterministic gate
- Sprint 97 extends the Operate program into managed environments and enterprise operator UX
- `project_root` vs `bridge_root` invariant remains active

## Governance preflight (required before work-producing runs)
```bash
export SPRINT_CODE=S97
export PS_WORK_PRODUCING=1
make -C ps-dev governance-lock-check
```

## Suggested implementation order
1. `ps-contracts` — schemas, OpenAPI, registry entries
2. `ps-api` — managed environment/auth-profile/readiness/capture/status endpoints
3. `ps-web` — operator cockpit, admin/MFA surfaces, authenticated capture UI
4. `ps-dev` — harness, smoke scripts, evidence writers
5. evidence wiring + archive/tag closeout

## Planned command sequence
```bash
# governance preflight
export SPRINT_CODE=S97
export PS_WORK_PRODUCING=1
make -C ps-dev governance-lock-check

# repo checks
make -C ps-contracts check || true
make -C ps-api check || true
make -C ps-web check || true
make -C ps-dev check || true

# sprint-specific validation
make -C ps-dev sprint97-validate

# blocking closeout gates
make -C ps-dev contract-test-docker
make -C ps-dev e2e-gate
```

## Required validation checks
- Managed-environment schema validation
- Auth-profile schema validation
- Remote-readonly readiness smoke
- Objective binding and Chronicle managed-environment event smoke
- Blocked/auth_failed/unreachable smoke
- MFA/admin status smoke
- Authenticated capture smoke with allowlist enforcement
- Operator UI smoke with explicit state rendering
- `contract-test-docker`
- `e2e-gate`

## Required evidence artifacts
- Governance preflight:
  - `.planestack/governance/evidence/s97/lock-check.json`
- Operate governance:
  - `.planestack/governance/operate/environments.json`
  - `.planestack/governance/operate/auth-profiles.json`
  - `.planestack/governance/evidence/s97/operate/environment-profiles.json`
  - `.planestack/governance/evidence/s97/operate/auth-profiles.json`
- Remote readiness:
  - `.planestack/governance/evidence/s97/operate/remote-readiness.json`
  - `.planestack/governance/evidence/s97/operate/blocked-flows.json`
  - `.planestack/governance/evidence/s97/operate/objective-evaluation.json`
- Chronicle / reporting:
  - `.planestack/governance/evidence/s97/chronicle/managed-env-rollups.json`
  - `.planestack/governance/evidence/s97/chronicle/managed-env-events.json`
- Admin / MFA:
  - `.planestack/governance/evidence/s97/admin/mfa-status-sync.json`
  - `.planestack/governance/evidence/s97/admin/external-reviewer-access.json`
- UI evidence:
  - `.planestack/governance/evidence/s97/ui/capture-authenticated.json`
  - `.planestack/governance/evidence/s97/ui/capture-safe-summary.json`
- UI / operator smoke:
  - `.planestack/governance/evidence/s97/operate/ui-operator-smoke.json`
  - `.planestack/governance/evidence/s97/operate/ui-state-taxonomy.json`
- Closeout:
  - `.planestack/governance/evidence/s97/archive.json`
  - `.planestack/governance/evidence/s97/closeout-summary.json`

## Required review checks
- Verify all work-producing runs used `SPRINT_CODE=S97`, `PS_WORK_PRODUCING=1`, and `governance-lock-check`
- Verify governed outputs stayed under `project_root`
- Verify managed environments remain `local | remote_readonly`
- Verify no deployment/mutable remote action path was introduced
- Verify Operate does not reintroduce duplicate reporting logic
- Verify external access remains invite-only and authenticated
- Verify MFA surfaces show privileged/external status
- Verify authenticated capture enforces allowlists + SSRF protection
- Verify `sprint97-validate`, `contract-test-docker`, and `e2e-gate` all pass

## Screenshots
- project-management/planestack-s97-pack/screenshots/s97-operate-managed-environments.png
- project-management/planestack-s97-pack/screenshots/s97-operate-remote-readiness.png
- project-management/planestack-s97-pack/screenshots/s97-operate-incident-timeline.png
- project-management/planestack-s97-pack/screenshots/s97-admin-mfa-status.png
- project-management/planestack-s97-pack/screenshots/s97-ui-capture-authenticated.png
- project-management/planestack-s97-pack/screenshots/s97-ui-capture-safe-summary.png

## Tags
- sprint97-pass-YYYY-MM-DD
- sprint97-evidence-YYYY-MM-DD


## Executed results
- governance-lock-check: PASS
- sprint97-validate: PASS
- contract-test-docker: PASS (52 passed, 0 failed)
- e2e-gate: PASS (6 passed, 0 failed)

## Tranche commits
- ps-contracts: a6e8ef4
- ps-api: 79c4db3
- ps-web: ec62455
- ps-dev: a383c18

## Archive receipts
- pack_id: e376b002-bdd9-4903-8a6b-a4953a9906ea
- runlog_id: 1d5bcf74-c8f6-4fee-8edd-79e00d48f5a8
- evidence_id: 3951b638-11ef-49ad-9c05-3135a8263e80
- manifest_id: 047ff199-4b73-41e4-aa0a-b77179612ef2
- writeback_id: 02750521-6f9f-4397-909b-a542b94136ac
- writeback_artifact_id: 6ed217fb-0d08-4418-939e-927ef642227e

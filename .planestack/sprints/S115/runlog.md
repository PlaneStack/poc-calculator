# S115 Runlog — Concierge v1: Governed Orchestration Foundation

**Sprint Code:** S115  
**Status:** Completed  
**Execution posture:** deterministic validate + contract/e2e gates + governed project-root evidence + artifact-backed orchestration + bounded governed execution

## Implementation order
1. `ps-contracts`
2. `ps-api`
3. `ps-web`
4. `ps-dev/tests`
5. `poc-calculator` proof wiring
6. evidence wiring / archive / closeout

## Governance preflight
Every work-producing sequence must start with:

```bash
export SPRINT_CODE=S115
export PS_WORK_PRODUCING=1
make -C ps-dev governance-lock-check
```

Expected evidence:
- `.planestack/governance/evidence/s115/lock-check.json`

## Required focus
S115 must make Concierge a real governed orchestration layer on top of AI Management, not a second truth silo or chat sidecar.

### Mandatory deliverables
- Concierge plane + bottom console
- artifact-backed sessions / plans / claims / blockers / handoffs / recommendations
- role-shaped orchestration + safe disclosure
- multi-user claim / collision truth
- blocked-state correctness including `wait`
- `chauffeur` default bounded execution through governed operations
- session timeline + resumability + evidence lineage
- one real `poc-calculator` proof path

### Explicitly constrained areas
- no full project control tower / inbox / resume engine
- no unconstrained agents
- no UI click-bot orchestration
- no bridge-root local execution productization
- no separate parallel AI routing/provider layer
- no second competing operational agent in the right drawer

## Validation commands
Run separately:

```bash
make -C ps-dev sprint115-validate
make -C ps-dev contract-test-docker
make -C ps-dev e2e-gate

## Final gate results (2026-03-12)
- `make -C ps-dev sprint115-validate` — PASS
- `make -C ps-dev contract-test-docker` — PASS (inside `sprint115-validate`)
- `make -C ps-dev e2e-gate` — PASS

## Deterministic fixes applied during validate/gate
- Fixed S107 UI strict-selector conflict by targeting the visible `concierge-wait-state` banner in `tests/sprint107.concierge.ui.spec.js`.
- Fixed S114 regression recursion in S115 chain by honoring `SKIP_PRIOR_SPRINT_UMBRELLAS=1` inside `scripts/sprint114-validate.sh`.
- Hardened S89 summary/scope gate spec for async AI evidence materialization and deterministic drawer close behavior.
- Added bounded retry for transient Docker daemon errors during ps-web readiness in `scripts/e2e.sh`.

## Archive IDs
- `pack_id`: `f8a70f36-51af-4a95-9d93-3579813ff71c`
- `runlog_id`: `7a53c121-6219-4ca2-92c9-b0fd7e22dcc0`
- `evidence_id`: `a2164267-1a06-481a-a828-c40187c4c648`
- `manifest_id`: `13ee69f0-2b15-4837-9f30-a0caf26180bb`
- `writeback_id`: `7216c133-d557-44bc-b6d0-0bd5fea12f65`
- `writeback_artifact_id`: `6b474a6a-91a8-4422-9aa7-d723a6571b0f`
```

## Regression policy
S100–S114 regressions are hard-blocking via umbrella targets inside `sprint115-validate`.

## Closeout expectations
- required artifacts present and referenced in `S115-evidence.json`
- one active session visible in plane + console
- one exclusive-claim collision proof
- one blocked `wait` proof
- one request / handoff proof
- one safe-disclosure proof
- one governed operation execution proof
- one resumable timeline proof
- archive flow completed
- mirror synced
- tags created from `poc-calculator`

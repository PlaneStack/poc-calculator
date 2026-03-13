# S117 Runlog — Concierge Control Tower + Approval-Bound Delegation

**Sprint Code:** S117  
**Status:** Completed  
**Completed At:** 2026-03-13T14:38:21Z

## Implementation order
1. `ps-contracts`
2. `ps-api`
3. `ps-web`
4. `ps-dev/tests`
5. `poc-calculator` proof/evidence wiring
6. truth refresh outputs
7. closeout archive + mirror + tags

## Governance preflight
All work-producing sequences were run with:

```bash
export SPRINT_CODE=S117
export PS_WORK_PRODUCING=1
make -C ps-dev governance-lock-check
```

## Tranche commits
- `ps-contracts`: `0091c2917e076875cde613cd66eef8ab41a5bbb1`
- `ps-api`: `54ca204f2f2aaa376790b6989305f1901ac75d59`
- `ps-web`: `a15be7ad5824adf4c121f971cad643eb29c09f02`
- `ps-dev`: `fd968136cad94d2462705011901fd8da14ddf9d1`

## Final gate results
- `make -C ps-dev sprint117-validate` — PASS
- `make -C ps-dev contract-test-docker` — PASS
- `make -C ps-dev e2e-gate` — PASS

## Notes
- S117 canon uses canonical handoff mutation under `/concierge/handoffs/:handoffId:*` with session-scoped creation at `/concierge/sessions/:sessionId:handoff`.
- Inbox standardized on canonical sections: `awaiting_approval_or_dependency`, `pending_handoffs`, `resumable_now`, and `stale_blocked`.
- Runtime compatibility for older inbox and handoff paths remains server-only; UI, tests, and evidence use canonical S117 routes only.
- Historical S115/S116 smoke scripts were patched to include required `Idempotency-Key` on session resume, preserving hard gates rather than loosening them.
- `e2e-gate` infra race was fixed by making the docker compose clean-slate step synchronous in `ps-dev/scripts/e2e.sh`.
- Truth refresh artifacts were materialized under `.planestack/governance/evidence/s117/*`, including explicit diff/no-change summaries.

## Required proof posture
- Proof A: governance approval wait → clear → resume → complete
- Proof B: multi-actor handoff lifecycle
- Proof C: exclusive claim collision with handoff-driven remediation
- Proof D: focused-surface trust and control-tower coherence

## Archive IDs
- `pack_id`: `a5320451-fdfb-45bc-9a34-aa0b010717b3`
- `runlog_id`: `f76019c6-5d3a-4626-a76d-c27013f1f655`
- `evidence_id`: `da65f2b1-1b01-45ca-ae4f-c1f42f75a478`
- `manifest_id`: `a0d14861-670e-4022-87ce-083d882bccf3`
- `writeback_id`: `a5154a7a-aadf-4409-8522-0d47dd118593`
- `writeback_artifact_id`: `f2e3bfa7-fc0b-442b-bc2e-a89b30b48431`

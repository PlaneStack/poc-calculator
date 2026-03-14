# Sprint 123 Runlog

**Sprint Code:** S123  
**Status:** Completed  
**Completed At:** 2026-03-14T20:36:32Z

## Implementation order
1. ps-contracts
2. ps-api
3. ps-web
4. ps-dev/tests
5. poc-calculator proof wiring
6. truth refresh outputs
7. closeout archive + mirror + tags

## First milestone
- one end-to-end Plan -> Jobs execution flow proving task-origin launch, retry lineage, workflow trust, explicit outputs vs evidence separation, and Review handoff continuity

## Tranche commits
- ps-contracts: 2773b19995bc73f64cac04bb6baa339bdf35bf09
- ps-api: e414212896a4cf4ed0d0aef794ea0c1d360e78bb
- ps-web: a3f1b698ebb53bb30e1def835b9879e9261f501d
- ps-dev: d41f885141e02dce9152c92daecca966691326be

## Final gate results
- sprint123-validate: pass
- contract-test-docker: pass
- e2e-gate: pass

## Validation hardening notes
- canonical Plan-origin launch routes now create Jobs runs/workflows with preserved planning context instead of treating Jobs launch as a detached create flow
- Jobs retry uses explicit action-route registration so :retry is parsed as an action suffix and produces a new run record with visible lineage
- the S123 UI smoke now uses the shared password-grant auth bootstrap helper instead of an ad hoc OIDC redirect loop
- the S123 truth-refresh script was fixed to quote canonical Jobs routes safely in shell output generation

## Scope hygiene
- unexpected historical drift in .planestack/governance/evidence/s95/lock-check.json was reverted before S123 closeout

## Archive IDs
- pack_id: 7ddaf2ae-8d6c-499e-9b35-8f79127c55de
- runlog_id: 245249bf-d2b6-4896-89c4-2589e593d366
- evidence_id: cb848e57-e273-4148-be53-4f2112dea5b5
- manifest_id: 51829036-bad3-467f-9721-c1ca39d6ace0
- writeback_id: 8ce000b6-9cde-4bcd-acb5-5f6c08b1d8cc
- writeback_artifact_id: 51e911b3-2487-46fc-b6fe-711d3aaaded3

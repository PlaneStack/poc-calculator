# Sprint 127 Runlog

**Sprint Code:** S127  
**Status:** Completed  
**Completed At:** 2026-03-15T04:34:54Z

## Implementation order
1. ps-contracts
2. ps-api
3. ps-web
4. ps-dev/tests
5. poc-calculator proof wiring
6. truth refresh outputs
7. closeout archive + mirror + tags

## First milestone
- one end-to-end Manage path proving credential validation, approved-but-not-active writeback policy lifecycle, automatic supersede on activation, and real continuity from Jobs, Review, and Operate into Manage

## Tranche commits
- ps-contracts: f8cd6e4f6151ae32862ced9ba6c3db71d1670367
- ps-api: 30cbcc51bc29ea214eaed4e56c6a8f52e270c7ac
- ps-web: e7b9f1e18c52eea22e47de2fd12f7969e358637e
- ps-dev: 21c1a2391448c89779f6182b337dc1728db46409

## Final gate results
- sprint127-validate: pass
- contract-test-docker: pass
- e2e-gate: pass

## Validation hardening notes
- Manage integrations and admin surfaces moved to project-scoped server-backed routes instead of relying on legacy mixed surfaces
- credential validation now returns a safe normalized result directly on the Manage credential detail path
- writeback activation preserves approval versus activation distinction and supersedes the previously active policy with explicit replacement linkage
- e2e gate now delays ps-locald-e2e startup until bootstrap and API readiness complete, preventing early DNS and schema-order races during clean-slate runs

## Scope hygiene
- unexpected historical drift in .planestack/governance/evidence/s90/lock-check.json was reverted before S127 closeout
- unexpected historical drift in .planestack/governance/evidence/s95/lock-check.json was reverted before S127 closeout

## Archive IDs
- pack_id: b771c911-20b7-4bdf-b05a-5964ecaabea5
- runlog_id: b30c5837-9b07-449d-9f71-919978bc02e4
- evidence_id: 39fb9bd0-c113-43dc-8836-67bbeb243090
- manifest_id: 48afc968-1364-4f10-a026-aaa98bc30f23
- writeback_id: 0736e4bb-39ac-4fcc-b59b-948b1e81e884
- writeback_artifact_id: 5d28deab-8a4d-491c-9032-215b204e03f6

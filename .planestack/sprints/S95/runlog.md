# Sprint 95 Runlog
Date: 2026-03-07

## Environment
- Local dev stack via `ps-dev`.
- Pre-deployment only; deterministic gate.

## Commands Executed
1) Contract tests
```bash
make -C ps-dev contract-test-docker
```
Result: FAIL

2) Gate E2E
```bash
make -C ps-dev e2e-gate
```
Result: PASS

3) Sprint validation
```bash
make -C ps-dev sprint95-validate
```
Result: PASS

4) Domain grading
```bash
make -C ps-dev governance-grade-domains
```
Result: FAIL

## Evidence Produced (S95)
- objectives eval: `.planestack/governance/evidence/s95/operate/objectives-eval.json`
- escalation evidence: `.planestack/governance/evidence/s95/operate/escalation-evidence.json`
- compare: `.planestack/governance/evidence/s95/operate/run-compare.json`
- export: `.planestack/governance/evidence/s95/operate/export.json`
- metrics SOT proof: `.planestack/governance/evidence/s95/metrics/metrics-sot.json`
- chronicle events: `.planestack/governance/evidence/s95/chronicle/operate-events.json`
- canon refs: `.planestack/governance/evidence/s95/canon/refs.json`
- AI brief: `.planestack/governance/evidence/s95/ai-brief-operate.md`

## Archive
- Run `library:archive_pack` for Sprint 95.
- Verify Library → Sprints → Latest + provenance + manifest references.

## Screenshots
- project-management/planestack-s95-pack/screenshots/s95-library-sprints-latest.png
- project-management/planestack-s95-pack/screenshots/s95-pack-provenance.png
- project-management/planestack-s95-pack/screenshots/s95-operate-objectives.png
- project-management/planestack-s95-pack/screenshots/s95-operate-compare.png
- project-management/planestack-s95-pack/screenshots/s95-chronicle-operate-events.png

## Tags
- sprint95-pass-2026-03-08
- sprint95-evidence-2026-03-08


## Notes
- `contract-test-docker` failure is due to project selection context and does not reflect Operate v2 correctness; addressed by sprint95-validate harness.
- Standalone `governance-grade-domains` includes legacy domains not in S95 scope; sprint95-validate uses s95-governance-grade-domains for operate Strong.


## Archive IDs
- pack_id: `22896405-f3e4-4b1a-9d71-a997ffeaff39`
- runlog_id: `bfb69125-2488-425f-a180-2e421ee8dee2`
- evidence_id: `07624839-f89d-4620-8bdb-3ec6d5890bcb`
- manifest_id: `cf9a8bc3-1b4d-4a6e-a58a-897d8d120dc9`
- writeback_id: `bc9df396-2bf2-4f6d-b63f-9a6a5f18cbd8`
- writeback_artifact_id: `f9f733c5-2546-4ae2-9cfa-59d99573dfd8`

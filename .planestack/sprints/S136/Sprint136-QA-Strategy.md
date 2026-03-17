# Sprint 136 QA Strategy

## Core idea

Sprint 136 is not testing isolated pages only. It is testing whether the product's **handoffs between planes** are coherent, deterministic, and browser-clean.

## Hard-bar proof families

### Proof A — Setup / Center to Work continuity
- complete or inspect setup landing
- move into Work
- preserve starter package / source setup context
- verify return path back to Center/Setup

### Proof B — Work to Jobs continuity
- launch from task or work-item context
- land in Jobs run/workflow detail
- verify preserved source refs, rationale, component refs, and return path

### Proof C — Jobs to Review continuity
- move from run/workflow detail into review context
- verify release-candidate / queue / review-next CTA
- verify return path back to Jobs

### Proof D — Review to Operate continuity
- move from review context into Operate
- verify environment/session context preserved
- verify return path back to Review

### Proof E — Observe drill-back continuity
- start in Chronicle/Analytics/Library
- preserve context into source truth or related plane
- verify return path

### Proof F — Manage drill-back continuity
- enter Manage from Jobs, Review, and Operate
- verify configuration/context lineage is preserved
- verify return path

## Browser health bar

Fail on:
- uncaught browser/runtime exceptions
- `console.error`
- broken expected render after click

Warnings:
- report by default
- fail only if explicitly elevated

## Selector strategy

- prefer semantic headings/roles/labels
- add stable test ids only for proof-critical or brittle surfaces
- do not blanket-instrument the entire app

## Surface categories to verify

- landing / summary
- detail
- grouped summary
- blocked / degraded / ready variants where applicable
- no-data only where intentionally part of the lifecycle explanation

## Required artifacts

- `lifecycle-continuity-proof.json`
- `setup-to-work-proof.json`
- `work-to-jobs-proof.json`
- `jobs-to-review-proof.json`
- `review-to-operate-proof.json`
- `observe-drillback-proof.json`
- `manage-drillback-proof.json`
- `continuity-context.json`
- `ui-smoke.json`
- `truth-refresh-summary.json`
- `lifecycle_exceptional_range_scorecard.json`
- `sprint136-validate.json`

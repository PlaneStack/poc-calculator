# Sprint 136 Validation Matrix

## Required green bar

### Sprint-specific proofs
- `s136-setup-to-work-smoke`
- `s136-work-to-jobs-smoke`
- `s136-jobs-to-review-smoke`
- `s136-review-to-operate-smoke`
- `s136-observe-drillback-smoke`
- `s136-manage-drillback-smoke`
- `s136-ui-smoke`
- `s136-truth-refresh`
- `s136-write-validate-summary`

### Standard gates
- `sprint136-validate`
- `contract-test-docker`
- `e2e-gate`

## Hard-bar proof requirements

### Proof A
- Setup / Center landing exposes a valid downstream Work path
- starter planning provenance is visible
- return path back to Center/Setup is preserved

### Proof B
- Work launches into Jobs from real planning context
- run/workflow detail shows preserved source refs
- return path to Work exists and works

### Proof C
- Jobs moves into Review through a real CTA
- review context is correct and browser-clean
- return path back to Jobs exists and works

### Proof D
- Review moves into Operate through a real CTA
- environment/session context is preserved
- return path back to Review exists and works

### Proof E
- Chronicle/Analytics/Library drill into source or related truth with context preserved

### Proof F
- Jobs, Review, and Operate each have at least one real continuity path into Manage
- source context and return path are preserved

## Exceptional-range scoring target

Focused surfaces / transitions:
- Center setup landing
- Work detail → Jobs launch
- Jobs run/workflow detail
- Review release-candidate / queue detail
- Operate overview / environment or session landing
- Observe drill-through
- Manage integrations / admin / ai-management continuity entry points

Scoring thresholds:
- every focused transition must score >= 4.0 overall
- no scored dimension may be < 3.2
- aggregate continuity score must be >= 4.15

## Closeout-only
- `s136-closeout-evidence-check`

# Sprint 136 Lifecycle Continuity Data Model

## Purpose

Sprint 136 defines a shared continuity contract for proof-critical detail and landing surfaces across the lifecycle.

This sprint does **not** create a new universal lifecycle entity. Native plane records keep their native ownership and semantics.

## Shared continuity contract

### Common fields

- `source_context_refs[]`
- `return_url`
- `next_required_action`
- `reason_codes[]`
- `related_refs[]`
- `continuity_posture`

### `source_context_refs[]`
Typed references back to the source records that led the user here.

Minimum shape:
- `ref`
- `type`
- `label`
- `plane`
- `surface`
- `url`

### `return_url`
Single primary return destination used by the shell for deterministic “back to source” behavior.

### `next_required_action`
Typed action describing the next recommended lifecycle step.

Recommended enum:
- `open_center_context`
- `open_work_context`
- `launch_job`
- `inspect_run`
- `open_review_context`
- `open_operate_context`
- `open_observe_context`
- `open_manage_context`
- `resolve_blocked_context`
- `inspect_evidence`
- `return_to_source_context`

### `reason_codes[]`
Typed explanation family values. Surfaces may show subsets, but values should be normalized where applicable.

Recommended enum family:
- `blocked_by_policy`
- `approval_required`
- `activation_pending`
- `environment_not_ready`
- `integration_not_configured`
- `provider_unavailable`
- `degraded_state`
- `no_recent_activity`
- `ready_for_next_stage`
- `completed_upstream`
- `return_path_only`

### `related_refs[]`
Typed non-source links to downstream or lateral context.

Ref type enum:
- `related_work`
- `related_jobs`
- `related_review`
- `related_operate`
- `related_observe`
- `related_manage`
- `related_evidence`
- `related_output`
- `related_incident`
- `next_action`

### `continuity_posture`
Recommended enum:
- `ready`
- `blocked`
- `degraded`
- `informational`

## Ownership rules

- `center/setup` owns setup progression state only
- `work` owns planning truth
- `runs` owns execution/run truth
- `governance` and `reviews` own review/governance projection truth
- `operate` owns local mission-control truth
- `observe` owns reporting/browse/history projection truth
- `manage` owns control-plane/configuration truth

S136 may add continuity fields to responses, but it must not change native ownership.

## Proof-critical continuity targets

- Setup / Center → Work
- Work → Jobs
- Jobs → Review
- Review → Operate
- Observe → source truth
- Manage ← Jobs / Review / Operate

## No-shadow-truth rule

A continuity projection may summarize upstream/downstream state, but:
- it must point back to canonical source truth
- it must not become the new owner of that truth

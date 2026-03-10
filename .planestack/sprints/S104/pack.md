# PlaneStack — Sprint 104 Pack
**Sprint:** 104  
**Theme:** Operate v11 — Bridge Session Orchestration + Startup Profiles  
**Status:** Plan (locked for implementation)  
**Date:** 2026-03-09

## Intent
Sprint 104 is the sprint that must turn Operate from a governed launcher + remediation assistant into a **bridge-supervised local runtime control surface** that users can leave open all day while they work.

Sprint 103 made guided local setup and remediation evidence-backed. Sprint 104 must complete the next layer:

- govern and execute **startup profiles** for real project sessions,
- let the **bridge** own local process start/stop/restart/poll supervision,
- let PlaneStack own **project truth, plans, runs, evidence, and UX**,
- surface live multi-service session state in Operate,
- keep the boundary between **project-level instructions** and **user-local adaptation/runtime state** explicit,
- and prove the full loop with `poc-calculator`.

This sprint is not a stub sprint. It is complete only if a user can use PlaneStack Operate to start, supervise, inspect, remediate, stop, and restart a real local project session through the bridge with deterministic evidence.

## What this sprint must solve
A technically correct runbook system is still insufficient if PlaneStack cannot safely manage the **live runtime session** of a project on a user’s machine.

Users need Operate to answer:
- Which startup profile should I use for this task?
- Which services/resources are part of this session?
- What order will they start in?
- Which ones are healthy, degraded, blocked, or still waiting?
- Which values were resolved from project truth vs user-local overlay?
- What is the bridge currently doing on my machine?
- If one component fails, what can I safely restart or remediate?

Sprint 104 must make Operate genuinely useful for continuous local operation, not just governed one-shot runs.

## Completion bar (meaty, not stubby)
Sprint 104 is complete only if **all** of the following land end to end:

1. **Startup profile system is real**
   - Startup profiles are canonical governed project resources.
   - Profiles define service/resource membership, order, readiness dependencies, environment applicability, and allowed user-local participation.
   - At least two real calculator startup profiles exist and are executable.

2. **Bridge-owned runtime supervision exists**
   - Bridge starts, stops, restarts, and polls local services/processes for active sessions.
   - PlaneStack service does not directly manage local processes.
   - Bridge reports session/service runtime state back into PlaneStack.

3. **Live session model is complete**
   - Operate can create a session, show an active session, stop it, restart it, restart one service, and mark final outcome.
   - Session state is explicit, stable, and evidence-backed.

4. **Health polling is real**
   - User may opt in to bridge polling for a startup profile/session.
   - Polling can check at minimum:
     - process presence,
     - port availability/listening,
     - HTTP readiness endpoint when configured,
     - prerequisite dependency/service state.
   - Polling output is bounded, deterministic, and tied to the session record.

5. **Runtime UX is completion-grade**
   - Operate shows active session overview, service cards, status timeline, bounded logs, and remediation suggestions.
   - UI makes it obvious which values came from:
     - project defaults,
     - environment config,
     - startup profile,
     - user-local overlay,
     - bridge runtime observation.

6. **Safe restart/remediation is complete**
   - Users can safely restart a single failed service or the full session.
   - Safe local-only remediation suggestions remain available where appropriate.
   - No bridge/runtime action silently mutates project truth.

7. **Calculator gold session bundle is real**
   - `poc-calculator` proves:
     - at least two startup profiles,
     - full start/stop lifecycle,
     - one partial service failure + targeted restart recovery,
     - one port/readiness failure + local remediation + recovery,
     - one full-session restart after overlay/config change,
     - evidence bundle for all of the above.

8. **Validation and evidence completeness**
   - `sprint104-validate`, `contract-test-docker`, and `e2e-gate` all pass.
   - All required artifacts in `S104-evidence.json` exist.
   - Missing evidence is a closeout failure even with green tests.

If any of the above exists only as schema, route shell, or UI scaffolding without deterministic proof through Calculator, Sprint 104 is not complete.

## Governance preflight
All Sprint 104 work-producing runs must honor the active governance and filesystem invariants.

- `project_root` and `bridge_root` remain distinct filesystem roots.
- Governed outputs and shareable evidence are written only under `project_root`.
- Scratch workspaces, process handles, poll caches, local runtime metadata, and user-local overlays remain under `bridge_root`.
- Work-producing runs must set:
  - `SPRINT_CODE=S104`
  - `PS_WORK_PRODUCING=1`
- Every work-producing sequence must begin with:
  - `make -C ps-dev governance-lock-check`
- Lock-check evidence must be written under:
  - `.planestack/governance/evidence/s104/lock-check.json`

`governance-lock-check` is required before:
- startup profile activation/archive,
- session preview/start/stop/restart actions that write evidence,
- bridge poller opt-in/start/stop changes,
- any remediation apply action,
- any startup profile proof run or polling proof collection,
- any archive/closeout action.

## Governing posture (Sprint 104 locks)

### 1) Operate remains the canonical plane
Sprint 104 adds no new plane.

UI remains under:
- `/ou/{ouKey}/p/{projectKey}/plane/operate/:surface`

Sprint 104 may add/refine Operate surfaces, but must not create a parallel “Sessions”, “Supervisor”, or “Runtime” plane outside Operate.

### 2) Project truth remains authoritative
Authoritative project-level execution truth remains governed under `project_root` and may not be silently changed by startup, polling, supervision, or remediation flows.

Authoritative files now include:
- `.planestack/governance/operate/resources.json`
- `.planestack/governance/operate/environments.json`
- `.planestack/governance/operate/execution-slots.json`
- `.planestack/governance/operate/remediation-actions.json`
- `.planestack/governance/operate/startup-profiles.json`
- `.planestack/runbooks/operate/index.json`
- `.planestack/runbooks/operate/<runbook_key>.runbook.json`
- `.planestack/runbooks/operate/templates/index.json`
- `.planestack/governance/operate/diagnostics-taxonomy.json`

### 3) Bridge owns local process control and health polling
Bridge is the canonical owner of:
- local process start,
- local process stop,
- local process restart,
- health polling / supervision,
- bounded local logs,
- local runtime facts,
- local runtime event emission.

PlaneStack service owns:
- authorization,
- project truth,
- effective-plan resolution,
- startup profile definition,
- run/session records,
- evidence ingestion,
- UI state and diagnostics presentation.

### 4) User-local overlay remains local-only
Canonical bridge-root paths continue:
- `<bridge_root>/operate/users/<user_key>/projects/<project_key>/facts.json`
- `<bridge_root>/operate/users/<user_key>/projects/<project_key>/environments/<env_key>/overlay.json`

Sprint 104 adds runtime/session files only under bridge-root:
- `<bridge_root>/operate/users/<user_key>/projects/<project_key>/sessions/<session_id>/session-state.json`
- `<bridge_root>/operate/users/<user_key>/projects/<project_key>/sessions/<session_id>/services/<service_key>.json`
- `<bridge_root>/operate/users/<user_key>/projects/<project_key>/sessions/<session_id>/logs/<service_key>.log`
- `<bridge_root>/operate/users/<user_key>/projects/<project_key>/sessions/<session_id>/poller.json`

None of these may be mirrored into project truth; only evidence summaries/artifacts may be written under `project_root`.

### 5) Preview remains zero-side-effect
Startup profile preview and session preview remain zero-side-effect.
- preview returns resolved plan only
- preview may validate configuration and resource references
- preview may not start processes, poll services, or mutate runtime state

### 6) Local mutation still requires explicit confirmation
Any action marked `local_mutate` requires:
- preview-bound `plan_hash`
- preview-bound `confirm_token`
- explicit confirmation
- evidence with actor, source, and result

### 7) Idempotency/dedupe remains required
Idempotency-Key is required on:
- session start
- session stop
- session restart
- service restart
- polling enable/disable
- startup profile mutate routes
- remediation apply routes

Replay window for Sprint 104 remains 15 minutes.

### 8) Explicit session state machine is required
Required session statuses:
- `queued`
- `starting`
- `running`
- `degraded`
- `waiting_manual`
- `blocked`
- `stopping`
- `stopped`
- `completed_pass`
- `completed_fail`
- `canceled`

Required service statuses:
- `queued`
- `starting`
- `running`
- `healthy`
- `degraded`
- `unhealthy`
- `blocked`
- `stopped`
- `failed`

### 9) Fixed runtime/polling reason taxonomy is required
Minimum required additional reason codes:
- `startup_dependency_unready`
- `service_start_failed`
- `service_healthcheck_failed`
- `service_process_missing`
- `service_port_not_listening`
- `service_http_unready`
- `service_log_indicates_error`
- `session_partial_failure`
- `polling_not_enabled`
- `polling_target_misconfigured`
- `bridge_supervision_unavailable`
- `service_restart_recommended`
- `session_restart_recommended`

Unknown reason codes are a contract violation.

## Scope: exhaustive feature/task set

### Epic 104.1 — Startup profile contract and governed storage
Implement startup profiles as canonical project resources.

Tasks:
- Add `startup-profiles.json` contract in `ps-contracts`.
- Add schema(s) for:
  - startup profile
  - service member
  - dependency edge
  - readiness gate
  - polling policy
  - restart policy
- Add OpenAPI routes for:
  - list/get profiles
  - create draft profile
  - update draft profile
  - activate profile
  - archive profile
  - preview profile
- Support immutable versioning on activation.
- Add lineage/integrity fields.
- Validate:
  - profile key uniqueness
  - resource_refs exist
  - dependency graph acyclic
  - readiness/polling definitions valid
- Add evidence writers for profile creation/activation/archive.
- Add required Calculator profiles:
  - `calculator-dev-minimal`
  - `calculator-dev-full`

### Epic 104.2 — Session orchestration model
Introduce first-class Operate sessions.

Tasks:
- Add session contract/schema:
  - session_id
  - startup_profile_ref
  - env_ref
  - user_key
  - runbook_refs
  - resolved_values_ref
  - status
  - actor
  - timestamps
  - bridge_runtime_ref
- Add service-session contract/schema:
  - service_key
  - resource_ref
  - command_ref
  - resolved_cmd
  - resolved_env
  - pid/process info (bridge-local only; evidence summary only upstream)
  - status
  - health status
  - last poll result
- Add API routes:
  - `POST /operate/startup-profiles/:profileKey:preview`
  - `POST /operate/startup-profiles/:profileKey:start`
  - `POST /operate/sessions/:sessionId:stop`
  - `POST /operate/sessions/:sessionId:restart`
  - `POST /operate/sessions/:sessionId/services/:serviceKey:restart`
  - `GET /operate/sessions/:sessionId`
  - `GET /operate/sessions`
  - `GET /operate/sessions/:sessionId/logs?service_key=...`
- Add polling/status retrieval routes.
- Reuse existing run/evidence model rather than invent a second execution engine.

### Epic 104.3 — Bridge job model and supervision ownership
Make the bridge the runtime broker.

Tasks:
- Add bridge job payloads for:
  - session_start
  - session_stop
  - session_restart
  - service_restart
  - session_poll
- Add bridge helper contract for:
  - process spawn
  - process stop/terminate
  - health probe
  - bounded log tail
  - local runtime state persistence
- Add runtime supervision loop in bridge:
  - maintain session/service state
  - emit poll results
  - detect orphaned/stopped processes
  - emit degraded/failure transitions
- Add per-session single-flight lock.
- Add stale-lock recovery proof for session supervisor.
- Ensure bridge never mutates project-root truth.

### Epic 104.4 — Polling policy and health checks
Implement opt-in bridge polling.

Tasks:
- Add per-profile polling policy:
  - disabled | manual | interval
  - interval bounds
  - max consecutive failures
  - poll targets by service
- Add supported poller check types:
  - process_exists
  - port_listening
  - http_ready
  - file_exists
  - command_probe
- Add bounded poll evidence summaries.
- Add redaction rules for poll evidence.
- Add UI state for polling enabled/disabled and last result.
- Add proof that user may opt out of polling entirely.

### Epic 104.5 — Runtime logs and bounded evidence
Provide useful runtime visibility without turning logs into truth.

Tasks:
- Add bounded log capture contract:
  - line cap
  - byte cap
  - time window
- Add bridge log tail support.
- Add API/log retrieval shape.
- Add evidence summaries that capture:
  - key error lines
  - timestamps
  - service source
  - summary hash
- Ensure raw bridge-local logs stay in bridge_root; only bounded evidence summaries go to project_root by default.
- Add redaction rules for machine-local paths/secrets in logs.

### Epic 104.6 — Session UX completion
Make Operate feel like a runtime control surface.

Tasks:
- Add `sessions` surface under Operate.
- Add startup profile cards/list.
- Add active session panel with:
  - session status
  - startup profile
  - environment
  - user-local overlay summary
  - start/stop/restart controls
- Add service cards with:
  - status
  - readiness
  - logs summary
  - last remediation suggestion
  - restart control
- Add explicit state banners:
  - no active session
  - polling disabled
  - degraded
  - waiting_manual
  - blocked
- Add compare panel:
  - current resolved values vs last successful session for same tuple
- Add provenance labels for all displayed values.

### Epic 104.7 — Profile-aware remediation and restart
Carry S103 remediation into live sessions.

Tasks:
- Add restart recommendation classification.
- Add remediation suggestions for:
  - port collision
  - executable path binding
  - workspace/cwd correction
  - missing dependency
  - unhealthy local service
- Add session-safe local remediation apply actions.
- Ensure remediation can target:
  - single service
  - full session
- Ensure project-truth mutations are impossible from runtime remediation.
- Add preview + apply evidence for all remediation types.

### Epic 104.8 — Resource-aware diagnostics and next actions
Make diagnostics bridge-aware and session-aware.

Tasks:
- Extend diagnostics endpoint/output to include:
  - affected service
  - affected resource
  - health check type
  - session status impact
  - safe_to_restart_service
  - safe_to_restart_session
  - next_actions
- Add next-best-action generation for:
  - restart service
  - restart full session
  - apply local remediation
  - open related runbook
  - inspect logs
- Add contract-violation handling for unknown reason codes.
- Add proof for deterministic next action generation.

### Epic 104.9 — Calculator gold session bundle
Prove all of this on `poc-calculator`.

Tasks:
- Define two startup profiles:
  - `calculator-dev-minimal`
  - `calculator-dev-full`
- Bind resources/services for each profile.
- Prove:
  - clean startup success
  - stop success
  - restart success
  - one targeted service restart after failure
  - one port collision remediation
  - one dependency/readiness remediation
  - one poll-driven degradation detection and recovery
- Produce screenshots and evidence summaries showing a daily-driver workflow.

### Epic 104.10 — Regression hardening + closeout
Make S104 finishable and durable.

Tasks:
- Add/extend `sprint104-validate`.
- Add S104-specific smoke scripts:
  - startup-profile-smoke
  - session-start-stop-smoke
  - service-restart-smoke
  - polling-smoke
  - session-logs-smoke
  - session-remediation-smoke
  - calculator-gold-session-smoke
- Keep critical regressions from S100–S103 hard-blocking:
  - environments
  - runbook library/templates
  - overlay resolution
  - guided remediation
- Add required evidence completeness check.
- Add archive/writeback/tagging closeout steps.

## API / route locks
Canonical Sprint 104 route family:

### Startup profiles
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/startup-profiles`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/startup-profiles/:profileKey`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/startup-profiles:create`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/startup-profiles/:profileKey:update-draft`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/startup-profiles/:profileKey:activate`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/startup-profiles/:profileKey:archive`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/startup-profiles/:profileKey:preview`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/startup-profiles/:profileKey:start`

### Sessions
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/sessions`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/sessions/:sessionId`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/sessions/:sessionId:stop`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/sessions/:sessionId:restart`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/sessions/:sessionId/services/:serviceKey:restart`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/sessions/:sessionId/logs`

### Polling
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/sessions/:sessionId:poll-enable`
- `POST /api/v1/ou/:ouKey/p/:projectKey/operate/sessions/:sessionId:poll-disable`
- `GET /api/v1/ou/:ouKey/p/:projectKey/operate/sessions/:sessionId/poll-status`

## Permissions
Lock:
- profile create/update/activate/archive → `org_admin | project_admin`
- session preview/start/stop/restart/service_restart → operator-capable non-admin users allowed
- poll enable/disable → same operator-capable users
- bridge-local remediation apply → same operator-capable users for local-only fixes
- any action that would mutate project truth remains admin-only and out of scope

## UI surface naming
Canonical Operate surfaces for S104:
- `overview`
- `environments`
- `resources`
- `runbooks`
- `templates`
- `sessions`
- `execution`
- `incidents`
- `settings`

## Required test ids
Minimum required stable `data-testid` set:
- `operate-surface-sessions`
- `operate-startup-profile-row-<profileKey>`
- `operate-startup-profile-preview-<profileKey>`
- `operate-startup-profile-start-<profileKey>`
- `operate-active-session`
- `operate-active-session-status`
- `operate-active-session-stop`
- `operate-active-session-restart`
- `operate-session-service-row-<serviceKey>`
- `operate-session-service-status-<serviceKey>`
- `operate-session-service-restart-<serviceKey>`
- `operate-session-poll-status`
- `operate-session-poll-enable`
- `operate-session-poll-disable`
- `operate-session-log-panel`
- `operate-session-remediation-panel`
- `operate-session-compare-panel`
- `operate-session-no-active-state`
- `operate-session-degraded-banner`
- `operate-session-waiting-manual-banner`

## Evidence and redaction rules
- project-root evidence must capture summaries, proofs, and state transitions
- bridge-root retains raw local runtime state and full logs
- absolute machine-local paths are always redacted in evidence
- secrets/tokens are always redacted
- ports are not redacted by default
- logs and polling evidence must use class-based masking metadata

## Non-goals
Sprint 104 explicitly excludes:
- remote deployment / CI/CD
- public/global startup profile sharing
- cross-OU profile sharing
- server-side direct process control
- free-form shell/terminal behavior
- broad reporting/analytics expansion
- external review/MFA headline scope

## Acceptance criteria
Sprint 104 is done when:
- startup profiles are real governed resources
- bridge-supervised sessions can start/stop/restart with evidence
- polling is bridge-owned and visible in Operate
- service-level runtime state is explicit and useful
- remediation + restart suggestions work for real local session failures
- Calculator proves two startup profiles and deterministic recovery cases
- `sprint104-validate`, `contract-test-docker`, and `e2e-gate` all pass
- required artifacts exist and closeout succeeds

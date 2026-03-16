# Sprint 133 Pack
## Theme
**Setup Wizard v2 — Exceptional Real Project Bootstrap + Environment / Integration / Policy-Aware Onboarding Spine**

## Why this sprint exists
S131 and S132 built the **internal trust foundation**:
- deterministic seeded read fixture
- route-traversal and browser-error gates
- canonical read-surface inventory
- exhaustive click-only QA coverage

Sprint 133 must be the **product-facing counterpart**, but at a much larger scope than a minimal wizard.
This sprint should create the first truly exceptional onboarding spine for PlaneStack, taking a real user from:
- empty project or newly created project state
- through setup capture, validation, policy, and activation semantics
- into a truthful, usable workspace across Center, Work, Review, Operate, and Manage

This is **not** a demo-project sprint.
This is **not** a fixture sprint.
This is **not** a narrow shell-only wizard sprint.
It is a broad productization sprint for real onboarding trust.

## Primary intent
Create a canonical **Setup Wizard v2** that:
1. captures real user-provided setup truth
2. writes canonical records instead of transient UI-only state
3. stages setup into explicit capture / validate / approve / activate / complete phases
4. lands users into the right downstream product planes with clear next actions
5. exposes why setup is blocked, what it affects, and where to go next
6. leaves behind auditable, deterministic, policy-aware setup truth
7. makes first-run PlaneStack feel exceptional rather than merely possible

## Product framing
This sprint must be framed as:
- product-facing onboarding
- environment/integration-aware setup
- canonical project bootstrap from real user input
- staged readiness and validation
- first-run product trust
- cross-plane setup continuity

This sprint must **not** be framed as:
- a demo-mode project generator
- a substitute for S131/S132 internal fixtures
- a broad local-runtime automation sprint
- a free-form wizard with hidden side effects
- a place to introduce shadow truth outside canonical project records

## Expanded primary plane targets
### `center`
- setup entry
- project bootstrap summary
- first-run next actions
- completion summary and restart/resume posture

### `work`
- starter planning package creation
- first goal and starter work structure continuity
- starter templates and starter lineage visibility

### `review`
- policy / approval / activation distinction shown during setup
- review context visibility when setup cannot proceed automatically

### `operate`
- setup continuity into environments / sessions / execution readiness
- setup-specific landing into environment health / readiness surfaces

### `manage > integrations`
- credential and writeback-policy onboarding posture
- validation result trust
- downstream configuration visibility

### `manage > admin`
- environment/system posture visible during setup
- system completeness / incompleteness / risk visibility

### Secondary continuity targets
- `runs/jobs` — setup-to-execution readiness continuity
- `governance` — approval / policy readiness where required
- `observe` — optional read-only landing/reporting confirmation if setup produces reviewable readiness state

## Success bar
Sprint 133 is successful only if:
1. a user can complete a real setup flow without relying on engineering-only fixture machinery
2. the wizard writes canonical truth instead of transient UI-only state
3. setup stages clearly distinguish capture, validate, approve, activate, complete, and next action
4. the user lands in the right downstream product context after setup
5. setup failure/blocked states are explicit, explainable, and non-destructive
6. setup can be resumed safely and read back as truthful current state
7. the onboarding flow improves multiple downstream planes, not just the shell itself

## Non-negotiable invariants
- The deterministic engineering fixture remains separate from real setup/onboarding.
- Setup must write canonical project truth, not shell-only draft state.
- Approval remains distinct from activation.
- Environment and integration truth must come from actual user inputs or validations, not fabricated seeded fixture values.
- Evidence remains canonical only when written into governed `.planestack/**` paths.
- No broad AI-provider or local-runtime expansion is allowed beyond what is needed to support truthful onboarding.
- `ai-management` remains the only AI control plane.
- Setup may guide users into downstream planes, but it must not become the long-term owner of Work / Review / Operate / Manage truth.

## Core user journey
1. user starts from an empty or newly created project
2. user opens Setup Wizard from Center
3. user supplies project bootstrap essentials
4. user selects starter planning posture
5. user configures environment posture
6. user configures integration/credential posture
7. user reviews policy / approval / activation requirements where applicable
8. user validates setup
9. user completes setup
10. user lands in Center / Work / Operate / Manage with explicit next actions and preserved source context

## Scope posture
This sprint is intentionally broad and should be at least double the size of a minimal wizard sprint. It should include:
- setup entry and wizard shell
- staged setup steps with persisted status
- canonical truth writing
- validation and readiness states
- policy / approval / activation visibility
- starter planning creation and continuity
- downstream landing continuity
- resume / restart / incomplete-section handling
- proof and validation for first-run trust
- truth refresh updates

## Primary deliverables

### 1. Setup Wizard shell and routing
Deliver:
- canonical setup entry from Center
- `GET /center/project/setup`
- `POST /center/project/setup:begin`
- `POST /center/project/setup:resume`
- `POST /center/project/setup:restart`
- step-aware shell with stable progress state
- explicit exit / resume semantics
- completion state with downstream landing references

### 2. Project bootstrap truth capture
Deliver:
- project summary / scope starter capture
- first goal capture
- initial project metadata / readiness classification
- canonical write of bootstrap truth
- no hidden fixture/demo logic
- summary readback in Center after each persisted stage

### 3. Starter planning package
Deliver:
- initial planning starter selection
- starter creation for first goal + starter work structure
- explicit visibility into what setup created in `work`
- starter lineage from setup into Work surfaces
- no confusion between setup-generated seed truth and later manual planning truth

### 4. Environment-aware setup
Deliver:
- environment selection / creation posture
- environment readiness projection
- deterministic blocked/degraded explanations
- readiness reason codes and next actions
- landing continuity into Operate environments/session readiness
- explicit link from setup environment stage to admin environment/system posture where appropriate

### 5. Integration-aware setup
Deliver:
- credential posture capture/selection
- writeback-policy posture visibility
- validation outcomes with safe error codes
- approved-but-not-active clarity where applicable
- landing continuity into Manage integrations surfaces
- direct explanation of what a missing or invalid credential blocks downstream

### 6. Policy / approval / activation staging
Deliver:
- clear presentation of where setup is merely captured vs validated vs approved vs activated
- explicit next action when setup cannot proceed
- no implicit activation on approval
- visible governance/readiness context when policy gates apply
- direct route continuity into Review/Governance surfaces when the user must intervene there

### 7. Setup completion landing and mission-control handoff
Deliver:
- completion summary state with downstream CTAs into:
  - Center
  - Work
  - Review
  - Operate
  - Manage
- landing must preserve source/setup context
- at least one real continuation into each of Work / Operate / Manage from setup completion

### 8. Resume / restart / incomplete-section behavior
Deliver:
- safe resume of in-progress setup
- explicit incomplete sections and their reasons
- deterministic restart semantics
- protection against silently overwriting already-captured canonical truth

### 9. Exceptional-range targets
Primary hard-bar surfaces:
- `center/project/setup`
- setup step shell / progress
- setup validation state
- setup blocked/approval/activation state
- completion landing summary
- manage/integrations onboarding posture
- operate environment readiness handoff
- starter planning continuity into `work`

Secondary uplift:
- Center project summary after setup
- Review / Governance visibility from setup blockers
- Jobs readiness context after setup completion

## API / contract lock summary
Canonical route families should include:
- `GET /center/project/setup`
- `GET /center/project/setup/status`
- `POST /center/project/setup:begin`
- `POST /center/project/setup:save_step`
- `POST /center/project/setup:resume`
- `POST /center/project/setup:restart`
- `POST /center/project/setup:validate`
- `POST /center/project/setup:complete`
- `GET /center/project/setup/landing`

Supporting projections may include:
- setup environment readiness
- setup integration readiness
- setup approval / activation posture
- setup-created starter work package
- setup blocking context drill-through references

## Data-model expectations
Setup projections must expose:
- canonical identity refs
- stage / status
- readiness state
- reason codes
- next required action
- source truth refs
- downstream landing refs
- explicit validation / approval / activation posture
- incomplete section summaries
- created starter package refs

No setup surface may hide whether a state is:
- captured but unvalidated
- validated but not approved
- approved but not activated
- blocked by missing credential
- blocked by missing environment truth
- blocked by policy
- complete but still leaving downstream next actions

## Proof paths

### Proof A — Real first-run setup
- user enters setup from Center
- supplies minimal project bootstrap truth
- wizard writes canonical records
- setup state persists and renders correctly after reload
- Center reflects the new project/bootstrap truth

### Proof B — Environment + integration readiness
- user reaches environment/integration stage
- one readiness blocker is surfaced clearly
- safe validation / next action guidance is visible
- drill-through into matching Manage or Operate context works

### Proof C — Approval is not activation
- a setup path reaches approved-but-not-active posture
- decision / policy context is visible
- explicit activation step remains required
- user can drill through into the matching review/governance context

### Proof D — Starter planning continuity
- setup creates a real starter planning package
- user lands into Work and can see the created starter goal/work structure
- lineage back to setup is preserved

### Proof E — Completion landing continuity
- setup completes successfully
- completion landing links into Center, Work, Operate, and Manage as appropriate
- at least one real downstream continuation into each of Work / Operate / Manage works end-to-end

### Proof F — Resume / restart trust
- user leaves setup mid-way
- resumes into the same truthful current state
- restart semantics remain explicit and non-destructive

## Validation matrix
Required green bar:
- `s133-setup-smoke`
- `s133-setup-ui-smoke`
- `s133-setup-resume-smoke`
- `s133-setup-starter-continuity-smoke`
- `s133-truth-refresh`
- `s133-write-validate-summary`
- `sprint133-validate`
- `contract-test-docker`
- `e2e-gate`

Closeout-only:
- `s133-closeout-evidence-check`

## UX acceptance
The setup experience must:
- make first-run purpose obvious
- clearly show step progress and incomplete sections
- avoid hidden side effects
- distinguish capture / validate / approve / activate / complete
- avoid requiring technical knowledge to understand the next action
- provide trustworthy error / blocked explanations
- make downstream destinations feel intentional, not dumped out of the wizard
- make restart/resume behavior explicit and safe

## Tranche plan
1. `ps-contracts`
   - setup routes
   - setup state schemas
   - validation / readiness / approval / activation contracts
   - starter package / landing contracts
2. `ps-api`
   - setup orchestration
   - staged writes
   - readiness / policy / validation projections
   - starter planning package creation
   - resume / restart / landing projections
3. `ps-web`
   - setup shell
   - step UIs
   - blocked / validation / policy views
   - completion landing
   - downstream CTAs
   - resume / restart handling
4. `ps-dev/tests`
   - setup smoke / UI smoke / resume smoke / starter continuity smoke / validate harness
5. proof wiring
   - dedicated deterministic setup proof project path
6. truth refresh / mirror / closeout

## Risk register
- wizard accidentally reuses fixture/demo semantics
- setup captures truth but fails to land users into usable next contexts
- environment/integration validation becomes too async/opaque for first-run trust
- approval vs activation distinction regresses
- setup starts owning downstream truth that should remain in Center/Work/Review/Operate/Manage
- starter planning package becomes too magical or too thin to be useful
- restart/resume semantics become destructive or confusing

## Truth refresh
If S133 lands as designed, refresh:
- `PlaneStack-App-Navigation-Map.md`
- `PlaneStack-Navigation-IA-v2-Developer-Instructions.md`
- `navigation-menu-ia-current.md`
- `PlaneStack-Truth-Index.md` if wording changes
- `PlaneStack-Product-Knowledge.v4.md` or successor
- `WORK-HISTORY.v5.md` or successor
- `.planestack/sprints/S133/{pack,runlog,evidence,manifest}`

## Short summary
Sprint 133 is the **product-facing counterpart** to the internal fixture/QA work, but at an exceptional level. It should create a real, staged, environment/integration/policy-aware setup wizard that writes canonical truth, creates a usable starter workspace, and lands a user into a truthful PlaneStack workspace without depending on internal engineering fixture mechanics.

# Sprint 136 Backlog

## Epic A — Shared continuity contract

### A1. Define shared continuity schema
- add common response shape used by proof-critical detail surfaces
- include:
  - `source_context_refs[]`
  - `return_url`
  - `next_required_action`
  - `reason_codes[]`
  - typed `related_refs[]`

### A2. Add continuity helpers in API
- centralize source/return/next-action population
- avoid hand-coded inconsistent payloads across routes

### A3. Normalize reason-code family usage
- blocked / degraded / waiting / ready / invalid / not_configured / no_data
- map each route family to shared reason code rules where possible

## Epic B — Setup / Center to Work continuity

### B1. Completion landing continuity
- strengthen setup completion landing
- show:
  - project bootstrap summary
  - starter package refs
  - direct CTA to Work overview
  - direct CTA to Center project home

### B2. Setup provenance on starter planning package
- ensure Work artifacts preserve setup provenance ref
- do not leave setup as long-term owner

### B3. Center project summary next-action guidance
- make “go to planning / continue in Work / inspect setup state” explicit

## Epic C — Work to Jobs continuity

### C1. Work-item to run launch continuity
- preserve work-item source refs
- preserve goal/component/rationale refs
- add return URL to Work detail

### C2. Task to run launch continuity
- preserve parent work-item refs
- preserve sprint/component context
- provide deterministic return path

### C3. Sprint to Jobs continuity
- ensure sprint-origin execution context is visible on Jobs surfaces where relevant

### C4. Work detail next-step CTA polish
- make launch/inspect job posture consistent across work-items/tasks/sprints

## Epic D — Jobs to Review continuity

### D1. Run detail review CTA trust
- primary review destination
- reason code continuity
- preserve source run context

### D2. Workflow detail review CTA trust
- workflow produced-runs summary
- review readiness signals
- return paths preserved

### D3. Retry lineage + continuity context
- previous/latest attempt links
- keep review/operate destinations consistent after retry

### D4. Outputs / runtime artifacts / evidence separation polish
- ensure jobs detail shows all three distinctly
- add related drill-through refs consistently

## Epic E — Review to Operate continuity

### E1. Release-candidate to Operate destination
- preserve release-candidate / queue / shared review context when transitioning to Operate

### E2. Queue detail next-action trust
- blocked / approval / activation next steps typed and visible
- operate destination when review state is clear

### E3. Review return path consistency
- allow users to return to Jobs or source context safely after operating transition

## Epic F — Observe drill-back continuity

### F1. Chronicle to source context trust
- preserve filters/source refs from Chronicle into Analytics/Library/source truth

### F2. Analytics drill-back consistency
- enforce typed drill-through refs back to source truth and related planes

### F3. Library drill-back consistency
- artifact/sprint/conversation rows preserve source plane + return path

## Epic G — Manage drill-back and mission-control continuity

### G1. Integrations return/source context contract
- preserve source refs from Jobs/Review/Operate into Manage/integrations

### G2. Admin environment/component continuity
- preserve linked Work/Jobs/Operate refs
- deterministic return behavior

### G3. AI Management continuity
- preserve cross-plane source refs without creating shadow truth
- keep ai-management as sole AI control plane

### G4. Concierge read continuity
- show source context / next step / return posture where Concierge surfaces summarize lifecycle state
- no new Concierge architecture in S136

## Epic H — UI/QA/closeout hardening

### H1. Add proof-critical stable test IDs only where necessary
### H2. Extend browser proof flows for all required continuity paths
### H3. Add continuity scorecard
### H4. Add lifecycle continuity proof artifacts
### H5. Add truth refresh / closeout evidence

# Sprint 136 Pack

## Theme

**Sprint 136 — Lifecycle Continuity Excellence: Setup → Work → Jobs → Review → Operate → Observe / Manage**

## Why this sprint now

By Sprint 136, PlaneStack has already spent multiple sprints deepening individual planes:
- `center`
- `work`
- `runs`
- `governance`
- `reviews`
- `operate`
- `analytics_reporting`
- `library`
- `integrations`
- `admin`
- `ai-management`

The next remaining product-quality gap is not “one more destination page.” It is whether the **whole lifecycle feels coherent when users move between planes**.

This sprint is intentionally broader than a single-plane uplift. It is a **cross-plane capstone sprint** focused on the moments where users ask:

- where did this come from?
- why am I here?
- what can I do next?
- what does this affect?
- how do I safely get back?
- why is this blocked, degraded, or ready?

## Strategic alignment posture

S136 must preserve these non-negotiable rules:

1. **Each native plane remains the owner of its own truth.**
   - Work owns planning truth
   - Jobs owns execution/run truth
   - Review owns governance/review projection truth
   - Operate owns local mission-control truth
   - Observe owns reporting/browse/history projection truth
   - Manage owns control-plane/configuration truth

2. **S136 is a continuity sprint, not a shadow-truth sprint.**
   The sprint may add continuity projections, CTA fields, return paths, source-context fields, and reason-code normalization, but it must not re-home native semantics into a new cross-plane object model.

3. **The product must remain understandable at every handoff.**
   Each major detail surface should answer:
   - what this is
   - where it came from
   - why it is in this state
   - what to do next
   - where the user can go safely from here

4. **No dead-end behavior is acceptable on proof-critical surfaces.**
   If a user reaches a detail surface in scope, the product should offer:
   - a primary next-step CTA when appropriate
   - a primary return path
   - enough context to continue the lifecycle without guessing

5. **Blocked-state and readiness explanations must remain canonical and explicit.**
   S136 should prefer typed posture / reason-code / next-action models rather than free-form explanation text only.

6. **Setup, approval, activation, execution, output, evidence, and incident semantics remain distinct.**
   S136 may connect them, but it must not collapse them into one generic “status” blob.

## Sprint intent

Make PlaneStack feel like **one coherent governed product** by standardizing and productizing cross-plane continuity through:

- shared continuity contracts
- deterministic deep links
- primary next-step CTAs
- return paths
- source-context visibility
- reason-code continuity
- blocked / degraded / ready explanations
- end-to-end proof paths across the lifecycle

## Primary lifecycle transitions to harden

### Setup / Center → Work
- setup completion should land users into the right project home and starter planning context
- planning artifacts created during setup should remain traceable back to setup provenance without being owned by setup forever

### Work → Jobs
- launching from work-items, tasks, and sprints should preserve source context, component context, rationale, and return path

### Jobs → Review
- run/workflow detail should lead clearly into release-candidate, queue, or linked review context
- review next-step posture should be obvious and not require hunting through unrelated surfaces

### Review → Operate
- once review/governance state is satisfied, users should be able to move into Operate with the right environment/session context preserved

### Observe / Manage drill-back
- users should be able to move from Observe and Manage projection surfaces back into source truth with context preserved

## Primary planes and surfaces touched

### Center
- `center > project`
- `center > setup`
- completion landing / readiness summary / source-context continuity

### Work
- `work > overview`
- `work > work-items`
- `work > tasks`
- `work > sprints`

### Jobs
- `runs > runs`
- `runs > workflows`

### Review
- `governance > approvals / blocked / decisions`
- `reviews > release-candidate / queue / shared`

### Operate
- `operate > overview`
- `operate > environments`
- `operate > sessions`
- `operate > execution`
- `operate > incidents / runbooks` where needed for continuity

### Observe
- `analytics_reporting`
- `chronicle`
- `library`

### Manage
- `integrations`
- `admin`
- `ai-management`
- `concierge` (read-only continuity only, not a new architecture sprint)

## Hard bars

Sprint 136 is successful only if it delivers all of the following:

1. **Canonical continuity contract**
   At least the proof-critical surfaces in scope expose a shared minimum continuity model:
   - `source_context_refs[]`
   - `return_url`
   - `next_required_action`
   - `reason_codes[]`
   - typed downstream / related refs where relevant

2. **No-dead-end detail surfaces**
   Proof-critical detail surfaces across Work, Jobs, Review, Operate, Observe, and Manage must not strand the user without:
   - source context
   - a return path
   - a next step when one is warranted

3. **Cross-plane CTA trust**
   The primary lifecycle CTAs must behave consistently and land users in the intended destination with preserved context.

4. **Reason-code continuity**
   Users should see consistent explanation posture for:
   - blocked
   - degraded
   - waiting
   - ready
   - active / completed where relevant

5. **Cross-plane proof paths**
   The lifecycle must be proven end to end, not just by isolated page checks.

6. **Exceptional-range quality bar**
   S136 should materially raise the *transitions* between planes into the Exceptional range, not merely the pages themselves.

## Non-goals

Sprint 136 is **not** for:
- a broad new shell/nav redesign
- replacing native plane semantics with a universal lifecycle object
- large-scale CRUD expansion
- a new AI architecture
- a new fixture system
- deep analytics or observe-specific chart work beyond continuity needs
- deep policy model redesign

## Definition of done

Sprint 136 is complete when:
- the product has a shared continuity contract in the proof-critical lifecycle surfaces,
- all required cross-plane proof paths succeed,
- blocked / degraded / ready / next-action explanations are clear and typed,
- return paths and destination CTAs behave consistently,
- truth refresh and closeout pass,
- and the lifecycle feels coherent end to end rather than like separate tools bolted together.

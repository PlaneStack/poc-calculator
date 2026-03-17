# Sprint 136 Tranche Plan

## Tranche order

1. `ps-contracts`
2. `ps-api`
3. `ps-web`
4. `ps-dev/tests`
5. proof wiring / cross-plane fixture paths
6. truth refresh / closeout

## Tranche 1 — contracts
- define shared continuity contract shapes
- document route families / response fields for proof-critical surfaces
- add any missing schema coverage for continuity fields

## Tranche 2 — api
- add continuity population helpers
- add shared reason-code / next-action helpers
- patch proof-critical routes across Center / Work / Jobs / Review / Operate / Observe / Manage

## Tranche 3 — web
- render continuity contract consistently
- add primary next-step CTA, return CTA, and source context blocks
- add proof-critical stable selectors where needed

## Tranche 4 — dev/tests
- add proof-family smoke scripts
- add browser proof flows
- add scorecard and validate summary writers

## Tranche 5 — proof fixtures
- ensure proof projects and seeded states expose all required transitions
- avoid polluting unrelated fixture projects

## Tranche 6 — truth refresh / closeout
- refresh canonical docs if semantics deepen materially
- write sprint evidence / mirror / manifest / runlog

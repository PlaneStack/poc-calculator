# Sprint 134 Pack

## Theme

**Sprint 134 — AI Management Excellence: Provider, Routing, and Governance Trust**

## Why this sprint now

Sprint 134 is positioned as a plane-focused excellence sprint for **`manage > ai-management`**.

The recent arc has already invested heavily in:
- `center`
- `work`
- `runs`
- `governance`
- `reviews`
- `operate`
- `observe`
- `integrations`
- `admin`
- onboarding/setup

The remaining high-value plane that still needs direct, explicit productization at an Exceptional level is **AI Management**. This sprint is intended to make AI Management feel like a trustworthy control plane rather than a collection of internal settings.

This sprint must preserve one non-negotiable rule:

> **AI Management remains the only AI control plane.**
> Other planes may consume AI-related state, history, warnings, or next actions, but they must not become shadow owners of provider/model/routing/policy truth.

## Sprint intent

Make `manage > ai-management` a real daily-driver control plane for:
- providers
- models
- routing
- policies
- quotas
- budgets
- ledger
- runs
- cache
- evals
- incidents

And make its downstream effects understandable from other planes without duplicating ownership.

## Primary planes and surfaces

### Primary plane
- `manage > ai-management`

### Primary surfaces to lift
- providers
- models
- routing
- policies
- quotas
- budgets
- ledger
- runs
- cache
- evals
- incidents

### Secondary continuity targets
- `manage > concierge`
- `manage > integrations`
- `jobs > runs`
- `review > governance`
- `observe > analytics_reporting`
- `observe > chronicle`

The goal is to make AI Management both:
1. strong as its own plane, and
2. trustworthy as the single source of AI policy/routing truth that other planes can reference.

## Hard bars

Sprint 134 is successful only if it delivers all of the following:

1. **Provider / model / routing trust**
   - a user can inspect active providers, available models, routing decisions, and policy posture without ambiguity
   - routing reason visibility exists without exposing secret internals or duplicating runtime state

2. **Quota / budget / ledger trust**
   - the plane clearly communicates current usage posture, constraint posture, and next required action
   - budget and quota states are explainable and cross-linked where relevant

3. **Runs / cache / evals / incidents trust**
   - AI-specific runs, cache posture, eval posture, and incident visibility feel like part of the same control plane
   - no mixed or conflicting state models across these surfaces

4. **Cross-plane continuity**
   - at least one meaningful click path from Jobs, Review, Observe, and Concierge into AI Management context
   - at least one meaningful return path back to source context

5. **No shadow truth**
   - no other plane becomes the owner of provider/model/routing/policy truth
   - downstream planes may only display linked or projected AI Management state

## Non-goals

Sprint 134 is **not** for:
- introducing a second AI control plane
- local LLM provider execution changes
- broad Concierge backend expansion
- unrelated setup wizard expansion
- broad analytics redesign outside AI-management-specific reporting needs
- user-facing feature work that bypasses governed AI policy/routing truth

## Definition of done

Sprint 134 is complete when:
- AI Management feels coherent and operator-usable across all major surfaces
- downstream planes can clearly explain AI dependencies without owning AI truth
- proof paths show provider/routing/policy/usage trust and cross-plane continuity
- validation, contract, e2e, truth refresh, and closeout all pass

# Sprint 136 Risk Register

## R1. Shadow-truth creep
**Risk:** continuity projections start acting like a universal lifecycle owner  
**Mitigation:** keep native plane ownership explicit; add only typed refs, CTAs, and reasons

## R2. CTA inconsistency
**Risk:** each surface invents different next-step behavior  
**Mitigation:** shared continuity contract and shared next-action enums

## R3. Return-path brittleness
**Risk:** deep links lose source context or strand users  
**Mitigation:** require `return_url` and source refs in proof-critical destinations

## R4. Browser smoke flakiness
**Risk:** end-to-end continuity proofs become brittle  
**Mitigation:** add proof-critical stable selectors only where needed

## R5. Scope creep into nav redesign
**Risk:** sprint turns into shell overhaul  
**Mitigation:** no nav redesign; only continuity/productization changes needed for proof paths

## R6. Proof-fixture contamination
**Risk:** existing fixture projects become polluted with lifecycle-capstone-only states  
**Mitigation:** use deterministic proof projects/overlays where needed; keep active-sprint write guards

## R7. Truth-refresh drift
**Risk:** continuity semantics deepen materially without canonical docs being updated  
**Mitigation:** mandatory truth refresh if S136 lands as designed

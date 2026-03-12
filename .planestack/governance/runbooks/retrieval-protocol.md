# Retrieval Protocol v1

## Deterministic Steps
1. Fetch canon index at `.planestack/governance/canon/index.json`.
2. Fetch the latest context capsule pointer at `.planestack/governance/context/latest.json` and resolve the versioned capsule.
3. Fetch the active lock set pointer at `.planestack/governance/locks/active.json` and resolve the lock set.
4. Answer questions with proof-carrying citations (paths + artifact IDs).

## Retrieval Drill Questions
1. Where does `.planestack/**` live for an end user project?
2. What is the bridge root and what may be written there?
3. Which root stores audit evidence vs scratch?
4. Where is the active dev-ai lockset stored?
5. How do we validate a run complied with root separation locks?
6. What is the Sprint evidence routing rule for work-producing vs ad-hoc runs?
7. What is the latest context capsule and what sprint state does it snapshot?
8. What is the canonical location of Sprint S112 closeout evidence/runlog/manifest?
9. Is navigation IA canonicalized without legacy redirects in current prelaunch posture?

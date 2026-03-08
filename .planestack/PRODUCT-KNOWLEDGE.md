# PlaneStack Product Knowledge

## Non-Negotiable Invariants

### Project Repo Mirror
For each PlaneStack project, the portable Project Library mirror lives inside the project repository at `./.planestack/**` and is the only project-scoped filesystem location PlaneStack writes that is intended to be versioned and shared.

### Client Bridge Root
Local execution capability is provided by a separate client-side bridge installed outside the project repo. The bridge may read/write ephemeral local files, but it does not replace or relocate the project's `./.planestack/**` mirror.

### Root Separation Contract
- `project_root` -> `project_root/.planestack/**` (versioned/auditable)
- `bridge_root` -> ephemeral workspaces/caches/logs (not committed)

Evidence intended for audit MUST go to `project_root`; execution scratch MUST go to `bridge_root`.

# MindfulMuse — Project Proposal (Azure + Free-Tier Guidance)

**Overview:** MindfulMuse is an AI-powered interactive creative suite (writers, musicians, designers) built with **C# + Blazor (WASM)** and an **Azure** backend. This updated proposal keeps the original architecture and roadmap but adds concrete guidance on running the project *indefinitely* on Azure’s **always-free** services — what’s feasible, where to be careful, and how to architect to avoid unexpected charges.

---

## 1. Project Overview (short)

MindfulMuse is a unified **Creative Canvas** that adapts to writing, music, and visual design. The front end is Blazor WASM; the backend is Azure serverless + managed services. AI features are provided by Gemini (via REST) and Roo Code (for RAG/prototyping). The system focuses on local-first personalization, secure cloud sync (opt-in), and cross-module linking (mood board ↔ soundtrack ↔ scene).

---

## 2. Azure Free-Tier Summary & Feasibility (indefinite / always-free)

> **Short answer:** Yes — you *can* build MindfulMuse on Azure’s always-free services **indefinitely**, **if** you design to stay within monthly free quotas and monitor usage. Heavy workloads (large audio generation, many users, large storage) will exceed free quotas and require PAYG.

### Relevant always-free allocations (typical current limits)

* **Azure Static Web Apps / App Service (free tier)** — host your Blazor app (small site, limited storage).
* **Azure Functions** — **1,000,000 executions / month** on the Consumption plan (always free allocation). Good for light orchestration and short LLM calls.
* **Azure Blob Storage** — **\~5 GB** free storage + limited transactions per month (watch operations). Use SAS tokens to control uploads.
* **Azure Cosmos DB** — free tier: **\~25 GB** storage + **1,000 RU/s** reserved throughput (suitable for small projects).
* **Azure Event Grid** — **\~100,000 operations / month** for lightweight realtime/event flows.
* **Azure AD B2C** — free allowances for a limited monthly active user count (sufficient for early adopters).
* **Other**: free access to some developer tools (DevOps users, monitoring free allowances).

> **Feasibility takeaway:** core features (Static Web Apps + Functions + Blob + Cosmos DB + Event Grid) are usable within always-free quotas for an MVP / early user base, provided usage is modest and you adopt strict cost-control patterns.

---

## 3. Updated Architecture (Azure + free-first design)

### Frontend

* **Blazor WebAssembly** hosted on **Azure Static Web Apps** (or App Service Free). Keep build size small; lazy-load heavy components.
* Use **JS interop** for WebAudio, Tone.js / Magenta.js for local previews, VexFlow/abcjs for notation, and Excalidraw embed for mood boards.

### Authentication

* **Azure AD B2C** for user sign-in (social providers). Keep profile data minimal.

### Storage & Files (free-aware)

* **Azure Blob Storage** for images/audio/exports. Use short-lived **SAS** tokens — direct client upload avoids function egress and keeps Functions cheap.
* Enforce size limits (e.g., 1–10 MB per user file) on the client to avoid transaction and storage blowups.

### Metadata & Documents

* **Azure Cosmos DB** (free tier) for projects, jobs, attachments metadata, cross-links, and small embedding metadata (not full vectors).

### Embeddings / RAG

* **Compute embeddings** in Azure Functions using Gemini embedding endpoint (or a cheaper embeddings provider).
* **Index embeddings** in **Azure Cognitive Search** *only if* you can accept potential costs — Cognitive Search vector capability may not be fully covered by always-free quotas. **Alternate:** store small embedding metadata in Cosmos DB and perform a low-scale approximate match in Functions to remain strictly free.

### Serverless Orchestration

* **Azure Functions** (Consumption). Use the **Cosmos DB change feed** or **Queue Storage** (free allowances) to trigger jobs.
* Keep Function execution time short; batch tasks if possible.

### Realtime / Collaboration (cost-aware)

* **Preferred always-free path:** keep realtime light — use **Event Grid** (free quota) + short polling or WebSocket fallback for collaborative cursors if SignalR costs would exceed free limits.
* If you need richer realtime and are prepared to accept costs, consider **Azure SignalR Service** (may not be covered by always-free). For strictly free builds, design collaborative features minimally.

### Secrets & Security

* **Azure Key Vault** (note: Key Vault has free tier behavior for small workloads but check exact limits) accessed by Functions via **Managed Identity**.
* Keep LLM keys in Key Vault; never embed keys in the client.

---

## 4. Free-first Implementation Patterns (practical rules)

1. **Client-first previews:** generate quick audio / palette previews in the browser (Tone.js, Vibrant.js). Only upload final exports to Blob when user explicitly exports. This minimizes Function calls and Blob operations.
2. **SAS direct uploads:** Functions issue short SAS tokens; clients upload directly to Blob. This saves Function bandwidth and cost.
3. **Cap file sizes & retention:** limit uploads (e.g., 5–10 MB) and implement automated retention/deletion (e.g., delete older artifacts after X days) to keep Blob under 5 GB.
4. **Batch and debounce LLM calls:** debounce user typing and group requests; use short completions for inline suggestions to reduce per-month executions.
5. **Use Cosmos DB free RU budget carefully:** index only necessary fields; avoid heavy cross-container queries.
6. **Opt-in heavy features:** features that likely exceed free quotas (high-quality audio renders, long transcripts, large team collaboration) should be opt-in paid features.
7. **Fallbacks for vector search:** If Cognitive Search would exceed free budgets, implement a lower-cost local similarity lookup (store compact vectors, do cosine similarity in Functions with small candidate sets).

---

## 5. Monitoring, Budget Control & Safety Nets

To run indefinitely for free, automated monitoring & guardrails are mandatory:

* **Azure Cost Management / Budgets:** create a monthly budget of `$0.50–$1` and set alerts at 50%, 75%, 90% of that threshold. (You’ll need PAYG to receive billing alerts — if you’re on a free trial, you’ll get trial notifications.)
* **Usage alerts:** enable Function execution alerts and Blob transaction thresholds via Azure Monitor.
* **Automated resource shutdown:** create lightweight Functions or scripts to disable uploads or pause nonessential services once thresholds are hit (e.g., deny further uploads or turn off heavy processing).
* **Logging limits:** avoid verbose logging that consumes operations; route only essential telemetry to Application Insights.
* **Delete idle resources:** tear down development or test resources (containers, large containers, test VMs) when not in use.

---

## 6. MVP (Hackathon) Plan — Free-tier focused

**Goal:** deliver an end-to-end cross-module demo that comfortably runs within always-free quotas.

**MVP scope (free-first):**

* Blazor WASM Creative Canvas shell (Static Web Apps).
* Excalidraw embed for mood boards (client only).
* Client-side image palette extraction (Vibrant.js via JS interop) + upload to Blob (SAS).
* Client-side hum recording + Tone.js harmonizer for 20–30s preview; optional upload of short preview.
* Azure Function that handles *text suggestion* jobs by calling Gemini REST for short completions; store results in Cosmos DB + Blobs.
* Minimal realtime: Event Grid notifications + short polling to update job status.

**Why this fits free:** heavy work (audio preview, palette extraction) happens client-side; Function calls are short and infrequent; Blob usage remains small.

---

## 7. Caveats & When You’ll Need PAYG

* **High concurrency** (many users) will exceed free quotas for Functions, Blob transactions, and Cosmos RU/s.
* **Large files** and long audio generation or storing many assets will exceed Blob free storage.
* **Cognitive Search vector indexes** and **SignalR** richer realtime services may not be covered under always-free quotas and can add charges.
* **To receive cost alerts** or billing beyond trial you must have a PAYG subscription attached to the subscription; free always quotas still apply but alerting/billing features are tied to subscription types.

---

## 8. Roadmap & Milestones (with free-tier checkpoints)

**Phase 0 — Planning (1 week)**

* Create Azure subscription & set budgets/alerts. Sketch resource naming and retention policies.

**Phase 1 — Hackathon MVP (2–4 weeks)**

* Build Blazor shell + Excalidraw embed; implement client-side palette & audio preview.
* Add Blob uploads (SAS) and basic Cosmos DB metadata.
* Add Azure Function to call Gemini for short writing suggestions.
* Test under expected usage; confirm all metrics remain under free limits.

**Phase 2 — Beta (6–10 weeks)**

* Add optional RAG workflows (small embedding index). Keep vector store small or use Cognitive Search with careful cost modeling.
* Add lightweight collaboration (Event Grid + short polling).
* Implement retention scripts to keep Blob under threshold.

**Phase 3 — Growth / Monetization (post-free scale)**

* Introduce paid exports, higher-quality audio, team plans to fund PAYG. Migrate heavy parts (vector search, long audio renders, SignalR) to paid tiers.

---

## 9. Security & Privacy (unchanged, but free-aware)

* Use **Key Vault** + Managed Identity for secrets (keep calls from Functions).
* Default to local-first personalization (IndexedDB) to reduce cloud storage.
* Provide **export/delete** tools so users can remove data and keep storage usage low.
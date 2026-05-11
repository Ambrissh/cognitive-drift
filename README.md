# Cognitive Drift

### Real-time observability for LLM uncertainty and reasoning instability.

Cognitive Drift visualizes how a language model behaves while generating responses in real time.


Instead of only showing the final answer, the system exposes *reasoning stability*, *uncertainty fluctuations*, and *potential hallucination-risk zones* during token generation.

The project explores a simple idea:

> *What if we could monitor an LLM the same way we monitor a heartbeat or system telemetry?*

---

# Why this exists

Large language models often produce fluent answers even when uncertain.

Most interfaces hide this uncertainty completely.

Cognitive Drift attempts to make that hidden behavior visible by attaching a live observability layer to streaming inference.

The goal is not to judge correctness perfectly.

The goal is to expose:

* instability,
* confidence shifts,
* and reasoning drift
  as generation happens.

---

# Features

* **Streaming AI responses**
* **Live entropy / uncertainty graph**
* **Reasoning stability meter**
* **Hallucination-risk visualization**
* **Real-time observability UI**
* **Graceful fallback mode if model API becomes unavailable**

---

# How it works

```text
User Prompt
    ↓
Streaming LLM Response
    ↓
Token-by-token uncertainty estimation
    ↓
Live entropy visualization
    ↓
Reasoning stability analysis
```

As tokens stream in:

* entropy values are estimated,
* instability spikes are visualized,
* and the UI updates continuously.

Higher spikes suggest:

* increased uncertainty,
* unstable reasoning trajectories,
* or hallucination-prone regions.

Lower, flatter regions suggest:

* more stable generation behavior.

---

# Architecture

## Frontend

* Next.js
* React
* TailwindCSS
* Recharts

## Backend

* Next.js API Routes
* Streaming Server-Sent Events (SSE)

## Model

* Gemini API

## Deployment

* Vercel

---

# Design Philosophy

This project intentionally avoids:

* authentication,
* databases,
* multi-page architecture,
* excessive features,
* over-engineering.

The focus was:

> build the smallest possible version of a compelling AI observability tool.

The core interaction mattered more than polish.

---

# Demo Focus

The system is designed to answer one question clearly:

> *Can we visualize model uncertainty while generation is happening?*

Everything else was intentionally left out.

---

# Future Directions

* Real token-level log probability integration
* Cross-model observability comparisons
* Attention-pattern overlays
* Mechanistic interpretability tooling
* Long-context drift analysis
* Developer-facing observability SDK

---

# Local Setup

```bash
git clone https://github.com/ambrissh/cognitive-drift.git

cd cognitive-drift

npm install

npm run dev
```

---

# Environment Variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_api_key_here
```

---

# Inspiration

Cognitive Drift was inspired by:

* AI observability systems,
* mechanistic interpretability research,
* hallucination analysis,
* and the idea that AI systems should expose uncertainty instead of hiding it.

---

# Live Demo

https://cognitive-drift-demo.vercel.app

---

# Author

Ambrissh


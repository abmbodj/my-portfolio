---
title: "Dawn"
description: "A context- and cost-conscious terminal coding agent with an interactive TUI, resumable sessions, and measurable context management."
date: "2026-06-01"
tags:
  - "TypeScript"
  - "Bun"
  - "SQLite"
  - "AI Agents"
repository_url: "https://github.com/abmbodj/Dawn"
---

Dawn is an open-source terminal coding agent built with Bun and TypeScript. It provides an interactive TUI, permissioned tools, resumable SQLite-backed sessions, multi-provider model selection, one-shot automation, and support for MCP servers, plugins, and skills.

Its core design treats model context as a managed budget. Each turn can combine cached repository summaries, leased working sets, bounded file reads, atomic history trimming, and content-aware tool-output compaction. Full tool results remain recoverable through expansion rather than being discarded.

The project includes visible usage accounting and a reproducible benchmark harness. Its committed same-model benchmark reports a lower cost per successful task than Dawn's context-management-disabled baseline while maintaining a higher pass rate.

## Highlights

- Interactive terminal UI with permission prompts and resumable sessions.
- Adaptive context budgets and prompt-caching-aware planning.
- Reversible compaction for JSON, logs, search results, and free text.
- Multi-provider models plus MCP, plugin, and skill support.
- Benchmark reporting that separates measured spend from estimated avoided context.

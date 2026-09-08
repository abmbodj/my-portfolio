---
title: "AgentShelf"
description: "A macOS menu-bar app that surfaces AI coding-agent sessions, approvals, status, and activity in or near the notch."
date: "2026-07-20"
tags:
  - "Swift"
  - "macOS"
  - "Developer Tools"
  - "AI Agents"
repository_url: "https://github.com/abmbodj/AgentShelf"
---

AgentShelf keeps active AI coding sessions visible without requiring constant switches back to a terminal. Its compact shelf shows current activity and attention states for supported agents, while deeper integrations with Claude Code and Codex Desktop can surface approval requests directly in the macOS interface.

The application combines a native Swift interface with a local Unix-socket integration. Hook events are normalized into a shared message format, delivered to an in-memory session store, and reconciled into compact and expanded notch states. Source-specific responses preserve the approval behavior expected by each coding agent.

AgentShelf also handles practical desktop concerns such as precise terminal targeting, grouped subagent sessions, bounded patch previews, launch-at-login behavior, release checks, and failure-open timeout chains for approval hooks.

## Highlights

- Native macOS menu-bar and notch interface built with Swift.
- Monitoring registry covering 26 AI coding agents at different integration tiers.
- Inline approval flows for Claude Code and Codex Desktop.
- Session grouping, activity labels, usage visibility, and terminal handoff behavior.
- Automated Swift tests covering hook setup, event normalization, approval decisions, diffs, process matching, and session state.

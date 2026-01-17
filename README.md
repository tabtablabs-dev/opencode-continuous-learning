# Claude Code Continuous Learning Skill

A Claude Code skill that extracts learned knowledge into reusable skills. When Claude Code discovers something non-obvious—a debugging technique, a workaround, a project-specific pattern—it automatically saves that knowledge where it can be retrieved for similar future tasks.

The problem: every time you use an AI coding agent, it starts from zero. You spend an hour debugging some obscure error, the agent figures it out, and then the session ends. Next time you hit the same issue? Another hour.

This skill fixes that. Knowledge compounds instead of disappearing.

## Installation

### User-level (recommended)

```bash
git clone https://github.com/blader/claude-code-continuous-learning-skill.git ~/.claude/skills/continuous-learning
```

### Project-level

```bash
git clone https://github.com/blader/claude-code-continuous-learning-skill.git .claude/skills/continuous-learning
```

## Usage

### Automatic Mode

The skill activates automatically when Claude Code:
- Completes a task that required significant debugging or investigation
- Discovers a non-obvious solution or workaround
- Learns something project-specific that isn't documented

### Explicit Mode

Trigger a learning retrospective:

```
/retrospective
```

Or explicitly request skill extraction:

```
Save what we just learned as a skill
```

### What Gets Extracted

The skill is selective—not every task produces a skill. It extracts knowledge that is:

- **Non-obvious**: Required discovery, not just documentation lookup
- **Reusable**: Will help with future similar tasks
- **Specific**: Has clear trigger conditions and solutions
- **Verified**: Has actually been tested and works

## Research Foundation

This approach is grounded in academic research on skill libraries for AI agents.

**[Voyager](https://arxiv.org/abs/2305.16291)** (Wang et al., 2023) is the foundational work. It demonstrated that game-playing agents can build "ever-growing skill libraries of executable code for storing and retrieving complex behaviors." Key insight: skills should be compositional (building on each other), interpretable (readable and understandable), and temporally extended (capturing multi-step procedures). Most importantly, skill libraries "alleviate catastrophic forgetting" by persisting knowledge across sessions.

**[CASCADE](https://arxiv.org/abs/2512.23880)** (2024) introduced the concept of meta-skills—skills for acquiring skills. Agents can develop "continuous learning via web search and code extraction, and self-reflection via introspection." This skill implements that pattern: it's a meta-skill that creates other skills.

**[SEAgent](https://arxiv.org/abs/2508.04700)** (2025) proved agents can "autonomously master novel software environments via experiential learning, where agents explore new software, learn through iterative trial-and-error." The `/retrospective` mode in this skill mirrors SEAgent's approach of learning from both failures and successes.

**[Reflexion](https://arxiv.org/abs/2303.11366)** (Shinn et al., 2023) established that self-reflection improves agent performance. This skill uses similar prompts: "What did I just learn that wasn't obvious before starting?" and "If I faced this exact problem again, what would I wish I knew?"

The pattern is consistent: agents with persistent skill libraries dramatically outperform agents that start fresh every session.

## How It Works

Claude Code has a native skills system that this skill exploits:

1. **Semantic retrieval**: Claude loads only skill names and descriptions at startup (~100 tokens each). When working on a task, it semantically matches your context against those descriptions and loads relevant skills on demand.

2. **Write, not just read**: The skill system is a retrieval mechanism—and retrieval mechanisms can be written to, not just read from. This skill writes new skills when it discovers extractable knowledge.

3. **Description is everything**: Skills surface via semantic matching, so the description field determines discoverability. Vague descriptions like "helps with database problems" won't surface when needed. Good descriptions include exact error messages, specific frameworks, and clear trigger conditions.

For more on the skills architecture, see the [Anthropic Engineering Blog](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).

## Skill Format

Extracted skills are markdown files with YAML frontmatter:

```yaml
---
name: prisma-connection-pool-exhaustion
description: |
  Fix for PrismaClientKnownRequestError: Too many database connections 
  in serverless environments (Vercel, AWS Lambda). Use when connection 
  count errors appear after ~5 concurrent requests.
author: Claude Code
version: 1.0.0
---

# Prisma Connection Pool Exhaustion

## Problem
[What this skill solves]

## Trigger Conditions
[Exact error messages, symptoms, scenarios]

## Solution
[Step-by-step fix]

## Verification
[How to confirm it worked]
```

See `resources/skill-template.md` for the full template.

## Quality Gates

Not every task produces a skill. The system only extracts knowledge that is:

- **Reusable** — will help with future tasks, not just this one instance
- **Non-trivial** — required discovery, not just documentation lookup
- **Specific** — has clear trigger conditions (exact error messages, symptoms)
- **Verified** — the solution actually worked, not just theoretically

## Examples

See `examples/` for sample extracted skills:

- `nextjs-server-side-error-debugging/` — finding errors that don't show in browser console
- `prisma-connection-pool-exhaustion/` — solving "too many connections" in serverless
- `typescript-circular-dependency/` — detecting and resolving import cycles

## Contributing

Contributions welcome. Fork, make changes, submit a PR.

## License

MIT

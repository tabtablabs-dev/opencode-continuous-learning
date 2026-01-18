# OpenCode Continuous Learning Skill

Every time you use an AI coding agent, it starts from zero. You spend an hour debugging some obscure error, the agent figures it out, session ends. Next time you hit the same issue? Another hour.

This skill fixes that. When OpenCode discovers something non-obvious (a debugging technique, a workaround, some project-specific pattern), it saves that knowledge as a new skill. Next time a similar problem comes up, the skill gets loaded automatically.

## Installation

### Step 1: Clone the skill

**User-level (recommended)**

```bash
git clone https://github.com/tabtablabs-dev/opencode-continuous-learning.git ~/.config/opencode/skills/continuous-learning
```

**Project-level**

```bash
git clone https://github.com/tabtablabs-dev/opencode-continuous-learning.git .opencode/skills/continuous-learning
```

### Step 2: Install the activator plugin

The skill can activate via semantic matching, but a plugin ensures it evaluates every session for extractable knowledge.

**User-level**

```bash
mkdir -p ~/.config/opencode/plugins
cp ~/.config/opencode/skills/continuous-learning/opencode/plugins/continuous-learning-activator.js \
  ~/.config/opencode/plugins/continuous-learning-activator.js
```

**Project-level**

```bash
mkdir -p .opencode/plugins
cp .opencode/skills/continuous-learning/opencode/plugins/continuous-learning-activator.js \
  .opencode/plugins/continuous-learning-activator.js
```

Plugins are auto-loaded from these directories.

### Step 3: Install the /learn command

**User-level**

```bash
mkdir -p ~/.config/opencode/commands
cp ~/.config/opencode/skills/continuous-learning/opencode/commands/learn.md \
  ~/.config/opencode/commands/learn.md
```

**Project-level**

```bash
mkdir -p .opencode/commands
cp .opencode/skills/continuous-learning/opencode/commands/learn.md \
  .opencode/commands/learn.md
```

Custom commands are discovered from these directories, and you run them by typing `/learn`.

## Usage

### Automatic Mode

The skill activates automatically when OpenCode:
- Just completed debugging and discovered a non-obvious solution
- Found a workaround through investigation or trial-and-error
- Resolved an error where the root cause wasn't immediately apparent
- Learned project-specific patterns or configurations through investigation
- Completed any task where the solution required meaningful discovery

### Explicit Mode

Trigger a learning review:

```
/learn
```

Or explicitly request skill extraction:

```
Save what we just learned as a skill
```

### What Gets Extracted

Not every task produces a skill. It only extracts knowledge that required actual discovery (not just reading docs), will help with future tasks, has clear trigger conditions, and has been verified to work.

## Research

The idea comes from academic work on skill libraries for AI agents.

[Voyager](https://arxiv.org/abs/2305.16291) (Wang et al., 2023) showed that game-playing agents can build up libraries of reusable skills over time, and that this helps them avoid re-learning things they already figured out. [CASCADE](https://arxiv.org/abs/2512.23880) (2024) introduced "meta-skills" (skills for acquiring skills), which is what this is. [SEAgent](https://arxiv.org/abs/2508.04700) (2025) showed agents can learn new software environments through trial and error, which is where the `/learn` idea comes from. [Reflexion](https://arxiv.org/abs/2303.11366) (Shinn et al., 2023) showed that self-reflection helps.

Agents that persist what they learn do better than agents that start fresh.

## How It Works

OpenCode has a native skills system. At startup, it loads skill names and descriptions (about 100 tokens each). When you're working, it matches your current context against those descriptions and pulls in relevant skills.

But this retrieval system can be written to, not just read from. So when this skill notices extractable knowledge, it writes a new skill with a description optimized for future retrieval.

The description matters a lot. "Helps with database problems" won't match anything useful. "Fix for PrismaClientKnownRequestError in serverless" will match when someone hits that error.

## Skill Format

Extracted skills are markdown files with YAML frontmatter:

```yaml
---
name: prisma-connection-pool-exhaustion
description: |
  Fix for PrismaClientKnownRequestError: Too many database connections 
  in serverless environments (Vercel, AWS Lambda). Use when connection 
  count errors appear after ~5 concurrent requests.
license: MIT
compatibility: opencode
metadata:
  author: OpenCode
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

See `opencode/templates/skill-template.opencode.md` for the full template.

## Quality Gates

The skill is picky about what it extracts. If something is just a documentation lookup, or only useful for this one case, or hasn't actually been tested, it won't create a skill. Would this actually help someone who hits this problem in six months? If not, no skill.

## Examples

See `examples/` for sample skills:

- `nextjs-server-side-error-debugging/`: errors that don't show in browser console
- `prisma-connection-pool-exhaustion/`: the "too many connections" serverless problem
- `typescript-circular-dependency/`: detecting and fixing import cycles

## Contributing

Contributions welcome. Fork, make changes, submit a PR.

## License

MIT

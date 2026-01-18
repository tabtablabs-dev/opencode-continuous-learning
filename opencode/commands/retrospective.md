---
description: Run a learning retrospective and extract reusable OpenCode skills when warranted
---

We just completed work that may include discoveries.

1) Summarize what we did and what we learned (bullet list).
2) Identify any "skill-worthy" items:
   - non-obvious root causes
   - workarounds found via trial/error
   - project-specific patterns/config quirks
   - debugging playbooks that are likely to recur
3) For each skill-worthy item:
   - create `.opencode/skills/<skill-name>/SKILL.md` (project-local) using the template
     OR if it is cross-project, use `~/.config/opencode/skills/<skill-name>/SKILL.md`
   - ensure the skill name matches `^[a-z0-9]+(-[a-z0-9]+)*$`
   - include precise trigger conditions and a verification section
4) If nothing is skill-worthy, say: "No extractable skill from this session" and explain why.

Optional context (if git is available):
- Recent changes: !`git status --porcelain`
- Diffstat: !`git diff --stat`

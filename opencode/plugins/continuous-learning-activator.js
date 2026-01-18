// Place this file in:
// - Project: .opencode/plugins/continuous-learning-activator.js
// - Global:  ~/.config/opencode/plugins/continuous-learning-activator.js
//
// This plugin reminds you to run /retrospective when a session becomes idle.

export const ContinuousLearningActivator = async ({ client }) => {
  // Choose behavior:
  // - "toast": show a reminder toast after each assistant response
  // - "append": append a reminder into the prompt input box
  const MODE = "toast";

  const APPEND_TEXT =
    "\n\n[Learning checkpoint] If we discovered a non-obvious fix/workaround/pattern, run /retrospective to save it as a skill.";

  let lastFiredAt = 0;
  const COOLDOWN_MS = 1500;

  return {
    event: async ({ event }) => {
      // Fired when the assistant finishes responding and OpenCode is waiting for user input
      if (event.type !== "session.idle") return;

      const now = Date.now();
      if (now - lastFiredAt < COOLDOWN_MS) return;
      lastFiredAt = now;

      if (MODE === "append") {
        // Append text into the TUI prompt input
        await client.tui.appendPrompt({ body: { text: APPEND_TEXT } });
        return;
      }

      // Default: show a toast reminder (doesn't clutter the prompt)
      await client.tui.showToast({
        body: {
          message: "Continuous learning: if we learned something non-obvious, run /retrospective to save it as a skill.",
          variant: "info",
        },
      });
    },
  };
};

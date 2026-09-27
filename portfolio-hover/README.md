# portfolio-hover

Source of the hover preview shown on thomasmoserdev.com/projects for HabitForge.

- `capture.mjs`: captures the real website (apps/website, live at habit-forge-web.vercel.app) into `captures/`:
  the hero, the Features section, one viewport per scroll step, and each hover transition as a sequence
  of real intermediate states (CSS transitions slowed through the DevTools Animation domain).
- `comp.html`: the 8s, 1280x800 loop, drawn from the captures (every frame is a function of time).
- `out/`: rendered `habit-forge.mp4` (silent H.264) and its first frame.

`engine.js`, `base.css` and `render.mjs` are copied from the portfolio's `resources/hover-videos/kit`,
which documents how to capture and render.

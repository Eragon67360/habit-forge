// Captures the real HabitForge website (apps/website) for the portfolio hover video.
// Run: HOVER_KIT_DIR=<portfolio>/resources/hover-videos/kit HOVER_KIT_DEPS=<deps>/package.json node capture.mjs
// Hover transitions are CSS (rotate/scale, 300-500ms). They are slowed 5x through the DevTools
// Animation domain so each one can be captured as a sequence of real intermediate states.
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
const { openBrowser, warmUp, shoot, box } = await import(`${process.env.HOVER_KIT_DIR}/capture.mjs`);

const dir = new URL("./captures", import.meta.url).pathname;
const SITE = "https://habit-forge-web.vercel.app";
const { browser, page } = await openBrowser();
const cdp = await page.context().newCDPSession(page);
const layout = {};

/** Viewport JPEG at CSS scale (1280x800): used for in-between states that are never zoomed. */
const frame = (sub, i) => page.screenshot({ path: `${dir}/${sub}/${String(i).padStart(2, "0")}.jpg`, type: "jpeg", quality: 85, scale: "css" });
const center = (b) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });

/** Hover `selector` and capture the (slowed) CSS transition as `steps` frames. */
async function hoverSequence(sub, selector, steps = 8) {
  mkdirSync(`${dir}/${sub}`, { recursive: true });
  const b = await box(page, selector);
  await cdp.send("Animation.setPlaybackRate", { playbackRate: 0.2 });
  const c = center(b);
  await page.mouse.move(c.x, c.y);
  for (let i = 1; i <= steps; i++) {
    await page.waitForTimeout(260);
    await frame(sub, i);
  }
  await cdp.send("Animation.setPlaybackRate", { playbackRate: 1 });
  await page.waitForTimeout(300);
  await shoot(page, dir, `${sub}-end`, { full: false });
  return b;
}

async function scrollTo(y) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  await page.waitForTimeout(700);
}
const pageTop = (sel) => page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { top: r.top + scrollY, h: r.height }; }, sel);

rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });
await cdp.send("Animation.enable");
await page.goto(SITE, { waitUntil: "networkidle" });
await page.mouse.move(1279, 799);
await warmUp(page);
await page.waitForTimeout(1500);
await shoot(page, dir, "home", { full: false });

// Beat 1: hover the hero phone (it straightens from rotate-3 to 0).
layout.heroPhone = await hoverSequence("hero", 'img[alt^="HabitForge app screenshot"]');
layout.navFeatures = await box(page, 'nav a[href="#features"]');

// Beat 2: the Features section, hover the first card.
const feat = await pageTop("#features");
layout.featuresY = Math.round(feat.top + 40);
await page.mouse.move(1279, 799);
await scrollTo(layout.featuresY);
await shoot(page, dir, "features", { full: false });
const card = 'xpath=//h3[normalize-space()="Smart Habit Tracking"]/ancestor::div[contains(@class,"rounded-3xl")][1]';
layout.card = await hoverSequence("card", card, 6);

// Scroll from the features to the interface section, one real capture per step.
// Frame the three (rotated) screens just under the floating nav pill, labels included.
const iface = await pageTop('img[alt="HabitForge Habits Tracking Screen"]');
layout.interfaceY = Math.round(iface.top - 95);
await page.mouse.move(1279, 799);
const STEPS = 22;
mkdirSync(`${dir}/scroll`, { recursive: true });
for (let i = 1; i <= STEPS; i++) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), Math.round(layout.featuresY + ((layout.interfaceY - layout.featuresY) * i) / STEPS));
  await page.waitForTimeout(90);
  await frame("scroll", i);
}
layout.scrollSteps = STEPS;
await page.waitForTimeout(700);
await shoot(page, dir, "interface", { full: false });

// Beat 3: hover each of the three app screens in turn.
layout.phones = [];
for (const [i, alt] of ["HabitForge Habits Tracking Screen", "HabitForge Settings Screen", "HabitForge Security Screen"].entries()) {
  layout.phones.push(await hoverSequence(`phone${i + 1}`, `img[alt="${alt}"]`));
}

writeFileSync(`${dir}/layout.js`, `window.LAYOUT = ${JSON.stringify(layout, null, 2)};\n`);
console.log(layout);
await browser.close();

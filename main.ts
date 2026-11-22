// Entry for make.fun bounty post-x-the-agent-builds-a-game-from-20261122-1709
// (Node 22, standard library only): it copies POST.json — the address of the
// X post carrying the video — and video.mp4 — the video itself — from the
// repository root to the output directory, where the gate reads POST.json.
// The entry is the post itself: the video shows an AI coding agent building
// the tiny browser game Meteor Dodge (game.html in this repository) from one
// prompt, while the viewer watches, and ends with make.fun's referral end
// card. The house reads the post's views, likes, reposts, quotes and replies
// from X; nothing this program writes about the post is scored.
//
// The POST.json in this repository holds a placeholder address until the post
// is made; replace it with the real post address before submitting. The video
// file is copied too so the entry carries the exact clip that was posted.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
if (existsSync(join(BOT_DIR, 'video.mp4'))) {
  copyFileSync(join(BOT_DIR, 'video.mp4'), join(OUTPUT_DIR, 'video.mp4'));
  console.log('video.mp4 copied to output.');
}
console.log('POST.json copied to output.');

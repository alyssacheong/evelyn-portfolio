Playable Unity WebGL builds live here.

Among the Lotus and the Light
-----------------------------
The site loads:  public/games/among-the-lotus/index.html
(wired via `webgl: 'games/among-the-lotus/index.html'` in src/content.ts)

Right now that folder holds a PLACEHOLDER page. To make the game playable:

1. In Unity: File → Build Settings → platform WebGL → Build.
2. IMPORTANT — Player Settings → Publishing Settings →
   Compression Format: **Disabled**  (or tick "Decompression Fallback").
   Default Brotli/Gzip builds need special server headers that most static
   hosts (GitHub Pages, plain static hosting) do NOT send, and the game will
   silently fail to load. "Disabled" just works everywhere.
3. Replace the CONTENTS of  public/games/among-the-lotus/  with your export,
   so these exist afterwards:
       public/games/among-the-lotus/index.html
       public/games/among-the-lotus/Build/
       public/games/among-the-lotus/TemplateData/
4. Optional: if your canvas isn't 16:9, set `webglAspect` on the project in
   src/content.ts (e.g. '960 / 600') so the frame matches.

That's it — the "Play in browser" button on the Design page will load it.

Lighter alternative: upload the WebGL build to itch.io and instead set
`webgl` to the itch embed URL — keeps this repo small. The same button works.

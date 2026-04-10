import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ── No cache in dev ──
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// ── Spline viewer iframe endpoints ──
app.get('/spline/:id', (req, res) => {
  const { id } = req.params;
  const FILE_MAP = {
    clarity: 'scene-18-clean.splinecode',
    truck:   'scene-15-clean.splinecode',
    corpex:  'scene-17-clean.splinecode',
    nike:    'nike.splinecode',
    forza:   'scene-19-clean.splinecode',
    donor:   'scene-20-clean.splinecode',
    table:   'scene-21-clean.splinecode',
    salud:   'scene-22-clean.splinecode',
  };
  const filename = FILE_MAP[id] || `${id}.splinecode`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: transparent; }
    canvas { display: block; width: 100%; height: 100%; background: transparent; }
    #error { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #f00; font-family: monospace; text-align: center; z-index: 10; }
    a[href*="spline"], .logo, .watermark, .built-with, .badge { display: none !important; }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <div id="error"></div>
  <script>
    (async () => {
      try {
        const { Application } = await import('https://unpkg.com/@splinetool/runtime');
        const canvas = document.getElementById('canvas');
        const gl = canvas.getContext('webgl2', {
          alpha: true,
          premultipliedAlpha: false,
          preserveDrawingBuffer: true
        });
        if (gl) { gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT); }
        const app = new Application(canvas);
        await app.load('/assets/${filename}');
        if (gl) gl.clearColor(0,0,0,0);
        setInterval(() => {
          document.querySelectorAll('a').forEach(a => { if (a.href.includes('spline')) a.style.display='none'; });
          document.querySelectorAll('canvas').forEach(c => {
            if (c.shadowRoot) c.shadowRoot.querySelectorAll('a').forEach(a => { if (a.href.includes('spline')) a.style.display='none'; });
          });
        }, 100);
      } catch(e) {
        document.getElementById('error').innerHTML = 'Error: ' + e.message;
      }
    })();
  </script>
</body>
</html>`;
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// ── Serve .splinecode files ──
app.get('/assets/:filename', (req, res) => {
  const { filename } = req.params;
  const file = path.join(__dirname, 'assets', filename);
  if (fs.existsSync(file)) {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.sendFile(file);
  } else {
    res.status(404).send('File not found');
  }
});

// ── Serve all other assets ──
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// ── Serve reference images at /ref/ ──
app.use('/ref', express.static(path.join(__dirname, 'assets/minta-framer-ai (1)/images')));

// ── Serve React build (static + SPA fallback) ──
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'react.html'));
  });
} else {
  // Fallback: serve vanilla app during development (no build yet)
  app.use('/src', express.static(path.join(__dirname, 'src')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});

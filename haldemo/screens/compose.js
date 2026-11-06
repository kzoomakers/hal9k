// A small composer for hand-written scenes made of timed SVG pieces (text, lines, boxes). Params (from haldemo-timeline.js):
//   { bg, items: [{ svg: '<text ...>..</text>', t0, t1, fx, dur, hold }] }   times in seconds since the slide began
//   fx: ''      (just on at t0)         'flick' (flickers on over .5 s)          'type' (left-to-right reveal over dur)
//       'down'  (top-to-bottom reveal)  'draw' (stroke-draw, needs pathLength=1 on the paths)   'fade' (fade in over dur)
//       'blink' (blinks n=hold times then stays)
//   mv: [x0, y0, x1, y1, ta, tb] (any piece) glides by (x1-x0, y1-y0) between ta and tb (draw the piece at its start square)
//   lv: [[t, level], ...] (any piece) steps its brightness: at each t the opacity becomes level (0-1)
//       'zoom'  (add rev:true to shrink instead; from scale z.s, shifted by z.x/z.y, to normal size over dur starting at zt; before zt it sits at the small size)
// The scene definitions live in hal-frames/scenes_b.py (it writes them into native_screens.json), so every scene stays plain, readable SVG.
(window.NATIVE = window.NATIVE || {}).compose = {
  mount(host, p) {
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:${p.bg}">${p.items.map(() => '<g></g>').join('')}</svg>`;
    const gs = [...host.querySelectorAll('svg > g')];
    p.items.forEach((it, i) => { gs[i].innerHTML = it.svg; });
    const paths = gs.map(g => [...g.querySelectorAll('[pathLength]')]);
    // a 'plane' piece is a real moving object, not a drawing: { plane: { keys: [[t, cx, cy, angleDeg, length, width], ...], cell: [along, across], color, on: [[from, to], ...] } }.
    // It is a rotated rectangle (long side along `angle`) whose centre, angle and size are interpolated between the keys, with a grid at fixed spacing in its own coordinates; shown only inside the `on` windows.
    const planeEls = p.items.map((it, i) => { if (!it.plane) return null; gs[i].innerHTML = '<path class="pf"/><path class="pg" fill="none"/>'; return { f: gs[i].querySelector('.pf'), g: gs[i].querySelector('.pg') }; });
    const planeAt = (k, t) => { let i = 1; while (i < k.length - 1 && k[i][0] < t) i++; const a = k[i - 1], b = k[i], u = Math.min(1, Math.max(0, (t - a[0]) / (b[0] - a[0] || 1))); return a.slice(1).map((v, j) => v + (b[j + 1] - v) * u); };
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const svg = host.firstChild;
    return {
      update(t) {
        // p.blinks: [[from, to, period]]: the whole scene flicks off and on every `period` seconds in that stretch
        svg.style.visibility = (p.blinks || []).some(([a, b, per]) => t >= a && t < b && Math.floor((t - a) / per) % 2 === 0) ? 'hidden' : '';
        p.items.forEach((it, i) => {
          const g = gs[i], t0 = it.t0 || 0, t1 = it.t1 == null ? 1e9 : it.t1, d = it.dur || .5;
          if (t < t0 || t >= t1) { g.style.display = 'none'; return; }
          if (it.plane) {
            const pl = it.plane, on = pl.on.find(([a, b]) => t >= a && t < b);
            if (!on) { g.style.display = 'none'; return; }
            const [cx, cy, ang, L, W] = planeAt(pl.keys, t), r = ang * Math.PI / 180, ux = Math.cos(r), uy = Math.sin(r), vx = -uy, vy = ux, [ca, cw0] = pl.cell, narrow = W < 200, cw = narrow ? 5 : cw0;   // a narrow sheet is seen almost edge-on: its lines crowd together into a solid band
            const P = (x, y) => `${(cx + ux * x + vx * y).toFixed(1)} ${(cy + uy * x + vy * y).toFixed(1)}`;
            let d = '';
            for (let y = -W / 2 + cw / 2; y < W / 2; y += cw) d += `M${P(-L / 2, y)}L${P(L / 2, y)}`;     // lines along the length
            for (let x = -L / 2 + ca / 2; x < L / 2; x += ca) d += `M${P(x, -W / 2)}L${P(x, W / 2)}`;    // lines across it
            planeEls[i].g.setAttribute('d', d + `M${P(-L / 2, -W / 2)}L${P(L / 2, -W / 2)}L${P(L / 2, W / 2)}L${P(-L / 2, W / 2)}Z`);
            planeEls[i].f.setAttribute('d', `M${P(-L / 2, -W / 2)}L${P(L / 2, -W / 2)}L${P(L / 2, W / 2)}L${P(-L / 2, W / 2)}Z`);
            planeEls[i].f.setAttribute('fill', pl.color); planeEls[i].f.setAttribute('fill-opacity', narrow ? '.5' : '.14');
            planeEls[i].g.setAttribute('stroke', pl.color); planeEls[i].g.setAttribute('stroke-width', '1.2'); planeEls[i].g.setAttribute('stroke-opacity', narrow ? '.5' : '.85');
            g.style.display = ''; g.style.opacity = 1; return;
          }
          if (it.bl && t >= it.bl[0] && t < it.bl[1] && Math.floor((t - it.bl[0]) / it.bl[2]) % 2 === 1) { g.style.display = 'none'; return; }   // bl: [from, to, period]: this piece is off every second period
          g.style.display = ''; const k = clamp((t - t0) / d); let o = 1, clip = '';
          switch (it.fx) {
            case 'flick': o = t < t0 + d ? (Math.floor((t - t0) * 14) % 2 ? .3 : 1) : 1; break;
            case 'type': clip = `inset(0 ${(1 - k) * 100}% 0 0)`; break;
            case 'down': clip = `inset(0 0 ${(1 - k) * 100}% 0)`; break;
            case 'fade': o = k; break;
            case 'blink': o = t < t0 + (it.hold || 4) * .3 ? (Math.floor((t - t0) / .15) % 2 ? 0 : 1) : 1; break;
            case 'zoom': { const z = it.z, q = clamp((t - it.zt) / d), e0 = q * q * (3 - 2 * q), e = it.rev ? 1 - e0 : e0; g.setAttribute('transform', `translate(${z.x * (1 - e)} ${z.y * (1 - e)}) scale(${z.s + (1 - z.s) * e})`); break; }
            case 'draw': paths[i].forEach(pt => { pt.style.strokeDasharray = 1; pt.style.strokeDashoffset = 1 - k; }); break;
          }
          if (it.mv) { const [x0, y0, x1, y1, a, b] = it.mv, q = clamp((t - a) / (b - a)), e = q * q * (3 - 2 * q); g.setAttribute('transform', `translate(${(x1 - x0) * e} ${(y1 - y0) * e})`); }   // mv: [fromX, fromY, toX, toY, t0, t1]: the piece glides from its square to the next with an ease
          if (it.lv) { let l = 0; for (const [a, v] of it.lv) if (t >= a) l = v; o *= l; }   // lv: [[from, brightness]...] a step-wise brightness for the whole piece
          if (it.fo && t > t1 - it.fo) o *= clamp((t1 - t) / it.fo);   // fade out over the last `fo` seconds
          g.style.opacity = o; g.style.clipPath = clip;
        });
      },
    };
  },
};

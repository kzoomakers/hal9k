// A screen that is just a few lines of text on a flat colour (the warnings: COMPUTER MALFUNCTION, LIFE FUNCTIONS CRITICAL, NON FUNCTION ...).
// Each line's ink is fitted to the box measured in the video (hal-frames/textscreens.py), so only the font differs.
// params: {bg, color, glow, pulse, lines: [{text, x0, x1, y0, y1, font, weight}]}
(window.NATIVE = window.NATIVE || {}).textscreen = {
  mount(host, p) {
    const ctx = document.createElement('canvas').getContext('2d');
    const fit = l => {
      const font = l.font || 'Helvetica Neue, Arial, sans-serif', w = l.weight || 700;
      ctx.font = `${w} 100px ${font}`; const m = ctx.measureText(l.text);
      const left = m.actualBoundingBoxLeft, iw = left + m.actualBoundingBoxRight, ih = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
      const sx = (l.x1 - l.x0) / iw, sy = (l.y1 - l.y0) / ih;
      return `<text transform="translate(${l.x0 + left * sx} ${l.y1 - m.actualBoundingBoxDescent * sy}) scale(${sx} ${sy})" font-size="100" font-family="${font}" font-weight="${w}" xml:space="preserve">${l.text}</text>`;
    };
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:${p.bg}">
      <g fill="${p.color || '#fff'}" style="${p.glow ? `filter:drop-shadow(0 0 14px ${p.glow})` : ''}">${p.lines.map(fit).join('')}</g></svg>`;
    const g = host.querySelector('g');
    return {
      update(t) {
        // a slow flickering fade in, then steady (or pulsing, for the dim "terminated" screen)
        const f = p.fade ?? 1.2, a = t < f ? (t / f) * (Math.floor(t * 20) % 4 === 1 ? .6 : 1) : 1;
        g.style.opacity = (p.blinks || []).some(([a, b]) => t >= a && t < b) ? 0 : p.pulse ? a * (.6 + .4 * (.5 + .5 * Math.sin(t * Math.PI))) : a;
      },
    };
  },
};

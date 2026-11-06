// The gold polar-grid "tunnel" and its green sight, built from measurements of the video (hal-frames, screens G01/G02/G03/G06/G08):
// centre (928,435); ellipses 1.22x wider than tall; 16 spokes near the middle, 32 further out, 126 beyond the ring at 228.
// The camera flies in (the zoom grows), a red bracket drifts across, and at the end the grid turns lime with a white box and text.
// NATIVE.tunnel(opts) -> an SVG string for one still; NATIVE.tunnel.mount(host) -> {update(t)} for the animated slide (t = seconds in).
(window.NATIVE = window.NATIVE || {}).tunnel = function (p = {}) {
  const o = Object.assign({ gold: '#b8a640', sw: 2, zoom: 1, green: '#58b05a', bg: '#0b1a18', sight: true }, p);
  const g = grid(o.zoom, o.gold, o.sw, o.rq, o.n3);
  return `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:${o.bg}">${g}${o.sight ? sight(o.green) : ''}</svg>`;
};

const CX = 928, CY = 435, ASP = 1.22;
const rings = (q = 1.038) => { const r = [34, 120]; for (let x = 228.5; x < 596; x *= q) r.push(x); return r; };

function spokes(n, phase, r0, r1) {
  let d = '';
  for (let k = 0; k < n; k++) {
    const a = (phase + k * 360 / n) * Math.PI / 180, c = Math.cos(a) * ASP, s = Math.sin(a);
    d += `M${(CX + c * r0).toFixed(1)} ${(CY + s * r0).toFixed(1)}L${(CX + c * r1).toFixed(1)} ${(CY + s * r1).toFixed(1)}`;
  }
  return `<path d="${d}"/>`;
}
function gridBody(q, n3 = 126) {
  const e = rings(q).map(r => `<ellipse cx="${CX}" cy="${CY}" rx="${(r * ASP).toFixed(1)}" ry="${r.toFixed(1)}"/>`).join('');
  return `${e}${spokes(16, -.9, 0, 120)}${spokes(32, -.9, 120, 228)}${spokes(n3, 2.13, 228, 1500)}`;
}
function grid(zoom, gold, sw, q, n3) {
  return `<style>.t *{vector-effect:non-scaling-stroke}</style><g id="tg" class="t" fill="none" stroke="${gold}" stroke-width="${sw}" transform="translate(${CX} ${CY}) scale(${zoom}) translate(${-CX} ${-CY})">${gridBody(q, n3)}</g>`;
}
const bar = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`;
function sight(green) {
  return `<g fill="${green}" stroke="none">${bar(953, 68, 12, 94)}${bar(953, 651, 12, 90)}${bar(624, 400, 92, 12)}${bar(1206, 398, 92, 12)}
    ${bar(840, 405, 10, 59)}${bar(1070, 405, 10, 59)}${bar(840, 452, 242, 12)}${bar(914, 400, 92, 10)}${bar(953, 382, 10, 30)}</g>`;
}

// the lime grid of the last screen, measured at video 1846.5: circles about (960, 405), 16 spokes inside the 201.5 ring, 32 to 382, 128 beyond
function limeGrid() {
  const R = [55.5, 201.5, 382, 419.5, 464, 506, 554, 607, 659.5, 712, 764, 817, 877, 937, 997, 1057];
  const sp = (n, r0, r1, ph) => { let d = ''; for (let k = 0; k < n; k++) { const a = (ph + k * 360 / n) * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); d += `M${(960 + r0 * c).toFixed(1)} ${(405 + r0 * s).toFixed(1)}L${(960 + r1 * c).toFixed(1)} ${(405 + r1 * s).toFixed(1)}`; } return d; };
  return R.map(r => `<circle cx="960" cy="405" r="${r}"/>`).join('') + `<path d="${sp(16, 0, 201.5, 0)}${sp(32, 201.5, 382, 0)}${sp(128, 382, 1100, -.15)}"/>`;
}

// keyframes, in seconds from the start of the slide (video 1825.9 s)
const ZOOM = [[0, .08], [1, .12], [3, .22], [4, .35], [5.2, .58], [6.2, .71], [8.2, .87], [10.2, 1], [14.2, 1.07], [18.9, 1.15], [20.6, 1.17]];
const BRACKET = [[13.9, 912, 1298, 292, 396], [15.1, 954, 1228, 310, 363], [16.9, 848, 1156, 328, 402], [17.5, 960, 1110, 340, 353]]; // video 1839.8-1843.4
const LIME_AT = 17.9, TEXT_AT = 18.3;
const lerp = (k, t) => {
  if (t <= k[0][0]) return k[0].slice(1);
  for (let i = 1; i < k.length; i++) if (t <= k[i][0]) { const f = (t - k[i - 1][0]) / (k[i][0] - k[i - 1][0]); return k[i].slice(1).map((v, j) => k[i - 1][j + 1] + (v - k[i - 1][j + 1]) * f); }
  return k[k.length - 1].slice(1);
};

NATIVE.tunnel.mount = function (host) {
  host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#0b1a18">${grid(.08, '#b8a640', 2)}${sight('#58b05a')}
    <g id="tb" fill="#84494a" stroke="none" style="display:none"><rect id="tb1"/><rect id="tb2"/><rect id="tb3"/></g>
    <rect id="tw" x="846.5" y="353.5" width="227" height="44" fill="none" stroke="#fff" stroke-width="13" style="display:none"/>
    <g id="tx" fill="#fff" font-family="ShareTechMono" font-size="22" style="display:none"><text x="850" y="253" textLength="220">ENV/CON: +4490</text><text x="850" y="281" textLength="220">STA/CON: +5904</text><text x="715" y="311" textLength="400">RTO - CON(-.0052X338)GR26</text></g></svg>`;
  const $ = id => host.querySelector('#' + id);
  return {
    update(t) {
      const z = lerp(ZOOM, t)[0], lime = t >= LIME_AT;
      const tg = $('tg');
      tg.setAttribute('transform', lime ? '' : `translate(${CX} ${CY}) scale(${z}) translate(${-CX} ${-CY})`);
      tg.setAttribute('stroke', lime ? '#f8f57b' : '#b8a640'); tg.setAttribute('stroke-width', lime ? 3.4 : 2);
      if (lime !== this.lime) { this.lime = lime; tg.innerHTML = lime ? limeGrid() : gridBody(1.038, 126); } // the lime grid is the one the video holds on its last screen (centre 960,405)
      tg.style.opacity = Math.min(1, t / 3);
      const b = t >= BRACKET[0][0] && t < LIME_AT - .1;
      $('tb').style.display = b ? '' : 'none';
      if (b) {
        const [x0, x1, y0, y1] = lerp(BRACKET, t);
        $('tb1').setAttribute('x', x0); $('tb1').setAttribute('y', y0); $('tb1').setAttribute('width', x1 - x0); $('tb1').setAttribute('height', 22);
        $('tb2').setAttribute('x', x0); $('tb2').setAttribute('y', y0); $('tb2').setAttribute('width', 22); $('tb2').setAttribute('height', y1 - y0);
        $('tb3').setAttribute('x', x1 - 22); $('tb3').setAttribute('y', y0); $('tb3').setAttribute('width', 22); $('tb3').setAttribute('height', y1 - y0);
      }
      $('tw').style.display = lime ? '' : 'none';
      $('tx').style.display = t >= TEXT_AT ? '' : 'none';
    },
  };
};

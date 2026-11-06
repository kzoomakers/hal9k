// "Scene 27": a blue chart on a fine grid (video 384.3-394.3 s): six concave curves and five steep S-curves rising from the left,
// numbered dots along the top curve, an axis scale and a "VEC(4)" block with five lines that arrives late. Grid, axes and label positions
// measured from the frames (the plot is x 608-1135, y 65-738); the curves are generated to start and end where the video's do. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).growth = {
  mount(host) {
    const OX = 480, X0 = 128 + OX, X1 = 655 + OX, YT = 65, YB = 738, f = n => n.toFixed(1);
    let g = ''; for (let i = 0; i <= 14; i++) g += `M${f(X0 + i * (X1 - X0) / 14)} ${YT}V${YB}`;
    for (let k = 0; k <= 4; k++) { const y = YB - k * 168; g += `M${X0} ${y}H${X1}`; for (const o of [-7, -4, 5, 9]) if (y + o > YT && y + o < YB) g += `M${X0} ${y + o}H${X1}`; }
    for (let y = YB - 16.8; y > YT; y -= 16.8) g += `M${X0} ${f(y)}H${X1}`;
    const conc = [[100, 72], [95, 116], [90, 148], [60, 195], [40, 250], [5, 330]].map(([y0, ye]) => { let d = ''; for (let u = 0; u <= 1.001; u += .04) d += `${d ? 'L' : 'M'}${f(X0 + u * (X1 - X0))} ${f(YB - y0 - (YB - ye - y0) * Math.pow(u, .62))}`; return d; });
    const sc = [545, 542, 539, 536, 533].map((xv, i) => `M${X0} ${YB - 108 + i * 9}C${X0 + 100} ${470 - i * 3} ${X0 + 220 - i * 6} ${300 + i * 8} ${X0 + 330 + i * 8} ${232 + i * 10}S${xv + OX - 6} ${150 + i * 10} ${xv + OX} ${YT}`);
    const dots = [['.02', 247, 401], ['.08', 257, 388], ['.10', 272, 371], ['.19', 298, 340], ['.32', 369, 265], ['.38', 401, 236], ['.41', 418, 219], ['.49', 452, 189], ['.56', 481, 168], ['.67', 505, 136]];
    const dt = dots.map(([s, x, y], i) => `<circle cx="${x + OX}" cy="${y}" r="3.5" fill="#fff"/><text x="${x + OX - 22}" y="${y - 7}">${s}</text>`).join('');
    const yl = ['400', '300', '200', '100', '000'].map((s, i) => `<text x="${X0 - 12}" y="${YT + 4 + i * 168}" text-anchor="end">${s}</text>`).join('');
    const xl = Array.from({ length: 15 }, (_, i) => `<text x="${f(X0 + i * (X1 - X0) / 14)}" y="${YB + 20}" text-anchor="middle">${String(i * 10).padStart(3, '0')}</text>`).join('');
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#1f5ea5"><g id="gg" fill="none" stroke="#fff">
      <path d="${g}" stroke-width="1" stroke-opacity=".7"/><rect x="${X0}" y="${YT}" width="${X1 - X0}" height="${YB - YT}" stroke-width="1.6"/>
      <g stroke-width="2.4" style="filter:drop-shadow(0 0 2px #fff7)">${conc.map(d => `<path class="gc" d="${d}" pathLength="1"/>`).join('')}${sc.map(d => `<path class="gc" d="${d}" pathLength="1"/>`).join('')}</g></g>
      <g fill="#fff" font-family="ShareTechMono" font-size="8" letter-spacing=".5">${yl}${xl}<g id="gd" font-size="9.5">${dt}</g></g>
      <g id="gv" fill="#fff" font-family="ShareTechMono"><text x="1175" y="102" font-size="22" letter-spacing="2">VEC(4)</text>
        ${['625_832 REL', '973_069 REL', '730_780 REL', '436_124 REL', '056_762 REL'].map((s, i) => `<text x="1175" y="${151 + i * 14}" font-size="9.5" letter-spacing=".8">${s}</text>`).join('')}</g></svg>`;
    const $ = id => host.querySelector('#' + id), cs = [...host.querySelectorAll('.gc')], vs = [...$('gv').children];
    return {
      update(t) {
        cs.forEach((c, i) => { const k = Math.min(1, Math.max(0, (t - .2 - i * .08) / 1.4)); c.style.strokeDasharray = 1; c.style.strokeDashoffset = 1 - k; });
        $('gd').style.opacity = t < 1.6 ? 0 : 1;
        vs.forEach((v, i) => { v.style.opacity = i === 0 ? (t < .5 ? 0 : 1) : (t < 5.3 + i * .1 ? 0 : 1); });
      },
    };
  },
};

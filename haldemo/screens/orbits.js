// "Scene 10": a purple orbit diagram (video 143-179.7 s): three rings (the outer one off-centre), dashed stretches, a spoke to the
// right, bright arcs that appear and then dim and glow, dots and small labels. Geometry measured from the frames (screen G..., slide 10):
// centre (1023,405); rings r=180 and 241 about it, r=367 about (973,405). t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).orbits = {
  mount(host) {
    const C = [1023, 405], O = [973, 405], rad = d => d * Math.PI / 180;
    const pt = (c, r, a) => [c[0] + r * Math.cos(rad(a)), c[1] + r * Math.sin(rad(a))];
    const arc = (c, r, a0, a1) => { const [x0, y0] = pt(c, r, a0), [x1, y1] = pt(c, r, a1); return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`; };
    const RING = 'fill="none" stroke="#e7d6ea" stroke-width="1.5"', DASH = 'fill="none" stroke="#e7d6ea" stroke-width="1.5" stroke-dasharray="18 12"';
    // bright arcs: [centre, radius, from, to, appears-at s]
    const ARCS = [[O, 367, 190, 249, 4], [C, 241, 171, 257, 4.5], [C, 241, 10, 110, 5.5], [C, 180, 0, 111, 6.2], [C, 180, 220, 246, 7]];
    const DOTS = [[O, 367, 249], [O, 367, 217], [O, 367, 197], [O, 367, 190], [O, 367, -42], [O, 367, 122], [C, 241, 171], [C, 241, 202], [C, 241, 257], [C, 241, 0], [C, 241, 10], [C, 241, 71], [C, 241, 87], [C, 180, -45], [C, 180, 246], [C, 180, 220], [C, 180, 111], [C, 180, 90], [C, 180, 52]];
    const GLOW = [[C, 241, 257], [C, 180, 246], [C, 241, 10], [C, 241, 87]];
    const dots = DOTS.map(([c, r, a]) => { const [x, y] = pt(c, r, a); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" fill="#fff"/>`; }).join('');
    const glow = GLOW.map(([c, r, a]) => { const [x, y] = pt(c, r, a); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="14" fill="url(#og)"/>`; }).join('');
    const L = (x, y, s, dim, rot) => `<text x="${x + 380}" y="${y}" class="${dim ? 'd' : 'b'}"${rot ? ` transform="rotate(${rot} ${x + 380} ${y})"` : ''}>${s}</text>`;
    const labels = [L(480, 70, '1,070,412'), L(362, 147, 'COMP. DIST.'), L(210, 218, 'GNY³', 0, -35), L(290, 222, '1,070,412', 1), L(250, 344, 'COMP. DIST.', 1), L(338, 288, 'ORBITAL RAD.'),
      L(322, 449, '671,034 (.)'), L(555, 148, 'EUR²', 1, -35), L(652, 158, '671,034 (.)', 1), L(576, 216, 'POS(.)'), L(487, 268, 'IO²', 0, 50), L(579, 257, '421,700 (.)', 1), L(518, 302, 'COMP. DIST.', 1),
      L(780, 281, 'PARAM.'), L(745, 398, '421,700 (.)'), L(878, 148, 'VEC⁴', 0, 35), L(366, 747, 'VEC⁴', 0, -50), L(913, 458, 'POS(.)', 1), L(700, 511, 'COMP. DIST.'), L(768, 556, 'VEC⁴', 0, 35),
      L(820, 604, 'VEC⁴', 0, 35), L(583, 566, 'VEC² REL'), L(582, 614, 'VEC²', 1), L(582, 630, 'REL', 1), L(650, 627, 'POS(.)', 1), L(766, 636, 'POS(.)'), L(507, 648, 'POS(.)')].join('');
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#4a2a40"><defs><radialGradient id="og"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
      <style>.b{fill:#fff;font:9.5px ShareTechMono;letter-spacing:1px}.d{fill:#bfa9c4;font:9.5px ShareTechMono;letter-spacing:1px}</style>
      <g id="oring"><path d="${arc(O, 367, 122, 318)}" ${RING}/><circle cx="${C[0]}" cy="${C[1]}" r="241" ${RING}/><path d="${arc(C, 180, 0, 315)}" ${RING}/>
        <path d="${arc(O, 367, -42, 122)}" ${DASH}/><path d="${arc(C, 180, -45, 0)}" ${DASH}/><path d="M${C[0]} ${C[1]}H1920" fill="none" stroke="#e7d6ea" stroke-width="1.5"/><circle cx="${C[0]}" cy="${C[1]}" r="7" fill="#fff"/></g>
      <g id="oarc" fill="none" stroke="#fff" stroke-linecap="round" style="filter:drop-shadow(0 0 4px #fff9)">${ARCS.map(([c, r, a, b]) => `<path d="${arc(c, r, a, b)}" stroke-width="3.6" stroke-opacity=".6"/>`).join('')}</g>
      <g id="odt">${dots}</g><g id="ogl">${glow}</g><g id="olb">${labels}</g></svg>`;
    const $ = id => host.querySelector('#' + id), arcs = [...$('oarc').children];
    const flick = (t, a) => t < a ? 0 : t < a + .6 ? (Math.floor((t - a) * 14) % 2 ? .35 : 1) : 1;
    return {
      update(t) {
        const out = t < 25 ? 1 : Math.max(0, 1 - (t - 25) / 4);          // the whole diagram goes at about 25-29 s
        const dim = t < 14 ? 1 : Math.max(.45, 1 - (t - 14) / 12);      // the arcs and labels dim as the glows come up
        host.firstChild.style.opacity = out;
        arcs.forEach((a, i) => { a.style.opacity = flick(t, ARCS[i][4]) * (i === 4 ? 1 : dim); });
        $('odt').style.opacity = t < 3 ? 1 : dim; $('olb').style.opacity = t < 4 ? .4 : dim;
        $('ogl').style.opacity = t < 12 ? 0 : Math.min(1, (t - 12) / 3) * (.7 + .3 * Math.sin(t * 3));
      },
    };
  },
};

// Scene 73 (video 785.1-811 s): a maroon wall of tilted purple-edged columns with a skewed white "BBC" logo, then rows of "The World Tonight" fill the screen
//             from the top, fade back, and a white serif "The World / Tonight" caption blurs in (video 785.1-811 s)
// Positions/sizes from the frames (column pitch 142 px, bar 22 px; text rows 37 px; logo box x 760-1160). Streaks and text offsets are seeded.
(window.NATIVE = window.NATIVE || {}).tonight = {
  mount(host) {
    const BG = '#7a3a3c', PU = '#9a5aae', W = 142, f = n => n.toFixed(1);
    let cols = ''; for (let k = -1; k < 15; k++) { const x = k * W + 6; for (const [y0, y1] of [[-20, 232], [232, 440], [440, 650], [650, 840]]) { const sh = ((k + (y0 > 0 ? 1 : 0)) % 2) * 0;
      cols += `<path d="M${x} ${y0}h${W - 22}v${y1 - y0}h-${W - 22}Z" fill="${BG}"/><path d="M${x + W - 22} ${y0 + 14}l22 -${f(5)}v${y1 - y0}l-22 5Z" fill="${PU}"/>`; } }
    let cap = ''; for (let k = -1; k < 15; k++) for (const y of [168, 388, 608]) cap += `<path d="M${k * W + 6} ${y + 26}L${k * W + W - 16} ${y}L${k * W + W + 6} ${y - 6}L${k * W + 28} ${y + 22}Z" fill="#94595b"/>`;
    const rows = Array.from({ length: 22 }, (_, i) => { const off = [4, 6, 0, 9, 14, 2, 8, 5][i % 8]; return ('The World Tonight '.repeat(14)).slice(off, off + 100); });
    const ROW = 37, FS = 21;
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:${BG}">
      <g id="tb">${cols}${cap}</g>
      <g id="tl" style="filter:drop-shadow(0 0 5px #fff8)" transform="translate(760 245) skewY(-8)">${['B', 'B', 'C'].map((c, i) => `<path d="M${i * 142 + 4} 0h130M${i * 142 + 4} 190h130" stroke="#fff" stroke-width="3" fill="none"/><text x="${i * 142 + 18}" y="160" fill="#fff" stroke="none" font-family="Arial Black, Helvetica Neue, Arial, sans-serif" font-weight="900" font-size="150" textLength="104" lengthAdjust="spacingAndGlyphs">${c}</text>`).join('')}</g>
      <g id="tw" fill="#f0e8ea" font-family="Courier New, Courier, monospace" font-size="${FS}" letter-spacing="0.9">${rows.map((s, i) => `<text x="${-4 - (i % 4) * 3}" y="${18 + i * ROW}" xml:space="preserve">${s}</text>`).join('')}</g>
      <g id="tc" fill="#fff" font-family="Georgia, 'Times New Roman', serif" font-size="56" style="filter:drop-shadow(0 0 4px #fff7)"><text x="790" y="1200" text-anchor="middle">The World</text><text x="960" y="470" text-anchor="middle" opacity="0">x</text></g></svg>`;
    const $ = id => host.querySelector('#' + id), wr = [...$('tw').children];
    host.querySelector('#tc').innerHTML = `<text x="1040" y="605" text-anchor="middle" style="filter:blur(0)">The World</text><text x="960" y="662" text-anchor="middle">Tonight</text>`;
    const cp = host.querySelector('#tc');
    return {
      update(t) {                       // t from 0 (785.1)
        const bars = t < 9 ? 1 : 0; $('tb').style.opacity = bars; $('tl').style.opacity = t > .3 && t < 9 ? 1 : 0;
        const n = t < 9 ? 0 : Math.min(wr.length, Math.floor((t - 9) / 2.8 * wr.length) + 1);
        wr.forEach((r, i) => { r.style.display = i < n ? '' : 'none'; });
        $('tw').style.opacity = t < 13.5 ? 1 : Math.max(.25, 1 - (t - 13.5) / 1.2);
        cp.style.opacity = t < 13.8 ? 0 : Math.min(1, (t - 13.8) / .8); cp.style.filter = t < 14.6 ? `blur(${(4 * (1 - (t - 13.8) / .8)).toFixed(1)}px)` : 'none';
      },
    };
  },
};

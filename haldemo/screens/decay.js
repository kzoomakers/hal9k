// "Scene 23": a teal chart of nine decaying curves with dashed tails, three bracketed label groups, a badge and a column of numbers
// (video 309.3-326 s). Axes, ticks, curve ends and labels are measured from the frames; the curves are generated as shaped decays that
// start and end where the video's do. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).decay = {
  mount(host) {
    const S = 1 / 1.6667, ox = 560, oy = 30, px = x => ox + x * S, py = y => oy + y * S, f = n => n.toFixed(1);
    const X0 = px(132), X1 = px(882), Y0 = py(75), YB = py(1175);
    // curves: start at the top at xs, end at the right edge at ye (both in the crop's zoomed units); solid to x=732, dashed after
    const ends = [620, 672, 727, 752, 828, 903, 965, 1013, 1110], starts = [250, 236, 220, 204, 190, 176, 162, 148, 135];
    const curve = (xs, ye, k, a, b) => { let d = ''; for (let x = a; x <= b; x += 6) { const u = (x - xs) / (882 - xs), y = ye + (75 - ye) * (Math.exp(-k * u) - Math.exp(-k)) / (1 - Math.exp(-k)); d += `${d ? 'L' : 'M'}${f(px(x))} ${f(py(y))}`; } return d; };
    let solid = '', dashed = '';
    ends.forEach((ye, i) => { const k = 2.4 - i * .1; solid += `<path d="${curve(starts[i], ye, k, starts[i], 732)}"/>`; dashed += `<path d="${curve(starts[i], ye, k, 732, 882)}"/>`; });
    let ticks = '', lab = '';
    const ys = ['76', '72', '68', '64', '60', '56', '52', '48', '44', '48', '44', '40', '36', '32', '28', '24', '20', '16', 'I2', '08', '04', '00'];
    ys.forEach((s, i) => { const y = py(125 + i * 50); ticks += `M${f(X0)} ${f(y)}h12M${f(X0)} ${f(y + 15)}h7`; lab += `<text x="${f(px(110))}" y="${f(y + 4)}" text-anchor="end">${s}</text>`; });
    [282, 432, 582, 732].forEach((x, i) => { ticks += `M${f(px(x))} ${f(YB)}v12`; lab += `<text x="${f(px(x))}" y="${f(py(1203))}" text-anchor="middle">${['00', 'I0', '20', '30'][i]}</text>`; });
    const grp = (rows, brace, txt) => rows.map(([y, xa, xb, lx, s]) => `<path d="M${f(px(xa))} ${f(py(y))}H${f(px(xb))}" stroke-width="1.1"/><text x="${f(px(lx))}" y="${f(py(y + 5))}">${s}</text>`).join('') +
      `<path d="M${f(px(brace[0]))} ${f(py(brace[1]))}q10 0 10 14v${f(((brace[2] - brace[1]) / 2 - 28) * S)}q0 14 10 14q-10 0 -10 14v${f(((brace[2] - brace[1]) / 2 - 28) * S)}q0 14 -10 14" fill="none" stroke-width="1.8"/><text x="${f(px(txt[0]) )}" y="${f(py(txt[1]))}" font-size="12.5">${txt[2]}</text>`;
    const groups = grp([[105, 265, 345, 358, '54-KEF'], [143, 258, 372, 388, '5I-ATM'], [180, 243, 412, 422, '48-REL']], [555, 100, 183], [588, 144, 'OXY(96.5%)']) +
      grp([[255, 268, 487, 502, '54-KEF'], [292, 248, 510, 527, '5I-ATM'], [329, 230, 535, 552, '48-REL']], [680, 252, 333], [712, 291, 'MX-RTE(.6)']) +
      grp([[402, 222, 662, 677, '54-KEF'], [440, 217, 688, 702, '5I-ATM'], [478, 188, 714, 727, '48-REL']], [850, 400, 482], [880, 441, 'NUC(OK)']);
    const nums = ['5933.0', '2483.5', '5349.0', '2248.4', 'I174.0', '4824.0', 'I575.0', '0289.4', '5247.0', '0458.0', '3757.4', '6376.8'];
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#275f66"><g id="dch" style="filter:drop-shadow(0 0 2px #fff6)">
      <g fill="none" stroke="#fff"><path d="M${f(X0)} ${f(Y0)}V${f(YB)}H${f(X1)}" stroke-width="2"/><path d="${ticks}" stroke-width="1.2"/>
        <g stroke-width="2.6" stroke-linecap="round">${solid}</g><g stroke-width="2.6" stroke-dasharray="14 10">${dashed}</g></g>
      <g fill="#fff" font-family="ShareTechMono" font-size="8.5" letter-spacing=".5">${lab}</g>
      <g id="dgr" fill="#fff" font-family="ShareTechMono" font-size="8.5" stroke="#fff" letter-spacing=".5">${groups.replace(/<text/g, '<text stroke="none"')}</g></g>
      <g id="dbd" style="filter:drop-shadow(0 0 6px #fff9)"><rect x="1130" y="73" width="140" height="38" rx="5" fill="#fff"/><g fill="#275f66" font-family="Michroma" font-weight="900"><text x="1141" y="102" font-size="23" textLength="68" lengthAdjust="spacingAndGlyphs">IIIK</text><text x="1222" y="102" font-size="12">MB</text></g></g>
      <g id="dnm" fill="#fff" font-family="ShareTechMono" font-size="22" letter-spacing="4" fill-opacity=".85" style="filter:drop-shadow(0 0 3px #fff6)">${nums.map((n, i) => `<text x="1181" y="${187 + i * 37.5}" text-anchor="start">${n}</text>`).join('')}</g></svg>`;
    const $ = id => host.querySelector('#' + id), rows = [...$('dnm').children];
    const flick = (t, a) => t < a ? 0 : t < a + .5 ? (Math.floor((t - a) * 14) % 2 ? .3 : 1) : 1;
    return {
      update(t) {
        $('dch').style.opacity = t > 13.4 && t < 14.4 ? .25 + .1 * Math.sin(t * 30) : 1;   // the graph dims for a moment near the end
        $('dgr').style.opacity = 1;
        $('dbd').style.opacity = t < 4.6 || t > 13.2 ? 0 : flick(t, 4.6);
        rows.forEach((r, i) => { const on = 4.8 + i * .3, off = 10 + i * .3; r.style.opacity = t < on || t > 13.6 ? 0 : t > off ? Math.max(0, 1 - (t - off) * 2) : flick(t, on); });
      },
    };
  },
};

// "Scene 46": a plum grid of 14 columns with hatched bands, a cone, a few leader lines and labels (video 557.2-570.7 s; one still held
// for 13.5 s). Everything is measured from the saved frame (coordinates below are in that frame's 1500-px-wide preview, scaled by 1.28):
// box, columns, band extents, cone and label positions. Hatching is generated (lines every ~3.3 px). It is there at once.
(window.NATIVE = window.NATIVE || {}).grid = {
  mount(host) {
    const K = 1.28, f = n => (n * K).toFixed(1), BG = '#663058', INK = '#f0d8ec';
    let g = ''; for (let i = 0; i <= 14; i++) g += `M${f(471 + i * 558 / 14)} ${f(105)}V${f(598)}`; g += `M${f(471)} ${f(105)}H${f(1029)}M${f(471)} ${f(140)}H${f(1029)}M${f(471)} ${f(598)}H${f(1029)}`;
    const band = (x0, x1, y0, y1, st = 2.6) => { let d = ''; for (let y = y0; y <= y1; y += st) d += `M${f(x0)} ${f(y)}H${f(x1)}`; return d; };
    const bands = [[471, 590, 266, 300], [590, 905, 277, 300], [511, 590, 327, 348], [511, 590, 356, 366], [590, 750, 318, 371], [710, 910, 400, 408], [535, 870, 445, 455], [790, 910, 453, 462], [553, 672, 485, 493],
      [670, 778, 491, 499], [870, 948, 517, 526], [551, 631, 562, 570], [631, 710, 574, 582], [736, 815, 580, 588]];
    let h = bands.map(b => band(...b)).join('');
    h += `M${f(750)} ${f(318)}L${f(890)} ${f(345)}L${f(750)} ${f(371)}`;
    const lead = `M${f(583)} ${f(214)}H${f(598)}M${f(583)} ${f(214)}V${f(266)}M${f(621)} ${f(237)}H${f(636)}M${f(621)} ${f(237)}V${f(278)}M${f(752)} ${f(244)}H${f(767)}M${f(752)} ${f(244)}V${f(288)}M${f(917)} ${f(243)}H${f(931)}M${f(917)} ${f(243)}V${f(296)}`;
    const big = [['HPT', 538, 163], ['RPV', 579, 171], ['01', 622, 182], ['02', 657, 189], ['03', 695, 198], ['04', 721, 198], ['05', 896, 234], ['06', 844, 379]].map(([s, x, y]) => `<text x="${f(x)}" y="${f(y + 4)}" font-size="${(11 * K).toFixed(1)}">${s}</text>`).join('');
    const small = [['ELEMENT', 599, 217], ['GENERATOR', 637, 240], ['PUMP', 768, 247], ['PRE-HEATER', 932, 246], ['XX', 766, 207], ['XY', 792, 207], ['YY', 756, 217], ['YY', 802, 217], ['XY', 766, 224], ['XX', 792, 224]].map(([s, x, y]) => `<text x="${f(x)}" y="${f(y + 3)}" font-size="${(6.2 * K).toFixed(1)}" letter-spacing=".6">${s}</text>`).join('');
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:${BG}"><g id="gr" fill="none" stroke="${INK}">
      <path d="${g}" stroke-width="1.2"/><path d="${h}" stroke-width="1"/><path d="${lead}" stroke-width="1"/>
      <g fill="${INK}" stroke="none" font-family="ShareTechMono" letter-spacing=".8">${big}${small}</g></g></svg>`;
    const gr = host.querySelector('#gr');
    return { update(t) { gr.style.opacity = Math.min(1, t / .1); } };
  },
};

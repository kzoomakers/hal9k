// "Scene 55": a magenta panel that cycles through four small plots (video 660.2-700.7 s). Each plot sits on the left with a caption below it;
// on the right is a stack of white badges (a big "ST 74" and four small ones: G NET, D TRL, K REF, R MEMR). Layout, boxes, tick labels, badge
// and caption positions are measured from the frames; the curves are generated in each plot's character (rising lines with a hatched band,
// asymptote fan, dashed U-curves, a spiky trace) rather than copied. Timing: plot A 0-12 s, B 15.8-21 s, C 21.5-34 s, D 34.7-40.5 s. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).panels = {
  mount(host) {
    const OX = 600, OY = 60, f = n => n.toFixed(1), W = '#fff', X = x => x + OX, Y = y => y + OY;
    const box = (x0, y0, x1, y1) => `<rect x="${X(x0)}" y="${Y(y0)}" width="${x1 - x0}" height="${y1 - y0}" fill="none" stroke="${W}" stroke-width="1.4"/>`;
    const T = (x, y, s, sz = 9, a = 'middle') => `<text x="${X(x)}" y="${Y(y)}" font-size="${sz}" text-anchor="${a}">${s}</text>`;
    const poly = (pts, sw = 2.4, ex = '') => `<polyline points="${pts.map(([x, y]) => `${f(X(x))},${f(Y(y))}`).join(' ')}" fill="none" stroke="${W}" stroke-width="${sw}" stroke-linejoin="round" ${ex}/>`;
    const curve = (fn, a, b, n = 40) => Array.from({ length: n + 1 }, (_, i) => { const x = a + (b - a) * i / n; return [x, fn(x)]; });
    // plot A: five bands of rising lines, a hatched band, numbered dots
    let A = box(155, 105, 445, 530) + [251, 344, 437].map(y => `<path d="M${X(155)} ${Y(y)}H${X(445)}" stroke="${W}" stroke-opacity=".5" stroke-width="1"/>`).join('') + [252, 348].map(x => `<path d="M${X(x)} ${Y(105)}V${Y(530)}" stroke="${W}" stroke-opacity=".5"/>`).join('');
    let hatch = ''; for (let y = 252; y < 322; y += 4) hatch += `M${X(155)} ${Y(y)}H${X(445)}`; A += `<path d="${hatch}" stroke="${W}" stroke-opacity=".5" fill="none"/>`;
    const lines = [[[155, 217], [252, 148]], [[155, 270], [252, 228], [348, 150]], [[155, 336], [283, 276], [445, 158]], [[155, 400], [283, 360], [445, 282]], [[155, 438], [283, 380], [320, 348]], [[155, 468], [290, 436], [330, 424]], [[155, 482], [290, 455], [330, 445]]];
    A += lines.map(l => poly(l)).join('') + [[198, 195], [240, 230], [252, 150], [348, 152], [372, 220], [283, 362], [286, 438], [233, 468], [290, 457], [317, 398]].map(([x, y]) => `<circle cx="${X(x)}" cy="${Y(y)}" r="3.4" fill="${W}"/>`).join('');
    A += [['40', 158], ['30', 251], ['20', 344], ['10', 437], ['0', 530]].map(([s, y]) => T(135, y + 3, s, 10, 'middle') + T(463, y + 3, s, 10, 'middle')).join('') + [['00', 155], ['IO²', 252], ['IO³', 348], ['IO²', 445]].map(([s, x]) => T(x, 553, s, 9)).join('') + [['A', 155], ['B', 227], ['C', 299], ['D', 371], ['E', 443]].map(([s, x]) => T(x, 99, s, 9)).join('');
    const capA = [[85, 607, '(9.0I)⁷/5 ST:REF', 31, 'start'], [322, 642, 'REM50I', 26, 'start']];
    // plot B: asymptote fan about a vertical line at x=1017-600=417
    let B = `<path d="M${X(417)} ${Y(138)}V${Y(445)}M${X(762)} ${Y(440)}H${X(1155)}" stroke="${W}" stroke-width="1.5" fill="none"/>`.replace(/X\(762\)/g, '');
    B = `<path d="M${X(417)} ${Y(138)}V${Y(445)}M${X(162)} ${Y(440)}H${X(555)}M${X(553)} ${Y(172)}V${Y(445)}" stroke="${W}" stroke-width="1.5" fill="none"/>`;
    for (let k = 0; k < 7; k++) { B += poly(curve(x => 440 - (440 - 150) * Math.exp(-(417 - x) / (30 + k * 22)), 162, 412), 2) + poly(curve(x => 440 - (440 - 150) * Math.exp(-((x - 417) / (26 + k * 20))), 422, 553), 2); }
    for (let k = 0; k < 6; k++) B += poly(curve(x => 440 - 90 * Math.exp(-Math.pow((x - 300 + k * 18) / (45 + k * 6), 2)) * (1 + k * .1), 162, 420), 2);
    const capB = [[233, 474, '(48)²⁷/VT:TM:64', 17, 'start'], [286, 488, '2039406', 17, 'start'], [286, 502, '4237MR', 17, 'start']];
    // plot C: dashed U-curves
    let C = box(165, 20, 437, 530).replace(/y="\d+"/, `y="${Y(20)}"`);
    for (let k = 0; k < 11; k++) { const c = 345 - k * 8; C += poly(curve(x => Math.max(22, 445 - k * 10 - Math.pow(x - c, 2) / (62 + k * 7)), 168 + k * 10, 437), 2, 'stroke-dasharray="26 10"'); }
    C += poly(curve(x => 470 + Math.sin(x / 11) * 12, 180, 330), 1.8) + poly(curve(x => 487 + Math.sin(x / 14) * 10, 220, 350), 1.8) + [['3.25', 63], ['2.25', 259], ['1.25', 451]].map(([s, y]) => T(105, y + 3, s, 9)).join('');
    C += `<g font-size="7">${T(398, 460, 'LBCM_MK3⁻⁶', 7)}${T(405, 485, 'KEF⁻⁶', 7)}${T(405, 508, 'MEM⁻¹', 7)}</g>`;
    const capC = [[103, 599, '(992)⁴ᴵ(≈383)/50', 31, 'start'], [298, 634, 'REM50I', 26, 'start']];
    // plot D: spiky trace with drop lines
    let D = box(202, 6, 558, 536) + [['I5²', 10], ['IO²', 185], ['5²', 360]].map(([s, y]) => T(177, y + 3, s, 9)).join('') + Array.from({ length: 8 }, (_, i) => T(205 + i * 50.6, 553, String(i * 100).padStart(3, '0'), 7)).join('');
    D += poly([[202, 405], [218, 380], [224, 328], [246, 328], [262, 385], [272, 408], [285, 340], [300, 212], [330, 165], [350, 170], [378, 124], [398, 105], [412, 85], [432, 60], [450, 37], [458, 88], [462, 190], [482, 110], [498, 130], [508, 150], [534, 90], [546, 128], [558, 188]], 2.6);
    D += [[218, 228, 'REM 0975.805'], [245, 258, 'REM 09758'], [273, 335, '1472.5922'], [330, 300, '57325'], [358, 255, '09758'], [425, 290, '4.037906696'], [494, 310, '554397'], [515, 310, 'REM 450.52'], [535, 360, '4673820'], [560, 205, '56.816576508']].map(([x, y, s], i) => `<text transform="translate(${X(x - 202 + 202)} ${Y(y - 60)}) rotate(90)" font-size="6.5">${s}</text>`).join('');
    D += `<g font-size="8" text-anchor="start">${T(384, 332, 'ST SOL ²BI2', 8, 'start')}${T(384, 356, 'BT DTE ²HG2', 8, 'start')}${T(384, 376, 'RM MEM ²RTE', 8, 'start')}</g>`;
    const capD = capC;
    const badge = (y, big, a, b) => '<g class="bg">' + (big ? `<rect x="${X(540)}" y="${Y(y)}" width="138" height="130" rx="6" fill="#fff"/><text x="${X(552)}" y="${Y(y + 62)}" font-family="Michroma" font-size="62" font-weight="900" fill="#b0589c" stroke="#b0589c" stroke-width="3">${a}</text><text x="${X(610)}" y="${Y(y + 112)}" font-family="Michroma" font-size="36" fill="#b0589c">${b}</text>`
      : `<rect x="${X(540)}" y="${Y(y)}" width="138" height="60" rx="6" fill="#fff"/><text x="${X(554)}" y="${Y(y + 44)}" font-family="Michroma" font-size="40" font-weight="900" fill="#b0589c" stroke="#b0589c" stroke-width="2.4">${a}</text><text x="${X(616)}" y="${Y(y + 40)}" font-family="Michroma" font-size="13" fill="#cf9ac4">${b}</text>`) + '</g>';
    const cap = c => c.map(([x, y, s, sz]) => `<text x="${X(x)}" y="${Y(y)}" font-size="${sz}" letter-spacing="3">${s}</text>`).join('');
    const plots = [[A, capA], [B, capB], [C, capC], [D, capD]];
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#b0599c"><g fill="#fff" stroke="none" font-family="ShareTechMono">
      ${plots.map(([p, c], i) => `<g class="pp" style="opacity:0;filter:drop-shadow(0 0 2px #fff7)"><g fill="none" stroke="#fff">${p}</g>${cap(c)}</g>`).join('')}</g>
      <g id="bd" font-family="Michroma" style="filter:drop-shadow(0 0 5px #fff9)">${badge(140, 1, 'ST', '74')}${[['G', 'NET'], ['D', 'TRL'], ['K', 'REF'], ['R', 'MEMR']].map(([a, b], i) => badge(350 + i * 75, 0, a, b)).join('')}</g></svg>`;
    const pp = [...host.querySelectorAll('.pp')], bg = [...host.querySelectorAll('.bg')];
    const SEG = [[.3, 12.4], [15.8, 21.2], [21.5, 34.3], [34.7, 40.5]], flick = (t, a) => t < a ? 0 : t < a + .5 ? (Math.floor((t - a) * 14) % 2 ? .3 : 1) : 1;
    return {
      update(t) {
        pp.forEach((g, i) => { const [a, b] = SEG[i]; g.style.opacity = t >= a && t < b ? flick(t, a) : 0; });
        const seg = SEG.findIndex(([a, b]) => t >= a && t < b), a0 = seg >= 0 ? SEG[seg][0] : 0;
        bg.forEach((e, k) => { e.style.display = seg >= 0 && t >= a0 + (k === 0 ? 0 : seg === 0 ? 11.8 + k * .25 : k * .25) ? '' : 'none'; });   // plot A's small badges arrive late (~12 s)
      },
    };
  },
};

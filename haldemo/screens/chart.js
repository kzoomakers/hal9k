// "Scene 50": a blue star chart (video 584.2-613.4 s): a polar grid (arcs about a point above the frame), meridian lines, a constellation of
// thick lines joining about fifty stars with small labels, and light-blue sectors carrying big letters (I Q A P D J R T N S, with subscripts)
// that light up in two stages. Arc radii, line ends, star positions and letter positions measured from the frames (the chart box is
// x 607-1313, y 52-757); label text is placeholder in the small ones. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).chart = {
  mount(host) {
    const OX = 510, CX = 450 + OX, CY = -330, R = [490, 600, 730, 915, 1057], X0 = 97 + OX, X1 = 803 + OX, Y0 = 52, Y1 = 757, P = (x, y) => `${x + OX} ${y}`;
    const yAt = (r, x) => CY + Math.sqrt(r * r - (x - CX) ** 2);
    const arc = (r, a = X0, b = X1) => `M${a} ${yAt(r, a).toFixed(1)}A${r} ${r} 0 0 0 ${b} ${yAt(r, b).toFixed(1)}`.replace('0 0 0', '0 0 0');
    const grid = R.map(r => arc(r)).join('') + `M${P(97, 82)}C${P(150, 70)} ${P(200, 60)} ${P(240, 52)}` + `M${P(360, 52)}L${P(222, 725)}M${P(450, 52)}V${Y1}M${P(490, 52)}L${P(678, 757)}M${P(97, 130)}L${P(450, 52)}`.replace(/^M/, 'M');
    const chains = [[[348, 235], [450, 267], [584, 229], [702, 200]], [[313, 315], [448, 267]], [[226, 288], [313, 315], [350, 372], [414, 357], [477, 352], [594, 360], [645, 374], [743, 397]],
      [[350, 372], [349, 465], [449, 524], [541, 547], [697, 433], [743, 397]], [[349, 465], [362, 530], [374, 583], [400, 691], [406, 708]], [[374, 583], [473, 587], [477, 680], [435, 681]],
      [[275, 499], [215, 718], [230, 720], [437, 745], [449, 757]], [[97, 298], [226, 288]], [[348, 235], [350, 208], [348, 120], [450, 120]], [[160, 118], [213, 128], [300, 215], [350, 232]]];
    const line = c => 'M' + c.map(([x, y]) => P(x, y)).join('L');
    const stars = [[214, 182], [204, 213], [162, 258], [279, 262], [298, 271], [226, 288], [239, 311], [313, 315], [350, 372], [349, 235], [448, 267], [478, 157], [517, 151], [489, 222], [584, 229], [602, 170], [618, 198], [574, 280], [594, 360], [627, 368],
      [645, 374], [667, 277], [682, 309], [700, 341], [739, 287], [743, 397], [790, 244], [657, 178], [598, 418], [697, 433], [414, 357], [477, 352], [506, 353], [451, 375], [275, 499], [362, 530], [400, 529], [449, 524], [471, 531], [541, 547],
      [605, 481], [374, 583], [473, 587], [547, 580], [324, 666], [320, 693], [400, 691], [406, 708], [435, 681], [477, 680], [230, 720], [437, 731], [449, 757]].map(([x, y]) => `<circle cx="${x + OX}" cy="${y}" r="5.2"/>`).join('');
    const tags = [[183, 185, 'GRID REF'], [183, 191, 'X 165.01'], [130, 262, 'Y -5.03'], [180, 262, 'REF'], [180, 268, 'LOC.'], [306, 299, 'REF'], [306, 305, 'AI2'], [347, 234, 'A00'], [473, 169, 'A02'], [502, 133, 'GRID REF'], [502, 139, 'X 765.96'],
      [580, 128, 'GRID REF'], [580, 134, 'X 735.96'], [584, 215, 'B01'], [610, 265, 'RAN.1'], [735, 270, 'GRID REF'], [735, 276, 'Y 002.56'], [681, 380, 'RAN.2'], [412, 369, 'REF XAI'], [465, 369, 'REF XBI'], [750, 515, 'RAN.3'], [540, 530, 'GRID REF'], [540, 536, 'Y 026.50'], [765, 670, 'RAN.4']]
      .map(([x, y, s]) => `<text x="${x + OX}" y="${y}">${s}</text>`).join('');
    const big = [['I', 'z', 462, 117], ['I', '4', 520, 117], ['Q', '2', 466, 245], ['A', '3', 552, 224], ['P', '1', 600, 345], ['D', '3', 493, 375], ['J', '5', 188, 484], ['N', '6', 652, 483], ['R', '4', 347, 520], ['T', '4', 508, 520], ['S', '8', 142, 622]]
      .map(([c, n, x, y]) => `<text x="${x + OX}" y="${y}" font-size="46" font-family="Michroma" font-weight="900">${c}<tspan font-size="17" dy="12">${n === 'z' ? '2' : n}</tspan></text>`).join('');
    const a3 = (x) => yAt(R[2], x).toFixed(1), a4 = x => yAt(R[3], x).toFixed(1);
    const band = `M${X0} ${a3(X0)}A${R[2]} ${R[2]} 0 0 0 ${X1} ${a3(X1)}V${a4(X1)}A${R[3]} ${R[3]} 0 0 1 ${X0} ${a4(X0)}Z`;
    const wedge = `M${P(450, 52)}H${535 + OX}L${X1} 368V${a4(X1)}A${R[3]} ${R[3]} 0 0 1 ${P(450, 585)}Z`;
    const js = `M${X0} 505L${P(190, 378)}L${P(300, 383)}L${P(222, 757)}H${X0}Z`;
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#2b5599"><defs><clipPath id="cb"><rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}"/></clipPath></defs>
      <g clip-path="url(#cb)"><g id="cr1" fill="#7f9cc6" opacity="0"><path d="${band}"/><path d="${js}"/></g><g id="cr2" fill="#7f9cc6" opacity="0"><path d="${wedge}"/></g>
        <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 2px #fff6)"><path d="${grid}" stroke-width="1.6"/><path id="cch" d="${chains.map(line).join('')}" stroke-width="3.6"/></g>
        <g id="ctg" fill="#fff" font-family="ShareTechMono" font-size="5.8" letter-spacing=".4"></g><g id="cd" fill="#fff" style="filter:drop-shadow(0 0 3px #fff9)">${stars}</g><g id="ctx" fill="#fff" font-family="ShareTechMono" font-size="5.8" letter-spacing=".4">${tags}</g>
        <g id="cl" fill="#2a5aa6" opacity="0">${big}</g></g>
      <rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}" fill="none" stroke="#fff" stroke-width="2"/></svg>`;
    const $ = id => host.querySelector('#' + id), root = host.firstChild;
    return {
      update(t) {
        const T = t + 584.2, blink = (a, len) => T >= a && T < a + len && Math.floor((T - a) * 20) % 2;
        $('cr1').style.opacity = T >= 597 ? (T < 611 ? .75 : Math.max(0, .75 - (T - 611) / .5)) : 0;
        const on2 = T >= 602.1; $('cr2').style.opacity = on2 ? (T < 602.6 && blink(602.1, .5) ? .3 : (T > 611.5 ? .45 : .75)) : 0; $('cl').style.opacity = on2 ? (T > 611.5 ? .35 : 1) : 0;
        const late = T >= 595.5; ['cch', 'cd', 'ctx'].forEach(id => $(id).style.display = late ? '' : 'none');   // before 595.5 only the grid is drawn
        root.style.opacity = (T >= 595.4 && T < 595.5) ? 0 : T > 612 ? Math.max(0, 1 - (T - 612) / 1.4) : 1;   // one dropout at 595.4, then out at the end
      },
    };
  },
};

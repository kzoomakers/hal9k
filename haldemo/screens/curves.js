// "Scene 52": a royal-blue chart (video 621.7-651.7 s): a boxed plot with a faint grid, y labels in squares (0² to 150²), x labels 10-80,
// and six rising curves with dots, tags ("BR-I21", "AL-I06", "ST-74" ...) and faded end labels. Empty for ~5 s, then box, curves and tags
// come in; the plot is gone again at the end. Box, grid, label and dot positions measured from the frame (crop offset 640,30); the
// curves are generated through the measured dots. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).curves = {
  mount(host) {
    const OX = 640, OY = 30, X0 = 35 + OX, X1 = 635 + OX, Y0 = 60 + OY, Y1 = 659 + OY, P = (x, y) => `${x + OX} ${y + OY}`;
    let g = ''; for (const x of [110, 185, 260, 335, 410, 485, 560]) g += `M${P(x, 60)}V${Y1}`; for (const y of [135, 210, 285, 360, 435, 510, 585]) g += `M${P(35, y)}H${635 + OX}`;
    const cs = [`M${P(138, 488)}C${P(150, 380)} ${P(190, 290)} ${P(260, 235)}C${P(320, 190)} ${P(360, 175)} ${P(410, 165)}C${P(470, 145)} ${P(540, 105)} ${P(590, 82)}`,
      `M${P(137, 508)}C${P(160, 400)} ${P(220, 300)} ${P(300, 245)}C${P(350, 220)} ${P(380, 215)} ${P(410, 208)}C${P(480, 175)} ${P(540, 150)} ${P(590, 130)}`,
      `M${P(102, 648)}C${P(130, 520)} ${P(180, 400)} ${P(240, 330)}C${P(300, 280)} ${P(350, 268)} ${P(410, 262)}C${P(470, 235)} ${P(540, 200)} ${P(590, 175)}`,
      `M${P(35, 578)}C${P(36, 500)} ${P(45, 470)} ${P(75, 452)}C${P(100, 445)} ${P(112, 440)} ${P(133, 405)}C${P(150, 350)} ${P(170, 300)} ${P(215, 282)}C${P(300, 275)} ${P(380, 278)} ${P(410, 270)}C${P(480, 262)} ${P(540, 250)} ${P(590, 240)}`,
      `M${P(35, 352)}C${P(60, 336)} ${P(100, 325)} ${P(140, 318)}C${P(220, 310)} ${P(300, 302)} ${P(410, 292)}C${P(480, 288)} ${P(540, 280)} ${P(590, 272)}`,
      `M${P(35, 378)}C${P(100, 380)} ${P(160, 368)} ${P(220, 347)}C${P(260, 330)} ${P(310, 305)} ${P(385, 272)}`];
    const dots = [[35, 352], [95, 340], [140, 318], [215, 282], [112, 440], [52, 475], [35, 578], [133, 405], [138, 488], [137, 508], [102, 648], [190, 418], [210, 395], [335, 210], [410, 165], [410, 208], [410, 260], [410, 292], [280, 283], [255, 305], [330, 298], [220, 347], [193, 352], [385, 272], [35, 378]]
      .map(([x, y]) => `<circle cx="${x + OX}" cy="${y + OY}" r="3.8"/>`).join('');
    const tags = [[40, 328, 'IN-0'], [84, 355, 'DV-12'], [132, 332, 'IN-64'], [206, 275, 'ST-74'], [146, 291, '(0.15)'], [153, 299, 'DV/ST'], [84, 427, 'INPUT'], [92, 436, 'ST-I'], [109, 487, 'BR-28'], [109, 511, 'AL-25'], [72, 651, 'AR-0'], [219, 398, 'AR'], [202, 422, 'AR'],
      [380, 161, 'BR-I21'], [380, 204, 'AL-I06'], [384, 257, 'AR-86'], [385, 306, 'IN-72'], [39, 391, 'DV-0']].map(([x, y, s]) => `<text x="${x + OX}" y="${y + OY}">${s}</text>`).join('');
    const ends = [[593, 94, 'END BR.'], [593, 144, 'END AL.'], [593, 190, 'END AR.'], [597, 247, 'DV/ST.'], [593, 289, 'REF IN.'], [609, 297, 'NULL']].map(([x, y, s]) => `<text x="${x + OX}" y="${y + OY}">${s}</text>`).join('');
    const yl = [['150²', 60], ['100²', 210], ['50²', 360], ['25²', 510], ['0²', 660]].map(([s, y]) => `<text x="${OX + 8}" y="${y + OY + 6}" text-anchor="end">${s}</text>`).join('');
    const xl = [[110, '10'], [185, '20'], [260, '30'], [335, '40'], [410, '50'], [485, '60'], [560, '70'], [630, '80']].map(([x, s]) => `<text x="${x + OX}" y="${676 + OY}" text-anchor="middle">${s}</text>`).join('');
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#2c47a2"><g id="cv" style="filter:drop-shadow(0 0 3px #fff7)">
      <g fill="none" stroke="#fff"><path d="${g}" stroke-width="1" stroke-opacity=".28"/><rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}" stroke-width="2"/>
        <g stroke-width="2.5" stroke-linecap="round">${cs.map(d => `<path class="cc" pathLength="1" d="${d}"/>`).join('')}</g></g>
      <g id="cdt" fill="#fff">${dots}</g><g id="ctg" fill="#fff" font-family="ShareTechMono" font-size="7.5" letter-spacing=".5">${tags}</g><g id="cen" fill="#9bb3e8" font-family="ShareTechMono" font-size="7.5" letter-spacing=".5">${ends}</g>
      <g fill="#fff" font-family="ShareTechMono"><g font-size="12">${yl}</g><g font-size="14">${xl}</g></g></g></svg>`;
    const $ = id => host.querySelector('#' + id), cc = [...host.querySelectorAll('.cc')];
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    return {
      update(t) {
        $('cv').style.opacity = t < 4.7 || t >= 28 ? 0 : 1;
        cc.forEach((c, i) => { const k = clamp((t - 4.7 - i * .5) / 4); c.style.strokeDasharray = 1; c.style.strokeDashoffset = 1 - k; });
        $('cdt').style.opacity = t < 8 ? 0 : 1; $('ctg').style.opacity = t < 8 ? 0 : 1; $('cen').style.opacity = t < 8.4 ? 0 : 1;
      },
    };
  },
};

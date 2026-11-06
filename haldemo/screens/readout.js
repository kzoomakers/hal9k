// "Scene 44": the environmental readout on mauve (video 538.9-548.9 s): a two-curve graph with a grid and ppm labels, a step-wave strip,
// and three typed text lines. The graph draws on over 2 s, the strip and text follow, a third line ("RE: ATMOS. CONTAMINANTS") comes in at
// ~6 s, and from then the whole readout flickers to the end. Box, grid, curve points and text measured from the frames (x offset 580, y 10 from the crop).
// t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).readout = {
  mount(host) {
    const OX = 580, OY = 10, pt = a => a.map(([x, y]) => `${x + OX} ${y + OY}`), line = a => 'M' + pt(a).join('L');
    const smooth = a => { const p = a.map(([x, y]) => [x + OX, y + OY]); let d = `M${p[0].join(' ')}`; for (let i = 0; i < p.length - 1; i++) { const p0 = p[Math.max(0, i - 1)], p1 = p[i], p2 = p[i + 1], p3 = p[Math.min(p.length - 1, i + 2)]; d += `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`; } return d; };
    const A = [[43, 65], [85, 58], [120, 75], [165, 120], [195, 150], [240, 165], [293, 187], [340, 130], [400, 125], [430, 100], [437, 100], [470, 190], [505, 260], [528, 308], [550, 270], [580, 190], [620, 155], [670, 125], [719, 100]];
    const B = [[170, 50], [200, 75], [250, 90], [318, 105], [360, 85], [410, 80], [430, 70], [450, 85], [490, 150], [530, 200], [580, 193], [620, 165], [680, 115], [719, 90]];
    const S = [[43, 505], [85, 505], [92, 478], [275, 478], [285, 497], [415, 497], [430, 436], [520, 436], [543, 510], [690, 510], [705, 495], [719, 495]];
    let g = ''; for (const x of [90, 187, 284, 381, 480, 577, 674]) g += `M${x + OX} ${50 + OY}V${368 + OY}M${x + OX} ${398 + OY}V${518 + OY}`;
    for (const y of [105, 193, 281]) g += `M${43 + OX} ${y + OY}H${719 + OX}`; for (const y of [428, 452, 473]) g += `M${43 + OX} ${y + OY}H${719 + OX}`;
    let tk = ''; for (let y = 60; y < 368; y += 44) tk += `M${43 + OX} ${y + OY}h8`;
    const T = (x, y, s, sz = 6.5) => `<text x="${x + OX}" y="${y + OY}" font-size="${sz}">${s}</text>`;
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#6e5878"><g id="rd" style="filter:drop-shadow(0 0 2px #fff6)">
      <g fill="none" stroke="#e8d8ee"><path d="M${43 + OX} ${50 + OY}H${719 + OX}V${368 + OY}H${43 + OX}ZM${43 + OX} ${398 + OY}H${719 + OX}V${518 + OY}H${43 + OX}Z" stroke-width="1.3"/><path d="${g}${tk}" stroke-width="1" stroke-opacity=".8"/></g>
      <g fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path class="rc" pathLength="1" d="${smooth(A)}"/><path class="rc" pathLength="1" d="${smooth(B)}"/><path class="rc" pathLength="1" d="${line(S)}" stroke-width="2.7"/></g>
      <g id="rl" fill="#fff" font-family="ShareTechMono" letter-spacing=".5">${T(305, 80, '125 PPM')}${T(283, 163, '00 PPM')}${T(536, 186, '95 PPM')}${T(589, 216, '95 PPM')}${T(480, 307, '45 PPM')}${T(543, 345, 'PROVISIONAL LIMITS: 90/1000 DAYS')}${T(543, 358, 'N-BUTANOL (10 MILLIOMOLES/25 M³)')}</g>
      <g fill="#fff" stroke="#fff" id="rdot"><circle cx="${293 + OX}" cy="${187 + OY}" r="4"/><circle cx="${528 + OX}" cy="${308 + OY}" r="4"/></g>
      <g id="rt" fill="#fff" font-family="ShareTechMono" font-size="29" letter-spacing="7" style="filter:drop-shadow(0 0 2px #fff6)"><text class="rx" x="${72 + OX}" y="${615 + OY}">ROUTINE: DISPLAY STATUS</text><text class="rx" x="${72 + OX}" y="${660 + OY}">ENVIRONMENTAL</text><text class="rx" x="${72 + OX}" y="${705 + OY}" font-size="14" letter-spacing="3">RE: ATMOS. CONTAMINANTS</text></g>
      <path id="ru" d="M${72 + OX} ${670 + OY}H${675 + OX}" stroke="#fff" stroke-width="2"/></g></svg>`;
    const $ = id => host.querySelector('#' + id), rc = [...host.querySelectorAll('.rc')], rx = [...host.querySelectorAll('.rx')];
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    return {
      update(t) {
        rc.forEach((p, i) => { const k = clamp((t - .1 - i * .2) / (i === 2 ? .8 : 1.2)); p.style.strokeDasharray = 1; p.style.strokeDashoffset = 1 - k; });
        $('rl').style.opacity = t < 1.4 ? 0 : 1; $('rdot').style.opacity = t < 1.4 ? 0 : 1;
        rx.forEach((e, i) => { const a = [.7, 1.4, 5.9][i], k = clamp((t - a) / (i === 2 ? .6 : .8)); e.style.clipPath = `inset(0 ${(1 - k) * 100}% 0 0)`; });
        $('ru').style.opacity = t < 2.2 ? 0 : 1;
        $('rd').style.opacity = t < 5.9 ? 1 : (Math.floor(t * 11) % 3 === 1 ? .35 : 1);   // flickers from about 6 s
      },
    };
  },
};

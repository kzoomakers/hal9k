// "Scene 57": a navy plot with a table of digits below it (video 709.5-722.4 s). A boxed grid with an irregular set of columns, two falling
// curves from the left (with dots, tags and thin leader lines), a ringed target with a fan of lines, a typed caption line and a block of
// four digit rows. The plot is there from the start; the caption and digits come in at ~3.9 s (the second saved frame) and stay.
// Everything is measured from the frames (crop offset 610,0). The digits are transcribed. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).dive = {
  mount(host) {
    const OX = 610, W = '#fff', f = n => n.toFixed(1), X = x => x + OX;
    const cols = [65, 146, 206, 251, 291, 323, 351, 371, 392, 533, 620], rows = [120, 168, 216, 264, 312, 360, 408, 456];
    const g = cols.map(x => `M${X(x)} 120V456`).join('') + rows.map(y => `M${X(65)} ${y}H${X(620)}`).join('');
    const A = `M${X(65)} 200C${X(150)} 255 ${X(250)} 300 ${X(380)} 340S${X(560)} 395 ${X(620)} 407`, B = `M${X(116)} 215C${X(112)} 260 ${X(125)} 285 ${X(170)} 325S${X(230)} 360 ${X(300)} 380S${X(500)} 412 ${X(620)} 431`;
    const ring = `<circle cx="${X(504)}" cy="250" r="82" fill="none" stroke="${W}" stroke-width="2.4"/><circle cx="${X(504)}" cy="250" r="50" fill="none" stroke="${W}" stroke-width="2.4"/>`;
    let fan = ''; for (let i = 0; i < 10; i++) { const a = (190 + i * 9) * Math.PI / 180; fan += `M${X(504 + 82 * Math.cos(a))} ${250 - 82 * Math.sin(a) * -1}L${X(504 - 33)} ${298}`; }
    const dots = [[116, 215], [128, 279], [170, 325], [206, 293], [266, 368], [504, 250], [569, 198]].map(([x, y], i) => `<circle cx="${X(x)}" cy="${y}" r="${i === 5 ? 3.6 : 3}" fill="${W}"/>`).join('');
    const lead = `M${X(116)} 215L${X(232)} 232M${X(232)} 254L${X(146)} 300M${X(206)} 293L${X(146)} 348M${X(266)} 368L${X(146)} 420`;
    const tx = (x, y, s, sz = 7, a = 'start') => `<text x="${X(x)}" y="${y}" font-size="${sz}" text-anchor="${a}">${s}</text>`;
    const tags = tx(115, 138, 'EQU', 9) + tx(157, 138, '.463', 9) + tx(233, 232, 'EP: 54.697') + tx(233, 257, 'CO: 0.1078') + tx(72, 352, 'EX: 314.0 R_AG²') + tx(72, 424, 'FE: 682.IO ᵀᴿ/ᴿˣ') + tx(580, 198, 'ASC') + tx(503, 275, 'EQU₂', 5.5) + tx(503, 282, 'PROJECT', 5.5) + tx(503, 289, 'COURSE', 5.5) + tx(511, 372, 'ENTRY', 5.5) + tx(511, 379, 'POINT', 5.5) + tx(541, 372, 'EXIT', 5.5) + tx(541, 379, 'POINT', 5.5);
    const cap = [[198, 'RDM²'], [296, '5982I4(I)0⁸⁶(398)'], [444, 'POS/COM'], [525, 'ʟʀ233⁸_A²  A=96.87056204']].map(([x, s]) => `<text x="${X(x)}" y="${525}" font-size="11.5" letter-spacing=".9">${s}</text>`).join('');
    const D = [['3I456983216', '46972I356760', '5794I2300097', '48756932I03'], ['I65I6808646', '604867603368', '879065460663', '5664303635I'], ['00559405667', '987986540654', '630740665400', '07068723350'], ['86056706506', '896506870456', '656507904660', '89876232063']];
    const dg = D.map((r, i) => r.map((s, j) => `<text x="${X([184, 330, 476, 628][j])}" y="${622 + i * 15.4}" font-size="11.5" letter-spacing="1">${s}</text>`).join('')).join('');
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#221e40"><g id="dp" style="filter:drop-shadow(0 0 2px #fff6)">
      <rect x="${X(65)}" y="120" width="555" height="336" fill="none" stroke="${W}" stroke-width="1.4"/><path d="${g}" fill="none" stroke="${W}" stroke-width="1" stroke-opacity=".8"/>
      <path d="${lead}" stroke="${W}" stroke-opacity=".6" fill="none"/><path d="${fan}" stroke="${W}" stroke-opacity=".55" fill="none"/>
      <g fill="none" stroke="${W}" stroke-width="3.2" stroke-linecap="round"><path class="dc" pathLength="1" d="${A}"/><path class="dc" pathLength="1" d="${B}"/></g>${ring}${dots}
      <g fill="${W}" font-family="ShareTechMono" letter-spacing=".6">${tags}</g></g>
      <g id="dt" fill="${W}" font-family="ShareTechMono"><g id="dcp" fill-opacity=".85">${cap}</g><g id="ddg">${dg}</g></g></svg>`;
    const $ = id => host.querySelector('#' + id), dc = [...host.querySelectorAll('.dc')];
    return {
      update(t) {
        dc.forEach((c, i) => { const k = Math.min(1, Math.max(0, (t - i * .3) / 1.2)); c.style.strokeDasharray = 1; c.style.strokeDashoffset = 1 - k; });
        $('dt').style.opacity = t < 3.9 ? 0 : (t < 4.4 ? (Math.floor((t - 3.9) * 14) % 2 ? .3 : 1) : 1);
      },
    };
  },
};

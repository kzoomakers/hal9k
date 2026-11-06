// "Scene 4": a purple perspective floor with two wireframe hills, a white data curve, tick labels and a readout (video 35-75 s).
// Everything is built from numbers measured in the frames (hal-frames, screen G21): the floor's rulings, where the verticals meet,
// the hills' size and position, the curve's points and the text boxes. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).surface = {
  mount(host) {
    const BG = '#663b6e', LINE = '#e8d0f2', TOP = 39, BOT = 649, VPX = 960, VPY = -305;
    // floor: fine horizontal rulings every 3.5 px, brighter ones that open out with distance, verticals running to a vanishing point
    let h = ''; for (let y = TOP; y <= BOT; y += 3.5) h += `M-20 ${y.toFixed(1)}H1940`;
    let maj = '', y = 65, s = 15; while (y < BOT) { maj += `M-20 ${y.toFixed(1)}H1940`; y += s; s *= 1.2; }
    let v = ''; for (let j = -95; j <= 95; j++) {
      const xb = VPX + j * 12.1, k = (TOP - VPY) / (BOT - VPY), x0 = VPX + (xb - VPX) * k;
      v += `M${x0.toFixed(1)} ${TOP}L${xb.toFixed(1)} ${BOT}`;
    }
    // hills: bell-shaped wireframes with their own tighter rulings, clipped to the bell
    const bell = (c, w, H0, base) => { let p = ''; for (let x = c - 1.6 * w; x <= c + 1.6 * w; x += 6) p += `${p ? 'L' : 'M'}${x.toFixed(0)} ${(base - H0 * Math.exp(-(Math.abs((x - c) / w) ** 3))).toFixed(1)}`; return p; };
    const hills = [[935, 175, 466], [1195, 165, 466]];
    let defs = '', hg = '';
    hills.forEach(([c, w, H0], i) => {
      const outline = bell(c, w, H0, 633);
      defs += `<clipPath id="hc${i}"><path d="${outline}L${c + 1.6 * w} 633L${c - 1.6 * w} 633Z"/></clipPath>`;
      let rules = ''; for (let yy = 633 - H0; yy < 633; yy += 7) rules += `M${c - 1.6 * w} ${yy}H${c + 1.6 * w}`;
      hg += `<path d="${outline}" stroke-opacity=".55"/><g clip-path="url(#hc${i})"><path d="${rules}" stroke-opacity=".4"/></g>`;
    });
    const curve = 'M763 613C800 575 835 540 853 507C880 450 905 395 913 380C940 335 965 290 993 270C1010 255 1030 242 1047 252C1065 268 1073 300 1077 353';
    const ticks = [['.0008', 642, 252, 830], ['.0090', 646, 295, 830], ['.0430', 654, 354, 800], ['.0013', 654, 388, 790], ['.0007', 667, 421, 790], ['.0060', 673, 460, 780]];
    const tk = ticks.map(([tx, ex, ty, lx]) => `<text x="${ex}" y="${ty}" text-anchor="end">${tx}</text><path d="M${ex + 12} ${ty - 5}H${lx}" stroke-opacity=".5"/>`).join('');
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:${BG}"><defs>${defs}</defs>
      <g id="sf" fill="none" stroke="${LINE}" stroke-width=".9"><path d="${h}" stroke-opacity=".3"/><path d="${maj}" stroke-opacity=".5" stroke-width="1.1"/><path d="${v}" stroke-opacity=".3"/></g>
      <g id="sh" fill="none" stroke="${LINE}" stroke-width="1">${hg}<path d="M813 100L1333 647M1300 100L760 613" stroke-opacity=".45"/></g>
      <path id="sc" d="${curve}" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" style="filter:drop-shadow(0 0 3px #fff8)"/>
      <g id="st" fill="#fff" font-family="ShareTechMono" font-size="21" stroke="#fff" style="stroke-width:0">${tk}</g>
      <g id="sd1" fill="#fff" font-family="ShareTechMono" font-size="30" letter-spacing="2"><text x="566" y="632">DEF2(II5)</text></g>
      <g id="sd2" fill="#fff" font-family="ShareTechMono" font-size="30" letter-spacing="2"><text x="1110" y="362">DEF2(II0)</text></g>
      <g id="sx" fill="#fff" font-family="ShareTechMono" style="filter:drop-shadow(0 0 6px #fff9)">
        <text x="588" y="719" font-size="40" letter-spacing="3">IO/POS</text><text x="838" y="713" font-size="32" letter-spacing="3">82:946:220</text><text x="1136" y="713" font-size="32" letter-spacing="3">.0483</text>
        <text x="588" y="768" font-size="40" letter-spacing="3">IO/NEG</text><text x="838" y="764" font-size="32" letter-spacing="3">96:484:404</text><text x="1136" y="764" font-size="32" letter-spacing="3">.0020</text></g></svg>`;
    const $ = id => host.querySelector('#' + id);
    const flick = (t, a) => t < a ? 0 : t < a + .6 ? (Math.floor((t - a) * 16) % 2 ? .25 : 1) : 1;
    return {
      update(t) {
        $('sf').style.opacity = Math.min(1, t / 1.5);
        const late = Math.max(0, Math.min(1, (t - 30) / 8));         // everything dims toward the end
        $('sx').style.opacity = flick(t, 2) * (1 - .55 * late);
        const body = flick(t, 4.6);
        $('sh').style.opacity = body; $('sc').style.opacity = body * (1 - .5 * late); $('st').style.opacity = body * (t > 21 ? Math.max(.25, 1 - (t - 21) / 8) : 1);
        $('sd1').style.opacity = t < 9 ? 0 : t < 18 ? flick(t, 9) : Math.max(.3, 1 - (t - 18) / 6);
        $('sd2').style.opacity = t < 9 || t > 15 ? 0 : flick(t, 9);
      },
    };
  },
};

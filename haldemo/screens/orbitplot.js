// "Scene 39": a blue orbit diagram (video 493.8-509.7 s): a big arc, an egg-shaped outline, a ring and an inner ellipse around a glowing
// dot, a long line with two near-parallel strokes, leader lines to small labels, then two typed lines of text and a white D/S badge.
// Geometry measured from the frames (the diagram sits at x 700+). Sequence: lines draw on 0-1.6 s, labels flicker in, text types in by 1.8 s, the badge flickers in at 5 s, the text blinks and goes at 10.3-10.8 s, the diagram vanishes at 11.3 s and the badge holds, then fades at the end (timings read from the saved frames). t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).orbitplot = {
  mount(host) {
    const OX = 700, INK = '#fff', P = (x, y) => `${x + OX} ${y}`;
    const lab = [[50, 434, 'EQUATORIAL'], [56, 441, 'ROTATION'], [131, 541, 'APSIS'], [131, 548, '(5.458104)'], [189, 527, 'PERIHELION'], [189, 534, '(4.950429)'], [242, 503, 'SYNODIC PERIOD 398.88'],
      [282, 474, 'AXIAL TILT 3.15°'], [319, 447, '1.305° TO ECLIPTIC'], [361, 395, 'INCLINATION 1.305'], [492, 238, 'AREA/AUX'], [519, 330, 'REL']].map(([x, y, s]) => `<text x="${x + OX}" y="${y}">${s}</text>`).join('');
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#25428b">
      <g id="op" fill="none" stroke="${INK}" stroke-linecap="round" style="filter:drop-shadow(0 0 3px #fff8)">
        <path class="od" pathLength="1" stroke-width="2.6" d="M${P(88, 68)}C${P(250, 55)} ${P(500, 200)} ${P(522, 540)}"/>
        <ellipse class="od" pathLength="1" stroke-width="2.4" cx="${185 + OX}" cy="408" rx="168" ry="108" transform="rotate(-27 ${185 + OX} 408)"/>
        <circle class="od" pathLength="1" stroke-width="2.4" cx="${110 + OX}" cy="442" r="75"/>
        <ellipse class="od" pathLength="1" stroke-width="2.4" cx="${215 + OX}" cy="372" rx="118" ry="46" transform="rotate(-34 ${215 + OX} 372)"/>
        <path class="od" pathLength="1" stroke-width="2.4" d="M${P(92, 480)}L${P(522, 275)}"/>
        <path stroke-width="1" stroke-opacity=".7" d="M${P(92, 480)}L${P(518, 270)}M${P(92, 480)}L${P(80, 450)}M${P(135, 460)}L${P(146, 532)}M${P(150, 455)}L${P(188, 520)}M${P(195, 430)}L${P(240, 485)}M${P(275, 395)}V${465}M${P(275, 395)}L${P(306, 441)}"/>
        <circle cx="${92 + OX}" cy="480" r="4" fill="#fff" stroke="none"/></g>
      <g id="ol" fill="${INK}" font-family="ShareTechMono" font-size="6.6" letter-spacing=".5">${lab}</g>
      <g id="ot" fill="${INK}" font-family="ShareTechMono" font-size="23" letter-spacing="2.6" style="filter:drop-shadow(0 0 3px #fff6)"><text id="ot1" x="630" y="644">INT;REL;(CODE)3,5,7;</text><text id="ot2" x="630" y="672">AREA/AUX;NEUT-FLUX:</text></g>
      <g id="ob" style="filter:drop-shadow(0 0 6px #fff8)"><rect x="1128" y="607" width="120" height="91" rx="4" fill="#fff"/><path d="M1128 653H1248" stroke="#25428b" stroke-width="1.2"/>
        <g fill="#25428b" font-family="Michroma" stroke="#25428b" stroke-width="2.5"><text x="1140" y="643" font-size="34">D</text><text x="1140" y="689" font-size="34">S</text></g>
        <g fill="#25428b" font-family="ShareTechMono" font-size="17"><text x="1194" y="643">PAE</text><text x="1194" y="689">MR</text></g></g></svg>`;
    const $ = id => host.querySelector('#' + id), ds = [...host.querySelectorAll('.od')];
    const flick = (t, a) => t < a ? 0 : t < a + .6 ? (Math.floor((t - a) * 14) % 2 ? .3 : 1) : 1;
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    return {
      update(t) {
        ds.forEach((d, i) => { const k = clamp((t - .1 - i * .22) / .8); d.style.strokeDasharray = 1; d.style.strokeDashoffset = 1 - k; });
        const gone = t >= 11.3;
        $('op').style.opacity = gone ? 0 : 1; $('ol').style.opacity = gone ? 0 : flick(t, 1.2);
        const ty = (id, a) => { const k = clamp((t - a) / 1.3), e = clamp((t - 11.2) / 1.3); $(id).style.clipPath = `inset(0 ${(1 - k + e) * 100 > 100 ? 100 : (1 - k + e) * 100}% 0 0)`; };
        ['ot1', 'ot2'].forEach((id, i) => { const k = clamp((t - (.5 + i * .5)) / .8), e = t >= 10.8 ? 1 : 0; $(id).style.opacity = k > 0 && e < 1 ? (t > 10.3 && Math.floor(t * 12) % 2 ? .3 : 1) : 0; $(id).style.clipPath = `inset(0 ${Math.min(100, (1 - k + e) * 100)}% 0 0)`; });
        $('ob').style.opacity = t < 5 ? 0 : t < 15 ? flick(t, 5) : Math.max(0, 1 - (t - 15) / 1);
      },
    };
  },
};

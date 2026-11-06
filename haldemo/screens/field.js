// "Scene 2": EQU 428 T (video 10.7-26.7 s): a text block, a white Z badge with two grey tabs, and a dipole-field chart
// (concentric ellipses, curved field lines, a grid, a bright needle) that builds up, then everything fades.
// Boxes and positions measured from the frames (hal-frames, screen G00); t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).field = {
  mount(host) {
    const BG = '#244e70', INK = '#f2ffff', X0 = 705, X1 = 1215, Y0 = 300, Y1 = 660, CX = 960, CY = 520;
    // grid: vertical lines every 40, horizontal ones every 24 (finer near the top and bottom edges like the video)
    let g = ''; for (let x = X0 + 20; x < X1; x += 40) g += `M${x} ${Y0}V${Y1}`;
    for (let y = Y0 + 12; y < Y1; y += 24) g += `M${X0} ${y}H${X1}`;
    const RY = [11, 20, 31, 44, 60, 80, 105, 136, 172, 214, 262];
    const rings = RY.map((ry, i) => `<ellipse cx="${CX}" cy="${CY}" rx="${(ry * 2.55).toFixed(1)}" ry="${ry}" style="--i:${i}"/>`).join('');
    let fl = ''; const half = (CY - Y0) * .55;
    for (let k = -5; k <= 5; k++) for (const sg of [-1, 1]) {  // field lines: from the focus, out and then sweeping to the top/bottom edge
      const ye = sg < 0 ? Y0 : Y1, xe = CX + k * 52;
      fl += `M${CX} ${CY}C${CX + k * 12} ${CY + sg * half * .5} ${xe - k * 6} ${ye - sg * half * .7} ${xe} ${ye}`;
    }
    for (let j = -3; j <= 3; j++) for (const sx of [-1, 1]) {  // and out through the sides
      const xe = sx < 0 ? X0 : X1, ye = CY + j * 40 + (j ? 0 : 6);
      fl += `M${CX} ${CY}C${CX + sx * 90} ${CY + j * 8} ${xe - sx * 120} ${ye - j * 6} ${xe} ${ye}`;
    }
    const needle = 'M984 322C968 350 962 400 958 470L955 515M984 322C1000 360 1022 420 1036 505M984 322C1006 380 1024 430 1040 480';
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:${BG}"><defs><clipPath id="fc"><rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}"/></clipPath></defs>
      <g id="ftx" fill="${INK}" font-family="ShareTechMono" font-size="25"><text x="628" y="102">EQU 428  T</text><text x="654" y="130" font-size="23">DENS. 0.4CM<tspan font-size="13" dy="-8">-3</tspan></text>
        <text x="629" y="159" font-size="23">IMF INT</text><text x="628" y="186" font-size="23">RF/</text><text x="628" y="214" font-size="23">E:</text><text x="654" y="242" font-size="23">0.0I-40 MHZ</text></g>
      <g id="fz" style="filter:drop-shadow(0 0 8px #fffb)"><rect x="948" y="72" width="114" height="114" rx="5" fill="#fff"/>
        <path d="M953 95H1054V113L992 150H1056V164H951V146L1013 109H953Z" fill="${BG}"/></g>
      <g id="ftab" font-family="Michroma" font-size="19" fill="#3e617c"><rect x="1083" y="72" width="138" height="48" rx="4" fill="#8fa6ba"/><text x="1095" y="103">NEAR-IR</text>
        <rect x="1083" y="138" width="138" height="48" rx="4" fill="#91a6b8"/><text x="1095" y="169">UV</text></g>
      <g id="fch" style="filter:drop-shadow(0 0 2px #fff6)"><g clip-path="url(#fc)"><g fill="none" stroke="#9bb8d0" stroke-width="1.1" stroke-opacity=".8"><path id="fgr" d="${g}"/></g>
        <g id="fel" fill="none" stroke="${INK}" stroke-width="2">${rings}</g><g id="ffl" fill="none" stroke="${INK}" stroke-width="1.8"><path d="${fl}"/></g></g>
        <rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}" fill="none" stroke="#cfe3f2" stroke-width="1.6"/>
        <path id="fnd" d="${needle}" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/><circle cx="984" cy="322" r="4.5" fill="#fff"/>
        <g fill="${INK}" font-family="ShareTechMono" font-size="9" letter-spacing=".6"><text x="795" y="290">ROTATION PERIOD</text><text x="1038" y="290">9H 55M 29.7 ± 0.15</text><text x="1002" y="344" font-size="8">MAGNETOPAUSE</text><text x="1002" y="354" font-size="8">DISTANCE 50-100 RJ</text>
          <text x="800" y="676">LONGITUDE 159°</text><text x="1038" y="676">DIPOLE TILT 10°</text></g></g></svg>`;
    const $ = id => host.querySelector('#' + id), els = [...$('fel').children];
    const flick = (t, a) => t < a ? 0 : t < a + .5 ? (Math.floor((t - a) * 14) % 2 ? .3 : 1) : 1;
    return {
      update(t) {
        const out = t < 11.4 ? 1 : Math.max(0, 1 - (t - 11.4) / .6);   // text goes at 11.4 s
        $('ftx').style.opacity = flick(t, 0) * out;
        $('fz').style.opacity = t < 4.5 ? 0 : flick(t, 4.5) * (t < 9.5 ? 1 : 1);
        $('ftab').style.opacity = t < 5.3 || t > 9.5 ? 0 : flick(t, 5.3);
        const ch = t < 1.8 ? 0 : 1; $('fch').style.opacity = t < 10 ? ch : Math.max(0, 1 - (t - 10) / 6);
        const grow = Math.min(1, Math.max(0, (t - 1.8) / 3));                 // the chart builds outward from the focus
        els.forEach((e, i) => { e.style.opacity = grow * 11 > i ? 1 : 0; });
        $('ffl').style.opacity = t < 3 ? 0 : 1; $('fgr').style.opacity = t < 2.5 ? 0 : 1;
        $('fnd').style.opacity = t < 4 ? 0 : flick(t, 4);
      },
    };
  },
};

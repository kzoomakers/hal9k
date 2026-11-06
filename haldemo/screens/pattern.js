// "Scene 21": a blue plot (video 283-301 s): a box with a faint grid, a long flat ellipse, a falling curve, a near-vertical arc crossing both,
// small tick labels and text blocks. It draws on over the first ~5 s then holds. Everything measured from the frames (hal-frames);
// t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).pattern = {
  mount(host) {
    const INK = '#fff';
    const T = (x, y, s, o = '') => `<text x="${x}" y="${y}" ${o}>${s}</text>`;
    const small = [[776, 346, '004.2'], [849, 335, '031.3'], [895, 330, '055.7'], [949, 330, '028.9'], [1007, 331, '035.5'], [1066, 335, '057.1'], [1108, 340, '041.3'], [1193, 358, '046.0'],
      [744, 373, 'TL-1.0'], [781, 373, 'TL-1.0'], [818, 374, 'TL-1.0'], [871, 376, 'TL-0.9'], [910, 378, 'TL-0.9'], [951, 382, 'TL-0.8'], [984, 386, 'TL-0.8'], [1022, 392, 'TL-0.7'], [1073, 403, 'TL-0.6'], [1111, 414, 'TL-0.5'], [1178, 445, 'TL-0.3'], [1209, 466, 'TL-0.2'],
      [739, 425, '24 COM'], [800, 438, '23 COM'], [856, 446, '22 COM'], [917, 450, '21 COM'], [976, 450, '21 COM'], [1020, 448, '22 COM'], [1082, 445, '23 COM']].map(([x, y, s]) => T(x, y, s)).join('');
    const mid = [[762, 259, 'ATTENUATION'], [762, 268, 'FLX. (342) RE-TARGETING /AFFIRM'], [762, 277, 'XRY. (2I2) LOCKING ------- DONE'], [762, 289, 'LOCK'], [762, 310, '(999) DP .2 VARI (4)'],
      [695, 331, 'DPP.'], [695, 357, 'EXCL.'], [1162, 414, 'TARGET'], [1162, 423, 'LOCK'], [1130, 454, 'A/S'], [1130, 463, 'COM'], [1086, 218, 'RADIAL'], [1086, 227, 'ARRAY'],
      [1139, 255, '+2.6'], [1146, 276, '+1.4'], [1159, 321, '0.0'], [1147, 534, '-1.2'], [1137, 571, '-2.2'], [1110, 633, 'FALL OFF'], [1110, 643, 'NULL.'],
      [970, 551, 'FREQUENCY'], [904, 560, 'REGION (645.098) ANALOG SIGNAL STENGTH'], [904, 569, 'REMAP ---------- PULSE: 000001'], [931, 578, '---------- TONE: 000009']].map(([x, y, s]) => T(x, y, s)).join('');
    const axis = [[655, 305, '100²'], [662, 410, '50²'], [669, 511, '0²'], [680, 531, '010²'], [810, 531, '020²'], [947, 531, '030²'], [1084, 531, '040²'], [1221, 531, '050²']].map(([x, y, s]) => T(x, y, s)).join('');
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#1b68a4">
      <g id="ptl" fill="none" stroke="${INK}">
        <g stroke-width="1" stroke-opacity=".6"><path pathLength="1" d="M825 300V510M960 300V510M1095 300V510M690 405H1230"/></g>
        <path class="pd" pathLength="1" stroke-width="2.2" d="M690 300H1230V510H690Z"/>
        <ellipse class="pd" pathLength="1" cx="960" cy="398.5" rx="270" ry="60.5" stroke-width="2.4"/>
        <path class="pd" pathLength="1" stroke-width="2.2" d="M690 381C800 380 950 385 1040 405C1110 420 1190 445 1230 509"/>
        <path class="pd" pathLength="1" stroke-width="2.4" d="M1118 226C1160 300 1165 420 1152 460C1135 530 1110 600 1086 659"/>
        <path class="pd" pathLength="1" stroke-width="2.2" d="M691 341A32 32 0 0 1 691 405"/></g>
      <g id="ptt" fill="${INK}" font-family="ShareTechMono" transform="translate(0 3)"><g font-size="5.6" letter-spacing=".4">${small}</g><g font-size="7.6" letter-spacing=".5">${mid}</g><g font-size="11.5" letter-spacing=".4">${axis}</g></g></svg>`;
    const $ = id => host.querySelector('#' + id), ds = [...host.querySelectorAll('.pd')];
    const flick = (t, a) => t < a ? 0 : t < a + .5 ? (Math.floor((t - a) * 14) % 2 ? .3 : 1) : 1;
    return {
      update(t) {
        const A = [1, 2, 3, 3.5, 4];  // when each line starts drawing, and it takes about 1.2 s
        ds.forEach((d, i) => { const k = Math.min(1, Math.max(0, (t - A[i]) / 1.4)); d.style.strokeDasharray = 1; d.style.strokeDashoffset = 1 - k; });
        $('ptt').style.opacity = flick(t, 5);
      },
    };
  },
};

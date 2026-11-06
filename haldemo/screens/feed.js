// "Scene 8": scrolling number tables on a blue field (video 111-134.7 s). The page is one tall strip of tables and rules that
// jumps upward in bursts (the burst times and distances are measured from the frames); the last table, the rule and the two
// text lines at the end are transcribed from the video. The other tables use the video's layout (columns, row pitch, rules) but
// seeded random digits, not the video's own digits. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).feed = {
  mount(host) {
    let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const dig = (n, pool = '0123456789I') => Array.from({ length: n }, () => pool[Math.floor(rnd() * pool.length)]).join('');
    let g = '';
    const txt = (x, y, s, anchor) => g += `<text x="${x}" y="${y}"${anchor ? ` text-anchor="${anchor}"` : ''}>${s}</text>`;
    const rule = y => g += `<path d="M0 ${y}H1920" stroke="#fff" stroke-width="2" fill="none"/>`;
    for (let i = 0; i < 6; i++) { txt(639, 108 + 36 * i, dig(8)); txt(939, 108 + 36 * i, dig(5 + (i % 2))); }            // block 1
    rule(320);
    for (let i = 0; i < 11; i++) { txt(771, 366 + 35.4 * i, dig(8)); txt(1074, 366 + 35.4 * i, dig(7)); }                 // block A
    rule(794);
    for (let i = 0; i < 10; i++) { const y = 890 + 35 * i; txt(640, y, dig(2)); txt(733, y, dig(1)); txt(808, y, dig(15)); txt(1132, y, dig(4)); } // block B
    rule(1240); rule(1309);
    for (let i = 0; i < 11; i++) { txt(849, 1352 + 35 * i, dig(5)); txt(1180, 1352 + 35 * i, dig(3), 'end'); }              // block C
    rule(1780);
    const D = [['II40336', '08', '8888', '2.0', '93'], ['3948200', '49', '0394', '5.9', '03'], ['0299385', '00', '8273', '.03', '29'], ['3944930', '22', '0499', '.00', '94'],
      ['0000399', 'I4', 'I585', '9.6', '00'], ['I485722', '94', '8475', '0.5', '63'], ['92II486', '84', '5867', '5.5', '05'], ['I485922', '93', 'I485', '9.3', '44'],
      ['0495827', '75', '9385', '5.2', '40'], ['83I4059', '03', '4859', '.40', '77'], ['9304857', '28', '5756', '.38', '46'], ['I384722', '06', '0488', '.I0', '00'],
      ['483I900', '39', '0000', 'I.4', '38'], ['4I58000', '92', 'I455', '5.8', '66'], ['4I58022', '0I', '0390', '.59', '40'], ['3I48055', '90', '9399', '.38', '02'],
      ['I384055', '00', '8320', '.04', 'II'], ['3I00495', 'I5', '5033', '8.5', '49']];
    D.forEach((r, i) => { const y = 1970 + 37 * i; txt(675, y, r[0]); txt(866, y, r[1]); txt(942, y, r[2]); txt(1056, y, r[3]); txt(1170, y, r[4]); });
    rule(2585); txt(904, 2634, 'ESM(300+)'); txt(862, 2670, '8I5I - 994; IMP(2)');
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#086ab1"><g fill="#fff" font-family="ShareTechMono" font-size="30" letter-spacing="1.5" style="filter:drop-shadow(0 0 3px #fff6)"><g id="fs">${g}</g></g></svg>`;
    // scroll offset by time: bursts of 30-120 px per 0.1 s with holds between (from the frame-to-frame shifts)
    const K = [[0, 0], [113.4, 0], [113.5, 60], [113.6, 150], [113.7, 240], [114.6, 240], [114.7, 360], [118.6, 360], [118.7, 450], [118.8, 600], [118.9, 690], [119, 780],
      [122.3, 780], [122.4, 840], [122.5, 900], [122.6, 960], [122.7, 1020], [122.8, 1080], [124.3, 1080], [124.4, 1140], [124.5, 1200], [124.6, 1260], [124.7, 1320], [124.8, 1380], [124.9, 1500], [125, 1560], [125.1, 1680], [125.2, 1740],
      [128.4, 1740], [128.5, 1830], [128.6, 1890], [200, 1890]].map(([a, b]) => [a - 111, b]);
    const fs = host.querySelector('#fs');
    return { update(t) { let i = 1; while (i < K.length - 1 && K[i][0] < t) i++; const [a, b] = K[i - 1], [c, d] = K[i]; fs.setAttribute('transform', `translate(0 ${-(b + (d - b) * Math.min(1, Math.max(0, (t - a) / (c - a || 1))))})`); } };
  },
};

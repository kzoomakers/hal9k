// The "radar target" scene (video 451.4-484.7 s): drifting white lines, a green target that blinks, typed coordinates, a glowing dot,
// then the camera moves in and a three-line profile pops up. Geometry measured from the frames (hal-frames screen G31):
// centre (960,405), rings at 83/165/248/330, diagonals and ticks every 22.5 degrees. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).radar = {
  mount(host) {
    const CX = 960, CY = 405, RINGS = [83, 165, 248, 330], G = '#8fae4a';
    let tgt = RINGS.map(r => `<circle cx="${CX}" cy="${CY}" r="${r}"/>`).join('');
    tgt += `<path d="M168 ${CY}H1752M${CX} 0V810M${CX - 292} ${CY - 290}L${CX + 292} ${CY + 290}M${CX - 292} ${CY + 290}L${CX + 292} ${CY - 290}"/>`;
    for (const r of RINGS) for (let a = 0; a < 360; a += 22.5) {  // short radial ticks across each ring, between the diagonals and axes
      if (a % 45 === 0) continue;
      const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
      tgt += `<path d="M${(CX + c * (r - 30)).toFixed(1)} ${(CY + s * (r - 30)).toFixed(1)}L${(CX + c * (r + 30)).toFixed(1)} ${(CY + s * (r + 30)).toFixed(1)}"/>`;
    }
    // background lines: x/y positions as in the video, each with its own thickness, brightness and way of moving
    const VX = [55, 198, 278, 355, 435, 510, 595, 740, 785, 820, 1155, 1245, 1275, 1320, 1415, 1475, 1560, 1640, 1725, 1810, 1880];
    const HY = [22, 45, 75, 115, 155, 350, 405, 555, 610, 650, 695, 740];
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const lines = [...VX.map(p => ({ v: 1, p })), ...HY.map(p => ({ v: 0, p }))].map((l, i) => ({
      ...l, w: rnd() < .3 ? 3 : 1.5, a: .35 + rnd() * .6, mode: i % 5 === 0 ? 'snap' : i % 7 === 0 ? 'jit' : 'drift', vel: (rnd() - .5) * 14, off: 0, next: 0,
    }));
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#001918">
      <g id="rbg" stroke="#e8f0ec" fill="none">${lines.map(() => '<path/>').join('')}</g>
      <g id="rghost" fill="#8fb0a8" font-family="ShareTechMono" font-size="26" letter-spacing="2"><text x="790" y="312">CLOSING 45+</text><text x="790" y="342">CB NOM</text></g>
      <g id="rt" fill="none" stroke="${G}" stroke-width="1.6">${tgt}</g>
      <circle id="rc1" cx="${CX}" cy="${CY}" r="28" fill="#cfdcd8" style="filter:blur(6px)"/>
      <circle id="rc2" cx="${CX}" cy="${CY}" r="20" fill="#fff" style="filter:blur(2px)"/>
      <g id="rco" fill="#fff" font-family="ShareTechMono" font-size="30" letter-spacing="2"><text x="610" y="100">CO-ORDINATE 0064295°023652.4I</text><text x="610" y="146">RTE DIST  5685243.5</text></g>
      <g id="rpf" fill="#fff" font-family="ShareTechMono" font-size="34" letter-spacing="2"><text x="605" y="604">LR PROFILE</text><text x="605" y="654">N/A OPTIMATE</text><text x="605" y="704">N/A HAL COMLK</text></g></svg>`;
    const $ = id => host.querySelector('#' + id), paths = [...$('rbg').children];
    let last = 0;
    return {
      update(t) {
        const dt = Math.max(0, t - last); last = t;
        // drifting lines, gone by 13 s
        for (let i = 0; i < lines.length; i++) {
          const l = lines[i], p = paths[i];
          if (l.mode === 'drift') l.off += l.vel * dt; else if (l.mode === 'snap' && t >= l.next) { l.off = (rnd() - .5) * 400; l.next = t + .3 + rnd() * 1.2; }
          const q = l.p + l.off + (l.mode === 'jit' ? Math.sin(t * 11 + l.p) * 5 : 0);
          p.setAttribute('d', l.v ? `M${q} 0V810` : `M0 ${q}H1920`);
          p.setAttribute('stroke-width', l.w); p.setAttribute('opacity', (l.a * (l.mode === 'jit' ? .5 + .5 * Math.random() : 1)).toFixed(2));
        }
        $('rbg').style.opacity = Math.max(0, Math.min(1, (13 - t) / 4.5));
        $('rghost').style.opacity = t < 1 ? t * .4 : Math.max(0, .4 - (t - 3) * .2);
        // the target blinks once a second; it comes up from faint
        const base = t < 4 ? .3 : t < 8 ? .3 + (t - 4) * .12 : .75, dip = (t % 1) < .1 ? .35 : 1, rt = $('rt');
        rt.style.opacity = base * dip; rt.setAttribute('stroke', Math.floor(t) % 2 ? '#d8f76a' : G);
        // the camera moves in from 14 s
        const k = Math.min(1, Math.max(0, (t - 14) / 6)), z = 1 + 1.0 * k * k * (3 - 2 * k);
        rt.setAttribute('transform', `translate(${CX} ${CY}) scale(${z}) translate(${-CX} ${-CY})`);
        // the dot: dim and grey, then flashing white from 7 s
        $('rc1').setAttribute('r', 24 * z); $('rc2').setAttribute('r', 17 * z); $('rc1').style.opacity = t < 3 ? .15 : .55; $('rc2').style.opacity = t >= 7 && Math.floor(t * 2) % 2 === 0 || t >= 20 && Math.floor(t * 2) % 2 === 0 ? 1 : 0;
        // coordinates: typed 7.4-9.2 s, blink, glitch, gone at 13.5 s
        const co = $('rco'), cp = t < 7.4 ? 0 : Math.min(1, (t - 7.4) / 1.8);
        co.style.clipPath = `inset(0 ${(1 - cp) * 100}% 0 0)`;
        co.style.opacity = t >= 13.5 ? 0 : (t > 9.4 && t < 11 && Math.floor(t * 4) % 2 === 0) ? 0 : 1;
        co.setAttribute('transform', t > 11.3 && Math.floor(t * 6) % 7 === 0 ? 'translate(8 0) skewX(-10)' : '');
        // profile lines pop in at 22.4, 23.2, 24 s (a quick flicker on the way)
        [...$('rpf').children].forEach((el, i) => { const a = 22.4 + i * .8, u = t - a; el.style.opacity = u < 0 ? 0 : u < .5 ? (Math.floor(u * 16) % 2 ? .3 : 1) : 1; });
      },
    };
  },
};

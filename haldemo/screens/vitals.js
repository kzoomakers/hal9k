// "Scene 13": the life-function monitor (video 211.7-229 s): six labelled rows on black, each with a graph paper background and a
// trace that sweeps across with a bright head and a fading tail. Layout and label colours measured from the frames; the six traces are
// generated (seeded, one character per row: cardio bumps, metabolic blocks, CNS ramps, pulmonary zigzag, systems pulses, locomotor noise),
// not copies of the video's own wiggles. The monitor is one continuous thing across scenes 13, 15, 16-19, so every mount takes p.t0 (the
// video time the slide starts at) and runs on the video clock: sweep phase and the alarm/flatline schedule below are in video seconds.
(window.NATIVE = window.NATIVE || {}).vitals = {
  mount(host, p = {}) {
    const RED = '#c0183a';
    // the schedule, in video seconds: [row, time, colour] turns a row's label red and tints its graph; [row, time] flattens its trace
    const ALARMS = p.alarms || [[1, 236.2, RED], [4, 238, RED], [0, 243.4, RED], [3, 243.4, RED], [5, 254.2, RED], [2, 258.2, RED]];
    const FLAT = p.flat || [[1, 243.4], [4, 243.4], [3, 253.7], [5, 256.2], [2, 259.7], [0, 262.2]];
    const T0 = p.t0 || 0;
    const X0 = 663, X1 = 1485, ROW = 75, TOP = 184, H = 66, N = 411; // two samples per 2 px
    const ROWS = [['CARDIO', 'VASCULAR', '#4b9db6'], ['METABOLIC', 'LEVELS', '#3b7a3c'], ['CENTRAL', 'NERV. SYSTEM', '#5eae8e'],
      ['PULMONARY', 'FUNCTION', '#5a6fa8'], ['SYSTEMS', 'INTEGRATION', '#68afd0'], ['LOCOMOTOR', 'SYSTEM', '#4a4a2a']];
    let seed = 5; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const wave = k => {
      const y = []; let v = .5, tgt = .5, hold = 0;
      for (let i = 0; i < N; i++) {
        if (k === 0) { const m = i % 150; v = .45 + (m < 40 ? .3 * Math.sin(m / 40 * Math.PI) : 0) + (m > 95 && m < 130 ? .35 * Math.sin((m - 95) / 35 * Math.PI) : 0) + (rnd() - .5) * .03; }
        else if (k === 1) { if (--hold < 0) { tgt = .25 + rnd() * .6; hold = 15 + rnd() * 25; } v += (tgt - v) * .25 + (rnd() - .5) * .03; }
        else if (k === 2) { v = .4 + ((i % 60) / 60) * .25 - (i % 60 > 56 ? .3 : 0) + (rnd() - .5) * .04; }
        else if (k === 3) { v = .5 + Math.sin(i * .6) * .22 * (.5 + rnd() * .7) + (rnd() - .5) * .25; }
        else if (k === 4) { if (--hold < 0) { tgt = rnd() < .5 ? .3 : .7; hold = 10 + rnd() * 30; } v += (tgt - v) * .6; }
        else { v = .5 + Math.sin(i * .35) * .2 * rnd() + (rnd() - .5) * .5 * (.3 + rnd()); }
        y.push(Math.min(.95, Math.max(.05, v)));
      }
      return y;
    };
    const path = (y, a, b) => { let d = ''; for (let i = a; i <= b; i++) d += `${i === a ? 'M' : 'L'}${(X0 + i * 2).toFixed(0)} ${0}`.replace(' 0', ' ' + y[i]); return d; };
    let g = '';
    ROWS.forEach(([a, b, c], k) => {
      const y0 = TOP + ROW * k, w = wave(k);
      let grid = ''; for (let x = X0; x <= X1; x += 33) grid += `M${x} ${y0}V${y0 + H}`; for (let j = 0; j <= 4; j++) grid += `M${X0} ${y0 + H * j / 4}H${X1}`;
      let d = ''; w.forEach((v, i) => { d += `${i ? 'L' : 'M'}${X0 + i * 2} ${(y0 + H * (1 - v)).toFixed(1)}`; });
      g += `<rect x="${X0}" y="${y0}" width="${X1 - X0}" height="${H}" fill="#050807"/><path d="${grid}" stroke="#2c4a3f" stroke-width="1" fill="none"/>
        <clipPath id="vc${k}"><rect class="vc" x="${X0}" y="${y0 - 4}" width="0" height="${H + 8}"/></clipPath>
        <g class="vw"><path d="${d}" stroke="#ccd" stroke-opacity=".28" stroke-width="1.4" fill="none"/><path d="${d}" stroke="#fff" stroke-width="2.1" fill="none" clip-path="url(#vc${k})"/></g><path class="vf" d="M${X0} ${y0 + H / 2}H${X1}" stroke="#e8e8f0" stroke-width="1.4" fill="none" style="display:none" clip-path="url(#vc${k})"/>
        <rect class="vtint" x="${X0}" y="${y0}" width="${X1 - X0}" height="${H}" fill="#c0183a" opacity="0"/><rect class="vlab" x="${X0 - 225}" y="${y0}" width="225" height="${H}" fill="${c}"/><g fill="#fff" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="19" letter-spacing="1" style="filter:drop-shadow(0 0 3px #fff9)"><text x="${X0 - 212}" y="${y0 + 29}">${a}</text><text x="${X0 - 212}" y="${y0 + 52}">${b}</text></g>`;
    });
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#000"><g id="vt" style="filter:drop-shadow(0 0 2px #fff6)">${g}</g></svg>`;
    const clips = [...host.querySelectorAll('.vc')], labs = [...host.querySelectorAll('.vlab')], vws = [...host.querySelectorAll('.vw')], vfs = [...host.querySelectorAll('.vf')], tints = [...host.querySelectorAll('.vtint')], PERIOD = [5.5, 4.2, 6.5, 3.6, 4.8, 3.9];
    return {
      update(t0) {
        const t = t0 + T0;
        (FLAT).forEach(([k, at]) => { const on = t >= at; vws[k].style.display = on ? 'none' : ''; vfs[k].style.display = on ? '' : 'none'; });
        (ALARMS).forEach(([k, at, col]) => { const on = t >= at; labs[k].setAttribute('fill', on ? col : ROWS[k][2]); tints[k].setAttribute('opacity', on ? .16 : 0); });
        clips.forEach((c, k) => {  // each row sweeps at its own speed; behind the head the trace fades to a dim copy of itself
          const fl = FLAT.some(([r, at]) => r === k && t >= at), p = ((t / PERIOD[k]) + k * .17) % 1, head = p * (X1 - X0), tail = fl ? 0 : Math.max(0, head - 330); // a flatlined row draws its line from the left up to the head
          c.setAttribute('x', X0 + tail); c.setAttribute('width', head - tail);
        });
      },
    };
  },
};

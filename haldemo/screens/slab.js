// "Scene 25": a stack of nine rounded outlines (a slab seen from changing angles) turning inside a salmon targeting sight
// on a dark field (video 334.3-376 s). The sight (four X marks with arcs, four plus ticks, a centre ring) is measured from the frames;
// the slab is generated: nine layers, offset along a drifting depth direction while it rotates, with dash ladders and small circles
// along its axis. Angles follow the video's rhythm (flat, upright, flat, tilted ...), not its every frame. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).slab = {
  mount(host) {
    const CX = 960, CY = 405, S = '#e8767a', W = 260, H = 690, R = 26, N = 9;
    const rr = (w, h, r) => `M${-w / 2 + r} ${-h / 2}H${w / 2 - r}A${r} ${r} 0 0 1 ${w / 2} ${-h / 2 + r}V${h / 2 - r}A${r} ${r} 0 0 1 ${w / 2 - r} ${h / 2}H${-w / 2 + r}A${r} ${r} 0 0 1 ${-w / 2} ${h / 2 - r}V${-h / 2 + r}A${r} ${r} 0 0 1 ${-w / 2 + r} ${-h / 2}Z`;
    let sight = '';
    for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const x = CX + sx * 230, y = CY + sy * 228;
      sight += `<path d="M${x - 92} ${y - 92}L${x + 92} ${y + 92}M${x - 92} ${y + 92}L${x + 92} ${y - 92}"/>`;
      sight += `<path d="M${x - sx * 62} ${y - sy * 100}C${x - sx * 108} ${y - sy * 50} ${x - sx * 108} ${y + sy * 25} ${x - sx * 70} ${y + sy * 85}"/>`;  // the arc bows toward the centre
    }
    for (const [dx, dy] of [[-350, 0], [350, 0], [0, -330], [0, 345]]) sight += `<path d="M${CX + dx - 30} ${CY + dy}h60M${CX + dx} ${CY + dy - 30}v60"/>`;
    let layers = ''; for (let i = 0; i < N; i++) layers += `<path class="sl" d="${rr(W - i * 3, H - i * 5, R)}"/>`;
    let dash = ''; for (let i = 0; i < 26; i++) dash += `M${(i % 2) * 6 - 3} ${-300 + i * 24}h0v14`;
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#0e1820">
      <g fill="none" stroke="${S}" stroke-width="3" stroke-linecap="round">${sight}</g>
      <g id="sw" transform="translate(${CX} ${CY})"><g id="sg" fill="none" stroke="#fff" stroke-width="2.6" style="filter:drop-shadow(0 0 3px #fff8)">${layers}
        <path d="${dash}" stroke-width="2.4" stroke-dasharray="2 0"/></g></g>
      <circle cx="${CX}" cy="${CY}" r="54" fill="none" stroke="#e8eef4" stroke-width="2.4" style="filter:drop-shadow(0 0 3px #fff8)"/></svg>`;
    const sl = [...host.querySelectorAll('.sl')], sg = host.querySelector('#sg');
    // key poses: [time, in-plane angle deg, depth direction deg, depth length px, squash]
    const K = [[0, 90, 90, 28, 1], [3, 90, 90, 30, 1], [6.5, 0, 80, 50, .55], [10, 0, 70, 60, .5], [13, 0, 60, 50, .55], [16, 0, 40, 50, .5], [19, 8, 20, 60, .6],
      [22, 4, 0, 34, 1], [26, 0, 5, 24, 1], [30, 0, 10, 20, .6], [33, -6, 20, 18, .95], [37, -8, 10, 12, 1], [41.7, -10, 0, 8, 1]];
    const at = t => { let i = 1; while (i < K.length - 1 && K[i][0] < t) i++; const [a, b] = [K[i - 1], K[i]], f = Math.min(1, Math.max(0, (t - a[0]) / (b[0] - a[0]))); return a.slice(1).map((v, j) => v + (b[j + 1] - v) * f); };
    return {
      update(t) {
        const [ang, dd, dl, sq] = at(t);
        sg.setAttribute('transform', `rotate(${ang})`);
        const dx = Math.cos(dd * Math.PI / 180) * dl, dy = Math.sin(dd * Math.PI / 180) * dl;
        sl.forEach((p, i) => p.setAttribute('transform', `translate(${(dx * i / N).toFixed(1)} ${(dy * i / N).toFixed(1)}) scale(${(1 - (1 - sq) * .0).toFixed(2)} ${sq})`));
      },
    };
  },
};

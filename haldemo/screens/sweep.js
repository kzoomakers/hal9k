// "Scene 41": a purple chart of curves that blinks once a second (video 520-530.5 s): a 15x6 grid, eleven curves fanning from the top-left
// corner down to the bottom-right, and eight hump curves rising from the left edge, with y labels 000-6000 and x labels 00-70. Axes and
// label positions measured from the frames; the curves are generated to share the video's end points and overall shape. On for the last half
// of every second, dim just before, off just after the second turns over. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).sweep = {
  mount(host) {
    const X0 = 725, X1 = 1177, Y0 = 75, Y1 = 525, W = X1 - X0, f = n => n.toFixed(1);
    let g = ''; for (let i = 0; i <= 15; i++) g += `M${f(X0 + i * W / 15)} ${Y0}V${Y1}`; for (let j = 0; j <= 6; j++) g += `M${X0} ${f(Y0 + j * 75)}H${X1}`;
    const fan = Array.from({ length: 11 }, (_, i) => { const k = i / 10, P = (px, py) => `${f(X0 + px * W)} ${f(Y0 + py * (Y1 - Y0 - 15))}`;
      return `M${P(0, 0)}C${P(.45 - .43 * k, .12 + .43 * k)} ${P(.85 - .45 * k, .45 + .5 * k)} ${P(1, 1)}`; });
    const starts = [243, 170, 0, 0, 0, 0, 0, 0], peak = [40, 150, 85, 75, 60, 48, 38, 28]; // [height of the left start, hump amplitude]
    const hump = starts.map((h0, i) => { let d = ''; for (let u = 0; u <= 1.001; u += .02) { const h = h0 * Math.max(0, 1 - u * 1.6) + peak[i] * Math.sin(Math.PI * Math.pow(u, .72)); d += `${d ? 'L' : 'M'}${f(X0 + u * W)} ${f(Y1 - h * (1 - u * .04))}`; } return d; });
    const yl = ['6000', '5000', '4000', '3000', '2000', '1000', '000'].map((s, i) => `<text x="${X0 - 10}" y="${Y0 + 4 + i * 75}" text-anchor="end">${s}</text>`).join('');
    const xl = Array.from({ length: 15 }, (_, i) => `<text x="${f(X0 + i * W / 15 - 2)}" y="${Y1 + 22}" text-anchor="middle">${String(i * 5).padStart(2, '0')}</text>`).join('');
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#623a5f"><g id="sc" style="filter:drop-shadow(0 0 2px #fff7)">
      <g fill="none" stroke="#e8d4ee"><path d="${g}" stroke-width="1" stroke-opacity=".75"/><g stroke-width="2.3" stroke="#fff">${fan.map(d => `<path d="${d}"/>`).join('')}${hump.map(d => `<path d="${d}"/>`).join('')}</g></g>
      <g fill="#e8d4ee" font-family="ShareTechMono" font-size="8" letter-spacing=".5">${yl}${xl}</g></g></svg>`;
    const c = host.querySelector('#sc');
    return { update(t) { const u = t % 1; c.style.opacity = u < .4 ? 0 : u < .5 ? .3 : 1; } };
  },
};

// the glitch streak transition (video 783.5-785.1 s): the grey "FINAL RE-CHECK" screen, then a line at y~400 that explodes into horizontal streaks.
// Companion of tonight.js. Streak thickness/brightness are seeded; extents follow the frames. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).smear = {
  mount(host) {
    let seed = 3; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const N = 260, bars = Array.from({ length: N }, () => ({ y: rnd(), h: .5 + rnd() * 3.5 + (rnd() < .08 ? 10 : 0), c: rnd(), x0: rnd() < .35 ? rnd() * 800 : 0 }));
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#3e3b40"><g id="st" fill="#fff" font-family="ShareTechMono" font-size="44" letter-spacing="3"><text x="560" y="236">FINAL RE-CHECK;</text><text x="740" y="350">359D</text><text x="740" y="440">X4T FREQ.</text><text x="700" y="530">;GO</text></g>
      <g id="sb" transform="rotate(-.35 960 405)">${bars.map(() => '<rect/>').join('')}</g></svg>`;
    const rs = [...host.querySelectorAll('#sb rect')], tx = host.querySelector('#st');
    return {
      update(t) {   // t from 0 (783.5) to 1.6 (785.1)
        tx.style.opacity = t < .45 ? 1 : 0;
        const k = Math.max(0, (t - .45) / 1.15), top = 400 - 400 * Math.pow(k, .8), bot = 400 + 410 * Math.pow(k, .8);
        rs.forEach((r, i) => { const b = bars[i], y = top + b.y * (bot - top), vis = k > 0.02 && y >= top - 1 && y <= bot, bright = Math.min(1, ((y - 400) / 410 + .35) * (.4 + k)), g = 90 + 165 * Math.min(1, bright * 1.5 + .25) * (.55 + .45 * b.c);
          r.setAttribute('x', b.x0 - 5); r.setAttribute('width', 1930 - b.x0); r.setAttribute('y', y.toFixed(1)); r.setAttribute('height', (b.h * (.4 + k * 1.2)).toFixed(1)); r.setAttribute('fill', `rgb(${(g * .93) | 0},${(g * .97) | 0},${Math.min(255, g + 20) | 0})`); r.style.display = vis ? '' : 'none'; });
        host.firstChild.style.background = '#3e3b40';
      },
    };
  },
};

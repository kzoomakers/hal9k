// "Scene 63": a white wireframe craft on blue that tumbles and settles to a front view (video 755.4-765.4 s). It is a real 3D model:
// a big ring with cross hairs, two side rings on arms, a fuselage, a tail fin, a post and a base. Part sizes come from the front-view frame
// at the end (ring r=189 centred at (960,303); side rings r=73 at x +-259, y +135; base ~y 557-627). A camera (yaw/pitch/roll) is keyframed
// from the poses seen in the saved frames, and every part is re-projected each frame. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).craft = {
  mount(host) {
    const CX = 960, CY = 330, BG = '#2033a8';
    const circle = (cx, cy, cz, r, plane = 'xy', n = 48) => Array.from({ length: n + 1 }, (_, i) => { const a = i / n * Math.PI * 2, c = Math.cos(a) * r, s = Math.sin(a) * r; return plane === 'xy' ? [cx + c, cy + s, cz] : [cx + c, cy, cz + s]; });
    const seg = (...p) => p;
    const poly = (...p) => p.concat([p[0]]);
    const P = [  // [points, stroke width]
      [circle(0, 0, 0, 189), 2.6], [seg([-189, 0, 0], [189, 0, 0]), 1.6], [seg([0, -189, 0], [0, 189, 0]), 1.6], [circle(0, 0, 0, 189, 'xz'), 1.2], [circle(0, 0, 0, 189, 'yz' && 'xz').map(([x, y, z]) => [x, 0, z]), 0.01],
      [circle(-259, 135, 0, 73), 2.4], [seg([-332, 135, 0], [-186, 135, 0]), 1.6], [seg([-259, 62, 0], [-259, 208, 0]), 1.6],
      [circle(259, 135, 0, 73), 2.4], [seg([186, 135, 0], [332, 135, 0]), 1.6], [seg([259, 62, 0], [259, 208, 0]), 1.6],
      [circle(-259, 135, 0, 73, 'xz'), 1], [circle(259, 135, 0, 73, 'xz'), 1],
      [seg([-186, 135, 0], [-110, 135, 0], [-92, 105, 0], [-60, 100, 0]), 2.4], [seg([186, 135, 0], [110, 135, 0], [92, 105, 0], [60, 100, 0]), 2.4], [seg([-186, 143, 0], [-90, 143, 0]), 1.6], [seg([186, 143, 0], [90, 143, 0]), 1.6],
      [poly([-60, 100, 0], [-60, 60, 0], [-30, 40, 0], [-24, 0, 0], [24, 0, 0], [30, 40, 0], [60, 60, 0], [60, 100, 0]), 2.4],
      [poly([-6, -150, 0], [6, -150, 0], [24, 0, 0], [-24, 0, 0]), 2.4], [seg([0, -150, 0], [0, 0, 0]), 1.2], [poly([-6, -150, 0], [6, -150, 0], [6, -150, 14], [-6, -150, 14]), 1.2],
      [poly([-30, 100, 0], [30, 100, 0], [30, 255, 0], [-30, 255, 0]), 2.2], [circle(0, 255, 0, 62, 'xz', 40), 2.2], [circle(0, 255, 0, 40, 'xz', 40), 1.4],
      [poly([-42, 255, 0], [42, 255, 0], [52, 320, 0], [-52, 320, 0]), 2.2], [circle(0, 320, 0, 70, 'xz', 40), 1.6],
      [circle(-92, 70, 0, 40, 'xz', 24), 1], [circle(92, 70, 0, 40, 'xz', 24), 1]];
    // each flat part also gets a copy pushed back in depth so the turning shows thickness
    const DEPTH = 26, parts = P.filter(p => p[1] > .05).flatMap(([pts, w]) => [[pts, w], [pts.map(([x, y, z]) => [x, y, z - DEPTH]), w * .6]]);
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:${BG}"><g id="cf" fill="none" stroke="#fff" stroke-linejoin="round" stroke-linecap="round" style="filter:drop-shadow(0 0 3px #fff8)">${parts.map(([, w]) => `<path stroke-width="${w}"/>`).join('')}</g></svg>`;
    const els = [...host.querySelectorAll('#cf path')], root = host.querySelector('#cf');
    // keyframes: [seconds, yaw, pitch, roll] in degrees (read from the frames at 0, 1.2, 1.7, 2.1, 2.9, 4.6, 5.3, 5.1 ...)
    const K = [[0, 28, 24, 0], [.6, 36, 28, 0], [1.2, 48, 32, 10], [1.7, 40, 20, 56], [2.1, 0, 82, 0], [2.9, 0, 84, 0], [3.3, 150, 50, 30], [3.9, 100, 20, -20], [4.6, 90, 0, 0], [5.1, 20, 6, 0], [5.6, 0, 8, 0], [6.8, 0, 0, 0], [10, 0, 0, 0]];
    const at = t => { let i = 1; while (i < K.length - 1 && K[i][0] < t) i++; const a = K[i - 1], b = K[i], k = Math.min(1, Math.max(0, (t - a[0]) / (b[0] - a[0]))), e = k * k * (3 - 2 * k); return [1, 2, 3].map(j => a[j] + (b[j] - a[j]) * e); };
    const rot = (p, [yw, pt, rl]) => { const r = d => d * Math.PI / 180; let [x, y, z] = p;
      let c = Math.cos(r(yw)), s = Math.sin(r(yw)); [x, z] = [x * c + z * s, -x * s + z * c];
      c = Math.cos(r(pt)); s = Math.sin(r(pt)); [y, z] = [y * c - z * s, y * s + z * c];
      c = Math.cos(r(rl)); s = Math.sin(r(rl)); [x, y] = [x * c - y * s, x * s + y * c]; return [x, y]; };
    return {
      update(t) {
        const cam = at(t);
        parts.forEach(([pts], i) => { els[i].setAttribute('d', 'M' + pts.map(p => { const [x, y] = rot(p, cam); return `${(CX + x).toFixed(1)} ${(CY + y).toFixed(1)}`; }).join('L')); });
        root.style.opacity = t < .2 ? t / .2 : 1;
      },
    };
  },
};

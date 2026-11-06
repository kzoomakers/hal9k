// "Scene 29": a grey screen with three rings, a bold off-centre ellipse that drifts into place, spokes to labelled dots, a small ring
// at the centre, and the "POST:COMM.ST ---------- FLOW 96+" line with two number rows (video 405.3-414.7 s). Measured from the frames
// (centre (960,375); rings r=105, 142, 218); the early frames also show a white triangle beside the number rows. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).rings = {
  mount(host) {
    const OX = 610, CX = 960, CY = 375, L = '#e9e6ee';
    const dots = [['EP-I', 350, 265, 0, -10], ['IO', 455, 371, -18, 4], ['EU', 492, 371, -17, 4], ['XP', 513, 318, 8, -2], ['GA', 567, 363, -19, 5], ['EP', 256, 424, -14, 14], ['X-I', 312, 469, -12, 14], ['X-2', 470, 451, 14, 10], ['CA', 502, 530, -18, 4]];
    const d = dots.map(([s, x, y, lx, ly]) => `<circle cx="${x + OX}" cy="${y}" r="3.6" fill="#fff"/><text x="${x + OX + lx}" y="${y + ly}" ${lx < 0 && s !== 'EP-I' ? 'text-anchor="end"' : ''}>${s}</text>`).join('');
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#4a4550">
      <g fill="none" stroke="${L}" stroke-width="1.3"><circle cx="${CX}" cy="${CY}" r="218"/><circle cx="${CX + 2}" cy="${CY}" r="142"/><circle cx="${CX}" cy="${CY}" r="105"/>
        <path d="M${CX} ${CY}V265M${CX} ${CY}L${256 + OX} 424M${CX} ${CY}L${312 + OX} 469M${256 + OX} 424L${513 + OX} 318" stroke-width="1"/></g>
      <g id="re" style="filter:drop-shadow(0 0 4px #fff8)"><ellipse id="rel" cx="${373 + OX}" cy="355" rx="140" ry="127" transform="rotate(8 ${373 + OX} 355)" fill="none" stroke="#fff" stroke-width="3.2"/></g>
      <g style="filter:drop-shadow(0 0 4px #fff8)"><circle cx="${CX}" cy="${CY}" r="30" fill="none" stroke="#fff" stroke-width="3"/><circle cx="${CX}" cy="${CY}" r="7" fill="#fff"/></g>
      <g id="rd" fill="#fff" font-family="ShareTechMono" font-size="8" letter-spacing=".5">${d}</g>
      <g fill="#fff" font-family="ShareTechMono" style="filter:drop-shadow(0 0 3px #fff6)" font-weight="400"><text x="${68 + OX}" y="648" font-size="26" letter-spacing="2.6" textLength="564" lengthAdjust="spacing">POST:COMM.ST ---------- FLOW 96+</text>
        <text x="${352 + OX}" y="705" font-size="26" letter-spacing="3">645/290</text><text x="${352 + OX}" y="733" font-size="26" letter-spacing="3">095/529</text></g>
      <path id="rtr" d="M${321 + OX} 689L${321 + OX} 753L${373 + OX} 721Z" fill="#fff" style="filter:drop-shadow(0 0 4px #fff8)"/></svg>`;
    const $ = id => host.querySelector('#' + id);
    return {
      update(t) {
        // the ellipse starts to the left and swings over to its resting place by about 5.5 s
        const k = Math.min(1, Math.max(0, (t - 2.4) / 3)), e = k * k * (3 - 2 * k);
        $('rel').setAttribute('cx', 373 + OX - 128 * (1 - e)); $('rel').setAttribute('cy', 355 + 20 * (1 - e));
        $('rtr').style.opacity = t < 3.6 ? 1 : 0; $('rd').style.opacity = t < 2.4 ? .3 : 1;
      },
    };
  },
};

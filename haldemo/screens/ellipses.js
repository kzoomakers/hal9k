// "Scene 11": a navy diagram of overlapping orbits with a formula and a readout (video 179.7-211.6 s). Measured from the frames:
// one circle, two ellipses, one long arc, thin guide lines with four dots, then "Ø = 4 / 6(T)" and five readout lines. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).ellipses = {
  mount(host) {
    const X = 600, INK = '#fff';
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:#33385d"><g transform="translate(${X} 0)">
      <g id="eg" fill="none" stroke="${INK}" stroke-width="2.4" style="filter:drop-shadow(0 0 2px #fff6)">
        <circle cx="375" cy="192" r="105"/>
        <ellipse cx="409" cy="358" rx="62" ry="180" transform="rotate(-11 409 358)"/>
        <ellipse cx="432" cy="283" rx="124" ry="62" transform="rotate(46 432 283)"/>
        <path d="M130 238C200 150 360 110 440 190C520 280 470 520 380 600C340 640 290 670 240 688"/></g>
      <g id="el" fill="none" stroke="#c8cfee" stroke-width="1.2"><path d="M375 205H537M375 205V298M375 205L230 397M375 205L413 153M375 205L440 276"/></g>
      <g id="ed" fill="#fff"><circle cx="375" cy="205" r="3.5"/><circle cx="413" cy="153" r="3"/><circle cx="440" cy="276" r="3"/><circle cx="375" cy="298" r="3"/></g>
      <g id="et" fill="#fff" font-family="ShareTechMono" font-size="6.5" letter-spacing=".6"><text x="417" y="149">X-GS</text><text x="545" y="209" font-size="9">J-GS</text><text x="381" y="291">EP-1</text><text x="417" y="279">EP-2</text></g>
      <g id="ef" fill="#fff" font-family="ShareTechMono"><text x="90" y="545" font-size="40">Ø</text><text x="151" y="543" font-size="22">=</text><text x="243" y="529" font-size="22">4</text>
        <path d="M222 538H283" stroke="#fff" stroke-width="2"/><text x="221" y="564" font-size="22">6(T)</text></g>
      <g id="er" fill="#fff" font-family="ShareTechMono" font-size="11" letter-spacing=".9"><text x="538" y="591">ORBIT = .257269</text><text x="538" y="611">ACC.RTE 6.2I237</text><text x="538" y="631">EQU.DIS 652,I5I</text><text x="538" y="651">REM.DIS 986,057</text><text x="538" y="666">FUNCTION REM PA</text></g></g></svg>`;
    const $ = id => host.querySelector('#' + id), rows = [...$('er').children];
    const flick = (t, a) => t < a ? 0 : t < a + .5 ? (Math.floor((t - a) * 14) % 2 ? .3 : 1) : 1;
    return {
      update(t) {
        $('eg').style.opacity = $('el').style.opacity = $('ed').style.opacity = $('et').style.opacity = 1;
        $('ef').style.opacity = flick(t, 2);
        rows.forEach((r, i) => { r.style.opacity = flick(t, 2.3 + i * .15); });
      },
    };
  },
};

// "Scenes 32 and 34": the navy screen (video 424.3-431.1 s and 431.6-443 s). A typed top line, a number block that loads downward and a
// bottom line that blinks; then the whole cluster blinks and shrinks to the left while a bold line phases in above it, three
// coloured badges flicker in (E, K, G) and a cyan CHECK blinks. One module serves both slides: each mounts with p.t0 (its video start)
// and runs on the video clock. Positions measured from the frames; text is transcribed. t = seconds since the slide began.
(window.NATIVE = window.NATIVE || {}).navy = {
  mount(host, p = {}) {
    const T0 = p.t0 || 0, BG = '#0a1637';
    // the cluster is drawn at full size around its own origin and then scaled/moved as one
    host.innerHTML = `<svg viewBox="0 0 1920 810" preserveAspectRatio="xMidYMid meet" style="background:${BG}"><g font-family="Michroma">
      <g id="nc" transform="translate(836 250)"><g id="ntop" font-size="33" fill="#fff" style="filter:drop-shadow(0 0 4px #fff8)"><text x="0" y="0" textLength="258" lengthAdjust="spacingAndGlyphs">89—(01Y34</text></g>
        <g id="nbl" font-family="ShareTechMono" font-size="19" fill="#fff" letter-spacing="-1.2" style="filter:drop-shadow(0 0 3px #fff6)">
          ${['336-61', 'R61-259.', '605,371 &amp; 619,000.', '1,293,384.', '3,131106.', '906,934.  S. 2,558,803.'].map((s, i) => `<text x="4" y="${46 + i * 27}">${s}</text>`).join('')}</g>
        <g id="nbt" fill="#fff" style="filter:drop-shadow(0 0 4px #fff8)"><text x="-36" y="222" font-size="30">BII+M</text><text x="66" y="232" font-size="36">223</text><text x="176" y="215" font-size="27">6</text><text x="176" y="241" font-size="27">5</text></g></g>
      <g id="nbig" fill="#fff" font-weight="900" stroke="#fff" stroke-width="2.5" style="filter:drop-shadow(0 0 5px #fff9)"><text x="656" y="132" font-size="44" textLength="44" lengthAdjust="spacingAndGlyphs">9</text><text x="705" y="120" font-size="40" textLength="40" lengthAdjust="spacingAndGlyphs">8</text><text x="752" y="132" font-size="44" textLength="90" lengthAdjust="spacingAndGlyphs">6X</text><text x="858" y="112" font-size="38" textLength="36" lengthAdjust="spacingAndGlyphs">5</text><text x="858" y="148" font-size="38" textLength="36" lengthAdjust="spacingAndGlyphs">2</text><text x="906" y="132" font-size="44" textLength="130" lengthAdjust="spacingAndGlyphs">KFG</text><text x="1040" y="100" font-size="14" textLength="22" lengthAdjust="spacingAndGlyphs">43</text><text x="1064" y="132" font-size="44" textLength="172" lengthAdjust="spacingAndGlyphs">43-71</text></g>
      <g id="nbd" font-weight="900" stroke="#0a1637" stroke-width="2.5" style="filter:drop-shadow(0 0 5px #fff8)">
        <rect id="nbE" x="1144" y="217" width="90" height="54" rx="3" fill="#6ff4f6"/><text x="1160" y="258" font-size="34" fill="#0a1637">E</text>
        <rect id="nbK" x="1144" y="333" width="90" height="54" rx="3" fill="#f7ee6c"/><text x="1160" y="374" font-size="34" fill="#0a1637">K</text>
        <rect id="nbG" x="1144" y="451" width="90" height="54" rx="3" fill="#fff"/><text x="1160" y="492" font-size="34" fill="#0a1637">G</text></g>
      <g id="nck" style="filter:drop-shadow(0 0 5px #6ff4f6)"><rect x="967" y="626" width="297" height="58" rx="3" fill="#6ff4f6"/><text x="990" y="670" font-size="38" fill="#0a1637" stroke="#0a1637" stroke-width="3" textLength="250" lengthAdjust="spacingAndGlyphs">CHECK</text></g></g></svg>`;
    const $ = id => host.querySelector('#' + id), rows = [...$('nbl').children];
    const bl = (t, hz = 8) => Math.floor(t * hz) % 2 === 0;           // on/off blinking
    const ease = k => k * k * (3 - 2 * k), clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    return {
      update(t0) {
        const T = t0 + T0;
        // phase 1 (424.3-431.1): type, load, blink
        const type = clamp((T - 424.3) / 1.3);
        $('ntop').style.clipPath = `inset(0 ${(1 - type) * 100}% 0 0)`;
        const load = clamp((T - 425.6) / 1.5);
        $('nbl').style.clipPath = `inset(0 0 ${(1 - load) * 100}% 0)`;
        $('nbt').style.opacity = T < 427.2 ? 0 : (T < 429.2 ? (bl(T - 427.2, 6) ? 1 : 0) : 1);
        const whole = T >= 429.2 && T < 431.1 ? (bl(T, 7) ? 1 : 0.15) : 1;
        // phase 2 (431.6-): the cluster shrinks left/up to its resting place, which is scale .61 about (856,284)
        const k = ease(clamp((T - 431.6) / 3.2)), sc = 1 - .39 * k;
        $('nc').setAttribute('transform', `translate(${836 + 20 * k} ${250 + 34 * k}) scale(${sc})`);
        $('nc').style.opacity = whole;
        const big = clamp((T - 434.6) / 1.6);                          // the bold line phases in, letter by letter in effect
        $('nbig').style.opacity = T < 434.6 ? 0 : big * (bl(T - 434.6, 14) || big > .8 ? 1 : .4);
        const bad = (a, id) => { $(id).style.display = T < a ? 'none' : ''; $(id).style.opacity = T < a + .6 ? (bl(T - a, 16) ? 1 : .3) : 1; };
        [['nbE', 436.2], ['nbK', 437.4], ['nbG', 438.6]].forEach(([id, a]) => { const on = T >= a, o = on ? (T < a + 1 ? (bl(T - a, 14) ? 1 : .2) : 1) : 0; [$(id), $(id).nextSibling].forEach(e => e.style.opacity = o); });
        $('nck').style.opacity = T < 440 ? 0 : (bl(T - 440, 5) ? 1 : 0.15);
      },
    };
  },
};

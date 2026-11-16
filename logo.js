/* Chronicle AI - animated robot logo.
   Ball path, hits and the words Reliable / Fast / Affordable copied from the
   reference video, then the robot pops out, slides left and the name wipes in.
   Words shake right after each ball hit. Plays once (about 5.6s) and then stays.
   Self-contained: injects its own CSS. */
(function () {
  'use strict';

  var T = 4.6; /* total seconds */
  var O = -0.8; /* the robot pops just before the last ball hit */
  function P(t) { return (t / T * 100).toFixed(3) + '%'; }
  function KF(name, steps) {
    var s = '@keyframes ' + name + '{';
    for (var i = 0; i < steps.length; i++) s += P(steps[i][0]) + '{' + steps[i][1] + '}';
    return s + '}';
  }

  var SH = 'translateX(var(--cl-shift,60px))';
  var OUT = 'cubic-bezier(.05,.7,.2,1)';   /* fast launch, soft landing */
  var IN = 'cubic-bezier(.6,0,.9,.6)';     /* slow start, fast hit */
  function BT(x, y, r, sx, sy, ease) {
    return 'transform:translate(' + x + 'px,' + y + 'px) rotate(' + r + 'deg) scale(' + sx + ',' + sy + ')' + (ease ? ';animation-timing-function:' + ease : '');
  }
  var WT = 'translate(-50%,-50%)';
  /* shake: quick decaying left-right jitter (with a little tilt) right after a ball hit.
     Returns keyframe steps starting at time t0, one every 'dt' seconds. */
  var SHK = [7, -6.5, 5.5, -4.5, 3.5, -2.5, 1.5, -0.7];
  function SHAKE(t0, dt, sq, y0) {
    var o = [];
    for (var i = 0; i < SHK.length; i++) {
      var y = i === 0 && y0 ? 'calc(-50% + ' + y0 + 'px)' : '-50%';
      var sc = i === 0 && sq ? sq : '1,1';
      o.push([t0 + i * dt, 'opacity:1;transform:translate(calc(-50% + ' + SHK[i] + 'px),' + y + ') rotate(' + (SHK[i] * .5).toFixed(2) + 'deg) scale(' + sc + ')']);
    }
    return o;
  }

  /* ball: drops from the top, hits the middle (Reliable), up-right and back (Fast),
     down-right and back (Affordable), down-left and back, then swells and the head pops out */
  var DOT = KF('cl-dot', [
    [0, 'opacity:0;' + BT(0, -110, 90, 1, 1)],
    [0.17, 'opacity:0;' + BT(0, -110, 90, 1, 1)],
    [0.20, 'opacity:1;' + BT(0, -95, 90, 2.2, .6, 'linear')],
    [0.26, 'opacity:1;' + BT(0, 0, 90, 2.2, .6)],
    [0.27, 'opacity:1;' + BT(0, 0, -38.2, 2.4, .6, OUT)],
    [0.68, 'opacity:1;' + BT(94, -74, -38.2, 1, 1)],
    [0.78, 'opacity:1;' + BT(94, -74, -38.2, 1, 1, IN)],
    [0.915, 'opacity:1;' + BT(0, 0, -38.2, 2.4, .6)],
    [0.925, 'opacity:1;' + BT(0, 0, 53.6, 2.4, .6, OUT)],
    [1.25, 'opacity:1;' + BT(90, 122, 53.6, 1, 1)],
    [1.35, 'opacity:1;' + BT(90, 122, 53.6, 1, 1, IN)],
    [1.44, 'opacity:1;' + BT(0, 0, 53.6, 2.6, .55)],
    [1.45, 'opacity:1;' + BT(0, 0, -49.4, 2.4, .6, OUT)],
    [1.88, 'opacity:1;' + BT(-79, 92, -49.4, 1, 1)],
    [1.98, 'opacity:1;' + BT(-79, 92, -49.4, 1, 1, IN)],
    [2.06, 'opacity:1;' + BT(0, 0, -49.4, 1.8, .7)],
    [2.065, 'opacity:1;' + BT(0, 0, 0, 1, 1)],
    [2.07, 'opacity:0;' + BT(0, 0, 0, 1, 1)],
    [T, 'opacity:0;' + BT(0, 0, 0, 1, 1)]
  ]);

  var W1 = KF('cl-w1', [
    [0, 'opacity:0;transform:' + WT + ' scale(1.2,.8)'],
    [0.265, 'opacity:0;transform:' + WT + ' scale(1.2,.8)']
  ].concat(SHAKE(0.30, 0.035, '1.05,.95'), [
    [0.93, 'opacity:1;transform:' + WT + ' scale(1,1)'],
    [0.97, 'opacity:0;transform:' + WT + ' scale(1,.05)'],
    [T, 'opacity:0;transform:' + WT + ' scale(1,.05)']
  ]));

  /* "Fast" copied from the reference, frame by frame (30fps):
     it builds from the left and right edges toward the middle, then two thin lines sweep left to right,
     one above the word and one below it (the lower one starts a little later), and vanish */
  var W2 = KF('cl-w2', [
    [0, 'opacity:0;transform:' + WT + ' scale(1,1)'],
    [0.975, 'opacity:0;transform:' + WT + ' scale(1,1)']
  ].concat(SHAKE(0.98, 0.035), [
    [1.47, 'opacity:1;transform:' + WT + ' scale(1,1)'],
    [1.483, 'opacity:0;transform:' + WT + ' scale(1,1)'],
    [T, 'opacity:0;transform:' + WT + ' scale(1,1)']
  ]));
  function CI(l, r) { return 'clip-path:inset(0 ' + r + '% 0 ' + l + '%)'; }
  var FL = KF('cl-fl', [
    [0, 'clip-path:inset(0 100% 0 0)'], [0.983, 'clip-path:inset(0 100% 0 0)'],
    [1.017, 'clip-path:inset(0 70% 0 0)'], [1.05, 'clip-path:inset(0 45% 0 0)'],
    [1.083, 'clip-path:inset(-30% -20% -30% -20%)'], [T, 'clip-path:inset(-30% -20% -30% -20%)']
  ]);
  var FR = KF('cl-fr', [
    [0, 'opacity:0;clip-path:inset(0 0 0 100%)'], [0.975, 'opacity:0;clip-path:inset(0 0 0 100%)'],
    [0.983, 'opacity:1;clip-path:inset(0 0 0 90%)'], [1.017, 'opacity:1;clip-path:inset(0 0 0 88%)'],
    [1.05, 'opacity:1;clip-path:inset(0 0 0 78%)'], [1.083, 'opacity:1;clip-path:inset(0 0 0 78%)'],
    [1.087, 'opacity:0;clip-path:inset(0 0 0 78%)'], [T, 'opacity:0;clip-path:inset(0 0 0 78%)']
  ]);
  var BTOP = KF('cl-bt', [
    [0, 'opacity:0;' + CI(35, 44)], [1.133, 'opacity:0;' + CI(35, 44)],
    [1.15, 'opacity:1;' + CI(35, 44)], [1.183, 'opacity:1;' + CI(33.25, 44.5)],
    [1.217, 'opacity:1;' + CI(36.75, 34)], [1.25, 'opacity:1;' + CI(53.25, 19)],
    [1.283, 'opacity:1;' + CI(68.5, 20)], [1.30, 'opacity:0;' + CI(70, 20)],
    [T, 'opacity:0;' + CI(70, 20)]
  ]);
  var BBOT = KF('cl-bb', [
    [0, 'opacity:0;' + CI(3.25, 67.5)], [1.2, 'opacity:0;' + CI(3.25, 67.5)],
    [1.217, 'opacity:1;' + CI(3.25, 67.5)], [1.25, 'opacity:1;' + CI(3.25, 67.5)],
    [1.283, 'opacity:1;' + CI(8, 46)], [1.317, 'opacity:1;' + CI(34, 22)],
    [1.35, 'opacity:1;' + CI(60, 19)], [1.37, 'opacity:0;' + CI(62, 19)],
    [T, 'opacity:0;' + CI(62, 19)]
  ]);

  var W3 = KF('cl-w3', [
    [0, 'opacity:0;transform:' + WT + ' scale(1,1)'],
    [1.46, 'opacity:0;transform:' + WT + ' scale(1,1)']
  ].concat(SHAKE(1.48, 0.04, null, 7), [
    [1.92, 'opacity:1;transform:' + WT + ' scale(1,1)'],
    [2.1, 'opacity:0;transform:' + WT + ' scale(1.5,1.5)'],
    [T, 'opacity:0;transform:' + WT + ' scale(1.5,1.5)']
  ]));

  var ROBOT = KF('cl-robot', [
    [0, 'transform:' + SH + ' scale(.42)'],
    [2.752+O, 'transform:' + SH + ' scale(.42);animation-timing-function:cubic-bezier(.3,.7,.3,1)'],
    [2.944+O, 'transform:' + SH + ' scale(1.12);animation-timing-function:ease-in-out'],
    [3.104+O, 'transform:' + SH + ' scale(.98);animation-timing-function:ease-in-out'],
    [3.232+O, 'transform:' + SH + ' scale(1);animation-timing-function:cubic-bezier(.45,0,.2,1)'],
    [3.699+O, 'transform:' + SH + ' scale(1);animation-timing-function:cubic-bezier(.45,0,.2,1)'],
    [4.192+O, 'transform:translateX(0) scale(1)'],
    [T, 'transform:translateX(0) scale(1)']
  ]);
  var EYE = KF('cl-eyei', [
    [0, 'transform:scale(0)'], [2.752+O, 'transform:scale(0)'], [2.944+O, 'transform:scale(1.15)'],
    [3.104+O, 'transform:scale(1)'], [4.96+O, 'transform:scale(1)'], [5.056+O, 'transform:scale(1,.1)'],
    [5.152+O, 'transform:scale(1)'], [T, 'transform:scale(1)']
  ]);
  var EAR = function (n) {
    return KF(n, [
      [0, 'opacity:0;transform:scale(0)'], [2.752+O, 'opacity:0;transform:scale(0)'],
      [2.944+O, 'opacity:1;transform:scale(1.2)'], [3.104+O, 'opacity:1;transform:scale(1) rotate(0)'],
      [T, 'opacity:1;transform:scale(1) rotate(0)']
    ]);
  };
  var BODY = KF('cl-body', [
    [0, 'opacity:0;transform:scale(1)'], [2.752+O, 'opacity:0;transform:scale(1)'],
    [2.88+O, 'opacity:.5;transform:scale(1)'], [3.04+O, 'opacity:.85;transform:scale(1)'],
    [3.232+O, 'opacity:1;transform:scale(1)'], [T, 'opacity:1;transform:scale(1)']
  ]);
  var MOUTH = KF('cl-mouth', [
    [0, 'opacity:0;transform:scale(1)'], [2.848+O, 'opacity:0;transform:scale(1)'],
    [3.168+O, 'opacity:1;transform:scale(1)'], [T, 'opacity:1;transform:scale(1)']
  ]);
  var SIDE = KF('cl-side', [
    [0, 'transform:translate(0,0)'],
    [3.699+O, 'transform:translate(0,0);animation-timing-function:cubic-bezier(.45,0,.2,1)'],
    [4.192+O, 'transform:translate(9.5px,0)'], [T, 'transform:translate(9.5px,0)']
  ]);

  var A = T + 's linear 1 both';
  var TS = 3.7 + O; /* the name starts here (same wipe as before) */

  var CSS = [
    '.brand h1,.brand .logo{display:none!important}',
    '.cl-wrap{position:relative;--cl-dx:calc(var(--cl-shift,60px) + var(--cl-robot) / 2);--cl-robot:54px;--cl-font:clamp(30px,9vw,40px);display:flex;align-items:center;--cl-gap:10px;gap:var(--cl-gap);margin:0 0 8px;color:#fff;line-height:1;pointer-events:none;overflow-x:clip}',
    '@media (min-width:700px){.cl-wrap{--cl-robot:66px;--cl-font:56px;--cl-gap:14px}}',
    '.cl-robot{will-change:transform;width:var(--cl-robot);height:var(--cl-robot);flex:none;position:relative;z-index:2;transform-origin:center;animation:cl-robot ' + T + 's ease-in-out 1 both}',
    '.cl-robot svg{width:100%;height:100%;display:block;overflow:visible}',
    '.cl-robot g,.cl-robot ellipse,.cl-robot path{transform-box:fill-box;transform-origin:center}',
    '.cl-word{position:absolute;z-index:1;left:calc(var(--cl-shift,60px) + var(--cl-robot) / 2);top:50%;font:700 calc(var(--cl-font) * .5)/1 "Helvetica Neue",Arial,sans-serif;color:#fff;white-space:nowrap;opacity:0;pointer-events:none;will-change:transform,opacity}',
    '.cl-w1{animation:cl-w1 ' + A + '}',
    '.cl-w2{animation:cl-w2 ' + A + '}',
    '.cl-w3{animation:cl-w3 ' + A + '}',
    '.cl-fl{display:block;clip-path:inset(0 100% 0 0);animation:cl-fl ' + A + '}',
    '.cl-fr{position:absolute;left:0;top:0;white-space:nowrap;opacity:0;clip-path:inset(0 0 0 100%);animation:cl-fr ' + A + '}',
    '.cl-bt,.cl-bb{position:absolute;left:-50%;width:200%;height:.1em;min-height:2px;background:#fff;opacity:0;clip-path:inset(0 100% 0 0)}',
    '.cl-bt{top:-.26em;animation:cl-bt ' + A + '}',
    '.cl-bb{top:1.16em;animation:cl-bb ' + A + '}',
    '.cl-dot{position:absolute;z-index:1;left:calc(var(--cl-shift,60px) + var(--cl-robot) / 2 - 13px);top:50%;width:26px;height:26px;margin-top:-13px;border-radius:50%;background:#fff;pointer-events:none;will-change:transform,opacity;opacity:0;animation:cl-dot ' + A + '}',
    '.cl-body{animation:cl-body ' + T + 's ease-in-out 1 both}',
    '.cl-earl{animation:cl-earl ' + T + 's ease-in-out 1 both}',
    '.cl-earr{animation:cl-earr ' + T + 's ease-in-out 1 both}',
    '.cl-side{animation:cl-side ' + T + 's ease-in-out 1 both}',
    '.cl-look{animation:cl-look ' + T + 's ease-in-out 1 both}',
    '.cl-e{animation:cl-eyei ' + T + 's ease-in-out 1 both}',
    '.cl-mouth{animation:cl-mouth ' + T + 's ease-in-out 1 both}',

    /* the name starts hidden behind the robot and fades in as the robot slides back (the name's own animation is unchanged) */
    '.cl-hide{display:inline-block;will-change:transform,opacity;animation:cl-out .493s cubic-bezier(.45,0,.2,1) ' + TS + 's 1 both}',
    '.cl-name{display:inline-block;font-family:Anton,Impact,"Arial Narrow",sans-serif;font-weight:400;font-size:var(--cl-font);letter-spacing:-.02em;white-space:nowrap;transform-origin:0 50%;animation:cl-wipe 1.1s cubic-bezier(.3,.7,.3,1) ' + TS + 's 1 both,cl-stretch 1.1s ease-in-out ' + TS + 's 1 both}',
    '.cl-l{display:inline-block;white-space:pre;transform-origin:50% 60%;animation:cl-let .9s linear calc(' + TS + 's + var(--i) * .05s) 1 both}',

    ROBOT, EYE,
    '@keyframes cl-look{0%,100%{transform:translate(0,0)}}',
    EAR('cl-earl'), EAR('cl-earr'),
    DOT, W1, W2, W3, FL, FR, BTOP, BBOT, BODY, MOUTH, SIDE,

    '@keyframes cl-out{0%{opacity:0;transform:translateX(calc(var(--cl-shift,60px) - var(--cl-robot,54px) / 2 - var(--cl-gap,10px)))}100%{opacity:1;transform:translateX(0)}}',

    /* text is revealed by a plain left-to-right wipe (no fade) */
    '@keyframes cl-wipe{0%{clip-path:inset(-30% 100% -30% -10%)}100%{clip-path:inset(-30% -45% -30% -10%)}}',

    /* stretch (from the FedEx reference): the word starts small and squeezed, grows, stretches a bit too tall, then settles */
    '@keyframes cl-stretch{0%{transform:scale(.6,.5)}12%{transform:scale(.7,.6)}58%{transform:scale(1.08,1.17)}80%{transform:scale(.98,.96)}100%{transform:scale(1,1)}}',

    /* each letter (solid, no fade): slanted and spread out, then squeezes tight (letters overlap), straightens and settles */
    '@keyframes cl-let{' +
      '0%{transform:translateX(calc(var(--i) * .22em)) skewX(-22deg) rotate(0)}' +
      '18%{transform:translateX(calc(var(--i) * .19em)) skewX(-22deg) rotate(0)}' +
      '40%{transform:translateX(calc(var(--i) * .1em)) skewX(-16deg) rotate(calc(var(--r) * 1deg))}' +
      '62%{transform:translateX(calc(var(--i) * -.05em)) skewX(6deg) rotate(calc(var(--r) * -.5deg))}' +
      '80%{transform:translateX(calc(var(--i) * .015em)) skewX(-3deg) rotate(calc(var(--r) * .2deg))}' +
      '100%{transform:translateX(0) skewX(0) rotate(0)}}'
  ].join('');

  function rr(x, y, w, h, r) {
    return 'M' + (x + r) + ' ' + y + 'H' + (x + w - r) +
      'A' + r + ' ' + r + ' 0 0 1 ' + (x + w) + ' ' + (y + r) +
      'V' + (y + h - r) +
      'A' + r + ' ' + r + ' 0 0 1 ' + (x + w - r) + ' ' + (y + h) +
      'H' + (x + r) +
      'A' + r + ' ' + r + ' 0 0 1 ' + x + ' ' + (y + h - r) +
      'V' + (y + r) +
      'A' + r + ' ' + r + ' 0 0 1 ' + (x + r) + ' ' + y + 'Z';
  }

  var ROT = [0, -6, 8, -10, 6, -8, 10, -6, 6, 0, 8, -4];
  var LETTERS = (function () {
    var t = 'Chronicle Ai', o = '';
    for (var i = 0; i < t.length; i++) {
      o += '<span class="cl-l" style="--i:' + i + ';--r:' + ROT[i] + '">' + (t.charAt(i) === ' ' ? '&nbsp;' : t.charAt(i)) + '</span>';
    }
    return o;
  })();

  var SCREEN = 'M38 37H82Q100.5 37 100.5 55V70Q100.5 80 90 80Q60 74 30 80Q19.5 80 19.5 70V55Q19.5 37 38 37Z';
  var HTML =
    '<span class="cl-word cl-w1">Reliable</span>' +
    '<span class="cl-word cl-w2"><span class="cl-fl">Fast</span><span class="cl-fr">Fast</span><span class="cl-bt"></span><span class="cl-bb"></span></span>' +
    '<span class="cl-word cl-w3">Affordable</span>' +
    '<span class="cl-dot"></span>' +
    '<div class="cl-robot"><svg viewBox="0 0 120 108" aria-hidden="true">' +
    '<path class="cl-earl" fill="#fff" d="' + rr(6.5, 53.5, 15, 33, 7.5) + '"/>' +
    '<path class="cl-earr" fill="#fff" d="' + rr(98.5, 53.5, 15, 33, 7.5) + '"/>' +
    '<g class="cl-body" fill="#fff">' +
    '<circle cx="63" cy="12.3" r="8.3"/>' +
    '<rect x="60.4" y="18" width="5.2" height="13" rx="2.6"/>' +
    '<path fill-rule="evenodd" d="' + rr(13, 29, 94, 74, 30) + SCREEN + '"/>' +
    '</g>' +
    '<g class="cl-side"><g class="cl-look" fill="#fff">' +
    '<ellipse class="cl-e" cx="42.4" cy="56.8" rx="8.2" ry="10.4"/>' +
    '<ellipse class="cl-e" cx="77.6" cy="56.8" rx="8.2" ry="10.4"/>' +
    '<path class="cl-mouth" fill="#fff" d="M54.5 66.5Q60 77 65.5 66.5Q60 69.8 54.5 66.5Z"/>' +
    '</g></g>' +
    '</svg></div>' +
    '<span class="cl-hide"><span class="cl-name" aria-hidden="true">' + LETTERS + '</span></span>';

  function addStyle() {
    if (document.getElementById('cl-style')) return;
    var s = document.createElement('style');
    s.id = 'cl-style';
    s.appendChild(document.createTextNode(CSS));
    document.head.appendChild(s);
    if (!document.getElementById('cl-font')) {
      var l = document.createElement('link');
      l.id = 'cl-font';
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Anton&display=swap';
      document.head.appendChild(l);
    }
  }

  /* work out how far right the robot starts so it is centred over the finished logo */
  function measure(w) {
    var r = w.querySelector('.cl-robot');
    if (!r) return;
    var m = document.createElement('span');
    m.className = 'cl-name';
    m.textContent = 'Chronicle Ai';
    m.style.cssText = 'position:absolute;visibility:hidden;animation:none;clip-path:none';
    w.appendChild(m);
    var nw = m.offsetWidth;
    w.removeChild(m);
    var gap = parseFloat(getComputedStyle(w).columnGap) || 10;
    var R = r.offsetWidth;
    var total = R + gap + nw;
    w.style.setProperty('--cl-shift', Math.max(0, total / 2 - R / 2) + 'px');
  }

  function measureAll() {
    var ws = document.querySelectorAll('.cl-wrap');
    for (var i = 0; i < ws.length; i++) measure(ws[i]);
  }

  function mount() {
    addStyle();
    var brands = document.querySelectorAll('.brand');
    for (var i = 0; i < brands.length; i++) {
      var b = brands[i];
      if (b.querySelector('.cl-wrap')) continue;
      var w = document.createElement('div');
      w.className = 'cl-wrap';
      w.setAttribute('role', 'img');
      w.setAttribute('aria-label', 'Chronicle AI');
      w.innerHTML = HTML;
      b.insertBefore(w, b.firstChild);
      measure(w);
    }
  }

  var queued = false;
  function queue() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; mount(); });
  }

  function start() {
    mount();
    setTimeout(mount, 300);
    setTimeout(mount, 1200);
    if (document.fonts && document.fonts.load) {
      document.fonts.load('32px Anton').then(measureAll, function () {});
      document.fonts.ready.then(measureAll);
    }
    var t;
    window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(measureAll, 150); });
    if (window.MutationObserver) {
      new MutationObserver(queue).observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();


(function () {
  function init() {
    var h1 = document.querySelector('.brand h1');
    if (!h1 || document.getElementById('cbot')) return;

    var css = document.createElement('style');
    css.textContent =
      '#cbot{display:inline-block;vertical-align:middle;height:1.7em;width:1.7em;margin:-.25em .45em 0 0;' +
      'animation:cb-loop 7s ease-in-out infinite;transform-origin:50% 60%}' +
      '#cbot .bot{transform-origin:50% 70%;transform-box:fill-box;animation:cb-tilt 7s ease-in-out infinite}' +
      '#cbot .eye{transform-box:fill-box;transform-origin:center}' +
      '#cbot .e1{animation:cb-blink 7s infinite,cb-drift 7s ease-in-out infinite}' +
      '#cbot .e2{animation:cb-blink 7s infinite,cb-drift 7s ease-in-out infinite,cb-wink 7s infinite}' +
      '#cbot .ant{animation:cb-glow 1.6s ease-in-out infinite}' +
      '@keyframes cb-loop{0%{transform:scale(1.5);opacity:0}10%{transform:scale(1);opacity:1}90%{transform:scale(1);opacity:1}100%{transform:scale(1);opacity:0}}' +
      '@keyframes cb-tilt{0%,58%{transform:rotate(0)}64%,74%{transform:rotate(-9deg)}82%,100%{transform:rotate(0)}}' +
      '@keyframes cb-blink{0%,18%,22%,40%,44%,100%{transform:scaleY(1)}20%,42%{transform:scaleY(.1)}}' +
      '@keyframes cb-drift{0%,25%{translate:0 0}32%,45%{translate:1.2px 0}55%,100%{translate:0 0}}' +
      '@keyframes cb-wink{0%,60%{transform:scaleY(1)}64%,74%{transform:scaleY(.1)}78%,100%{transform:scaleY(1)}}' +
      '@keyframes cb-glow{0%,100%{opacity:.5}50%{opacity:1}}';
    document.head.appendChild(css);

    var wrap = document.createElement('span');
    wrap.id = 'cbot';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML =
      '<svg viewBox="0 0 64 64" width="100%" height="100%">' +
      '<g class="bot">' +
      '<line x1="34" y1="8" x2="34" y2="16" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' +
      '<circle class="ant" cx="34" cy="7" r="3.2" fill="#fff"/>' +
      '<rect x="10" y="16" width="44" height="36" rx="14" fill="#fff"/>' +
      '<rect x="5" y="28" width="7" height="12" rx="3.5" fill="#fff"/>' +
      '<rect x="26" y="25" width="26" height="18" rx="9" fill="#0a3cf0"/>' +
      '<ellipse class="eye e1" cx="35" cy="34" rx="2.6" ry="3.6" fill="#fff"/>' +
      '<ellipse class="eye e2" cx="45" cy="34" rx="2.6" ry="3.6" fill="#fff"/>' +
      '</g></svg>';

    h1.insertBefore(wrap, h1.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

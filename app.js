const screen = document.getElementById('screen');
const reveal = document.getElementById('reveal');
let timers = [];
function later(fn, ms){ timers.push(setTimeout(fn, ms)); }

const SOC = [
 ['Google','#ea4335',106,'<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.5 5.5 0 0 1-2.4 3.62v3h3.87c2.27-2.09 3.58-5.17 3.58-8.81z"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.87-3c-1.07.72-2.45 1.15-4.08 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.37-2.28v-3.1H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.38l4-3.1z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.62l4 3.1C6.22 6.86 8.87 4.75 12 4.75z"/></svg>'],
 ['Apple','#111',100,'<svg viewBox="0 0 24 24" fill="#111"><path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.5-3.7zM14.2 5.8c.6-.8 1.1-1.9.9-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3z"/></svg>'],
 ['Microsoft','#16a34a',128,'<svg viewBox="0 0 24 24"><path fill="#f25022" d="M2 2h9.5v9.5H2z"/><path fill="#7fba00" d="M12.5 2H22v9.5h-9.5z"/><path fill="#00a4ef" d="M2 12.5h9.5V22H2z"/><path fill="#ffb900" d="M12.5 12.5H22V22h-9.5z"/></svg>'],
 ['Facebook','#1877f2',118,'<svg viewBox="0 0 24 24" fill="#1877f2"><path d="M3 3h18v18h-6.2v-6.9h2.3l.4-2.8h-2.7V9.6c0-.8.3-1.4 1.4-1.4h1.4V5.7c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2.1H9.3v2.8h2.3V21H3z"/></svg>']
];
document.querySelectorAll('[data-socials]').forEach(box => {
  box.innerHTML = SOC.map(([n,c,w,svg]) => `<button class="soc" type="button" aria-label="Continue with ${n}" style="--c:${c};--w:${w}px">${svg}<span>${n}</span></button>`).join('');
});

function resetBusy(){ document.querySelectorAll('.login').forEach(b => b.classList.remove('busy')); }
function setMode(m){
  screen.classList.remove('mode-login','mode-signup');
  screen.classList.add('mode-' + m);
  resetBusy();
  document.querySelectorAll('.form').forEach(f => f.scrollTop = 0);
}
function play(){
  timers.forEach(clearTimeout); timers = [];
  screen.classList.remove('s1','s2');
  reveal.classList.remove('open');
  setMode('login');
  document.querySelectorAll('form').forEach(f => { f.reset(); f.querySelectorAll('.bad').forEach(x => x.classList.remove('bad')); });
  later(() => screen.classList.add('s1'), 1600);
  later(() => screen.classList.add('s2'), 2300);
}

document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => setMode(b.dataset.go)));
document.querySelectorAll('.eye').forEach(b => b.addEventListener('click', () => {
  const i = document.getElementById(b.dataset.for);
  const show = i.type === 'password';
  i.type = show ? 'text' : 'password';
  b.setAttribute('aria-pressed', show);
  b.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
}));
document.querySelectorAll('input').forEach(i => i.addEventListener('input', () => {
  (i.closest('.field') || i.closest('.agree'))?.classList.remove('bad');
}));

function mark(el, bad){ const w = el.closest('.field') || el.closest('.agree'); w.classList.toggle('bad', bad); return bad; }
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function submit(form, title, msg){
  const btn = form.querySelector('.login');
  btn.classList.add('busy');
  document.getElementById('rt').textContent = title;
  document.getElementById('rp').textContent = msg;
  later(() => { chat.classList.add('open'); if (!msgs.children.length) add('assistant', 'Hi! I’m Chronicle AI. How can I help? 😊'); }, 1300);
}
document.getElementById('lf').addEventListener('submit', e => {
  e.preventDefault();
  const em = document.getElementById('le'), pw = document.getElementById('lp');
  const bad = [mark(em, !emailOk(em.value.trim())), mark(pw, !pw.value)];
  if (bad.some(Boolean)) return;
  submit(e.target, 'You’re in', 'Welcome to Chronicle AI.');
});
document.getElementById('sf').addEventListener('submit', e => {
  e.preventDefault();
  const n = document.getElementById('sn'), em = document.getElementById('se'), p = document.getElementById('sp'), c = document.getElementById('sc'), a = document.getElementById('sa');
  const bad = [mark(n, !n.value.trim()), mark(em, !emailOk(em.value.trim())), mark(p, p.value.length < 8), mark(c, !c.value || c.value !== p.value), mark(a, !a.checked)];
  if (bad.some(Boolean)) return;
  submit(e.target, 'Account created', 'Welcome to Chronicle AI.');
});

const chat = document.getElementById('chat'), msgs = document.getElementById('msgs');
const convo = [];
function add(role, text){
  const d = document.createElement('div');
  d.className = 'm ' + role; d.textContent = text;
  msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; return d;
}
document.getElementById('again').addEventListener('click', () => {
  chat.classList.add('open');
  if (!msgs.children.length) add('assistant', 'Hi! I’m Chronicle AI. How can I help? 😊');
});
document.getElementById('cf').addEventListener('submit', async e => {
  e.preventDefault();
  const ci = document.getElementById('ci'), text = ci.value.trim();
  if (!text) return;
  ci.value = '';
  add('user', text); convo.push({role:'user', content:text});
  const wait = add('assistant', '…');
  try {
    const r = await fetch('/api/chat', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({messages: convo, model:'fast'})
    });
    const j = await r.json();
    const reply = j.reply || j.error || 'Something went wrong.';
    wait.textContent = reply;
    if (j.reply) convo.push({role:'assistant', content:reply});
  } catch { wait.textContent = 'Could not connect.'; }
  msgs.scrollTop = msgs.scrollHeight;
});
document.querySelectorAll('.field input').forEach(i => {
  const f = i.closest('.field'), m = document.createElement('div');
  m.className = 'mir'; f.appendChild(m); f.classList.add('has-mir');
  let n = 0, last = '';
  const draw = () => {
    const v = i.value, p = i.type === 'password'; last = v;
    m.innerHTML = '';
    [...v].forEach((c, k) => { const s = document.createElement('span'); s.textContent = p ? '\u2022' : c; if (k >= n) s.className = 'n'; m.appendChild(s); });
    n = v.length;
    f.classList.toggle('has-mir', m.scrollWidth <= m.clientWidth + 1);
  };
  i.addEventListener('input', draw);
  setInterval(() => { if (i.value !== last) draw(); }, 250);
  i.closest('form').addEventListener('reset', () => setTimeout(() => { n = 0; draw(); }, 0));
  new MutationObserver(() => { n = i.value.length; draw(); }).observe(i, {attributes:true, attributeFilter:['type']});
});
play();

(()=>{
const $=id=>document.getElementById(id);
document.head.append(Object.assign(document.createElement('link'),{rel:'stylesheet',href:'chat.css'}));
const P={menu:'M4 7h16M4 12h16M4 17h16',down:'m6 9 6 6 6-6',plus:'M12 5v14M5 12h14',smile:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8.5 14c1 1.4 2.2 2 3.5 2s2.5-.6 3.5-2M9 9.5h.01M15 9.5h.01',expand:'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',mic:'M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',wave:'M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4',send:'M21 3 10 14M21 3l-7 18-4-7-7-4z',bulb:'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.3 1 2.1h5c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3z',cap:'m2 9 10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5',chat:'M21 12a8 8 0 0 1-11.7 7L4 20l1.2-4.4A8 8 0 1 1 21 12z',code:'m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14',book:'M3 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3zM21 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z',image:'M6 4h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM21 16l-5-5-8 9M9 8.5h.01',pen:'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4',mail:'M6 5h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3zM4 7l8 6 8-6',cal:'M7 5h10a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3zM4 10h16M9 3v4M15 3v4',gym:'M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11',plane:'M2 12 22 4l-6 17-4-7z',spark:'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16v4M17 18h4',brief:'M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM9 7V5h6v2',check:'M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM8 12l3 3 5-6',copy:'M11 9h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zM5 15V6a2 2 0 0 1 2-2h8',like:'M7 11v9H4v-9zM7 11l4-7c1.5 0 2.5 1 2 3l-.5 3H19a2 2 0 0 1 2 2.3l-1 6A2 2 0 0 1 18 20H7',vol:'M4 10v4h4l5 4V6l-5 4zM16.5 9a4 4 0 0 1 0 6',share:'M6 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM18 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM18 15.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6',more:'M5 12h.01M12 12h.01M19 12h.01',out:'M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M15 8l4 4-4 4M19 12H9',help:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.4M12 17h.01',search:'M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM16 16l4 4',gear:'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8',pal:'M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a3 3 0 0 0 3-3c0-5-4-11-8-11zM8 11h.01M12 7.5h.01M16 11h.01',bell:'M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4',moon:'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z',incog:'M3 11h18M5 11l1.5-6h11L19 11M7 13a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17 13a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM9.5 15.5h5'};
const ic=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${P[n]}"/></svg>`;
const esc=s=>s.replace(/[&<>"]/g,c=>'&#'+c.charCodeAt(0)+';');
const chat=$('chat');
chat.innerHTML=`<div class="cx-top"><button type="button" class="cx-r" id="cxm" aria-label="Menu">${ic('menu')}</button><button type="button" class="cx-pill">CHRONICLE ${ic('down')}</button><button type="button" class="cx-r" aria-label="Private">${ic('incog')}</button></div>
<div class="cx-home"><div class="cx-logo">C</div><b>CHRONICLE</b></div>
<div class="msgs" id="msgs"></div>
<div class="cx-sug" id="cxs"></div>
<form class="cx-bar" id="cf"><button type="button" class="cx-i">${ic('plus')}</button><input id="ci" type="text" placeholder="Ask Chronicle" autocomplete="off"><button type="button" class="cx-i" id="cxe">${ic('smile')}</button><button type="button" class="cx-i">${ic('expand')}</button><i class="cx-d"></i><button type="button" class="cx-i" data-v>${ic('mic')}</button><button type="button" class="cx-v" data-v>${ic('wave')}Voice</button><button type="submit" class="cx-s" aria-label="Send">${ic('send')}</button></form>
<div class="cx-sh" id="cxsh"></div>
<aside class="cx-dr"><div class="cx-pf"><i class="cx-av">${ic('spark')}</i><div><span><b id="cxn">Chronicle User</b><span class="cx-free">FREE</span></span><small id="cxem"></small></div><button type="button" class="cx-i" id="cxo">${ic('out')}</button></div>
<button type="button" class="cx-new" id="cxnew">${ic('plus')}New Chat<kbd>⌘K</kbd></button>
<button type="button" class="cx-learn">${ic('help')}Learn Chronicle AI</button>
<div class="cx-se">${ic('search')}<input placeholder="Search anything..."><kbd>⌘F</kbd></div>
<div class="cx-hist" id="cxh"><p>No chats yet</p></div>
<div class="cx-plan"><b>FREE PLAN</b><span id="cxp">0%</span><small>Messages<em id="cxc">0/20</em></small></div>
<div class="cx-links"><button type="button">${ic('gear')}Settings</button><button type="button">${ic('pal')}Customize</button><button type="button">${ic('bell')}Alerts</button><button type="button">${ic('help')}Help</button></div>
<button type="button" class="cx-tg" id="cxtg"><span>${ic('moon')}<em id="cxt">Dark Mode</em></span><i></i></button></aside>`;
const msgs=$('msgs'),ci=$('ci'),cf=$('cf'),box=$('cxs');
const sync=()=>chat.classList.toggle('has',msgs.children.length>0);
new MutationObserver(sync).observe(msgs,{childList:true});
new MutationObserver(()=>{msgs.querySelectorAll('.m.assistant').forEach(d=>{if(d.dataset.a||d.textContent==='…')return;d.dataset.a=1;const a=document.createElement('div');a.className='cx-ac';a.innerHTML=['copy','like','like','vol','share','more'].map((n,i)=>`<button type="button" data-n="${i}" class="${i==2?'dn':''}">${ic(n)}</button>`).join('');d.after(a)})}).observe(msgs,{childList:true,subtree:true});
msgs.onclick=e=>{const b=e.target.closest('.cx-ac button');if(!b)return;const t=b.parentNode.previousElementSibling.textContent,n=+b.dataset.n;if(n==0)navigator.clipboard?.writeText(t);else if(n<3)b.classList.toggle('on');else if(n==3)speechSynthesis.speak(new SpeechSynthesisUtterance(t));else if(n==4&&navigator.share)navigator.share({text:t}).catch(()=>{})};
const sug=[['image','Create an image or sticker'],['pen','Write or edit'],['mail','Write an email'],['cal','Plan my day'],['gym','Create a workout plan'],['plane','Plan a trip'],['mic','Start a voice chat'],['smile','Tell me a joke'],['spark','Give me motivation'],['brief','Practice interview'],['check','Check my grammar'],['bulb','Brainstorm ideas'],['cap','Help with homework'],['chat','Explain like I’m 5'],['code','Help me code'],['book','Summarize text']];
box.innerHTML=sug.map(([s,t])=>`<button type="button" data-t="${t}">${ic(s)}${t}</button>`).join('');
box.onclick=e=>{const b=e.target.closest('button');if(b){ci.value=b.dataset.t;cf.requestSubmit()}};
let pos=0,pause=0;
['touchstart','wheel','pointerdown'].forEach(v=>box.addEventListener(v,()=>pause=Date.now()+6000,{passive:true}));
(function tick(){if(chat.classList.contains('open')&&!chat.classList.contains('has')&&!chat.classList.contains('kb')){const mx=box.scrollHeight-box.clientHeight;if(Date.now()<pause)pos=box.scrollTop;else{pos=pos>=mx?0:pos+.3;box.scrollTop=pos}}requestAnimationFrame(tick)})();
ci.addEventListener('input',()=>cf.classList.toggle('typing',!!ci.value.trim()));
ci.addEventListener('focus',()=>chat.classList.add('kb'));
ci.addEventListener('blur',()=>chat.classList.remove('kb'));
if(window.visualViewport){const f=()=>{chat.style.bottom=Math.max(0,innerHeight-visualViewport.height-visualViewport.offsetTop)+'px'};visualViewport.addEventListener('resize',f);visualViewport.addEventListener('scroll',f)}
let c=0;
cf.addEventListener('submit',()=>{if(ci.value.trim()){c++;$('cxc').textContent=c+'/20';$('cxp').textContent=c*5+'%'}setTimeout(()=>cf.classList.remove('typing'))},true);
document.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{const R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R)return;const r=new R();r.onresult=e=>{ci.value=e.results[0][0].transcript;ci.dispatchEvent(new Event('input'))};r.start()});
$('cxe').onclick=()=>{ci.value+='😊';ci.focus();ci.dispatchEvent(new Event('input'))};
$('cxm').onclick=()=>chat.classList.add('dr');
$('cxsh').onclick=()=>chat.classList.remove('dr');
$('cxo').onclick=()=>location.reload();
$('cxtg').onclick=()=>{chat.classList.toggle('light');$('cxt').textContent=chat.classList.contains('light')?'Light Mode':'Dark Mode'};
const hist=[];
$('cxnew').onclick=()=>{if(convo.length){hist.unshift([esc(convo[0].content.slice(0,40)),new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})]);$('cxh').innerHTML='<p>Recents</p>'+hist.map(h=>`<button type="button"><span>${h[0]}</span><small>${h[1]}</small></button>`).join('')}convo.length=0;msgs.innerHTML='';chat.classList.remove('dr')};
addEventListener('load',()=>$('again').addEventListener('click',()=>{msgs.innerHTML='';const g=id=>($(id)||{}).value||'',em=g('le')||g('se');$('cxn').textContent=g('sn')||em.split('@')[0]||'Chronicle User';$('cxem').textContent=em;sync()}));
})();

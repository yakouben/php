/**
 * JP et HP Consulting — Main JavaScript
 *
 * Exposed globals (used by inline handlers in index.html):
 *   toggleMenu(), closeMenu(), submitForm(event), switchTab(tab, btn)
 *
 * Sections:
 *   1. Mobile menu
 *   2. Contact form
 *   3. Scroll reveal (.fu) + nav scroll-spy
 *   4. Services dropdown (desktop)
 *   5. Expertise tabs
 *   6. Réalisations carousel
 */

'use strict';

/* ── 1. Mobile menu ───────────────────────────────────────────────────────── */
function setMenuOpen(open){
  const menu=document.getElementById('mobMenu');
  const overlay=document.getElementById('mobOverlay');
  const burger=document.getElementById('burgerBtn');
  if(!menu||!burger)return;
  menu.classList.toggle('open',open);
  overlay?.classList.toggle('is-open',open);
  document.body.classList.toggle('menu-open',open);
  burger.classList.toggle('is-open',open);
  burger.setAttribute('aria-expanded',open?'true':'false');
  burger.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');
  overlay?.setAttribute('aria-hidden',open?'false':'true');
}
function toggleMenu(){setMenuOpen(!document.getElementById('mobMenu')?.classList.contains('open'))}
function closeMenu(){setMenuOpen(false)}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
window.addEventListener('resize',()=>{if(window.innerWidth>=1024)closeMenu()});

/* ── 2. Contact form ──────────────────────────────────────────────────────── */
function submitForm(e){
  e.preventDefault();
  const f=e.target;
  if(['prenom','nom','email','societe'].some(n=>!f.elements[n].value.trim()))return;
  document.getElementById('form-ok').style.display='block';
  const b=f.querySelector('.form-btn');b.disabled=true;b.style.opacity='.6';
  setTimeout(()=>f.reset(),500);
}

/* ── 3. Scroll reveal + nav scroll-spy ────────────────────────────────────── */
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis')})},{threshold:.1});
document.querySelectorAll('.fu').forEach(el=>io.observe(el));

/* ── Nav scroll + scroll-spy ── */
const navbar=document.getElementById('navbar');
const navLinks=document.querySelectorAll('.nav-links a[data-nav], .nav-dropdown a[data-nav]');
const spySections=['hero','services','vision','sellin','sellout','digital','media','realisations','expertise','experts','marques','contact'];

window.addEventListener('scroll',()=>{
  navbar?.classList.toggle('scrolled',window.scrollY>40);
  const y=window.scrollY+120;
  let current='hero';
  for(const id of spySections){
    const el=document.getElementById(id);
    if(el&&el.offsetTop<=y)current=id;
  }
  navLinks.forEach(a=>{
    const on=a.getAttribute('data-nav')===current;
    a.classList.toggle('active',on);
    if(a.closest('.nav-dropdown')&&['sellin','sellout','digital','media','services'].includes(current)){
      document.getElementById('navDropBtn')?.classList.add('active');
    }else if(a.id==='navDropBtn'&&!['sellin','sellout','digital','media','services'].includes(current)){
      a.classList.remove('active');
    }
  });
});

/* ── 4. Services dropdown (desktop) ───────────────────────────────────────── */
const navServices=document.getElementById('navServices');
const navDropBtn=document.getElementById('navDropBtn');
navDropBtn?.addEventListener('click',e=>{
  e.stopPropagation();
  const open=navServices?.classList.toggle('open');
  navDropBtn.setAttribute('aria-expanded',open?'true':'false');
});
document.addEventListener('click',()=>{
  navServices?.classList.remove('open');
  navDropBtn?.setAttribute('aria-expanded','false');
});
document.querySelectorAll('.nav-dropdown a').forEach(a=>{
  a.addEventListener('click',()=>{
    navServices?.classList.remove('open');
    navDropBtn?.setAttribute('aria-expanded','false');
  });
});

/* ── 5. Expertise tabs ────────────────────────────────────────────────────── */
function switchTab(tab,btn){
  document.querySelectorAll('.exp-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
  document.querySelectorAll('.exp-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#tab-'+tab+' .fu').forEach(el=>{el.classList.remove('vis');io.observe(el)});
}

/* ── 6. Réalisations carousel ─────────────────────────────────────────────── */
const realSlides=[
  {
    center:'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80',
    left:'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80',
    right:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80',
    tags:['Sell-In','Sell-Out'],
    title:'Stratégie Commerciale 360° pour une Marque en Croissance',
    desc:'Une approche end-to-end — Sell-In pour implanter le réseau officinal, Sell-Out pour activer et fidéliser chaque point de vente sur tout le territoire.'
  },
  {
    center:'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80',
    left:'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&q=80',
    right:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80',
    tags:['Sell-In','Pharmacie'],
    title:'Implantation Nationale : +100 Agents Commerciaux',
    desc:'Couverture complète du territoire français — maillage officinal dense, gestion multiculturelle des marques et feuille de route adaptée à chaque enseigne.'
  },
  {
    center:'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80',
    left :'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80',
    right:'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80',
    tags:['Sell-Out','Formation'],
    title:'30 Conseillères Beauté Déployées en France',
    desc:'Animation point de vente, formation phygitale et protocoles de soin — développés par Isabelle Grasset (ex-Darphin) pour transformer chaque visite en vente et fidéliser durablement.'
  },
  {
    center:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    left:'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=700&q=80',
    right:'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&q=80',
    tags:['Digital','LSR Agence'],
    title:'Campagne UGC et Social Ads pour Marques Beauté',
    desc:'Construction de la présence digitale — Social Ads, UGC, e-réputation et CRM par LSR Agence, pour convertir votre audience en acheteurs fidèles.'
  }
];

let realIdx=0;
let realTimer=null;

function realRender(idx,animate){
  const s=realSlides[idx];
  const imgC=document.getElementById('real-img-center');
  const imgL=document.getElementById('real-img-left');
  const imgR=document.getElementById('real-img-right');
  const card=document.getElementById('real-card');
  const tagsEl=document.getElementById('real-tags');
  const titleEl=document.getElementById('real-title');
  const descEl=document.getElementById('real-desc');
  if(!imgC)return;

  if(animate){
    imgC.style.opacity='0';
    imgL.style.opacity='0';
    imgR.style.opacity='0';
    card.style.opacity='0';
    card.style.transform='translateY(14px)';
    setTimeout(()=>{
      imgC.src=s.center;imgL.src=s.left;imgR.src=s.right;
      tagsEl.innerHTML=s.tags.map(t=>`<span class="real-tag">${t}</span>`).join('');
      titleEl.textContent=s.title;
      descEl.textContent=s.desc;
      imgC.style.opacity='1';imgL.style.opacity='1';imgR.style.opacity='1';
      card.style.opacity='1';card.style.transform='translateY(0)';
    },360);
  }else{
    imgC.src=s.center;imgL.src=s.left;imgR.src=s.right;
    tagsEl.innerHTML=s.tags.map(t=>`<span class="real-tag">${t}</span>`).join('');
    titleEl.textContent=s.title;descEl.textContent=s.desc;
  }

  document.querySelectorAll('.real-dot').forEach((d,i)=>d.classList.toggle('active',i===idx));
}

function realGo(dir){
  realIdx=(realIdx+dir+realSlides.length)%realSlides.length;
  realRender(realIdx,true);
  realResetTimer();
}

function realResetTimer(){
  clearInterval(realTimer);
  realTimer=setInterval(()=>realGo(1),5200);
}

(function initReal(){
  const dotsEl=document.getElementById('real-dots');
  if(!dotsEl)return;
  realSlides.forEach((_,i)=>{
    const d=document.createElement('button');
    d.className='real-dot'+(i===0?' active':'');
    d.setAttribute('aria-label','Slide '+(i+1));
    d.addEventListener('click',()=>{realIdx=i;realRender(i,true);realResetTimer()});
    dotsEl.appendChild(d);
  });
  document.getElementById('real-prev')?.addEventListener('click',()=>realGo(-1));
  document.getElementById('real-next')?.addEventListener('click',()=>realGo(1));
  realResetTimer();
})();


/* Inline HTML handlers */
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.submitForm = submitForm;
window.switchTab = switchTab;

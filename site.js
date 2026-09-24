(() => {
  'use strict';
  const root=document.documentElement;
  const mq=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=mq.matches;
  const toggle=document.querySelector('.motion-toggle');
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('#navigation');
  const progress=document.querySelector('.reading-progress');
  const hero=document.querySelector('.hero');
  const heroImage=document.querySelector('.hero-image');
    let pending=[...document.querySelectorAll('.reveal')];
  function closeMenu(){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
  nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('is-open')){closeMenu();menu.focus();}});
  matchMedia('(min-width: 761px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
  function setMotion(){root.classList.toggle('motion-paused',paused);toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?toggle.dataset.resume:toggle.dataset.pause;frame();}
  toggle.addEventListener('click',()=>{paused=!paused;setMotion();});
  mq.addEventListener('change',e=>{paused=e.matches;setMotion();});
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const practices=[...document.querySelectorAll('.practice')];
  const compass=document.querySelector('.compass-art');
  let activePractice=-1;
  function updateCompass(vh){
    const centers=practices.map(el=>{const r=el.getBoundingClientRect();return r.top+r.height/2;});
    const focus=vh*(innerWidth<=760?.59:.5);
    const sectionProgress=clamp((focus-centers[0])/Math.max(1,centers[centers.length-1]-centers[0]),0,1);
    const active=centers.reduce((best,c,i)=>Math.abs(c-focus)<Math.abs(centers[best]-focus)?i:best,0);
    if(active!==activePractice){
      activePractice=active;
      compass.dataset.active=String(active);
      practices.forEach((el,i)=>el.classList.toggle('is-active',i===active));
    }
    compass.style.setProperty('--compass-angle',paused?'0deg':`${-35+sectionProgress*280}deg`);
    compass.style.setProperty('--orbit-angle',paused?'0deg':`${sectionProgress*85}deg`);
  }
  let scheduled=false;
  function frame(){
    scheduled=false;
    const y=window.scrollY, vh=window.innerHeight;
    updateCompass(vh);
    const max=document.documentElement.scrollHeight-vh;
    progress.style.transform=`scaleX(${max>0?y/max:0})`;
    pending=pending.filter(el=>{if(paused||el.getBoundingClientRect().top<vh-25){el.classList.add('is-visible');return false;}return true;});
    if(!paused&&innerWidth>760&&y<hero.offsetHeight){heroImage.style.transform=`translateY(${Math.min(y*.18,130)}px) scale(1.035)`;}
    if(paused||innerWidth<=760)heroImage.style.transform='none';
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(frame);}}
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
  root.classList.add('motion-ready');setMotion();
  if(document.fonts)document.fonts.ready.then(schedule);
  addEventListener('load',schedule,{once:true});
  const form=document.querySelector('.contact-form');
  const messages=JSON.parse(document.querySelector('#messages').textContent);
  const draftText=document.querySelector('#draft-text');
  const status=document.querySelector('#draft-status');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const values=['name','org','email','question'].map(id=>document.getElementById(id).value.trim());
    const body=values.map((v,i)=>`${messages.fields[i]}: ${v}`).join('\n\n');
    draftText.value=body;
    status.textContent=messages.draft;
    document.querySelector('#draft-result').hidden=false;
    location.href=`mailto:Office@leadra-sa.com?subject=${encodeURIComponent('Leadra — '+values[1])}&body=${encodeURIComponent(body)}`;
  });
  document.querySelector('.copy-draft').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(draftText.value);status.textContent=messages.copied;}
    catch{draftText.focus();draftText.select();status.textContent=messages.copyfail;}
  });
})();

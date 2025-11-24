// ui.js
document.addEventListener('DOMContentLoaded', function(){
  // page ready fade
  document.querySelectorAll('.page-fade').forEach(el=> requestAnimationFrame(()=> el.classList.add('page-ready')));

  // reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    const obs = new IntersectionObserver((entries, o)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('reveal-active'); o.unobserve(e.target); }
      });
    }, {threshold:0.18});
    reveals.forEach(r => obs.observe(r));
  } else reveals.forEach(r => r.classList.add('reveal-active'));

  // navbar shrink
  const nav = document.querySelector('.navbar');
  if(nav){
    const check = ()=> window.scrollY > 40 ? nav.classList.add('shrink') : nav.classList.remove('shrink');
    document.addEventListener('scroll', throttle(check,120));
    check();
  }

  // simple helper
  function throttle(fn, wait){ let last=0; return (...args)=>{ const now=Date.now(); if(now-last>=wait){ last=now; fn(...args); } } }
});

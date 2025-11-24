// theme.js
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem("tf_theme");
  if(saved === "dark") root.classList.add("dark");

  window.toggleTheme = function(){
    root.classList.add('theme-transition');
    clearTimeout(window._tTimer);
    window._tTimer = setTimeout(()=> root.classList.remove('theme-transition'), 500);
    if(root.classList.toggle('dark')) localStorage.setItem('tf_theme','dark');
    else localStorage.setItem('tf_theme','light');
  };

  // small transition CSS injection
  const s = document.createElement('style');
  s.textContent = `.theme-transition{transition:background .35s ease,color .35s ease}`;
  document.head.appendChild(s);
})();

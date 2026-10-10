// Theme switcher
function setTheme(theme) {
document.documentElement.setAttribute('data-theme', theme);
document.querySelectorAll('.switcher__btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-theme-target') === theme);
});

// Toggle nav brand text
document.querySelector('.terminal-only').style.display = theme === 'terminal' ? '' : 'none';
document.querySelector('.retro-only').style.display = theme === 'retro' ? '' : 'none';
document.querySelector('.blog-only').style.display = theme === 'blog' ? '' : 'none';

try { localStorage.setItem('mm_theme', theme); } catch(e) {}
}

//Attach click listeners once
document.querySelectorAll('.switcher__btn').forEach(function(btn){
    btn.addEventListern('click',function(){
        setTheme(btn.getAttribute('data-theme-target'));
    });
});

// Load saved theme
var saved = null;
try {
var saved = localStorage.getItem('mm_theme');
if (saved && ['terminal','retro','blog'].includes(saved)) setTheme(saved);
else setTheme('terminal');
} catch(e) { setTheme('terminal'); }

// Status rotation
var statuses = [
'open to internships &amp; freelance work',
'compiling curiosity',
'building on the cloud ☁️',
'reading, breaking, understanding',
'first year — long road ahead'
];
var statusEl = document.getElementById('statusText');
var si = 0;
var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (statusEl && !reduceMotion) {
statusEl.style.transition = 'opacity 0.25s ease';
setInterval(function() {
    si = (si + 1) % statuses.length;
    statusEl.style.opacity = 0;
    setTimeout(function() {
    statusEl.innerHTML = statuses[si];
    statusEl.style.opacity = 1;
    }, 250);
}, 3500);
}

// Scroll reveal
document.body.classList.add('js');
if (!reduceMotion && 'IntersectionObserver' in window) {
var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.will-reveal').forEach(function(t) { obs.observe(t); });
} else {
document.querySelectorAll('.will-reveal').forEach(function(t) { t.classList.add('revealed'); });
}

//big texts
document.getElementById('mini-intro').textContent = `Hi, I'm a human being. I am a programmer, I write code sometimes. I am also a college fresher. I wake up everyday, rush to college, sleep in class, get attendance, and work on my own project back in my room. I'm working on a big project of my own right now. And hi to this basic website of mine, here I'm going to post things about myself.`;
const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
  });
  (function animRing() {
    ringX += (mouseX - ringX) * 0.13; ringY += (mouseY - ringY) * 0.13;
    ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
    requestAnimationFrame(animRing);
  })();
  document.querySelectorAll('a, button, .skill-card, .project-card, .contact-link, .resource-item, .tag, .about-img-frame').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));


  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  function getThemeColor() {
    return document.documentElement.getAttribute('data-theme') !== 'light'
      ? ['rgba(79,255,176,','rgba(123,97,255,']
      : ['rgba(0,196,122,','rgba(98,70,234,'];
  }
  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random()*W; this.y = init ? Math.random()*H : H+10;
      this.vx = (Math.random()-.5)*.3; this.vy = -(Math.random()*.4+.1);
      this.r = Math.random()*1.5+.4; this.life = 0; this.maxLife = Math.random()*300+200;
      const c = getThemeColor(); this.color = c[Math.random()>.5?0:1];
    }
    update() { this.x+=this.vx; this.y+=this.vy; this.life++; if(this.life>this.maxLife||this.y<-10)this.reset(false); }
    draw()   { const a=Math.sin((this.life/this.maxLife)*Math.PI)*.5; ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle=this.color+a+')'; ctx.fill(); }
  }
  for(let i=0;i<60;i++) particles.push(new Particle());
  (function draw() { ctx.clearRect(0,0,W,H); particles.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(draw); })();

 
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
      card.style.setProperty('--my', ((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
    });
  });


  const html = document.documentElement;
  const btn  = document.getElementById('themeToggle');
  let isDark = true;
  function applyTheme(dark) {
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
    isDark = dark;
    localStorage.setItem('theme', dark ? 'dark' : 'light');

    document.querySelectorAll('img.theme-img').forEach(img => {
      const src = dark ? img.dataset.darkSrc : img.dataset.lightSrc;
      if (src) img.src = src;
    });
  }
  const saved = localStorage.getItem('theme');
  if(saved) applyTheme(saved==='dark');
  else if(window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme(false);
  btn.addEventListener('click', () => applyTheme(!isDark));

 
  const phrases = [
    "const dev = { paixao: 'frontend', nivel: 'crescendo' };",
    "document.querySelector('idea').style.display = 'reality';",
    "npm run build -- --mode=production 🚀",
    "git commit -m 'feat: portfolio atualizado'",
  ];
  let phraseIdx=0, charIdx=0, isDeleting=false;
  const typedEl = document.getElementById('typed-text');
  function type() {
    const cur = phrases[phraseIdx];
    if(isDeleting) {
      typedEl.textContent = cur.substring(0,charIdx--);
      if(charIdx<0){isDeleting=false; phraseIdx=(phraseIdx+1)%phrases.length; setTimeout(type,500); return;}
    } else {
      typedEl.textContent = cur.substring(0,++charIdx);
      if(charIdx===cur.length){isDeleting=true; setTimeout(type,2200); return;}
    }
    setTimeout(type, isDeleting?30:55);
  }
  type();


  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible'); revObs.unobserve(e.target);} });
  }, { threshold: 0.1 });
  document.querySelectorAll('.hero .reveal').forEach(el => setTimeout(()=>el.classList.add('visible'),100));
  document.querySelectorAll('.reveal:not(.hero .reveal)').forEach(el => revObs.observe(el));


  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.querySelectorAll('.progress-fill[data-width]').forEach(b=>b.style.width=b.dataset.width+'%');
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.roadmap').forEach(el => barObs.observe(el));


  const mainNav  = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('#navList a');
  const sections = document.querySelectorAll('section[id], div[id]');
  const scrollProg = document.getElementById('scrollProgress');
  const backTop  = document.getElementById('backToTop');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    scrollProg.style.width = (curr/docH*100)+'%';
    mainNav.classList.toggle('scrolled', curr>20);
    if(curr>lastScroll && curr>120) mainNav.classList.add('hidden');
    else mainNav.classList.remove('hidden');
    lastScroll = curr;
    let current='';
    sections.forEach(s => { if(curr>=s.offsetTop-240) current=s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href')==='#'+current));
    backTop.classList.toggle('visible', curr>400);
  }, { passive: true });


  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  
  document.querySelector('.form-submit').addEventListener('click', function() {
    const span = this.querySelector('span');
    span.textContent = 'Enviado! ✓';
    this.style.boxShadow = '0 10px 30px  rgba(204,255,0,0.4)';
    setTimeout(()=>{ span.textContent='Enviar mensagem →'; this.style.boxShadow=''; }, 3000);
  });


  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if(!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
  });
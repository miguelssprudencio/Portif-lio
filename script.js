// ==========================================
// 1. OBSERVADOR DE VISIBILIDADE DOS CARDS (.project-card)
// ==========================================
const cardObserverOptions = {
  threshold: 0.15 // Ativa quando 15% do card estiver visível
};

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting || entry.intersectionRatio > 0) {
      // Adiciona a classe show aos elementos visíveis ou parcialmente visíveis
      entry.target.classList.add('show');
    } else {
      // Remove a classe show dos elementos que não estão mais visíveis
      entry.target.classList.remove('show');
    }
  });
}, cardObserverOptions);

// Seleciona todos os cards e coloca o observador neles
document.querySelectorAll('.project-card').forEach((card) => {
  cardObserver.observe(card);
});


// ==========================================
// 2. CONTROLE DO MODO ESCURO / CLARO
// ==========================================
const toggle = document.getElementById('toggle-theme');

// Verifica se o elemento do botão existe na página antes de rodar o código para não dar erro
if (toggle) {
  // Ao carregar a página: verifica se o usuário já prefere o modo escuro
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggle.checked = false; // Mantém na Lua (se o checkbox marcado for Sol)
  } else {
    toggle.checked = true;  // Mantém no Sol
  }

  // Quando clicar no botão
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');

    // Salva a escolha para a próxima visita
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}


// ==========================================
// 3. EFEITO DE SEGUIR O MOUSE (.efeito)
// ==========================================
const efeito = document.querySelector('.efeito');

if (efeito) {
  document.addEventListener('mousemove', (e) => {
    efeito.style.left = e.clientX + 'px';
    efeito.style.top = e.clientY + 'px';
  });
}


// ==========================================
// 4. ANIMAÇÃO DOS NÚMEROS DO CONTADOR (ROLANDO A PÁGINA)
// ==========================================
const counters = document.querySelectorAll('.counter-number');
const duration = 2000; // Tempo total da animação (2 segundos inteiros)

// Esta é a função que faz os números subirem suavemente
const startCounting = (counter) => {
  const target = +counter.getAttribute('data-target');
  let startTime = null;

  const animate = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const progress = currentTime - startTime;
    const progressPercent = Math.min(progress / duration, 1);
    const currentCount = Math.floor(progressPercent * target);
    
    counter.innerText = currentCount;

    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      counter.innerText = target; // Garante que termina no número exato
    }
  };

  requestAnimationFrame(animate);
};

// O Observador que vigia a tela e só ativa a contagem quando o card aparece
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // SE o card com o número entrou na área visível da tela...
    if (entry.isIntersecting) {
      const counter = entry.target;
      startCounting(counter); // COMEÇA a animação
      observer.unobserve(counter); // DESLIGA o olho para não repetir se rolar de novo
    }
  });
}, {
  threshold: 0.2 // Configuração: 20% do card precisa estar aparecendo para ativar
});

// Ativa o observador para cada um dos seus números
counters.forEach(counter => {
  counterObserver.observe(counter);
});


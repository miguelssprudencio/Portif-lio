const observerOptions = {
  threshold: 0.15 // Ativa quando 15% do card estiver visível
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting || entry.intersectionRatio > 0) {
      // Adiciona a classe show aos elementos visíveis ou parcialmente visíveis
      entry.target.classList.add('show');
    } else {
      // Remove a classe show dos elementos que não estão mais visíveis
      entry.target.classList.remove('show');
    }
  });
}, observerOptions);

// Seleciona todos os cards e coloca o observador neles
document.querySelectorAll('.project-card').forEach((card) => {
  observer.observe(card);
});

const toggle = document.getElementById('toggle-theme');

// 1. Ao carregar a página: verifica se o usuário já prefere o modo escuro
// Se não houver nada salvo, o padrão será o "claro" (checkbox desmarcado)
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  toggle.checked = false; // Mantém na Lua (se o checkbox marcado for Sol)
} else {
  toggle.checked = true;  // Mantém no Sol
}

// 2. Quando clicar no botão
toggle.addEventListener('change', () => {
  // O 'toggle' inverte a classe: se tem, tira; se não tem, coloca.
  document.body.classList.toggle('dark-mode');

  // 3. Salva a escolha para a próxima visita
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});



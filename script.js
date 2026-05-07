const observerOptions = {
  threshold: 0.15 // Ativa quando 15% do card estiver visível
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Adiciona a classe show aos elementos visíveis
      entry.target.classList.add('show');
    }
  });
}, observerOptions);

// Seleciona todos os cards e coloca o observador neles
document.querySelectorAll('.project-card').forEach((card) => {
  observer.observe(card);
});
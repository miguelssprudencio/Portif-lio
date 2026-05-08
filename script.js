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
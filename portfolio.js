// 영역이 화면 밖으로 나가면 효과를 초기화해 다시 들어올 때 보여줍니다.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll('.project, .about');

if ('IntersectionObserver' in window && !motionPreference.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, { threshold: 0 });

  document.documentElement.classList.add('motion-ready');
  revealTargets.forEach((target) => observer.observe(target));

  motionPreference.addEventListener('change', (event) => {
    if (event.matches) {
      document.documentElement.classList.remove('motion-ready');
      observer.disconnect();
    }
  });
}

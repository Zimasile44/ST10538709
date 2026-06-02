(function () {
    const track = document.getElementById('carouselTrack');
    const progressBar = document.getElementById('carouselProgress');
    if (!track || !progressBar) return;
    const slides = track.querySelectorAll('.carousel-slide');
    const total = slides.length;
    let current = 0;
    let autoTimer, progressTimer, progressStart;
    const AUTO_DELAY = 5000;
  
    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      resetAuto();
    }
  
    function startProgress() {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      clearInterval(progressTimer);
      progressStart = Date.now();
      progressTimer = setInterval(() => {
        const elapsed = Date.now() - progressStart;
        const pct = Math.min((elapsed / AUTO_DELAY) * 100, 100);
        progressBar.style.transition = 'width 0.1s linear';
        progressBar.style.width = pct + '%';
      }, 80);
    }
  
    function resetAuto() {
      clearInterval(autoTimer);
      clearInterval(progressTimer);
      startProgress();
      autoTimer = setInterval(() => goTo(current + 1), AUTO_DELAY);
    }
  
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    });
  
    resetAuto();
  
  })();
  
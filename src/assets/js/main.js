const skillsTrack = document.querySelector('[data-skills-track]');

if (skillsTrack) {
  const initializeSkills = async () => {
    const [{ default: $ }, { default: slick }] = await Promise.all([
      import('jquery'),
      import('slick-carousel'),
      import('slick-carousel/slick/slick.css'),
    ]);

    slick(window, $);
    $(skillsTrack).slick({
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      prevArrow: $('[data-skills-prev]'),
      nextArrow: $('[data-skills-next]'),
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ],
    });
  };

  void initializeSkills();
}

const canvas = document.querySelector('#hex-grid-canvas');
const banner = canvas?.closest('.banner');
const ctx = canvas?.getContext('2d');

if (canvas && banner && ctx) {
  let width = 0;
  let height = 0;
  let mouseX = -1000;
  let mouseY = -1000;
  let frameRequested = false;
  const radius = 26;
  const hexWidth = Math.sqrt(3) * radius;
  const rowHeight = 1.5 * radius;

  function drawHexagon(x, y, size) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const pointX = x + size * Math.cos(angle);
      const pointY = y + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(pointX, pointY);
      else ctx.lineTo(pointX, pointY);
    }
    ctx.closePath();
  }

  function render() {
    frameRequested = false;
    ctx.clearRect(0, 0, width, height);

    let row = 0;
    for (let y = 0; y < height + radius; y += rowHeight) {
      const xOffset = row % 2 === 1 ? hexWidth / 2 : 0;
      for (let x = xOffset; x < width + hexWidth; x += hexWidth) {
        const dx = mouseX - x;
        const dy = mouseY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        drawHexagon(x, y, radius - 1.5);

        if (distance < 160) {
          const intensity = 1 - distance / 160;
          ctx.strokeStyle = `rgba(245, 8, 80, ${0.15 + intensity * 0.75})`;
          ctx.lineWidth = 1 + intensity * 1.5;
          ctx.fillStyle = `rgba(245, 8, 80, ${intensity * 0.18})`;
          ctx.fill();
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
          ctx.lineWidth = 0.6;
        }
        ctx.stroke();
      }
      row++;
    }
  }

  function scheduleRender() {
    if (frameRequested) return;
    frameRequested = true;
    requestAnimationFrame(render);
  }

  function resizeCanvas() {
    const bounds = banner.getBoundingClientRect();
    const nextWidth = Math.round(bounds.width);
    const nextHeight = Math.round(bounds.height);
    if (nextWidth === width && nextHeight === height) return;

    width = canvas.width = nextWidth;
    height = canvas.height = nextHeight;
    scheduleRender();
  }

  banner.addEventListener('pointermove', (event) => {
    const bounds = banner.getBoundingClientRect();
    mouseX = event.clientX - bounds.left;
    mouseY = event.clientY - bounds.top;
    scheduleRender();
  });
  banner.addEventListener('pointerleave', () => {
    mouseX = -1000;
    mouseY = -1000;
    scheduleRender();
  });
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
}
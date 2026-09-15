const heartLayer = document.querySelector('.heart-layer');
const bokehLayer = document.querySelector('.bokeh-layer');
const flowerLayer = document.querySelector('.flower-layer');
const loveButton = document.querySelector('.love-button');
const flowerButton = document.querySelector('.flower-button');
const flowerCard = document.querySelector('.flower-card');
const landing = document.querySelector('.landing');
const openButton = document.querySelector('.open-button');
const countdownText = document.querySelector('.countdown-text');
const siteContent = document.querySelector('.site-content');
const confettiLayer = document.querySelector('.confetti-layer');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const distanceDays = document.getElementById('distance-days');
const distanceHours = document.getElementById('distance-hours');
const distanceMinutes = document.getElementById('distance-minutes');
const distanceSeconds = document.getElementById('distance-seconds');
const distanceKm = document.getElementById('distance-km');

const KISS_EMOJIS = ['💋', '😘'];

const HEART_COLORS = ['#ff5f7d', '#ff8fa3', '#ffd1dc', '#ff7aa2'];

const createHeart = (x, y, options = {}) => {
  if (!heartLayer) return;

  const heart = document.createElement('span');
  heart.className = 'heart';
  const size = options.size ?? (12 + Math.random() * 18);
  const duration = options.duration ?? (4 + Math.random() * 4);
  const drift = options.drift ?? ((Math.random() - 0.5) * 120);
  const color = options.color ?? HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];

  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.background = color;
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.transform = `translateX(${drift}px) rotate(45deg)`;

  heartLayer.appendChild(heart);

  heart.addEventListener('animationend', () => {
    heart.remove();
  });

  if (prefersReducedMotion.matches) {
    setTimeout(() => heart.remove(), 1200);
  }
};

const burstHearts = (x, y, count = 12) => {
  for (let i = 0; i < count; i += 1) {
    createHeart(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 40, {
      size: 10 + Math.random() * 16,
      duration: 3 + Math.random() * 2.5,
      drift: (Math.random() - 0.5) * 200,
    });
  }
};

const createKiss = (x, y) => {
  if (!heartLayer) return;
  const kiss = document.createElement('span');
  kiss.className = 'kiss';
  kiss.textContent = KISS_EMOJIS[Math.floor(Math.random() * KISS_EMOJIS.length)];
  kiss.style.left = `${x}px`;
  kiss.style.top = `${y}px`;
  heartLayer.appendChild(kiss);

  kiss.addEventListener('animationend', () => {
    kiss.remove();
  });

  if (prefersReducedMotion.matches) {
    setTimeout(() => kiss.remove(), 1200);
  }
};

const burstKisses = (x, y, count = 8) => {
  for (let i = 0; i < count; i += 1) {
    createKiss(x + (Math.random() - 0.5) * 60, y + (Math.random() - 0.5) * 60);
  }
};

const spawnFloatingHearts = () => {
  if (prefersReducedMotion.matches) return;
  const x = Math.random() * window.innerWidth;
  const y = window.innerHeight + 20;
  createHeart(x, y);
};

let floatInterval = null;
const startFloating = () => {
  if (prefersReducedMotion.matches) return;
  if (floatInterval) clearInterval(floatInterval);
  floatInterval = setInterval(spawnFloatingHearts, 350);
};

const stopFloating = () => {
  if (floatInterval) clearInterval(floatInterval);
  floatInterval = null;
};

const createBouquet = (x, y, options = {}) => {
  if (!flowerLayer) return;

  const bouquet = document.createElement('span');
  bouquet.className = 'bouquet';
  const size = options.size ?? (220 + Math.random() * 160);
  const duration = options.duration ?? (6 + Math.random() * 4);

  bouquet.style.width = `${size}px`;
  bouquet.style.height = `${size * 1.4}px`;
  bouquet.style.left = `${x}px`;
  bouquet.style.top = `${y}px`;
  bouquet.style.animationDuration = `${duration}s`;

  flowerLayer.appendChild(bouquet);

  bouquet.addEventListener('animationend', () => {
    bouquet.remove();
  });

  if (prefersReducedMotion.matches) {
    setTimeout(() => bouquet.remove(), 1200);
  }
};

let lilyInterval = null;
const startLilyBloom = () => {
  if (prefersReducedMotion.matches) {
    for (let i = 0; i < 5; i += 1) {
      createBouquet(Math.random() * window.innerWidth, -60, { duration: 2, size: 160 });
    }
    return;
  }

  if (lilyInterval) clearInterval(lilyInterval);
  const bloomStart = Date.now();
  lilyInterval = setInterval(() => {
    for (let i = 0; i < 5; i += 1) {
      const x = Math.random() * window.innerWidth;
      const y = -60;
      createBouquet(x, y);
    }
    if (Date.now() - bloomStart > 20000) {
      clearInterval(lilyInterval);
      lilyInterval = null;
    }
  }, 420);
};

document.addEventListener('click', (event) => {
  burstKisses(event.clientX, event.clientY, 8);
});

let lastTrailTime = 0;
const trailHeart = (x, y) => {
  if (prefersReducedMotion.matches || !heartLayer) return;
  const now = performance.now();
  if (now - lastTrailTime < 45) return;
  lastTrailTime = now;

  const heart = document.createElement('span');
  heart.className = 'trail-heart';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heartLayer.appendChild(heart);

  heart.addEventListener('animationend', () => {
    heart.remove();
  });
};

const spawnSparkle = (x, y) => {
  if (prefersReducedMotion.matches || !heartLayer) return;
  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  heartLayer.appendChild(sparkle);

  sparkle.addEventListener('animationend', () => {
    sparkle.remove();
  });
};

const addHoverSparkles = (selector) => {
  const targets = document.querySelectorAll(selector);
  targets.forEach((target) => {
    target.addEventListener('mousemove', (event) => {
      if (prefersReducedMotion.matches) return;
      if (Math.random() > 0.5) return;
      const rect = target.getBoundingClientRect();
      const x = rect.left + (event.clientX - rect.left);
      const y = rect.top + (event.clientY - rect.top);
      spawnSparkle(x, y);
    });
  });
};

document.addEventListener('touchstart', (event) => {
  const touch = event.touches[0];
  if (!touch) return;
  burstKisses(touch.clientX, touch.clientY, 8);
}, { passive: true });

if (loveButton) {
  loveButton.addEventListener('click', (event) => {
    const rect = loveButton.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    burstKisses(cx, cy, 10);
    event.stopPropagation();
  });
}

if (flowerButton) {
  flowerButton.addEventListener('click', (event) => {
    startLilyBloom();
    event.stopPropagation();
  });
}

document.addEventListener('mousemove', (event) => {
  trailHeart(event.clientX, event.clientY);
});

prefersReducedMotion.addEventListener('change', () => {
  if (prefersReducedMotion.matches) {
    stopFloating();
    restoreLetter();
  } else {
    startFloating();
    startLetterTyping();
  }
});

addHoverSparkles('.hero, .memories, .letter, .videos, footer, .gallery video');
startFloating();

const letterParagraph = document.querySelector('.letter p');
let letterNodes = null;
let letterTyped = false;

if (letterParagraph) {
  const nodes = [];
  const walker = document.createTreeWalker(letterParagraph, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    nodes.push({ node, text: node.textContent });
  }
  letterNodes = nodes;
}

const restoreLetter = () => {
  if (!letterNodes || !letterParagraph) return;
  letterNodes.forEach(({ node, text }) => {
    node.textContent = text;
  });
  letterParagraph.classList.remove('typing');
};

const startLetterTyping = () => {
  if (!letterNodes || !letterParagraph || letterTyped) return;
  if (prefersReducedMotion.matches) {
    restoreLetter();
    return;
  }
  letterTyped = true;
  letterNodes.forEach(({ node }) => {
    node.textContent = '';
  });
  letterParagraph.classList.add('typing');

  let nodeIndex = 0;
  let charIndex = 0;
  const typeNext = () => {
    if (!letterNodes || nodeIndex >= letterNodes.length) {
      letterParagraph.classList.remove('typing');
      return;
    }
    const current = letterNodes[nodeIndex];
    current.node.textContent = current.text.slice(0, charIndex + 1);
    charIndex += 1;
    if (charIndex >= current.text.length) {
      nodeIndex += 1;
      charIndex = 0;
    }
    setTimeout(typeNext, 18);
  };
  typeNext();
};

const unlockSite = () => {
  if (landing) landing.classList.add('hidden');
  if (siteContent) {
    siteContent.classList.add('unlocked');
    siteContent.setAttribute('aria-hidden', 'false');
  }
  startLetterTyping();
  startConfetti();
};

const CONFETTI_COLORS = ['#ff5f7d', '#ffb3c7', '#ffd166', '#06d6a0', '#118ab2'];
const PETAL_COLORS = ['#ffd1dc', '#ff9dbd', '#ffc2d8'];
const startConfetti = () => {
  if (!confettiLayer || prefersReducedMotion.matches) return;
  const endTime = Date.now() + 5000;
  const interval = setInterval(() => {
    for (let i = 0; i < 18; i += 1) {
      const piece = document.createElement('span');
      piece.className = 'confetti';
      const size = 6 + Math.random() * 8;
      piece.style.width = `${size}px`;
      piece.style.height = `${size * 1.4}px`;
      piece.style.left = `${Math.random() * window.innerWidth}px`;
      piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      piece.style.animationDuration = `${3 + Math.random() * 2.5}s`;
      confettiLayer.appendChild(piece);

      piece.addEventListener('animationend', () => {
        piece.remove();
      });
    }
    for (let i = 0; i < 10; i += 1) {
      const petal = document.createElement('span');
      petal.className = 'petal';
      const size = 10 + Math.random() * 10;
      petal.style.width = `${size}px`;
      petal.style.height = `${size * 0.7}px`;
      petal.style.left = `${Math.random() * window.innerWidth}px`;
      petal.style.background = `radial-gradient(circle at 30% 30%, #fff0f5, ${PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]})`;
      petal.style.animationDuration = `${3 + Math.random() * 3}s`;
      confettiLayer.appendChild(petal);

      petal.addEventListener('animationend', () => {
        petal.remove();
      });
    }
    if (Date.now() > endTime) {
      clearInterval(interval);
    }
  }, 180);
};

const startDistanceTimer = () => {
  if (!distanceDays || !distanceHours || !distanceMinutes || !distanceSeconds) return;
  const since = new Date('2026-09-14T00:00:00');
  const tick = () => {
    const now = new Date();
    let diff = Math.max(0, now - since);
    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000);
    diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);

    distanceDays.textContent = String(days);
    distanceHours.textContent = String(hours).padStart(2, '0');
    distanceMinutes.textContent = String(minutes).padStart(2, '0');
    distanceSeconds.textContent = String(seconds).padStart(2, '0');
  };
  tick();
  setInterval(tick, 1000);
};

const startDistanceCount = () => {
  if (!distanceKm) return;
  const target = Number(distanceKm.dataset.target);
  if (!Number.isFinite(target)) return;

  const start = performance.now();
  const duration = 1600;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const step = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const value = Math.round(target * easeOut(progress));
    distanceKm.textContent = value.toString();
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const startCountdown = () => {
  if (!countdownText || !openButton) {
    unlockSite();
    return;
  }

  openButton.disabled = true;
  openButton.textContent = 'Opening...';

  let remaining = 3;
  countdownText.textContent = `Opening in ${remaining}...`;
  countdownText.setAttribute('aria-hidden', 'false');

  const timer = setInterval(() => {
    remaining -= 1;
    if (remaining > 0) {
      countdownText.textContent = `Opening in ${remaining}...`;
      return;
    }
    clearInterval(timer);
    countdownText.textContent = 'Welcome';
    unlockSite();
  }, 1000);
};

if (openButton) {
  openButton.addEventListener('click', () => {
    startCountdown();
  });
}

startDistanceTimer();
startDistanceCount();

(() => {
  const config = window.MATRIX_CONFIG;
  const screens = [...document.querySelectorAll('.screen')];
  const introText = document.getElementById('intro-text');
  const enterButton = document.getElementById('enter-button');
  const app = document.getElementById('app');

  const getGuestName = () => {
    const raw = new URLSearchParams(window.location.search).get('name');
    const safe = (raw || config.fallbackName || 'GUEST').replace(/[^a-zA-ZÀ-ÿ' -]/g, '').trim();
    return (safe || 'GUEST').toUpperCase().slice(0, 30);
  };

  const showScreen = (id) => {
    screens.forEach((screen) => screen.classList.toggle('active', screen.id === id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const glitch = (callback) => {
    app.classList.add('glitch');
    setTimeout(() => {
      callback();
      setTimeout(() => app.classList.remove('glitch'), 370);
    }, 170);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function typeLine(text, speed = 52) {
    for (const character of text) {
      introText.textContent += character;
      await sleep(character === '.' ? 180 : speed + Math.random() * 45);
    }
  }

  async function runIntro() {
    const name = getGuestName();
    await sleep(900);
    for (const line of config.introLines) {
      await typeLine(line.replace('{name}', name));
      introText.textContent += '\n';
      await sleep(1050);
    }
    enterButton.classList.remove('hidden');
  }

  function populateEventDetails() {
    document.getElementById('event-date').textContent = config.eventDateDisplay;
    document.getElementById('event-time').textContent = config.eventTimeDisplay;
    document.getElementById('event-location').textContent = config.eventLocation;
    document.getElementById('rsvp-link').href = config.rsvpUrl;
  }

  function updateCountdown() {
    const target = new Date(config.eventDateISO).getTime();
    const now = Date.now();
    const difference = Math.max(0, target - now);
    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const minute = 1000 * 60;
    document.getElementById('days').textContent = Math.floor(difference / day);
    document.getElementById('hours').textContent = Math.floor((difference % day) / hour).toString().padStart(2, '0');
    document.getElementById('minutes').textContent = Math.floor((difference % hour) / minute).toString().padStart(2, '0');
    document.getElementById('seconds').textContent = Math.floor((difference % minute) / 1000).toString().padStart(2, '0');
  }

  function setCalendarDownload() {
    const c = config.calendar;
    const escapeICS = (value) => String(value).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Matrix Libations//Invitation//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@matrix-libations`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
      `DTSTART:${c.start}`,
      `DTEND:${c.end}`,
      `SUMMARY:${escapeICS(config.eventTitle)}`,
      `DESCRIPTION:${escapeICS(c.description)}`,
      `LOCATION:${escapeICS(c.location)}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    document.getElementById('calendar-link').href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  }

  function initialiseTabs() {
    document.querySelectorAll('.nav-button').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.nav-button').forEach((item) => item.classList.remove('active'));
        document.querySelectorAll('.content-panel').forEach((panel) => panel.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(button.dataset.panel).classList.add('active');
      });
    });
  }

  function matrixRain() {
    const canvas = document.getElementById('matrix-rain');
    const context = canvas.getContext('2d');
    const glyphs = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ0123456789ZXCVBNM<>[]{}';
    const fontSize = 16;
    let columns = 0;
    let drops = [];

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.floor(window.innerWidth / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -70);
    }

    function draw() {
      context.fillStyle = 'rgba(0, 3, 1, 0.08)';
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = '#39ff69';
      context.font = `${fontSize}px monospace`;
      drops.forEach((drop, index) => {
        const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
        context.fillText(glyph, index * fontSize, drop * fontSize);
        if (drop * fontSize > window.innerHeight && Math.random() > 0.975) drops[index] = 0;
        drops[index] += 0.55;
      });
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();
  }

  enterButton.addEventListener('click', () => glitch(() => showScreen('choice')));
  document.getElementById('red-pill').addEventListener('click', () => glitch(() => showScreen('invite')));
  document.getElementById('blue-pill').addEventListener('click', () => glitch(() => showScreen('blue-ending')));
  document.getElementById('reconsider').addEventListener('click', () => glitch(() => showScreen('choice')));

  populateEventDetails();
  initialiseTabs();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  setCalendarDownload();
  matrixRain();
  runIntro();
})();

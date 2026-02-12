document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURATION (USER: CHANGE DATE HERE) ---
    const startDate = new Date(2023, 8, 14); // 14 de Septiembre de 2023 (Mes 8 es Septiembre)

    // --- 2. COUNTDOWN TIMER ---
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        function updateTimer() {
            const now = new Date();
            const diff = now - startDate;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            daysEl.textContent = days < 10 ? '0' + days : days;
            hoursEl.textContent = hours < 10 ? '0' + hours : hours;
            minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
            secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
        }
        setInterval(updateTimer, 1000);
        updateTimer();
    }

    // --- 3. MOBILE MENU TOGGLE ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- 4. HEART RAIN ANIMATION ---
    const heartsContainer = document.getElementById('hearts-container');

    function createHeart() {
        if (!heartsContainer) return;
        const heart = document.createElement('div');
        heart.classList.add('heart-bg');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        const size = Math.random() * 20 + 10 + 'px';
        heart.style.width = size;
        heart.style.height = size;
        heartsContainer.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 5000);
    }

    if (heartsContainer) {
        setInterval(createHeart, 300);
    }

    // --- 5. ENVELOPE INTERACTION ---
    const envelope = document.querySelector('.envelope');
    const letter = document.querySelector('.letter');

    // Define global function only if elements exist
    if (envelope && letter) {
        window.toggleEnvelope = function () {
            envelope.classList.toggle('open');
            if (envelope.classList.contains('open')) {
                setTimeout(() => {
                    letter.style.opacity = '1';
                    letter.style.transform = 'translateY(-20px)';
                }, 500);
            } else {
                letter.style.opacity = '0';
                letter.style.transform = 'translateY(100%)';
            }
        };
    }

    // --- 6. SCROLL REVEAL ANIMATION ---
    const items = document.querySelectorAll('.timeline-item, .reason-card, .photo-frame');
    if (items.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        items.forEach(item => {
            item.classList.add('hidden');
            observer.observe(item);
        });
    }

    // --- 7. VALENTINE PAGE LOGIC ---
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const checklist = document.getElementById('valentine-gif');
    const questionHeader = document.querySelector('.valentine-question');
    const successMsg = document.getElementById('success-message');
    const btnContainer = document.querySelector('.buttons-container');

    if (noBtn && yesBtn) {
        let scale = 1;

        const moveNoButton = () => {
            const maxX = window.innerWidth - noBtn.offsetWidth - 20;
            const maxY = window.innerHeight - noBtn.offsetHeight - 20;

            const randomX = Math.max(0, Math.floor(Math.random() * maxX));
            const randomY = Math.max(0, Math.floor(Math.random() * maxY));

            noBtn.style.position = 'fixed';
            noBtn.style.left = randomX + 'px';
            noBtn.style.top = randomY + 'px';

            // Text change
            const funTexts = ["¿Segura?", "¿En serio?", "¡Piénsalo!", "¡No puedes!", "¡Mira el otro!", "¡Di que sí!"];
            noBtn.textContent = funTexts[Math.floor(Math.random() * funTexts.length)];

            // Grow YES button
            scale += 0.2;
            yesBtn.style.transform = `scale(${scale})`;
        };

        // Mouse (PC)
        noBtn.addEventListener('mouseover', moveNoButton);
        // Touch (Mobile) - prevenimos el click
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moveNoButton();
        });
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Impedir click
            moveNoButton();
        });

        yesBtn.addEventListener('click', () => {
            // Hide buttons with fade
            if (btnContainer) btnContainer.style.display = 'none';

            // Change GIF and Text
            if (checklist) checklist.src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";
            if (questionHeader) questionHeader.textContent = "¡Yayyy! ¡Gracias mi amor! 💖";

            // Show message
            if (successMsg) {
                successMsg.style.display = 'flex';
                // Trigger confetti
                for (let i = 0; i < 50; i++) setTimeout(createHeart, i * 50);
            }
        });
    }

});

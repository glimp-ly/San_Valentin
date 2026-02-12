document.addEventListener('DOMContentLoaded', () => {

    // --- 0. LOGIN SYSTEM ---
    const loginOverlay = document.getElementById('login-overlay');
    const errorOverlay = document.getElementById('error-overlay');
    const loginForm = document.getElementById('login-form');
    const userInput = document.getElementById('username');
    const passInput = document.getElementById('password');
    const errorMsg = document.getElementById('login-error-msg');
    const retryBtn = document.getElementById('retry-btn');

    // Credentials
    const VALID_USER = "71338540";
    const VALID_PASS = "140923";

    // CHECK LOGIN STATUS
    if (loginOverlay && localStorage.getItem('valentine_login') === 'true') {
        loginOverlay.classList.add('hidden');
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = userInput.value.trim();
            const pass = passInput.value.trim();

            if (user === VALID_USER && pass === VALID_PASS) {
                // Success
                localStorage.setItem('valentine_login', 'true');
                loginOverlay.classList.add('hidden');
            } else {
                // Failure
                loginOverlay.classList.add('hidden');
                errorOverlay.classList.remove('hidden');
                userInput.value = '';
                passInput.value = '';
            }
        });
    }

    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            errorOverlay.classList.add('hidden');
            loginOverlay.classList.remove('hidden');
            errorMsg.textContent = "Intenta de nuevo";
            setTimeout(() => { errorMsg.textContent = ''; }, 3000);
        });
    }

    const startDate = new Date(2023, 8, 14);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');

    if (daysEl && hoursEl && minutesEl) {
        function updateTimer() {
            const now = new Date();
            const diff = now - startDate;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);

            daysEl.textContent = days < 10 ? '0' + days : days;
            hoursEl.textContent = hours < 10 ? '0' + hours : hours;
            minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        }
        setInterval(updateTimer, 1000);
        updateTimer();
    }

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

        const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        heart.setAttribute("viewBox", "0 0 100 100");
        heart.setAttribute("fill", "red"); // Can be overridden by CSS
        heart.classList.add('heart-svg');

        // Random size between 20px and 70px (base size is 50px in CSS)
        const size = Math.random() * 50 + 20 + 'px';
        heart.style.width = size;
        heart.style.height = size;

        heart.style.left = Math.random() * 100 + 'vw';

        // Duration between 5s and 15s to match the float animation
        heart.style.animationDuration = Math.random() * 10 + 5 + 's';

        heart.innerHTML = `
            <path d="M 10,30
            A 20,20 0,0,1 50,30
            A 20,20 0,0,1 90,30
            Q 90,60 50,90
            Q 10,60 10,30 z">
            <animateTransform attributeName="transform"
            attributeType="XML" type="scale" dur="1s"
            values="0.75;0.8;1;0.9; 0.75" keyTimes="0;0.45;0.5;0.75;1"
            repeatCount="indefinite">
            </animateTransform>
            </path>
        `;

        heartsContainer.appendChild(heart);

        // Remove after animation completes (max duration + buffer)
        setTimeout(() => { heart.remove(); }, 15000);
    }

    if (heartsContainer) {
        setInterval(createHeart, 300);
    }

    // --- FLOWER POPUP ---
    const flowerBtn = document.getElementById('flower-btn');
    const flowersSection = document.getElementById('flowers-section');
    const closeFlowersBtn = document.getElementById('close-flowers');

    if (flowerBtn && flowersSection && closeFlowersBtn) {
        flowerBtn.addEventListener('click', () => {
            flowersSection.classList.add('show-flowers');
        });

        closeFlowersBtn.addEventListener('click', () => {
            flowersSection.classList.remove('show-flowers');
        });
    }

    // --- 5. ENVELOPE INTERACTION (Letter Popup) ---
    const openLetterBtn = document.getElementById('open-letter-btn');
    const letterOverlay = document.getElementById('letter-overlay');
    const closeLetterBtn = document.getElementById('close-letter');

    if (openLetterBtn && letterOverlay && closeLetterBtn) {
        openLetterBtn.addEventListener('click', () => {
            letterOverlay.classList.remove('hidden');
        });

        closeLetterBtn.addEventListener('click', () => {
            letterOverlay.classList.add('hidden');
        });

        // Close when clicking outside content
        letterOverlay.addEventListener('click', (e) => {
            if (e.target === letterOverlay) {
                letterOverlay.classList.add('hidden');
            }
        });
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
            noBtn.style.transition = 'all 0.1s ease'; // Faster transition for movement

            // Text change
            const funTexts = ["¿Segura?", "¿En serio?", "¡Piénsalo!", "¡No puedes!", "¡Mira el otro!", "¡Di que sí!"];
            noBtn.textContent = funTexts[Math.floor(Math.random() * funTexts.length)];

            // Grow YES button
            scale += 0.2;
            yesBtn.style.transform = `scale(${scale})`;
        };

        // Mouse (PC) - Use mouseover and mouseenter for better coverage
        noBtn.addEventListener('mouseover', moveNoButton);
        noBtn.addEventListener('mouseenter', moveNoButton);

        // Mobile
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveNoButton();
        });
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moveNoButton();
        });

        yesBtn.addEventListener('click', () => {
            // Hide buttons with fade
            if (btnContainer) btnContainer.style.display = 'none';

            // Change GIF and Text
            if (checklist) checklist.src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";
            if (questionHeader) questionHeader.textContent = "¡Yeiiiii! ¡Gracias mi amor! 💖";

            // Show message
            if (successMsg) {
                successMsg.style.display = 'flex';
                // Trigger confetti
                for (let i = 0; i < 50; i++) setTimeout(createHeart, i * 50);
            }
        });
    }

});

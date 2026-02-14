document.addEventListener('DOMContentLoaded', () => {
    const targetDate = new Date('2026-02-13T21:19:00');
    const now = new Date();

    const lockedContent = document.getElementById('locked-content');
    const unlockedContent = document.getElementById('unlocked-content');

    if (now >= targetDate) {
        lockedContent.style.display = 'none';
        unlockedContent.classList.add('show-content');

        setTimeout(() => {
            document.getElementById('welcome-modal').style.display = 'flex';
        }, 500);
    } else {
        lockedContent.classList.add('show-content');
        unlockedContent.style.display = 'none';
    }
});

function nextSlide(slideNumber) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active-slide'));

    const specialSection = document.getElementById('special-section');
    if (specialSection) specialSection.classList.remove('active-section');

    if (slideNumber <= 5) {
        const targetSlide = document.getElementById('slide-' + slideNumber);
        if (targetSlide) {
            targetSlide.classList.add('active-slide');
        }
    }
    else if (slideNumber === 6) {
        if (specialSection) {
            specialSection.classList.add('active-section');
            const audio = document.getElementById('love-audio');
            if (audio) {
                audio.currentTime = 60;
                audio.play().catch(e => console.log("Audio play failed:", e));
            }
        }
    }
}

function toggleItem(element, price) {
    element.classList.toggle('selected');

    const slide = element.closest('.slide');
    let totalDisplay = slide.querySelector('.total-display');
    let currentTotal = parseInt(slide.getAttribute('data-total') || '0');

    if (element.classList.contains('selected')) {
        currentTotal += price;
    } else {
        currentTotal -= price;
    }

    slide.setAttribute('data-total', currentTotal);
    totalDisplay.textContent = currentTotal;
}

let currentPaymentSlideIndex = 0;

function openPaymentModal(slideIndex) {
    const slide = document.getElementById('slide-' + slideIndex);
    const currentTotal = parseInt(slide.getAttribute('data-total') || '0');

    if (currentTotal === 0) {
        alert("¡No has seleccionado nada! Elige algo para continuar.");
        return;
    }
    document.getElementById('payment-modal').style.display = 'flex';
}

function closePaymentModal() {
    const paymentModal = document.getElementById('payment-modal');
    const bfModal = document.getElementById('bf-interject-modal');
    if (paymentModal) paymentModal.style.display = 'none';
    if (bfModal) bfModal.style.display = 'none';
}

function handlePaymentChoice(choice) {
    document.getElementById('payment-modal').style.display = 'none';

    if (choice === 'me') {
        document.getElementById('bf-interject-modal').style.display = 'flex';
    } else {
        completePayment();
    }
}

function confirmBfPayment() {
    closePaymentModal();
    completePayment();
}

function completePayment() {
    alert("¡PAGO REALIZADO! \n\nGuillermo paga con mucho gusto y amor.\n¡Excelente elección!");
}

function openLetter() {
    const overlay = document.getElementById('letter-overlay');
    overlay.classList.add('active');
}

function closeLetter() {
    const overlay = document.getElementById('letter-overlay');
    overlay.classList.remove('active');
}

function closeWelcomeModal() {
    document.getElementById('welcome-modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('love-audio');
    const ctrlBtn = document.getElementById('audio-control');

    if (audio) {
        // audio.currentTime = 60; // Start at 1 minute // Moving this inside play attempt to be safe or loadedmetadata

        const startAudio = () => {
            if (audio.currentTime < 60) audio.currentTime = 60; // Ensure start time
            audio.play().then(() => {
                ctrlBtn.classList.add('playing');
                document.body.removeEventListener('click', startAudio); // Remove fallback
            }).catch(error => {
                console.log("Autoplay prevented:", error);
                ctrlBtn.classList.remove('playing');
            });
        };

        // Attempt immediate autoplay
        startAudio();

        // Fallback: Play on first interaction if autoplay failed
        document.body.addEventListener('click', startAudio);

        // Toggle Logic
        ctrlBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent body click from firing
            if (audio.paused) {
                audio.play();
                ctrlBtn.classList.add('playing');
            } else {
                audio.pause();
                ctrlBtn.classList.remove('playing');
            }
        });
    }
});

function openLetter() {
    const overlay = document.getElementById('letter-overlay');
    overlay.classList.add('active');
}

function closeLetter() {
    const overlay = document.getElementById('letter-overlay');
    overlay.classList.remove('active');
}

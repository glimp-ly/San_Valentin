document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('love-audio');
    const ctrlBtn = document.getElementById('audio-control');

    if (audio) {

        const startAudio = () => {
            if (audio.currentTime < 60) audio.currentTime = 60;
            audio.play().then(() => {
                ctrlBtn.classList.add('playing');
                document.body.removeEventListener('click', startAudio);
            }).catch(error => {
                console.log("Autoplay prevented:", error);
                ctrlBtn.classList.remove('playing');
            });
        };

        startAudio();

        document.body.addEventListener('click', startAudio);

        ctrlBtn.addEventListener('click', (e) => {
            e.stopPropagation();
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

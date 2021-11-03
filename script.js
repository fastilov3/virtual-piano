const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const letters = document.querySelector('.btn-letters');
const notes = document.querySelector('.btn-notes');
const fullScreenElement = document.querySelector('.fullscreen');
let isPressed = false;

letters.addEventListener('click', lettersBtnHandler);
notes.addEventListener('click', notesBtnHandler);
window.addEventListener('keydown', playAudioOnKeyDown);
window.addEventListener('keyup', stopAudioAfterKeyUp);
pianoКeys.forEach(el => {
    el.addEventListener('mouseover', mouseOverHandler);
    el.addEventListener('mouseout', mouseOutHandler);
});
fullScreenElement.addEventListener('click', activateFullscreen);
window.addEventListener('mousedown', e => {
    if (e.target.dataset.letter) {
        isPressed = true;
        playAudio(e);
        addActiveClasses(e);
    }
})
window.addEventListener('mouseup', e => {
    isPressed = false;
    removeActiveClasses(e);
})

function mouseOverHandler(e) {
    if (isPressed) {
        playAudio(e);
        addActiveClasses(e);
    }
}

function mouseOutHandler(e) {
    if (isPressed) {
        removeActiveClasses(e);
    }
}

function playAudioOnKeyDown(e) {
    if (e.repeat) return;

    const audio = document.querySelector(`audio[data-letter=${e.code.slice(-1)}]`)
    const pianoKey = document.querySelector(`div[data-letter=${e.code.slice(-1)}]`)
    if (!audio) return;

    pianoKey.classList.add('piano-key-active')
    pianoKey.classList.add('piano-key-active-pseudo')
    audio.currentTime = 0;
    audio.play()
}

function stopAudioAfterKeyUp(e) {
    if (e.repeat) return;

    const audio = document.querySelector(`audio[data-letter=${e.code.slice(-1)}]`)
    const pianoKey = document.querySelector(`div[data-letter=${e.code.slice(-1)}]`)

    pianoKey.classList.remove('piano-key-active')
    pianoKey.classList.remove('piano-key-active-pseudo')
    audio.stop()
}

function playAudio(e) {
    const audio = document.querySelector(`audio[data-letter=${e.target.dataset.letter}]`)
    if (!audio) return;
    audio.currentTime = 0
    audio.play()
}

function addActiveClasses(e) {
    const pianoKey = document.querySelector(`div[data-letter=${e.target.dataset.letter}]`)
    pianoKey.classList.add('piano-key-active')
    pianoKey.classList.add('piano-key-active-pseudo')
}

function removeActiveClasses(e) {
    const pianoKey = document.querySelector(`div[data-letter=${e.target.dataset.letter}]`)
    pianoKey.classList.remove('piano-key-active')
    pianoKey.classList.remove('piano-key-active-pseudo')
}

function notesBtnHandler(e) {
    if (!notes.classList.contains('btn-active')) {
        notes.classList.add('btn-active')
        letters.classList.remove('btn-active')
        pianoКeys.forEach(el => el.classList.remove('piano-key-letter'))
    }
}

function lettersBtnHandler(e) {
    if (!letters.classList.contains('btn-active')) {
        letters.classList.add('btn-active')
        notes.classList.remove('btn-active')
        pianoКeys.forEach(el => el.classList.add('piano-key-letter'))
    }
}

function activateFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
};
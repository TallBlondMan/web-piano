Tone.start();

const synth = new Tone.MembraneSynth().toDestination();
const keyState = {};

document.querySelector('.piano-key').addEventListener('click', async () => {
    await Tone.start()
})

function playNote(note) {
    console.log(`Note pressed: ${note}`);

    synth.triggerAttack(note);
}
function stopNote(note) {
    console.log(`Note released: ${note}`);

    synth.triggerRelease();
}

const pianoKeys = document.querySelectorAll('.piano-key');
pianoKeys.forEach(key => {
    key.addEventListener('mousedown', function() {
        const note = this.dataset.note;
        if (!keyState[note]) {
            playNote(note);
            keyState[note] = true; // Mark the key as pressed
        }
    });
    key.addEventListener('mouseup', function() {
        const note = this.dataset.note;
        stopNote(note);
        keyState[note] = false; // Mark the key as released
    });
});

const keyMap = {
    'a': 'C4',
    'w': 'C#4',
    's': 'D4',
    'e': 'D#4',
    'd': 'E4',
    'f': 'F4',
    't': 'F#4',
    'g': 'G4',
    'y': 'G#4',
    'h': 'A4',
    'u': 'A#4',
    'j': 'B4',
    'k': "c5"
};

document.addEventListener('keydown', function(event) {
    const pressedKey = event.key.toLowerCase();
    if (keyMap.hasOwnProperty(pressedKey) && !keyState[pressedKey]) {
        const note = keyMap[pressedKey];
        playNote(note);
        keyState[pressedKey] = true;
}
});

document.addEventListener('keyup', function(event) {
    const releasedKey = event.key.toLowerCase();
    if (keyState.hasOwnProperty(releasedKey)) {
        const note = keyMap[releasedKey];
        stopNote(note);
        keyState[releasedKey] = false;
    }
});
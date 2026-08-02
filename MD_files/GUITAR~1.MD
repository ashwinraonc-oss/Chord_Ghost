# Project Context: Guitar Chord Detector (MERN)

## Goal

A fullstack (MERN) project that takes audio input from a guitar and identifies the chord being played, eventually generating possible chord progressions from detected chords.

## Key scoping decisions made so far

- **Instrument:** guitar only (not "any instrument") to keep scope manageable.
- **Input mode:** notes are played **one at a time** (not strummed), not full polyphonic chords. This turns a hard polyphonic pitch-detection problem into a much more tractable monophonic pitch-detection + note-grouping problem.
- **Build order:** prototype the detection algorithm in **Python** first (mature audio libraries, fast iteration, easy to visualize). Do NOT start the React/Node/Mongo app until the algorithm works reliably. Premature frontend work would be wasted if the algorithm needs rework.
- The user is writing all code themselves — wants guidance/concepts/function names to research, not code written for them.

## Two separable problems (only the first is in scope right now)

1. **Chord detection from audio** — current focus.
2. **Chord progression generation** — future phase, easier, mostly music theory (diatonic harmony rules and/or a Markov chain over chord progression data) rather than signal processing. Not being worked on yet.

## Python prototype pipeline (current phase)

1. **Test data:** record short clips per chord (start with open chords: E, A, D, G, C, Am, Em), playing each note in the chord separately with a pause between chords.
2. **Load audio:** `librosa.load()`.
3. **Visualize first:** plot waveform + spectrogram before writing any detection logic, to sanity-check onsets/pitches by eye.
4. **Onset detection:** `librosa.onset.onset_detect` / `librosa.onset.onset_strength`. Validate against known note counts before moving on; tune sensitivity params if over/under-detecting.
5. **Segment into note windows:** slice audio between consecutive onsets; skip the first ~20-50ms (pick/finger attack transient, noisy).
6. **Pitch detection per segment:** `librosa.pyin`, bounded with realistic guitar `fmin`/`fmax` (~80Hz up to 1000Hz+ depending on fret range). Reduce per-frame f0 + voiced flags down to one representative frequency per note (handle unvoiced frames deliberately, don't just average blindly).
7. **Frequency → pitch class:** MIDI number formula (`69 + 12*log2(f0/440)`), rounded, then mod 12 → one of 12 pitch classes. Worth deriving by hand rather than only using a library helper.
8. **Group notes into a chord:** use a time-gap threshold between onsets (tunable) to decide when one chord ends and the next begins.
9. **Chord templates + matching:** define each chord as a set of expected pitch classes (root/third/fifth, extend to 7ths later). Match detected pitch-class sets against templates using an overlap/scoring approach — not a fragile exact-match, since real detection will occasionally miss/misread a note.
10. **Test end-to-end** against labeled recordings. When something's wrong, debug in this order: onset detection (right note count?) → pitch detection (right frequency per note?) → chord matching (right chord from a correct note set?).

## Future phases (after the Python prototype proves out)

- Port the working algorithm to JS (Meyda.js for chroma/feature extraction in-browser) or keep Python as a backend microservice — decide once the algorithm is proven.
- React (Vite, not Create React App — CRA is effectively unmaintained) for recording/upload UI and results display.
- Node/Express + MongoDB for storing recordings, detected chords, and (later) generated progressions.
- Progression generation phase: rule-based diatonic harmony and/or a Markov chain trained on chord progression data; Tonal.js is a solid JS music theory library for the rule-based route.

## Where the user is right now

About to start writing the Python prototype (steps 1-4 above) themselves.

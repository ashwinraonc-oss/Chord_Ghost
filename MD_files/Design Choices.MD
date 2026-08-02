1. Initial design choice- have the user strum an entire chord and have the algorithm compute what chord is being played with all notes at once.
   Rework 1 - Have the user arpeggiate the chords, then take the audio of the arpeggio and determine the chord
   Rework 2 - Have the user play 1 note, then determine what note is being played, add it to an array, then repeat this step until all notes have played. Once all individual notes are in an array, determine what chord is being played.
   Why the rework?
   Audio files are messy and there are too many things that can change between a user playing each chord (intonation, timing, precision of pick, etc). Playing all notes at once would result in a jumble of frequencies that are difficult to accurately capture. In order to make the note recognition as accurate as possible, I thought it would be best to take in the audio in its simplest form at any given moment (Note instead of arpeggio instead of chord).

2. Initial Design choice - After each note is played, have the algorithm ignore the pitches of each note, and put them all into a set where the order does not matter. Then have this set match exactly to a dictionary of pre-determined chord types (e.g. Minor, Major, Diminished, Maj7, etc.).
   Rework 1 - Instead of looking for an exact match, create a scoring system where the algorithm determines the closest matching chord. Keep the bass note and the order of the notes instead of having the algorithm ignore them.
   Why the rework?
   Manually creating a dictionary matching algorithm for the chord types only works for the simpler chords. I want Chord Ghost to work for simple chords (maj, min, etc.) and jazz chords (flat 7s, dim7s, etc.). This requires a more nuanced approach to chord type matching that may require the use of the python Music21 library to match the notes the user plays to Jazz chords.

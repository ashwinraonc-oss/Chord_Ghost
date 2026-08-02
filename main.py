from RecordAudio import record_audio
from IdentifyChord import frequency_to_pitch, identify_chord, detect_pitch_class
import glob

note_dictionary = {0: "C", 1: "C#", 2: "D", 3: "D#", 4: "E", 5: "F", 6: "F#", 7: "G", 8: "G#", 9: "A", 10: "A#", 11: "B"}
chord_type = {frozenset([0,4,7]): "Major",
              frozenset([0,3,7]): "Minor",
              frozenset([0,3,6]): "Dim",
              frozenset([0,4,8]): "Aug",
              frozenset([0,4,7,10]): "Dom7",
              frozenset([0,4,7,11]): "Maj7",
              frozenset([0,3,7,10]): "m7",
              frozenset([0,3,6,10]): "m7♭5",
              frozenset([0,3,6,9]): "Dim7",
              frozenset([0,2,7]): "sus2",
              frozenset([0,5,7]): "sus4"}

def main():
    note_set = set()
    files = record_audio()
    for filepath in files:
        pitch_class = detect_pitch_class(filepath)
        if pitch_class is not None:
            note_set.add(pitch_class)
    print(note_set)

    chord_tuple = identify_chord(note_set, chord_type)
    if chord_tuple:
        root = note_dictionary[chord_tuple[0]]
        quality = chord_tuple[1]
        chord = root + " " + quality
    else:
        chord = "Unknown Chord Voicing"

    
    return chord

if __name__ == "__main__":
    print(main())

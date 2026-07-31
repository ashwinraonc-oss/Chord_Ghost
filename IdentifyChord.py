# %%
import librosa
import glob
import numpy as np


note_dictionary = {0: "C", 1: "C#", 2: "D", 3: "D#", 4: "E", 5: "F", 6: "F#", 7: "G", 8: "G#", 9: "A", 10: "A#", 11: "B"}
chord_type = {frozenset([0,4,7]): "Major", frozenset([0,3,7]): "Minor", frozenset([0,3,6]): "Diminished", frozenset([0,4,8]): "Augmented", frozenset([0,4,7,10]): "Dominant 7th", frozenset([0,4,7,11]): "Major 7th"}
files = glob.glob("./Notes/C#diminished/*.wav")
note_set = set()



def frequency_to_pitch(freq) -> int:
    midi = 12 * np.log2((freq / 440)) + 69
    return midi
def detect_pitch_class(filepath) -> int | None:
    raw, sr = librosa.load(filepath)
    f0, voiced_flag, voiced_probs = librosa.pyin(raw, 
                                                sr=sr, 
                                                fmin=librosa.note_to_hz('C2'),
                                                fmax=librosa.note_to_hz('C7'))
    mask = voiced_flag & (voiced_probs > 0.8)
    if not mask.any():
        mask = voiced_flag & (voiced_probs > 0.5)
    if not mask.any(): return None
    masked_notes = f0[mask]
    note_frequency = np.nanmedian(masked_notes)
    note_number = frequency_to_pitch(note_frequency)
    pitch_class = (round(note_number)%12)

    return pitch_class
def identify_chord(pitch_classes):
    for root in pitch_classes:
        subset = {(item - root)%12 for item in pitch_classes}
        if frozenset(subset) in chord_type:
            return (root, chord_type[frozenset(subset)])
    return None

# %%


for filepath in files:
    pitch_class = detect_pitch_class(filepath)
    note_set.add(pitch_class)

chord_tuple = identify_chord(note_set)
if chord_tuple:
    root = note_dictionary[chord_tuple[0]]
    quality = chord_tuple[1]
    chord = root + " " + quality
else:
    chord = "Unknown Chord Voicing"

print(chord)


    




# %%









# %%

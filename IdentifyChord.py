# %%
import librosa
import glob
import numpy as np

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
def identify_chord(pitch_classes, chord_type):
    for root in pitch_classes:
        subset = {(item - root)%12 for item in pitch_classes}
        if frozenset(subset) in chord_type:
            return (root, chord_type[frozenset(subset)])
    return None

# %%




    




# %%









# %%

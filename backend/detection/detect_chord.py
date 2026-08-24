# %%
import librosa
import glob
import numpy as np
import os

# %%

file_path = "./Unused Audio/E Major Chord.wav"

def get_onset_times(file_path):
    sample_array = []
    note_array = []
    y, sr = librosa.load(file_path)
    y, _ = librosa.effects.trim(y)
    start_trim = int(0.3*sr)
    end_trim = int(0.3*sr)
    y = y[start_trim:-end_trim]
    onset_times = librosa.onset.onset_detect(y=y, sr=sr, units = 'time', delta = 0.12)
    print(onset_times)
    for time in onset_times:
        sample_idx = int(time * sr)
        sample_array.append(sample_idx)
    for i in range(len(sample_array)-1):
        note_array.append(y[sample_array[i]:sample_array[i+1]])
    note_array.append(y[sample_array[-1]:])

    return (note_array, sr)

def frequency_to_pitch(freq) -> int:
    midi = 12 * np.log2((freq / 440)) + 69
    return midi

def detect_pitch_class(raw, sr) -> int | None:
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
    best_score = float("-inf")
    best_candidate = None
    for root in pitch_classes:
        for template, name in chord_type.items():
            rel = {(item - root)%12 for item in pitch_classes}
            matched_notes = template.intersection(rel)
            missing_notes = template - rel
            extra_notes = rel - template
            score = len(matched_notes) - len(missing_notes) - len(extra_notes)
            if score > best_score:
                best_score = score
                best_candidate = (root, name)
    return (best_candidate, best_score)



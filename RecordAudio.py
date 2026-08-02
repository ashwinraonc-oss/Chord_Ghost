import sounddevice as sd
from scipy.io.wavfile import write
import os

# %%
def record_audio():
    files = []
    directory = "./Notes/"
    for i in range(6):
        fs = 44100  # Sample rate
        seconds = 5  # Duration of recording
        print(f"Play note {i+1}")

        myrecording = sd.rec(int(seconds * fs), samplerate=fs, channels=1)
        sd.wait()  # Wait until recording is finished
        print("Note recorded.")
        file_path = os.path.join(directory, f'note_{i}.wav')
        write(file_path, fs, myrecording)  # Save as WAV file
        files.append(file_path)

    return files
# %%

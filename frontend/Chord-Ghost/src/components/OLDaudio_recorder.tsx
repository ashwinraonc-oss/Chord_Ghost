import { useEffect, useRef, useState } from "react";
import "./audio_recorder.css";
import Fretboard from "./find_notes";

export default function SetUpAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [capturedNotes, setCapturedNotes] = useState<Blob[]>([]);
  const [result, setResult] = useState<{
    chord: string;
    score: number;
    notes: number[];
    root: number;
    voicing: number[][] | string;
  } | null>(null);

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaStream.current = stream;
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.current.push(e.data);
          }
        };
        if (mediaRecorder.current) {
          mediaRecorder.current.onstop = async () => {
            const recordedBlob = new Blob(chunks.current, {
              type: "audio",
            });
            const converted_audio = await convertAudio(recordedBlob);
            setCapturedNotes((prev) => [...prev, converted_audio]);

            chunks.current = [];
          };
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStream();
    return () => {
      if (mediaStream.current) {
        for (const track of mediaStream.current.getTracks()) {
          track.stop();
        }
      }
    };
  }, []);

  function handleMicClick() {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }
  const startRecording = () => {
    try {
      if (mediaRecorder.current) {
        mediaRecorder.current.start();
        setIsRecording(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const stopRecording = () => {
    try {
      if (mediaRecorder.current) {
        mediaRecorder.current.stop();
        setIsRecording(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function convertAudio(audio: Blob) {
    const someBlob = await audio.arrayBuffer();
    const audioCtx = new AudioContext();
    const buffer = await audioCtx.decodeAudioData(someBlob);
    const nowBuffering = buffer.getChannelData(0);
    const res = new Blob([audioBufferToWav(nowBuffering, buffer.sampleRate)], {
      type: "audio/wav",
    });
    return res;
  }

  function audioBufferToWav(audioArray: Float32Array, sampleRate: number) {
    const totalSamples = audioArray.length;
    const buffer = new ArrayBuffer(44 + audioArray.length * 2);
    const view = new DataView(buffer);

    const writeString = (view: DataView, offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + totalSamples * 2, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, "data");
    view.setUint32(40, totalSamples * 2, true);

    let offset = 44;
    for (let i = 0; i < totalSamples; i++) {
      const s = Math.max(-1, Math.min(1, audioArray[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      offset += 2;
    }
    return buffer;
  }

  async function submit_audio() {
    if (capturedNotes.length == 0) {
      return;
    }
    const formData = new FormData();
    for (const note of capturedNotes) {
      formData.append("files", note);
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/detect", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch {
      console.log("error fetching");
    }
  }
  const handleReset = () => {
    setCapturedNotes([]);
    setResult(null);
  };

  return (
    <div>
      <button
        className={`mic-toggle ${isRecording ? "is-recording" : ""}`}
        onClick={handleMicClick}
      >
        <span className="material-icons">mic</span>
      </button>
      <button className="submit" onClick={submit_audio}>
        Detect Chord
      </button>
      <p>{capturedNotes.length} notes captured</p>

      {result && (
        <>
          <p>
            {result.chord} (score {result.score})
          </p>
        </>
      )}
      <Fretboard
        pitchClasses={result ? result.notes : []}
        root={result ? result.root : -1}
      />
      <button
        onClick={handleReset}
        disabled={isRecording || capturedNotes.length == 0}
      >
        Reset Notes
      </button>
    </div>
  );
}

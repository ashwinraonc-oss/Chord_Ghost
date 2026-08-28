import "./audio_recorder.css";
import Fretboard from "./find_notes";
import RenderFretboard from "./CreateDiagrams";

type SetUpAudioProps = {
  isRecording: boolean;
  recordedAudio: Blob | null;
  result: {
    chord: string;
    score: number;
    notes: number[];
    root: number;
    voicing: number[][] | string;
  } | null;
  onMicClick: () => void;
  onDetect: () => void;
  onReset: () => void;
};

export default function SetUpAudio({
  isRecording,
  recordedAudio,
  result,
  onMicClick,
  onDetect,
  onReset,
}: SetUpAudioProps) {
  return (
    <div>
      {recordedAudio !== null && <p>Recording Ready</p>}
      <div className="results-panel">
        {result && (
          <>
            <p className="Chord-Result">Chord Detected: {result.chord}</p>
            {Array.isArray(result.voicing) && (
              <div className="voicings-container">
                {result.voicing.map((voicing, i) => (
                  <RenderFretboard key={i} fret_array={voicing} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Chord Detected: {result.chord} (score {result.score})

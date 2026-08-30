import "./audio_recorder.css";
import RenderFretboard from "./CreateDiagrams";

type SetUpAudioProps = {
  isRecording: boolean;
  recordedAudio: Blob | null;
  isDetecting: boolean;
  result: {
    chord: string;
    score: number;
    notes: number[];
    note_names: string[];
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
  isDetecting,
}: SetUpAudioProps) {
  return (
    <div>
      <div className="recording-ready">
        {recordedAudio !== null && <p>Recording Ready</p>}
        {isDetecting && <div className="loading-spinner" />}
      </div>
      <div className="results-panel">
        {result && (
          <>
            {result.notes.length === 0 ? (
              <p className="Chord-Result">No notes detected</p>
            ) : (
              <>
                <p className="Chord-Result">
                  Chord Detected: {result.chord}
                  <br />
                  Confidence: {result.score}%
                  <br />
                  Detected Notes: {result.note_names.join("-")}
                </p>
              </>
            )}
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

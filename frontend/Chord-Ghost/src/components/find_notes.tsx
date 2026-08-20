import type { JSX } from "react";
import "./find_notes.css";
type FretBoardProps = {
  pitchClasses: number[];
  root: number;
};

export default function Fretboard({ pitchClasses, root }: FretBoardProps) {
  const rows: JSX.Element[] = [];

  const tuning_array = [4, 9, 2, 7, 11, 4];
  const totalFrets = 12;
  for (let i = 0; i < 6; i++) {
    const cells: JSX.Element[] = [];
    for (let j = 0; j < totalFrets + 1; j++) {
      const current_pitch = (tuning_array[i] + j) % 12;
      let className = "";
      if (pitchClasses.includes(current_pitch)) {
        className = current_pitch === root ? "root-note" : "chord-tone";
      }
      cells.push(
        <div key={`${i}-${j}`} className="fret-cell">
          <div className={`note-dot ${className}`}></div>
        </div>,
      );
    }
    const row = (
      <div key={`${i}`} className="fret-row">
        {cells}
      </div>
    );
    rows.push(row);
  }
  return <div className="fretboard">{rows}</div>;
}

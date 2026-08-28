import type { JSX } from "react";
import "./CreateDiagrams.css";
type FretBoardProps = {
  fret_array: number[];
};

export default function RenderFretboard({ fret_array }: FretBoardProps) {
  const col_val = 20;
  const filteredNumbers = fret_array.filter(
    (item) => item !== -1 && item !== 0,
  );

  const cells: JSX.Element[] = [];
  const hasOpenString = fret_array.includes(0);
  const bandOffset = hasOpenString ? 1 : 0;
  const min = hasOpenString ? 0 : Math.min(...filteredNumbers);
  for (let i = 0; i < 6; i++) {
    const value = fret_array[i];
    const marker = value === -1 ? "x" : value === 0 ? "o" : "";
    cells.push(
      <div key={i} style={{ position: "absolute", left: `${i * col_val}%` }}>
        {marker}
      </div>,
    );
  }
  const dots: JSX.Element[] = [];
  for (let j = 0; j < 6; j++) {
    if (fret_array[j] !== -1 && fret_array[j] > 0) {
      const row = ((fret_array[j] - min - bandOffset) / 5) * 100;
      const hPos = j * col_val;
      dots.push(
        <div
          key={j}
          className="voicing-dot"
          style={{ top: `${row}%`, left: `${hPos}%`, position: "absolute" }}
        ></div>,
      );
    }
  }
  const FretLines: JSX.Element[] = [];
  const StringLines: JSX.Element[] = [];
  for (let i = 0; i < 6; i++) {
    StringLines.push(
      <div
        key={i}
        style={{
          position: "absolute",
          top: 0,
          left: `${i * col_val}%`,
          width: "2px",
          height: "100%",
          backgroundColor: "#333",
        }}
      />,
    );
  }
  for (let i = 0; i < 5; i++) {
    FretLines.push(
      <div
        key={i}
        style={{
          position: "absolute",
          top: `${(i / 5) * 100}%`,
          left: 0,
          width: "100%",
          height: "2px",
          backgroundColor: "#333",
        }}
      />,
    );
  }
  return (
    <div className="voicing-diagram">
      <div className="voicing-header">{cells}</div>
      {!hasOpenString && <div className="fret-label">{min}</div>}
      <div className="voicing-board" style={{ position: "relative" }}>
        {StringLines}
        {FretLines}
        {dots}
      </div>
    </div>
  );
}

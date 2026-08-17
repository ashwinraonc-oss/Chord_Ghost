import { useState, type ChangeEvent } from "react";

export default function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<{ chord: string; score: number } | null>(
    null,
  );
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  }
  async function handleSubmit() {
    if (!files) return;
    const formData = new FormData();
    for (const f of files) {
      formData.append("files", f);
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
  return (
    <div className="space-y-2">
      <div>
        <h1>Upload File</h1>
        <input
          type="file"
          accept="audio/*"
          multiple
          onChange={handleFileChange}
        />
        <button onClick={handleSubmit}>Detect Chord</button>
        {result && (
          <p>
            {result.chord} (score {result.score})
          </p>
        )}
      </div>
    </div>
  );
}

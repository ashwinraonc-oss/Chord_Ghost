import { useState } from "react";
import "./App.css";
import FileUploader from "./components/file_uploader";
function App() {
  const [count, setCount] = useState(0);
  const [files, setFiles] = useState<FileList | null>(null);

  return (
    <div className="fileUpload">
      <FileUploader />
    </div>
  );
}

export default App;

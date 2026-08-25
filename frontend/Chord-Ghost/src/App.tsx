import "./App.css";
import FileUploader from "./components/file_uploader";
import SetUpAudio from "./components/audio_recorder";
function App() {
  return (
    <>
      <h1>Chord Ghost</h1>
      {/* <div className="fileUpload">
        <FileUploader />
      </div> */}
      <div>
        <SetUpAudio />
      </div>
    </>
  );
}

export default App;

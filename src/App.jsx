import { SampleApp } from "./react-ts-sample"
import './App.css'

function onLivenessCheckPressed() {
  SampleApp.onLivenessCheckPressed();
}

function App() {

  return (
    <div>
      <div className="wrapping-box-container">
        <div id="controls" className="controls">
          <button id="liveness-button" className="big-button" onClick={() => { return onLivenessCheckPressed(); }}>3D Liveness Check</button>
          <p id="status">Initializing...</p>
        </div>
      </div>
    </div>
  )
}

export default App

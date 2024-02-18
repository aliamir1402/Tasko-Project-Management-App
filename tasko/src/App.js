import "./App.css";
import Sidebar from "./components/sidebar";
import Mainwindow from "./components/mainwindow";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-container">
          <Sidebar></Sidebar>
          <Mainwindow></Mainwindow>
        </div>
      </header>
    </div>
  );
}

export default App;

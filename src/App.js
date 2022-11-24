import "./index.css";
import "./theme.css"; // dark - antd
import "./antd.css"; // a
import Router from "./app/router/Router";
import "react-quill/dist/quill.snow.css";

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;

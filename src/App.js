import "./index.css";
import "./theme.css"; // dark - antd
import "./antd.css"; // a
import Router from "./app/router/Router";
import "react-quill/dist/quill.snow.css";
import Alerts from "./app/components/Alerts";

function App() {
  return (
    <div className="App">
      <Router />
      <Alerts />
    </div>
  );
}

export default App;

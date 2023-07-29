import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./Stote/Store";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
reportWebVitals();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

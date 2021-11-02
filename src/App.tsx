import React from "react";
import BoardBox from "./components/BoardBox";
import "./App.css";
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="Full-App">
        <div className="BoardBox">
          <BoardBox />
        </div>
      </div>
    </Provider>
  );
};

export default App;

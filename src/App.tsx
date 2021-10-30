import React from "react";
import BoardBox from "./components/BoardBox";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="Full-App">
        <div className="BoardBox">
          <BoardBox />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;

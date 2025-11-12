import React from "react";
import TodoApp from "./TodoApp";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter basename="/mern_todo">
      <h1>📝 MERN TODO APP</h1>
      <TodoApp />
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";
import "./ShowTodo.css";

function ShowTodo({ val }) {
  return (
    <div className="showTodo">
      <p>{val.todo}</p>
    </div>
  );
}

export default ShowTodo;

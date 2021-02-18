import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import "./ShowTodo.css";

function ShowTodo({ todos }) {
  return (
    <ul className="todos">
      {todos?.map((todo, index) => (
        <TodoItem key={index} todo={todo} />
      ))}
    </ul>
  );
}
export default ShowTodo;

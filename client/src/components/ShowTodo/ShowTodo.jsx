import { IconButton } from "@material-ui/core";
import { Clear, Delete, Done } from "@material-ui/icons";
import React from "react";
import todoActions from "../../redux/todos/actions";
import "./ShowTodo.css";

function ShowTodo({ todos }) {
  return (
    <ul className="todos">
      {todos?.map((todo, index) => (
        <li
          key={index}
          className={todo.check ? "todos__item checked" : "todos__item"}
        >
          <h3>{todo.todo}</h3>
          {todo.check ? (
            <IconButton onClick={() => todoActions.uncheckTodo(todo)}>
              <Clear />
            </IconButton>
          ) : (
            <IconButton onClick={() => todoActions.checkTodo(todo)}>
              <Done />
            </IconButton>
          )}
          <IconButton>
            <Delete />
          </IconButton>
        </li>
      ))}
    </ul>
  );
}

export default ShowTodo;
